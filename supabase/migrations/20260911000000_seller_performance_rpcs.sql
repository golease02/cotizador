-- ============================================================
-- 2026-09-11 — Dashboard de rendimiento por vendedor
--   * get_seller_performance(p_days int DEFAULT 30)
--     Devuelve métricas por vendedor + agregados del equipo,
--     acotadas al alcance del rol vía get_seller_scope_ids():
--       - super_admin => todos los vendedores (sin filtro)
--       - socio       => solo sus vendedores (socio_id = auth.uid())
--       - seller      => solo él mismo
--   * Reutiliza la misma fórmula de color que get_admin_stats:
--     revisada -> verde, >7d -> rojo, >2d -> amarillo, resto reciente.
-- ============================================================
BEGIN;

-- Índice de apoyo para el conteo de notas de seguimiento por entidad.
CREATE INDEX IF NOT EXISTS idx_notas_entidad
  ON public.notas (entidad_tipo, entidad_id);

CREATE OR REPLACE FUNCTION public.get_seller_performance(p_days int DEFAULT 30)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  v_scope         uuid[] := public.get_seller_scope_ids();
  v_seller_ids    uuid[];
  v_days          int := greatest(coalesce(p_days, 30), 1);
  v_from          timestamptz := now() - make_interval(days => greatest(coalesce(p_days, 30), 1));
  v_prev_from     timestamptz := now() - make_interval(days => 2 * greatest(coalesce(p_days, 30), 1));
  v_sellers       jsonb;
  v_weekly        jsonb;
  v_quotes_period int;
  v_quotes_prev   int;
  v_active_14     int;
  v_active_period int;
  v_pipeline      numeric;
