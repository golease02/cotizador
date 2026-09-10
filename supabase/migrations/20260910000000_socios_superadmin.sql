-- ============================================================
-- 2026-09-10 — Modelo Socios / Super Admin
--   * Rol: super_admin | socio | seller  (admin -> socio)
--   * socio_id : socio goLease vinculado a un vendedor
--   * permisos  : JSONB con permisos granulares por socio
--   * Super admin ve todo; socio solo sus vendedores/cotizaciones
-- ============================================================
BEGIN;

-- 1. Quitar el trigger anterior (bloquea cambios de rol durante el backfill y
--    será reemplazado por la nueva versión más abajo)
DROP TRIGGER IF EXISTS trg_profiles_secure_row ON public.profiles;
DROP FUNCTION IF EXISTS public.secure_profiles_row();

-- 2. Columnas nuevas (idempotente)
ALTER TABLE public.profiles
    ADD COLUMN IF NOT EXISTS socio_id   UUID      REFERENCES public.profiles(id),
    ADD COLUMN IF NOT EXISTS permisos   JSONB     DEFAULT '{}'::jsonb NOT NULL;

-- 3. Migración de datos: admin -> socio se hace en el paso 4 (tras quitar el check viejo)

-- 4. Ampliar el dominio de roles (primero quitar el check viejo para poder
--     backfillear admin -> socio sin violarlo; al final se valida el nuevo)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
UPDATE public.profiles SET role = 'socio' WHERE role = 'admin';
ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_role_check
      CHECK (role IN ('super_admin', 'socio', 'seller'));

-- 4. Helper: TRUE solo para super_admin (las policies legacy _v2 usan is_admin()
--    y, con esto, quedan restringidas a super admin. El socio se cubre con las
--    políticas nuevas *_socio).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
      AND profiles.active IS DISTINCT FROM false
  );
$func$;

-- 4.b Helper exclusivo super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.role = 'super_admin'
      AND profiles.active IS DISTINCT FROM false
  );
$func$;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(), public.is_super_admin() TO authenticated;

-- 5. Trigger de defensa: evita auto-promoción y que nadie (excepto super_admin)
--    asigne roles privilegiados ni cambie socio_id de otro vendedor.
DROP TRIGGER IF EXISTS trg_profiles_secure_row ON public.profiles;
DROP FUNCTION IF EXISTS public.secure_profiles_row();

CREATE OR REPLACE FUNCTION public.secure_profiles_row()
RETURNS trigger
LANGUAGE plpgsql
AS $fn$
DECLARE
  cur_role text;
  session_role text;
BEGIN
  -- Bypass de mantenimiento: roles de servicio (postgres, supabase_admin, service_role)
  -- ejecutan scripts/migraciones y RPCs SECURITY DEFINER; no pasan las reglas de rol.
  SELECT current_role INTO session_role;
  IF session_role IN ('postgres', 'supabase_admin', 'service_role') THEN
    RETURN NEW;
  END IF;

  SELECT role INTO cur_role FROM public.profiles WHERE id = auth.uid();
  IF cur_role IS NULL THEN cur_role := 'seller'; END IF;

  -- Nadie puede cambiar el id del propio usuario
  IF NEW.id IS DISTINCT FROM OLD.id AND NEW.id = auth.uid() THEN
    RAISE EXCEPTION 'No se puede modificar el id de usuario.';
  END IF;

  -- Auto-promoción a super_admin prohibida
  IF NEW.role = 'super_admin' AND cur_role <> 'super_admin' THEN
    RAISE EXCEPTION 'Solo el super admin puede asignar el rol super_admin.';
  END IF;

  -- Un socio solo puede crear/editar vendedores (rol seller)
  IF cur_role = 'socio' THEN
    IF (NEW.role IN ('super_admin','socio')) THEN
      RAISE EXCEPTION 'Un socio no puede asignar roles de socio o super_admin.';
    END IF;
  END IF;

    -- socio_id: el propio vendedor puede auto-vincular su socio (registro) y el
  -- super_admin puede cambiarlo después. Nadie más.
  IF NEW.socio_id IS DISTINCT FROM OLD.socio_id
     AND auth.uid() <> NEW.id AND cur_role <> 'super_admin' THEN
    RAISE EXCEPTION 'Solo el super admin puede modificar el socio asignado.';
  END IF;

  -- active: bloquear auto-inactivación salvo que sea super_admin
  IF NEW.active IS DISTINCT FROM OLD.active THEN
    IF cur_role <> 'super_admin' AND auth.uid() = NEW.id THEN
      RAISE EXCEPTION 'No puedes desactivar tu propia cuenta.';
    END IF;
  END IF;

  RETURN NEW;
