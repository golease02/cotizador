-- Nuevo campo del cotizador: "Costo Anual" de seguro capturado por el vendedor.
-- Se guarda con IVA incluido (como el costo de placas) y el motor de cálculo
-- desglosa la parte neta en el desembolso inicial.
-- Autocontenida e idempotente. Hereda las políticas RLS de public.quotes.

BEGIN;

ALTER TABLE public.quotes
  ADD COLUMN IF NOT EXISTS annualinsurancecost numeric DEFAULT 0;

COMMENT ON COLUMN public.quotes.annualinsurancecost IS
  'Costo anual de seguro capturado en el cotizador (con IVA); 0 = sin costo anual';

COMMIT;
