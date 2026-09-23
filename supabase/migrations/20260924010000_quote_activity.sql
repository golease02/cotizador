-- ============================================================
-- DÍAS SIN ACTIVIDAD (última actividad de una cotización)
-- ============================================================
-- PROBLEMA: la antigüedad se medía siempre desde `quotes.created_at`, así que
-- revisar una cotización, moverla de etapa, entregarla o escribirle una nota
-- NO reiniciaba el contador: seguía envejeciendo y terminaba marcada como
-- "por caducar" aunque estuviera atendida.
--
-- REGLA (espejo en TypeScript: src/app/utils/quote-activity.ts):
--   ultimaActividad = GREATEST(
--     quotes.created_at,
--     quotes.last_reviewed_at,
--     quote_seguimiento.updated_at,
--     max(quote_seguimiento.etapas::text::timestamptz),
--     quote_seguimiento.fecha_cierre,
--     max(notas.created_at) de las notas de la cotización
--   )
-- Umbrales únicos: < 8 días verde, 8–15 amarillo, >= 16 rojo.
--
-- Esta migración:
--   1. crea `public.quote_last_activity(bigint)` (helper);
--   2. crea `public.get_quotes_activity()` (RPC con scope por rol) para que el
--      frontend (Dashboard y Rendimiento) coloree con la última actividad;
--   3. actualiza `public.purge_expired_quotes(int)`: la retención de 15 días
--      ahora se cuenta desde la ÚLTIMA ACTIVIDAD, no desde la creación.
--
-- Autocontenida e idempotente (CREATE OR REPLACE / REVOKE+GRANT).
-- Requiere `public.get_seller_scope_ids()` (RPC canónica de scope, migración
-- 20260910000005) y la tabla `public.quote_seguimiento` (20260917000000).
-- Aplica con: npx supabase db push
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Helper: última actividad de una cotización
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.quote_last_activity(p_quote_id bigint)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT GREATEST(
    q.created_at,
    COALESCE(q.last_reviewed_at, q.created_at),
    COALESCE(s.updated_at, q.created_at),
    COALESCE(s.fecha_cierre, q.created_at),
    COALESCE(etapas.max_etapa, q.created_at),
    COALESCE(notas.max_nota, q.created_at)
  )
  FROM public.quotes q
  LEFT JOIN public.quote_seguimiento s ON s.quote_id = q.id
  LEFT JOIN LATERAL (
    -- Solo valores con pinta de fecha ISO: evita cast errors con textos libres.
    SELECT max(e.valor::timestamptz) AS max_etapa
    FROM jsonb_each_text(COALESCE(s.etapas, '{}'::jsonb)) AS e(clave, valor)
    WHERE e.valor ~ '^\d{4}-\d{2}-\d{2}'
  ) etapas ON true
  LEFT JOIN LATERAL (
    -- `notas.entidad_id` es texto y no tiene FK: se compara casteando el id.
    SELECT max(n.created_at) AS max_nota
    FROM public.notas n
    WHERE n.entidad_tipo = 'quote'
      AND n.entidad_id = q.id::text
  ) notas ON true
  WHERE q.id = p_quote_id;
$fn$;

-- Uso interno (purga y RPC de scope): no se expone a la app.
REVOKE ALL ON FUNCTION public.quote_last_activity(bigint) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.quote_last_activity(bigint) TO service_role;

-- ------------------------------------------------------------
-- 2. RPC de actividad con scope por rol
--    super_admin = todo, socio = sus vendedores, seller = él mismo
--    (vía get_seller_scope_ids(), que devuelve NULL para super_admin).
--    Devuelve lo mínimo para recalcular el color en el cliente.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_quotes_activity()
RETURNS TABLE (
  quote_id      bigint,
  seller_id     uuid,
  seller_name   text,
  client_name   text,
  brand         text,
  model         text,
  pricenet      numeric,
  revisada      boolean,
  fijada        boolean,
  created_at    timestamptz,
  last_activity timestamptz,
  fecha_cierre  timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  WITH scope AS (SELECT public.get_seller_scope_ids() AS ids)
  SELECT
    q.id,
    q.seller_id,
    COALESCE(v.full_name, 'N/A'),
    COALESCE(q.client_name, ''),
    COALESCE(q.brand, ''),
    COALESCE(q.model, ''),
    COALESCE(q.pricenet, 0),
    COALESCE(q.revisada, false),
    COALESCE(q.fijada, false),
    q.created_at,
    public.quote_last_activity(q.id),
    s.fecha_cierre
  FROM public.quotes q
  CROSS JOIN scope sc
  LEFT JOIN public.profiles v ON v.id = q.seller_id
  LEFT JOIN public.quote_seguimiento s ON s.quote_id = q.id
  WHERE sc.ids IS NULL OR q.seller_id = ANY (sc.ids)
  ORDER BY q.created_at DESC
  LIMIT 500;
$fn$;

REVOKE ALL ON FUNCTION public.get_quotes_activity() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_quotes_activity() TO authenticated, service_role;

-- ------------------------------------------------------------
-- 3. Purga: retención contada desde la ÚLTIMA ACTIVIDAD
--    Reglas que NO cambian:
--      · `fijada = true` protege (pin manual del admin/socio).
--      · Seguimiento REAL (alguna etapa completada o fecha_cierre) protege.
--      · `revisada = true` no protege por sí sola, pero revisar sella
--        `last_reviewed_at` y por tanto SÍ reinicia la ventana de 15 días.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.purge_expired_quotes(p_days integer DEFAULT 15)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_deleted integer := 0;
BEGIN
  -- Candidatas: sin actividad en los últimos p_days y sin protección.
  CREATE TEMP TABLE purge_ids ON COMMIT DROP AS
  SELECT q.id
  FROM public.quotes q
  WHERE public.quote_last_activity(q.id) < now() - make_interval(days => p_days)
    AND COALESCE(q.fijada, false) = false
    AND NOT EXISTS (
      SELECT 1
      FROM public.quote_seguimiento s
      WHERE s.quote_id = q.id
        -- Seguimiento real: alguna etapa completada o negocio cerrado.
        -- La fila perezosa (etapas '{}' y fecha_cierre NULL) no protege.
        AND (COALESCE(s.etapas, '{}'::jsonb) <> '{}'::jsonb OR s.fecha_cierre IS NOT NULL)
    );

  -- Limpiar notas huérfanas (notas.entidad_id es texto, sin FK).
  DELETE FROM public.notas n
  USING purge_ids p
  WHERE n.entidad_tipo = 'quote'
    AND n.entidad_id = p.id::text;

  -- Borrado físico (quote_seguimiento cae por ON DELETE CASCADE,
  -- pero esas filas nunca llegan aquí por el NOT EXISTS).
  DELETE FROM public.quotes q
  USING purge_ids p
  WHERE q.id = p.id;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN v_deleted;
END
$fn$;

REVOKE ALL ON FUNCTION public.purge_expired_quotes(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_expired_quotes(integer) TO service_role;

-- El job de pg_cron llama a la misma firma; se reprograma de forma idempotente.
DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron')
     AND EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'cron') THEN
    IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'purge-expired-quotes') THEN
      PERFORM cron.unschedule('purge-expired-quotes');
    END IF;
    PERFORM cron.schedule(
      'purge-expired-quotes',
      '17 7 * * *',
      $$SELECT public.purge_expired_quotes(15)$$
    );
  ELSE
    RAISE NOTICE 'pg_cron no disponible: purge_expired_quotes actualizada sin reprogramar';
  END IF;
END
$cron$;

COMMIT;
