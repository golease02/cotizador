-- ============================================================
-- RLS granular del módulo Seguimiento/Notas (24/09/2026)
-- ============================================================
-- El guard de Angular ya revisa permisos JSONB, pero las funciones RLS
-- también deben proteger los datos cuando una petición llega directamente a
-- Supabase. Esta migración exige los permisos en SQL:
--   - seguimiento: acceso a quote_seguimiento, interacción y eliminación de quote;
--   - notas: acceso a las notas del advisor o de su red.
-- Superadmin conserva el acceso total.
-- Es autocontenida e idempotente.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.has_seguimiento_permission()
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
      AND COALESCE(p.permisos ->> 'seguimiento', 'false') = 'true'
  );
$fn$;

CREATE OR REPLACE FUNCTION public.has_notas_permission()
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
      AND COALESCE(p.permisos ->> 'notas', 'false') = 'true'
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
      public.has_seguimiento_permission()
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
    public.has_seguimiento_permission()
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
    OR (
      public.has_notas_permission()
      AND CASE
        WHEN p_entidad_tipo = 'quote' THEN EXISTS (
          SELECT 1
          FROM public.quotes q
          WHERE q.id = p_entidad_id::bigint
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
        WHEN p_entidad_tipo = 'seller' THEN EXISTS (
          SELECT 1
          FROM public.profiles vendedor
          WHERE vendedor.id = p_entidad_id::uuid
            AND vendedor.socio_id = auth.uid()
        )
        ELSE false
      END
    );
$fn$;

-- La policy directa de quotes debe respetar el mismo permiso que el guard.
DROP POLICY IF EXISTS quotes_select_direct_socio ON public.quotes;
CREATE POLICY quotes_select_direct_socio
  ON public.quotes
  FOR SELECT
  TO authenticated
  USING (public.has_seguimiento_permission() AND seller_id = auth.uid());

DROP POLICY IF EXISTS quotes_update_direct_socio ON public.quotes;
CREATE POLICY quotes_update_direct_socio
  ON public.quotes
  FOR UPDATE
  TO authenticated
  USING (public.has_seguimiento_permission() AND seller_id = auth.uid())
  WITH CHECK (public.has_seguimiento_permission() AND seller_id = auth.uid());

-- Grants de helpers nuevos.
REVOKE ALL ON FUNCTION public.has_seguimiento_permission() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_seguimiento_permission() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.has_notas_permission() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_notas_permission() TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.can_access_seguimiento(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_seguimiento(bigint) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.seg_quote_owner(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.seg_quote_owner(bigint) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.seg_note_owner(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.seg_note_owner(text, text) TO authenticated, service_role;

COMMIT;