BEGIN
  -- Universo del dashboard: solo vendedores dentro del alcance. Así los KPIs
  -- del equipo cuadran con la suma de la tabla "Detalle por vendedor".
  SELECT coalesce(array_agg(p.id), ARRAY[]::uuid[])
    INTO v_seller_ids
    FROM public.profiles p
   WHERE p.role = 'seller'
     AND (v_scope IS NULL OR p.id = ANY(v_scope));

  -- ---------- Agregados del equipo (mismo alcance que la lista) ----------
  SELECT count(*), coalesce(sum(q.pricenet), 0)
    INTO v_quotes_period, v_pipeline
    FROM public.quotes q
   WHERE q.created_at >= v_from
     AND q.seller_id = ANY(v_seller_ids);

  SELECT count(*) INTO v_quotes_prev
    FROM public.quotes q
   WHERE q.created_at >= v_prev_from
     AND q.created_at <  v_from
     AND q.seller_id = ANY(v_seller_ids);

  -- Vendedores activos (definición acordada: >=1 cotización en 14 días)
  SELECT count(*) INTO v_active_14
    FROM public.profiles p
   WHERE p.role = 'seller'
     AND coalesce(p.active, true) IS TRUE
     AND (v_scope IS NULL OR p.id = ANY(v_scope))
     AND EXISTS (
       SELECT 1 FROM public.quotes q
        WHERE q.seller_id = p.id
          AND q.created_at >= now() - interval '14 days'
     );

  -- Vendedores con actividad dentro del periodo seleccionado
  SELECT count(*) INTO v_active_period
    FROM public.profiles p
   WHERE p.role = 'seller'
     AND coalesce(p.active, true) IS TRUE
     AND (v_scope IS NULL OR p.id = ANY(v_scope))
     AND EXISTS (
       SELECT 1 FROM public.quotes q
        WHERE q.seller_id = p.id
          AND q.created_at >= v_from
     );

  -- ---------- Tendencia semanal (últimas 8 semanas, incluida la actual) ----------
  SELECT coalesce(
           jsonb_agg(
             jsonb_build_object('weekStart', s.w::date, 'count', s.cnt)
             ORDER BY s.w
           ), '[]'::jsonb)
    INTO v_weekly
    FROM (
      SELECT gs.w, count(q.id) AS cnt
        FROM generate_series(
               date_trunc('week', now()) - interval '7 weeks',
               date_trunc('week', now()),
               interval '1 week'
             ) AS gs(w)
        LEFT JOIN public.quotes q
          ON q.created_at >= gs.w
         AND q.created_at <  gs.w + interval '1 week'
         AND q.seller_id = ANY(v_seller_ids)
       GROUP BY gs.w
    ) s;

  -- ---------- Métricas por vendedor ----------
  SELECT coalesce(
           jsonb_agg(
             jsonb_build_object(
               'id',              x.id,
               'full_name',       coalesce(x.full_name, 'Sin nombre'),
               'seller_number',   coalesce(x.seller_number, ''),
               'agency_brand',    coalesce(x.agency_brand, ''),
               'agency_location', coalesce(x.agency_location, ''),
               'active',          x.active,
               'totalQuotes',     x.total_quotes,
               'quotesPeriod',    x.quotes_period,
               'quotesPrevPeriod', x.quotes_prev,
               'quotesWeek',      x.quotes_week,
               'pipelineValue',   x.pipeline_period,
               'avgTicket',       x.avg_ticket,
               'lastQuoteAt',     x.last_quote_at,
               'daysSinceLastQuote', x.days_since_last_quote,
               'byColor', jsonb_build_object(
                 'reciente', x.recientes,
                 'amarillo', x.amarillas,
                 'rojo',     x.rojas,
                 'verde',    x.verdes
               ),
               'notasCount',      x.notas_count,
               'recentQuotes',    x.recent_quotes
             )
             ORDER BY x.quotes_period DESC, x.full_name ASC
           ), '[]'::jsonb)
    INTO v_sellers
    FROM (
      SELECT s.id,
             s.full_name,
             s.seller_number,
             s.agency_brand,
             s.agency_location,
             coalesce(s.active, true)                 AS active,
             coalesce(a.total_quotes, 0)              AS total_quotes,
             coalesce(a.quotes_period, 0)             AS quotes_period,
             coalesce(a.quotes_prev, 0)               AS quotes_prev,
             coalesce(a.quotes_week, 0)               AS quotes_week,
             coalesce(a.pipeline_period, 0)           AS pipeline_period,
             CASE WHEN coalesce(a.quotes_period, 0) > 0
                  THEN round(coalesce(a.pipeline_period, 0) / a.quotes_period, 2)
                  ELSE 0 END                          AS avg_ticket,
             a.last_quote_at,
             CASE WHEN a.last_quote_at IS NULL THEN NULL
                  ELSE floor(extract(epoch FROM (now() - a.last_quote_at)) / 86400)::int
             END                                      AS days_since_last_quote,
             coalesce(a.recientes, 0)                 AS recientes,
             coalesce(a.amarillas, 0)                 AS amarillas,
             coalesce(a.rojas, 0)                     AS rojas,
             coalesce(a.verdes, 0)                    AS verdes,
             coalesce(n.notas_count, 0)               AS notas_count,
             coalesce(rq.recent, '[]'::jsonb)         AS recent_quotes
        FROM (
          SELECT p.id, p.full_name, p.seller_number, p.agency_brand,
                 p.agency_location, p.active
            FROM public.profiles p
           WHERE p.role = 'seller'
             AND (v_scope IS NULL OR p.id = ANY(v_scope))
        ) s
        LEFT JOIN (
          SELECT q.seller_id,
                 count(*)                                        AS total_quotes,
                 count(*) FILTER (WHERE q.created_at >= v_from)   AS quotes_period,
                 count(*) FILTER (WHERE q.created_at >= v_prev_from
                                    AND q.created_at <  v_from)   AS quotes_prev,
                 count(*) FILTER (WHERE q.created_at >= now() - interval '7 days') AS quotes_week,
                 coalesce(sum(q.pricenet) FILTER (WHERE q.created_at >= v_from), 0) AS pipeline_period,
                 max(q.created_at)                                AS last_quote_at,
                 count(*) FILTER (WHERE q.revisada IS TRUE)        AS verdes,
                 count(*) FILTER (
                   WHERE q.revisada IS NOT TRUE
                     AND floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 7
                 )                                                AS rojas,
                 count(*) FILTER (
                   WHERE q.revisada IS NOT TRUE
                     AND floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 2
                     AND floor(extract(epoch FROM (now() - q.created_at)) / 86400) <= 7
                 )                                                AS amarillas,
                 count(*) FILTER (
                   WHERE q.revisada IS NOT TRUE
                     AND floor(extract(epoch FROM (now() - q.created_at)) / 86400) <= 2
                 )                                                AS recientes
            FROM public.quotes q
           WHERE q.seller_id = ANY(v_seller_ids)
           GROUP BY q.seller_id
        ) a ON a.seller_id = s.id
        LEFT JOIN (
          SELECT n.entidad_id::text AS seller_id, count(*) AS notas_count
            FROM public.notas n
           WHERE n.entidad_tipo = 'seller'
           GROUP BY n.entidad_id::text
        ) n ON n.seller_id = s.id::text
        LEFT JOIN LATERAL (
          SELECT jsonb_agg(r.r ORDER BY r.created_at DESC) AS recent
            FROM (
              SELECT jsonb_build_object(
                       'id',          q.id,
                       'client_name', q.client_name,
                       'brand',       q.brand,
                       'model',       q.model,
                       'pricenet',    q.pricenet,
                       'created_at',  q.created_at,
                       'color', CASE
                         WHEN q.revisada IS TRUE THEN 'verde'
                         WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 7 THEN 'rojo'
                         WHEN floor(extract(epoch FROM (now() - q.created_at)) / 86400) > 2 THEN 'amarillo'
                         ELSE 'reciente'
                       END,
                       'seller_name', coalesce(s.full_name, 'N/A')
                     ) AS r,
                     q.created_at
                FROM public.quotes q
               WHERE q.seller_id = s.id
               ORDER BY q.created_at DESC
               LIMIT 5
            ) r
        ) rq ON TRUE
    ) x;

  RETURN jsonb_build_object(
    'period', jsonb_build_object('days', v_days),
    'team', jsonb_build_object(
      'quotesPeriod',        v_quotes_period,
      'quotesPrevPeriod',    v_quotes_prev,
      'activeSellers',       v_active_14,
      'activeSellersPeriod', v_active_period,
      'pipelineValue',       v_pipeline,
      'avgTicket', CASE WHEN v_quotes_period > 0
                        THEN round(v_pipeline / v_quotes_period, 2)
                        ELSE 0 END,
      'weeklySeries',        v_weekly
    ),
    'sellers', v_sellers
  );
END;
$function$;

-- Seguridad: la función devuelve datos de todo el equipo del alcance, así que
-- se revoca el EXECUTE por defecto de PUBLIC/anon (auditoría 02_verify_rls.sql).
REVOKE EXECUTE ON FUNCTION public.get_seller_performance(int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_performance(int) TO authenticated, service_role;

COMMIT;
