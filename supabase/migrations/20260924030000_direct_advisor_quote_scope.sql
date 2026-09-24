-- ============================================================
-- COTIZACIONES DIRECTAS DE SOCIOS (24/09/2026)
-- ============================================================
-- En /admin/seguimiento, una cotización creada por un socio o superadmin se
-- clasifica como ASESOR=autor y VENDEDOR=Directa. seller_id conserva al creador
-- real para ownership/RLS; no se modifica profiles.socio_id.
--
-- Esta migración amplía el alcance del socio para que también pueda operar sus
-- propias cotizaciones directas: lectura/edición de quote, quote_seguimiento,
-- notas, interacción y eliminación. Es autocontenida e idempotente.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Helpers de alcance
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_active_socio()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = 'socio'
      AND COALESCE(p.active, true) = true
  );
$fn$;

CREATE OR REPLACE FUNCTION public.can_access_seguimiento(p_quote_id bigint)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT
    public.is_seguimiento_admin()
    OR (
      public.is_active_socio()
      AND EXISTS (
        SELECT 1
        FROM public.quotes q
        WHERE q.id = p_quote_id
          AND (
            q.seller_id = auth.uid()
            OR EXISTS (
              SELECT 1
              FROM public.profiles vendedor
              WHERE vendedor.id = q.seller_id
                AND vendedor.socio_id = auth.uid()
            )
          )
      )
    );
$fn$;

CREATE OR REPLACE FUNCTION public.seg_quote_owner(p_quote_id bigint)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT
    public.is_active_socio()
    AND EXISTS (
      SELECT 1
      FROM public.quotes q
      WHERE q.id = p_quote_id
        AND (
          q.seller_id = auth.uid()
          OR EXISTS (
            SELECT 1
            FROM public.profiles vendedor
            WHERE vendedor.id = q.seller_id
              AND vendedor.socio_id = auth.uid()
          )
        )
    );
$fn$;

CREATE OR REPLACE FUNCTION public.seg_note_owner(p_entidad_tipo text, p_entidad_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT
    public.is_seguimiento_admin()
    OR CASE
      WHEN p_entidad_tipo = 'quote' THEN public.seg_quote_owner(p_entidad_id::bigint)
      WHEN p_entidad_tipo = 'seller' THEN EXISTS (
        SELECT 1
        FROM public.profiles vendedor
        WHERE vendedor.id = p_entidad_id::uuid
          AND vendedor.socio_id = auth.uid()
          AND public.is_active_socio()
      )
      ELSE false
    END;
$fn$;

-- ------------------------------------------------------------
-- 2. Interacción compartida para cotización directa
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.mark_quote_interaction(p_quote_id bigint)
RETURNS timestamptz
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_interaccion timestamptz := now();
BEGIN
  IF NOT public.can_access_seguimiento(p_quote_id) THEN
    RAISE EXCEPTION 'No tienes permiso para registrar interacción en esta cotización'
      USING ERRCODE = '42501';
  END IF;

  UPDATE public.quotes
  SET last_interacted_at = v_interaccion
  WHERE id = p_quote_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'La cotización no existe'
      USING ERRCODE = 'P0002';
  END IF;

  RETURN v_interaccion;
END
$fn$;

-- ------------------------------------------------------------
-- 3. Policies de quotes: socio puede ver/editar su cotización directa
--    Las políticas existentes se conservan; PostgreSQL combines políticas con OR.
-- ------------------------------------------------------------
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS quotes_select_direct_socio ON public.quotes;
CREATE POLICY quotes_select_direct_socio
  ON public.quotes
  FOR SELECT
  TO authenticated
  USING (public.is_active_socio() AND seller_id = auth.uid());

DROP POLICY IF EXISTS quotes_update_direct_socio ON public.quotes;
CREATE POLICY quotes_update_direct_socio
  ON public.quotes
  FOR UPDATE
  TO authenticated
  USING (public.is_active_socio() AND seller_id = auth.uid())
  WITH CHECK (public.is_active_socio() AND seller_id = auth.uid());

-- ------------------------------------------------------------
-- 4. quote_seguimiento usa can_access_seguimiento()
--    Se recrean las policies para que el helper nuevo aplique también a directas.
-- ------------------------------------------------------------
DROP POLICY IF EXISTS seguimiento_select ON public.quote_seguimiento;
CREATE POLICY seguimiento_select
  ON public.quote_seguimiento
  FOR SELECT
  TO authenticated
  USING (public.can_access_seguimiento(quote_id));

DROP POLICY IF EXISTS seguimiento_insert ON public.quote_seguimiento;
CREATE POLICY seguimiento_insert
  ON public.quote_seguimiento
  FOR INSERT
  TO authenticated
  WITH CHECK (public.can_access_seguimiento(quote_id));

DROP POLICY IF EXISTS seguimiento_update ON public.quote_seguimiento;
CREATE POLICY seguimiento_update
  ON public.quote_seguimiento
  FOR UPDATE
  TO authenticated
  USING (public.can_access_seguimiento(quote_id))
  WITH CHECK (public.can_access_seguimiento(quote_id));

-- ------------------------------------------------------------
-- 5. Notas del advisor y de su red
--    Las policies anteriores siguen activas; estas son aditivas.
-- ------------------------------------------------------------
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS notas_select_owner_scope ON public.notas;
CREATE POLICY notas_select_owner_scope
  ON public.notas
  FOR SELECT
  TO authenticated
  USING (public.seg_note_owner(entidad_tipo, entidad_id));

DROP POLICY IF EXISTS notas_insert_owner_scope ON public.notas;
CREATE POLICY notas_insert_owner_scope
  ON public.notas
  FOR INSERT
  TO authenticated
  WITH CHECK (public.seg_note_owner(entidad_tipo, entidad_id));

DROP POLICY IF EXISTS notas_update_owner_scope ON public.notas;
CREATE POLICY notas_update_owner_scope
  ON public.notas
  FOR UPDATE
  TO authenticated
  USING (public.seg_note_owner(entidad_tipo, entidad_id))
  WITH CHECK (public.seg_note_owner(entidad_tipo, entidad_id));

DROP POLICY IF EXISTS notas_delete_owner_scope ON public.notas;
CREATE POLICY notas_delete_owner_scope
  ON public.notas
  FOR DELETE
  TO authenticated
  USING (public.seg_note_owner(entidad_tipo, entidad_id));

-- ------------------------------------------------------------
-- 6. Grants de helpers/RPC
-- ------------------------------------------------------------
REVOKE ALL ON FUNCTION public.is_active_socio() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_active_socio() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.can_access_seguimiento(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_seguimiento(bigint) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.seg_quote_owner(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.seg_quote_owner(bigint) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.seg_note_owner(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.seg_note_owner(text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.mark_quote_interaction(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_quote_interaction(bigint) TO authenticated, service_role;

COMMIT;
