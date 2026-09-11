-- ============================================================
-- 2026-09-11 — Bloque 3: RPCs con alcance por socio
--   * get_seller_scope_ids(): vendedores visibles para el usuario
--     actual. super_admin => NULL (sin filtro = todo).
--   * get_sellers_with_quote_counts(): socio ve solo sus
--     vendedores; vendedor se ve solo a sí mismo.
--   * get_admin_stats(): métricas acotadas al socio (o propias).
-- ============================================================
BEGIN;

-- Helper: alcance de vendedores según el rol del usuario actual.
CREATE OR REPLACE FUNCTION public.get_seller_scope_ids()
RETURNS uuid[]
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT CASE
    WHEN public.is_super_admin() THEN NULL::uuid[]
    WHEN EXISTS (
      SELECT 1 FROM public.profiles me
      WHERE me.id = auth.uid()
        AND me.role = 'socio'
        AND me.active IS DISTINCT FROM false
    ) THEN ARRAY(
      SELECT s.id FROM public.profiles s
      WHERE s.role = 'seller'
        AND s.socio_id = auth.uid()
    )
    WHEN EXISTS (
      SELECT 1 FROM public.profiles me
      WHERE me.id = auth.uid()
        AND me.role = 'seller'
        AND me.active IS DISTINCT FROM false
    ) THEN ARRAY[auth.uid()]
    ELSE ARRAY[]::uuid[]
  END;
$func$;

-- Vendedores + conteo de cotizaciones, acotados al rol.
CREATE OR REPLACE FUNCTION public.get_sellers_with_quote_counts()
 RETURNS TABLE(seller jsonb)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_scope uuid[] := public.get_seller_scope_ids();
BEGIN
  RETURN QUERY
  SELECT to_jsonb(p) || jsonb_build_object('quote_count', COALESCE(q.cnt, 0))
  FROM public.profiles p
  LEFT JOIN (
    SELECT seller_id, count(*) AS cnt
    FROM public.quotes
    GROUP BY seller_id
  ) q ON q.seller_id = p.id
  WHERE p.role = 'seller'
    AND (v_scope IS NULL OR p.id = ANY(v_scope))
  ORDER BY p.created_at DESC;
END;
$function$;
-- ============================================================
-- get_admin_stats: mismas métricas, acotadas al alcance del rol.
-- v_scope IS NULL  -> super_admin: estadísticas globales.
-- v_scope = {…}    -> socio/vendedor: solo su universo.
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_admin_stats()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_scope            uuid[] := public.get_seller_scope_ids();
  v_sellers_count    int;
  v_inactive_sellers int;
  v_quotes_count     int;
  v_fijadas_count    int;
  v_rojas_count      int;
  v_recientes_count  int;
  v_verdes_count     int;
  v_amarillas_count  int;
  v_top_vehicles     jsonb;
  v_top_sellers      jsonb;
  v_fijadas          jsonb;
  v_urgentes         jsonb;
  v_recientes        jsonb;
