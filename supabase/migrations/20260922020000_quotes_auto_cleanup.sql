-- ============================================================
-- Purga automática de cotizaciones antiguas (retención 15 días).
-- Regla de negocio:
--   - Toda cotización con más de p_days días desde su creación
--     se elimina FÍSICAMENTE, salvo que esté protegida:
--       · fijada = true (pin manual del admin/socio), o
--       · con seguimiento REAL en public.quote_seguimiento
--         (fila con al menos una etapa completada en `etapas`
--          o con fecha_cierre; la fila perezosa vacía '{}' y sin
--          fecha de cierre NO protege).
--   - revisada = true NO protege (acordado con negocio).
-- Tabla 1:1 quote_seguimiento cae por ON DELETE CASCADE; las
-- notas con entidad_tipo='quote' no tienen FK y se limpian a mano.
-- La función es SECURITY DEFINER y solo la ejecuta service_role
-- (el job de pg_cron corre como postgres). No hay llamadas desde
-- el frontend.
-- Autocontenida e idempotente. Aplica con: npx supabase db push
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Función de purga
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
  -- Candidatas: antigüedad + sin protección (fijada / seguimiento real).
  CREATE TEMP TABLE purge_ids ON COMMIT DROP AS
  SELECT q.id
  FROM public.quotes q
  WHERE q.created_at < now() - make_interval(days => p_days)
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

-- ------------------------------------------------------------
-- 2. Programación diaria con pg_cron (07:17 UTC)
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pg_cron;

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
    RAISE NOTICE 'pg_cron no disponible: funcion purge_expired_quotes instalada sin programar';
  END IF;
END
$cron$;

COMMIT;
