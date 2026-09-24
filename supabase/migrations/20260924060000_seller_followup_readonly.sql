-- ============================================================
-- Listado de seguimiento de solo lectura para vendedores (24/09/2026)
-- ============================================================
-- Mis Cotizaciones necesita mostrar las etapas de las cotizaciones propias,
-- pero los vendedores NO deben leer/escribir quote_seguimiento directamente.
-- Esta RPC es el único camino de lectura para esa vista:
--   - limita las filas a seller_id = auth.uid();
--   - devuelve únicamente datos de la cotización y estado de seguimiento;
--   - no expone notas, referenciado, financiera ni permite mutaciones.
-- Los cambios de etapas, entrega, datos operativos y eliminación siguen
-- reservados a super_admin/socio mediante las policies del módulo admin.
-- Migración autocontenida e idempotente.
-- ============================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.get_vendedor_seguimiento()
RETURNS TABLE (
  id bigint,
  seller_id uuid,
  client_name text,
  brand text,
  model text,
  year integer,
  pricenet numeric,
  termmonths integer,
  created_at timestamptz,
  valid_until timestamptz,
  fijada boolean,
  revisada boolean,
  last_reviewed_at timestamptz,
  last_interacted_at timestamptz,
  activo_texto text,
  etapas jsonb,
  fecha_cierre timestamptz,
  seguimiento_updated_at timestamptz,
  tiene_seguimiento boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT
    q.id,
    q.seller_id,
    q.client_name,
    q.brand,
    q.model,
    q.year,
    q.pricenet,
    q.termmonths,
    q.created_at,
    q.valid_until,
    COALESCE(q.fijada, false) AS fijada,
    COALESCE(q.revisada, false) AS revisada,
    q.last_reviewed_at,
    q.last_interacted_at,
    s.activo_texto,
    COALESCE(s.etapas, '{}'::jsonb) AS etapas,
    s.fecha_cierre,
    s.updated_at AS seguimiento_updated_at,
    (s.quote_id IS NOT NULL) AS tiene_seguimiento
  FROM public.quotes q
  LEFT JOIN public.quote_seguimiento s ON s.quote_id = q.id
  WHERE q.seller_id = auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND COALESCE(p.active, true) = true
    )
  ORDER BY q.created_at DESC
  LIMIT 200;
$fn$;

COMMENT ON FUNCTION public.get_vendedor_seguimiento() IS
  'Listado de solo lectura de las cotizaciones propias y su estado de seguimiento para Mis Cotizaciones.';

REVOKE ALL ON FUNCTION public.get_vendedor_seguimiento() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_vendedor_seguimiento() TO authenticated, service_role;

COMMIT;
