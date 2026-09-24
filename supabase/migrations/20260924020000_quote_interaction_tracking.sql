-- ============================================================
-- INTERACCIÓN COMPARTIDA + PURGA POR EXPEDIENTE (24/09/2026)
-- ============================================================
-- Esta migración es autocontenida e idempotente:
--   1. agrega quotes.last_interacted_at;
--   2. crea la RPC segura mark_quote_interaction(bigint);
--   3. conserva interacciones históricas ya registradas;
--   4. reinicia la purga de 15 días con cada interacción;
--   5. SOLO la primera casilla "Expediente" protege permanentemente.
--
-- La barra de /admin/seguimiento muestra verde para siempre cuando existe
-- last_interacted_at o fecha_cierre. Esta marca NO se agrega a la actividad que
-- consume Dashboard/Rendimiento: sus reglas 8/16 permanecen intactas.
--
-- La protección manual fijada=true se conserva. El botón ELIMINAR nunca se
-- bloquea: la protección de Expediente aplica únicamente a la purga automática.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Última interacción directa
-- ------------------------------------------------------------
ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS last_interacted_at timestamptz;

COMMENT ON COLUMN public.quotes.last_interacted_at IS
  'Última apertura o modificación registrada desde Seguimiento; su existencia activa el verde permanente.';

-- Backfill: una revisión, seguimiento, entrega o nota histórica ya prueban que
-- el negocio fue interactuado. No se usa created_at como interacción.
WITH notas_ultima AS (
  SELECT
    n.entidad_id,
    max(n.created_at) AS ultima_nota
  FROM public.notas n
  WHERE n.entidad_tipo = 'quote'
  GROUP BY n.entidad_id
),
interacciones AS (
  SELECT
    q.id,
    GREATEST(
      q.last_reviewed_at,
      CASE WHEN COALESCE(q.revisada, false) THEN q.created_at ELSE NULL END,
      s.updated_at,
      s.fecha_cierre,
      n.ultima_nota
    ) AS ultima_interaccion
  FROM public.quotes q
  LEFT JOIN public.quote_seguimiento s ON s.quote_id = q.id
  LEFT JOIN notas_ultima n ON n.entidad_id = q.id::text
)
UPDATE public.quotes q
SET last_interacted_at = i.ultima_interaccion
FROM interacciones i
WHERE q.id = i.id
  AND q.last_interacted_at IS NULL
  AND i.ultima_interaccion IS NOT NULL;

-- ------------------------------------------------------------
-- 2. RPC de interacción con scope de Seguimiento
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
  IF NOT EXISTS (
    SELECT 1
    FROM public.quotes q
    WHERE q.id = p_quote_id
      AND (
        EXISTS (
          SELECT 1
          FROM public.profiles admin
          WHERE admin.id = auth.uid()
            AND admin.role = 'super_admin'
            AND COALESCE(admin.active, true) = true
        )
        OR EXISTS (
          SELECT 1
          FROM public.profiles vendedor
          JOIN public.profiles socio
            ON socio.id = auth.uid()
           AND socio.role = 'socio'
           AND COALESCE(socio.active, true) = true
          WHERE vendedor.id = q.seller_id
            AND vendedor.socio_id = socio.id
        )
      )
  ) THEN
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

REVOKE ALL ON FUNCTION public.mark_quote_interaction(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_quote_interaction(bigint) TO authenticated, service_role;

-- ------------------------------------------------------------
-- 3. Actividad exclusiva de retención
--    No modifica public.quote_last_activity(), por lo que Dashboard y
--    Rendimiento continúan usando la regla histórica 8/16.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.quote_purge_last_activity(p_quote_id bigint)
RETURNS timestamptz
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT GREATEST(
    q.created_at,
    COALESCE(q.last_reviewed_at, q.created_at),
    COALESCE(q.last_interacted_at, q.created_at),
    COALESCE(s.updated_at, q.created_at),
    COALESCE(s.fecha_cierre, q.created_at),
    COALESCE(etapas.max_etapa, q.created_at),
    COALESCE(notas.max_nota, q.created_at)
  )
  FROM public.quotes q
  LEFT JOIN public.quote_seguimiento s ON s.quote_id = q.id
  LEFT JOIN LATERAL (
    SELECT max(e.valor::timestamptz) AS max_etapa
    FROM jsonb_each_text(COALESCE(s.etapas, '{}'::jsonb)) AS e(clave, valor)
    WHERE e.valor ~ '^\d{4}-\d{2}-\d{2}'
  ) etapas ON true
  LEFT JOIN LATERAL (
    SELECT max(n.created_at) AS max_nota
    FROM public.notas n
    WHERE n.entidad_tipo = 'quote'
      AND n.entidad_id = q.id::text
  ) notas ON true
  WHERE q.id = p_quote_id;
$fn$;

REVOKE ALL ON FUNCTION public.quote_purge_last_activity(bigint)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.quote_purge_last_activity(bigint) TO service_role;

-- ------------------------------------------------------------
-- 4. Purga automática
--    · fijada=true conserva la protección manual existente.
--    · Expediente marcado protege de forma permanente mientras siga marcado.
--    · Cualquier otra etapa, entrega o interacción solo renueva 15 días.
--    · Desmarcar Expediente restablece el conteo normal desde la última actividad.
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
  CREATE TEMP TABLE purge_ids ON COMMIT DROP AS
  SELECT q.id
  FROM public.quotes q
  WHERE public.quote_purge_last_activity(q.id) < now() - make_interval(days => p_days)
    AND COALESCE(q.fijada, false) = false
    AND NOT EXISTS (
      SELECT 1
      FROM public.quote_seguimiento s
      WHERE s.quote_id = q.id
        AND NULLIF(s.etapas ->> 'exp', '') IS NOT NULL
    );

  -- notas.entidad_id es texto y no tiene FK: se limpian antes del quote.
  DELETE FROM public.notas n
  USING purge_ids p
  WHERE n.entidad_tipo = 'quote'
    AND n.entidad_id = p.id::text;

  DELETE FROM public.quotes q
  USING purge_ids p
  WHERE q.id = p.id;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN v_deleted;
END
$fn$;

REVOKE ALL ON FUNCTION public.purge_expired_quotes(integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_expired_quotes(integer) TO service_role;

-- El job sigue ejecutándose todos los días a las 07:17.
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
    RAISE NOTICE 'pg_cron no disponible; purge_expired_quotes actualizada sin reprogramar';
  END IF;
END
$cron$;

COMMIT;
