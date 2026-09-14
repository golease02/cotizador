-- 2026-09-10 (anexo 09) — Eliminación del catálogo de vehículos
-- El CRUD de vehículos fue eliminado del frontend (admin-vehicles).
-- La tabla `vehicles` quedó huérfana: ningún RPC, FK ni cotización la referencia
-- (el ranking "topVehicles" de get_admin_stats se calcula sobre public.quotes),
-- por lo que se prescinde de ella por completo.
BEGIN;

-- Remueve policies, índices y triggers asociados que caen con la tabla (CASCADE).
DROP TABLE IF EXISTS public.vehicles CASCADE;

COMMIT;
