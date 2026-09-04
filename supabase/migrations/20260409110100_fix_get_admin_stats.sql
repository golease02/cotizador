-- ================================================================
-- FIX: get_admin_stats() — error 42P01
--   "missing FROM-clause entry for table \"t\""
--   Causa: jsonb_agg(t ORDER BY t.cnt DESC) usaba `t` (alias de una
--   COLUMNA del subselect) como si fuera alias de tabla en `t.cnt`.
--   Corrección: calificar con el alias real del FROM (`s`).
--   Re-ejecutar es seguro (CREATE OR REPLACE, no toca datos).
-- ================================================================

CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
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
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'No autorizado: solo un administrador puede ver estadísticas.';
  END IF;

  SELECT count(*) INTO v_sellers_count
    FROM public.profiles WHERE role = 'seller';
  SELECT count(*) INTO v_inactive_sellers
    FROM public.profiles WHERE role = 'seller' AND active IS FALSE;

  SELECT count(*) INTO v_quotes_count     FROM public.quotes;
  SELECT count(*) INTO v_fijadas_count    FROM public.quotes WHERE fijada IS TRUE;
  SELECT count(*) INTO v_rojas_count      FROM public.quotes WHERE color = 'rojo';
  SELECT count(*) INTO v_recientes_count  FROM public.quotes WHERE color = 'reciente';
  SELECT count(*) INTO v_verdes_count     FROM public.quotes WHERE color = 'verde';
  SELECT count(*) INTO v_amarillas_count  FROM public.quotes WHERE color = 'amarillo';

  -- Top 5 vehículos más cotizados
  SELECT coalesce(jsonb_agg(s.t ORDER BY s.cnt DESC), '[]'::jsonb)
    INTO v_top_vehicles
    FROM (
      SELECT jsonb_build_object('name', brand || ' ' || model, 'count', count(*)) AS t,
             count(*) AS cnt
      FROM public.quotes
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
      GROUP BY seller_id
      ORDER BY cnt DESC
      LIMIT 5
    ) q
    JOIN public.profiles p ON p.id = q.seller_id
   WHERE p.full_name IS NOT NULL AND p.full_name <> '';

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
$$;

REVOKE ALL ON FUNCTION public.get_admin_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated, service_role;
