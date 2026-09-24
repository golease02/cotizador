-- ============================================================
-- CORRECCIÓN DE last_reviewed_at POR DEFAULT (24/09/2026)
-- ============================================================
-- La tabla quotes tenía DEFAULT now() en last_reviewed_at. Al insertar una
-- cotización nueva, ese timestamp se llenaba aunque revisada=false. El
-- semáforo y la actividad global lo interpretaban como una interacción y la
-- pintaban verde durante las primeras 24 horas.
--
-- Esta migración:
--   1. elimina el default incorrecto;
--   2. limpia last_reviewed_at de filas no revisadas;
--   3. limpia únicamente last_interacted_at que fue generado por ese default,
--      preservando interacciones reales;
--   4. redefine los helpers SQL para ignorar el timestamp si revisada=false.
--
-- Es autocontenida e idempotente. El trigger seguro se desactiva únicamente
-- dentro de la transacción y se vuelve a activar antes del COMMIT.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Limpiar datos derivados del default incorrecto
-- ------------------------------------------------------------
-- secure_quotes_row bloquea cambios a last_reviewed_at fuera de un actor
-- autorizado. La migración corre como propietario de Supabase, por lo que se
-- desactiva solo durante esta transacción.
DO $do$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_quotes_secure_row'
      AND tgrelid = 'public.quotes'::regclass
  ) THEN
    EXECUTE 'ALTER TABLE public.quotes DISABLE TRIGGER trg_quotes_secure_row';
  END IF;
END
$do$;

-- 24020000 hizo backfill de last_interacted_at usando last_reviewed_at. Si la
-- fila no está revisada y no existe otra evidencia de actividad, ese valor es
-- un falso positivo de review y se elimina. No se tocan interacciones reales.
UPDATE public.quotes q
SET last_interacted_at = NULL
WHERE COALESCE(q.revisada, false) = false
  AND q.last_reviewed_at IS NOT NULL
  AND q.last_interacted_at = q.last_reviewed_at
  AND NOT EXISTS (
    SELECT 1
    FROM public.quote_seguimiento s
    WHERE s.quote_id = q.id
      AND (
        s.updated_at IS NOT NULL
        OR s.fecha_cierre IS NOT NULL
        OR COALESCE(s.etapas, '{}'::jsonb) <> '{}'::jsonb
      )
  )
  AND NOT EXISTS (
    SELECT 1
    FROM public.notas n
    WHERE n.entidad_tipo = 'quote'
      AND n.entidad_id = q.id::text
  );

-- Toda fila no revisada debe tener last_reviewed_at NULL.
UPDATE public.quotes
SET last_reviewed_at = NULL
WHERE COALESCE(revisada, false) = false;

-- El trigger queda protegido nuevamente antes de cualquier COMMIT.
DO $do$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_quotes_secure_row'
      AND tgrelid = 'public.quotes'::regclass
      AND tgenabled = 'D'
  ) THEN
    EXECUTE 'ALTER TABLE public.quotes ENABLE TRIGGER trg_quotes_secure_row';
  END IF;
END
$do$;

-- El default now() era la causa de que una cotización nueva naciera "revisada".
ALTER TABLE public.quotes
  ALTER COLUMN last_reviewed_at DROP DEFAULT;

-- ------------------------------------------------------------
-- 2. Helper global de actividad (Dashboard/Rendimiento)
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
    CASE WHEN COALESCE(q.revisada, false) THEN q.last_reviewed_at ELSE NULL END,
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

REVOKE ALL ON FUNCTION public.quote_last_activity(bigint)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.quote_last_activity(bigint) TO service_role;

-- ------------------------------------------------------------
-- 3. Helper de retención (purga)
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
    CASE WHEN COALESCE(q.revisada, false) THEN q.last_reviewed_at ELSE NULL END,
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

COMMIT;