BEGIN
  SELECT count(*) INTO v_sellers_count
    FROM public.profiles
   WHERE role = 'seller'
     AND (v_scope IS NULL OR id = ANY(v_scope));
  SELECT count(*) INTO v_inactive_sellers
    FROM public.profiles
   WHERE role = 'seller'
     AND active IS FALSE
     AND (v_scope IS NULL OR id = ANY(v_scope));

  SELECT count(*) INTO v_quotes_count
    FROM public.quotes
   WHERE v_scope IS NULL OR seller_id = ANY(v_scope);
  SELECT count(*) INTO v_fijadas_count
    FROM public.quotes
   WHERE fijada IS TRUE
     AND (v_scope IS NULL OR seller_id = ANY(v_scope));
  SELECT count(*) INTO v_rojas_count
    FROM public.quotes
   WHERE color = 'rojo'
     AND (v_scope IS NULL OR seller_id = ANY(v_scope));
  SELECT count(*) INTO v_recientes_count
    FROM public.quotes
   WHERE color = 'reciente'
     AND (v_scope IS NULL OR seller_id = ANY(v_scope));
  SELECT count(*) INTO v_verdes_count
    FROM public.quotes
   WHERE color = 'verde'
     AND (v_scope IS NULL OR seller_id = ANY(v_scope));
  SELECT count(*) INTO v_amarillas_count
    FROM public.quotes
   WHERE color = 'amarillo'
     AND (v_scope IS NULL OR seller_id = ANY(v_scope));

  -- Top 5 vehículos más cotizados
  SELECT coalesce(jsonb_agg(s.t ORDER BY s.cnt DESC), '[]'::jsonb)
    INTO v_top_vehicles
    FROM (
      SELECT jsonb_build_object('name', brand || ' ' || model, 'count', count(*)) AS t,
             count(*) AS cnt
      FROM public.quotes
      WHERE v_scope IS NULL OR seller_id = ANY(v_scope)
      GROUP BY brand, model
      ORDER BY cnt DESC
      LIMIT 5
    ) s;

  -- Top 5 vendedores con más cotizaciones
  SELECT coalesce(jsonb_agg(
           jsonb_build_object(
             'name', p.full_name,
             'location', coalesce(to_jsonb(p) ->> 'agency_location', 'Sin ubicación'),
             'count', q.cnt
           ) ORDER BY q.cnt DESC), '[]'::jsonb)
    INTO v_top_sellers
    FROM (
      SELECT seller_id, count(*) AS cnt
      FROM public.quotes
      WHERE v_scope IS NULL OR seller_id = ANY(v_scope)
      GROUP BY seller_id
      ORDER BY cnt DESC
      LIMIT 5
    ) q
    JOIN public.profiles p ON p.id = q.seller_id
   WHERE (v_scope IS NULL OR p.id = ANY(v_scope))
     AND p.full_name IS NOT NULL AND p.full_name <> '';

  -- Listas destacadas: top 5 con color recalculado y seller_name
  SELECT coalesce(jsonb_agg(x.r ORDER BY x.created_at DESC), '[]'::jsonb)
    INTO v_fijadas
    FROM (
      SELECT jsonb_build_object(
               'id', q.id, 'client_name', q.client_name, 'brand', q.brand,
               'model', q.model, 'pricenet', q.pricenet, 'created_at', q.created_at,
               'color', CASE
                 WHEN q.revisada IS TRUE THEN 'verde'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 7 THEN 'rojo'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 2 THEN 'amarillo'
                 ELSE 'reciente'
               END,
               'seller_name', coalesce(p.full_name, 'N/A')
             ) AS r,
             q.created_at
      FROM public.quotes q
      LEFT JOIN public.profiles p ON p.id = q.seller_id
      WHERE q.fijada IS TRUE
        AND (v_scope IS NULL OR q.seller_id = ANY(v_scope))
      ORDER BY q.created_at DESC
      LIMIT 5
    ) x;
SELECT coalesce(jsonb_agg(x.r ORDER BY x.created_at DESC), '[]'::jsonb)
    INTO v_urgentes
    FROM (
      SELECT jsonb_build_object(
               'id', q.id, 'client_name', q.client_name, 'brand', q.brand,
               'model', q.model, 'pricenet', q.pricenet, 'created_at', q.created_at,
               'color', CASE
                 WHEN q.revisada IS TRUE THEN 'verde'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 7 THEN 'rojo'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 2 THEN 'amarillo'
                 ELSE 'reciente'
               END,
               'seller_name', coalesce(p.full_name, 'N/A')
             ) AS r,
             q.created_at
      FROM public.quotes q
      LEFT JOIN public.profiles p ON p.id = q.seller_id
      WHERE q.color = 'rojo'
        AND (v_scope IS NULL OR q.seller_id = ANY(v_scope))
      ORDER BY q.created_at DESC
      LIMIT 5
    ) x;

  SELECT coalesce(jsonb_agg(x.r ORDER BY x.created_at DESC), '[]'::jsonb)
    INTO v_recientes
    FROM (
      SELECT jsonb_build_object(
               'id', q.id, 'client_name', q.client_name, 'brand', q.brand,
               'model', q.model, 'pricenet', q.pricenet, 'created_at', q.created_at,
               'color', CASE
                 WHEN q.revisada IS TRUE THEN 'verde'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 7 THEN 'rojo'
                 WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 2 THEN 'amarillo'
                 ELSE 'reciente'
               END,
               'seller_name', coalesce(p.full_name, 'N/A')
             ) AS r,
             q.created_at
      FROM public.quotes q
      LEFT JOIN public.profiles p ON p.id = q.seller_id
      WHERE v_scope IS NULL OR q.seller_id = ANY(v_scope)
      ORDER BY q.created_at DESC
      LIMIT 5
    ) x;

  RETURN jsonb_build_object(
    'totalSellers',    v_sellers_count,
    'inactiveSellers', v_inactive_sellers,
    'totalQuotes',     v_quotes_count,
    'totalFijadas',    v_fijadas_count,
    'totalUrgentes',   v_rojas_count,
    'totalRecientes',  v_recientes_count,
    'totalRevisadas',  v_verdes_count,
    'totalPendientes', v_amarillas_count,
    'topVehicles',     v_top_vehicles,
    'topSellers',      v_top_sellers,
    'fijadas',         v_fijadas,
    'urgentes',        v_urgentes,
    'recientes',       v_recientes
  );
END;
$function$;

COMMIT;