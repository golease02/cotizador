-- ================================================================
-- OPTIMIZACIÓN DE RENDIMIENTO (fase Supabase)
--   1) RPC get_sellers_with_quote_counts(): una sola consulta en
--      lugar del bucle N+1 del cliente (1 + N counts).
--   2) RPC get_admin_stats(): todas las métricas del dashboard en
--      UNA llamada (antes: 10+ counts + agregaciones en cliente).
--   3) Backfill set-based de quotes.color (antes: UPDATE por fila).
--   4) Índices para los filtros/órdenes más usados.
-- Idempotente: puede re-ejecutarse sin efectos dañinos.
--
-- Aplicar con:  supabase db push   (o pegar en el SQL Editor)
-- ================================================================

-- ----------------------------------------------------------------
-- 1) Vendedores + conteo de cotizaciones (una sola consulta)
--    Devuelve { seller: jsonb } con todas las columnas del perfil
--    + quote_count. Se usa to_jsonb() para no acoplar el RPC al
--    esquema exacto de profiles.
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_sellers_with_quote_counts()
RETURNS TABLE (seller jsonb)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'No autorizado: solo un administrador puede listar vendedores.';
  END IF;

  RETURN QUERY
  SELECT to_jsonb(p) || jsonb_build_object('quote_count', COALESCE(q.cnt, 0))
  FROM public.profiles p
  LEFT JOIN (
    SELECT seller_id, count(*) AS cnt
    FROM public.quotes
    GROUP BY seller_id
  ) q ON q.seller_id = p.id
  WHERE p.role = 'seller'
  ORDER BY p.created_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_sellers_with_quote_counts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_sellers_with_quote_counts() TO authenticated, service_role;

-- ----------------------------------------------------------------
-- 2) Estadísticas del dashboard admin en una sola llamada.
--    La fórmula de color replica EXACTAMENTE el recálculo que
--    hacía el cliente: revisada → verde; dias > 7 → rojo;
--    dias > 2 → amarillo; resto → reciente.
--    NOTA: ya no se persisten UPDATE por fila; el color se
--    recalcula al vuelo y el backfill del punto 3 corrige el
--    valor almacenado una única vez.
-- ----------------------------------------------------------------
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

  -- Top 5 vehículos más cotizados (antes: agregación en cliente)
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

-- ----------------------------------------------------------------
-- 3) Backfill único de quotes.color con la misma fórmula.
--    Solo toca filas cuyo color difiera (IS DISTINCT FROM).
-- ----------------------------------------------------------------
UPDATE public.quotes q
SET color = c.new_color
FROM (
  SELECT id, CASE
    WHEN revisada IS TRUE THEN 'verde'
    WHEN floor(extract(epoch FROM (now() - created_at)) / 86400) > 7 THEN 'rojo'
    WHEN floor(extract(epoch FROM (now() - created_at)) / 86400) > 2 THEN 'amarillo'
    ELSE 'reciente'
  END AS new_color
  FROM public.quotes
) c
WHERE c.id = q.id
  AND q.color IS DISTINCT FROM c.new_color;

-- ----------------------------------------------------------------
-- 4) Índices para consultas y ordenamientos frecuentes
-- ----------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_quotes_seller_created_at
  ON public.quotes (seller_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_quotes_color
  ON public.quotes (color);

CREATE INDEX IF NOT EXISTS idx_quotes_fijada_true
  ON public.quotes (fijada) WHERE fijada IS TRUE;

CREATE INDEX IF NOT EXISTS idx_notas_entidad
  ON public.notas (entidad_tipo, entidad_id);

CREATE INDEX IF NOT EXISTS idx_profiles_role_active
  ON public.profiles (role, active);
