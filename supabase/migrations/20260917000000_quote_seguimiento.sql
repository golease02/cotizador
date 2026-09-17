-- ============================================================
-- Módulo de Seguimiento (pipeline de cierre)
-- Tabla 1:1 con public.quotes que guarda las etapas post-cotización:
--   EXP → ANÁLISIS → PAGO INI → OC → FACTURA → CONTRATO → GPS → PLACAS → CIERRE
-- Solo super_admin y socios pueden leer/escribir (los vendedores NO).
-- Migración idempotente (IF NOT EXISTS / CREATE OR REPLACE / DROP POLICY IF EXISTS).
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Tabla
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quote_seguimiento (
  quote_id      bigint PRIMARY KEY REFERENCES public.quotes(id) ON DELETE CASCADE,
  seller_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referenciado  text,
  financiera    text NOT NULL DEFAULT 'SIMPLE LEASE',
  activo_texto  text,
  -- Claves posibles: exp, analisis, pago_ini, oc, factura, contrato, gps, placas.
  -- El valor es el ISO timestamp en que se completó la etapa (ausente = pendiente).
  etapas        jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Se llena cuando el negocio se marca como "Cerrado" en el tablero.
  fecha_cierre  timestamptz,
  updated_by    uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seguimiento_seller ON public.quote_seguimiento(seller_id);
CREATE INDEX IF NOT EXISTS idx_seguimiento_cierre ON public.quote_seguimiento(fecha_cierre);

ALTER TABLE public.quote_seguimiento ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 2. Helpers SECURITY DEFINER (evitan recursión de RLS y no
--    dependen de helpers de migraciones previas).
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_seguimiento_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = 'super_admin'
      AND COALESCE(p.active, true) = true
  );
$$;

CREATE OR REPLACE FUNCTION public.can_access_seguimiento(p_quote_id bigint)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    public.is_seguimiento_admin()
    OR EXISTS (
      SELECT 1
      FROM public.quotes q
      JOIN public.profiles v ON v.id = q.seller_id
      JOIN public.profiles s ON s.id = auth.uid()
      WHERE q.id = p_quote_id
        AND v.socio_id = s.id
        AND s.role = 'socio'
        AND COALESCE(s.active, true) = true
    );
$$;

-- Trigger de updated_at
CREATE OR REPLACE FUNCTION public.touch_seguimiento_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_seguimiento_touch ON public.quote_seguimiento;
CREATE TRIGGER trg_seguimiento_touch
  BEFORE UPDATE ON public.quote_seguimiento
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_seguimiento_updated_at();

-- ------------------------------------------------------------
-- 3. Políticas RLS (super_admin y socios dueños del vendedor)
-- ------------------------------------------------------------
DROP POLICY IF EXISTS seguimiento_select ON public.quote_seguimiento;
CREATE POLICY seguimiento_select
  ON public.quote_seguimiento
  FOR SELECT
  TO authenticated
  USING (public.can_access_seguimiento(quote_id));

DROP POLICY IF EXISTS seguimiento_insert ON public.quote_seguimiento;
CREATE POLICY seguimiento_insert
  ON public.quote_seguimiento
  FOR INSERT
  TO authenticated
  WITH CHECK (public.can_access_seguimiento(quote_id));

DROP POLICY IF EXISTS seguimiento_update ON public.quote_seguimiento;
CREATE POLICY seguimiento_update
  ON public.quote_seguimiento
  FOR UPDATE
  TO authenticated
  USING (public.can_access_seguimiento(quote_id))
  WITH CHECK (public.can_access_seguimiento(quote_id));

-- Solo el super admin puede eliminar filas de seguimiento.
DROP POLICY IF EXISTS seguimiento_delete ON public.quote_seguimiento;
CREATE POLICY seguimiento_delete
  ON public.quote_seguimiento
  FOR DELETE
  TO authenticated
  USING (public.is_seguimiento_admin());

-- ------------------------------------------------------------
-- 4. Grants (nada expuesto a anon)
-- ------------------------------------------------------------
REVOKE ALL ON public.quote_seguimiento FROM PUBLIC, anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_seguimiento TO authenticated;
GRANT ALL ON public.quote_seguimiento TO service_role;

REVOKE ALL ON FUNCTION public.is_seguimiento_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.can_access_seguimiento(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_seguimiento_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.can_access_seguimiento(bigint) TO authenticated, service_role;

COMMIT;
