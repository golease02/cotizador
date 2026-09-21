-- Renombra la placa por defecto del cotizador:
--   "Pendiente (Sin placa)"  ->  "Alta de placas pendientes x cotizar"
-- Autocontenida e idempotente: solo actualiza si el nombre difiere.

BEGIN;

UPDATE public.state_plates
SET name = 'Alta de placas pendientes x cotizar'
WHERE id = 'pendiente'
  AND name IS DISTINCT FROM 'Alta de placas pendientes x cotizar';

COMMIT;