END;
$fn$;

CREATE TRIGGER trg_profiles_secure_row
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.secure_profiles_row();

-- 6. Políticas RLS (idempotente: se dropean antes de crearse)

-- profiles : SELECT
DROP POLICY IF EXISTS "profiles_select_socio" ON public.profiles;
CREATE POLICY "profiles_select_socio"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id                                                       -- propio
  OR is_super_admin()                                                   -- super admin: todo
  OR EXISTS (SELECT 1 FROM public.profiles p
             WHERE p.id = auth.uid() AND p.role = 'socio'
               AND p.id = public.profiles.socio_id)                    -- socio dueño de este seller
  OR EXISTS (SELECT 1 FROM public.profiles p
             WHERE p.id = auth.uid()
               AND p.role IN ('socio','super_admin')
               AND p.socio_id = public.profiles.socio_id)              -- socio: sellers del mismo socio
);

-- profiles : INSERT ya cubierto por profiles_insert_own_v2 (id = auth.uid())
DROP POLICY IF EXISTS "profiles_update_socio" ON public.profiles;
CREATE POLICY "profiles_update_socio"
ON public.profiles FOR UPDATE
USING (
  auth.uid() = id
  OR is_super_admin()
  OR EXISTS (SELECT 1 FROM public.profiles p
             WHERE p.id = auth.uid()
               AND p.role IN ('socio','super_admin')
               AND p.socio_id = public.profiles.socio_id)
);

DROP POLICY IF EXISTS "profiles_delete_super" ON public.profiles;
CREATE POLICY "profiles_delete_super"
ON public.profiles FOR DELETE
USING (is_super_admin());

-- quotes : SELECT ampliado (socio ve los de sus vendedores)
DROP POLICY IF EXISTS "quotes_select_socio" ON public.quotes;
CREATE POLICY "quotes_select_socio"
ON public.quotes FOR SELECT
USING (
  auth.uid() = seller_id                                                   -- vendedor
  OR is_super_admin()                                                      -- super admin
  OR EXISTS (SELECT 1 FROM public.profiles s
             JOIN public.profiles m ON m.id = s.socio_id
             WHERE s.id = quotes.seller_id
               AND m.id = auth.uid() AND m.role = 'socio')                 -- socio del vendedor
);

-- quotes : UPDATE ampliado (socio actualiza cotizaciones de sus vendedores:
-- marcar revisadas, cambiar semáforo, etc.)
DROP POLICY IF EXISTS "quotes_update_socio" ON public.quotes;
CREATE POLICY "quotes_update_socio"
ON public.quotes FOR UPDATE
USING (
  auth.uid() = seller_id
  OR is_super_admin()
  OR EXISTS (SELECT 1 FROM public.profiles s
             JOIN public.profiles m ON m.id = s.socio_id
             WHERE s.id = quotes.seller_id
               AND m.id = auth.uid() AND m.role = 'socio')
)
WITH CHECK (
  auth.uid() = seller_id
  OR is_super_admin()
  OR EXISTS (SELECT 1 FROM public.profiles s
             JOIN public.profiles m ON m.id = s.socio_id
             WHERE s.id = quotes.seller_id
               AND m.id = auth.uid() AND m.role = 'socio')
);

COMMENT ON COLUMN public.profiles.socio_id IS 'Socio goLease al que pertenece el vendedor. Solo super_admin lo puede asignar.';
COMMENT ON COLUMN public.profiles.permisos IS 'Permisos granulares del socio (jsonb).';

COMMIT;
