-- ============================================================
-- 2026-09-14 — Rendimiento: policies de quotes con alcance + índices
--
-- Síntoma: una cuenta SOCIO tardaba demasiado al iniciar sesión y al navegar
-- el panel admin, mientras que SUPER ADMIN iba rápido.
--
-- Causa: la policy quotes_select_socio evaluaba, POR CADA FILA de quotes, un
-- EXISTS correlacionado con JOIN profiles×profiles. El super admin sale por
-- is_super_admin() (STABLE → se evalúa una sola vez), por eso no lo sufría.
--
-- Solución: usar get_seller_scope_ids() (STABLE, SECURITY DEFINER, migración
-- 0005). Devuelve un array de ids por rol, así seller_id = ANY(scope) es O(1)
-- por fila y el array se calcula UNA vez por consulta. Misma semántica:
--   super_admin -> NULL (sin filtro = todos)
--   socio       -> sus vendedores
--   seller      -> él mismo
--   otro/anon   -> array vacío (no ve nada)
-- Se agregan además los índices que faltaban (ninguno existía).
-- ============================================================
BEGIN;

-- Garantiza que la policy pueda invocar el helper en todos los roles.
GRANT EXECUTE ON FUNCTION public.get_seller_scope_ids() TO anon, authenticated;

-- ---------- 1. quotes: SELECT ----------
DROP POLICY IF EXISTS "quotes_select_socio" ON public.quotes;
CREATE POLICY "quotes_select_socio"
ON public.quotes FOR SELECT
USING (
  auth.uid() = seller_id                              -- vendedor: las suyas
  OR is_super_admin()                                 -- super admin: todas
  OR seller_id = ANY (public.get_seller_scope_ids())  -- socio: las de su red
);

-- ---------- 2. quotes: UPDATE ----------
DROP POLICY IF EXISTS "quotes_update_socio" ON public.quotes;
CREATE POLICY "quotes_update_socio"
ON public.quotes FOR UPDATE
USING (
  auth.uid() = seller_id
  OR is_super_admin()
  OR seller_id = ANY (public.get_seller_scope_ids())
);

-- ---------- 3. Índices faltantes ----------
-- quotes: usados por RLS, RPCs de estadísticas y listados.
CREATE INDEX IF NOT EXISTS idx_quotes_seller_id  ON public.quotes (seller_id);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_fijada     ON public.quotes (fijada)    WHERE fijada IS TRUE;
CREATE INDEX IF NOT EXISTS idx_quotes_revisada   ON public.quotes (revisada)  WHERE revisada IS TRUE;
CREATE INDEX IF NOT EXISTS idx_quotes_color      ON public.quotes (color);

-- profiles: alcance por socio, login por celular y filtro por rol.
CREATE INDEX IF NOT EXISTS idx_profiles_socio_id      ON public.profiles (socio_id);
CREATE INDEX IF NOT EXISTS idx_profiles_seller_number ON public.profiles (seller_number);
CREATE INDEX IF NOT EXISTS idx_profiles_role          ON public.profiles (role);

-- ---------- 4. Estadísticas del planificador ----------
ANALYZE public.quotes;
ANALYZE public.profiles;

COMMIT;