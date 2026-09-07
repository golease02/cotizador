-- Snapshot inmutable del desglose calculado de la cotización (QuoteCalculationResult)
-- Garantiza que admin-quotes, mis-cotizaciones y el PDF muestren SIEMPRE los mismos datos,
-- incluso si los parámetros del cotizador cambian después de guardar.

ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS calculation jsonb;

COMMENT ON COLUMN public.quotes.calculation IS 'Snapshot inmutable del desglose calculado (QuoteCalculationResult) al guardar la cotización. Se muestra tal cual en admin-quotes, mis-cotizaciones y el PDF; si es NULL se recalcula con los parámetros actuales (fallback para cotizaciones previas a la migración).';