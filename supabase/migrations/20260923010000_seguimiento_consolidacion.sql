/* ============================================================
   MIGRACIÓN 17 — Seguimiento de cotizaciones a Seguimiento
   ============================================================
   La vista `admin-quotes` (ruta `/admin/quotes`) fue eliminada y
   reemplazada por `/admin/seguimiento`. Esta migración registra
   el cambio de esquema: la tabla `quote_seguimiento` ya existe
   (ver 20260917000000_quote_seguimiento.sql) y se consolida la
   lógica de permisos. No altera datos existentes.
   ============================================================ */

begin;

-- La tabla ya existe; esta migración es idempotente / de consolidación.
-- No se agregan columnas nuevas porque la tabla quote_seguimiento ya
-- cubre todas las necesidades del módulo de seguimiento.

-- Garantizar que la política RLS para el nuevo permiso `seguimiento`
-- esté consolidada (la tabla ya la posee desde la migración original).
-- Aquí solo verificamos que existan los índices de rendimiento.

create index if not exists quote_seguimiento_quote_id_idx
  on public.quote_seguimiento (quote_id);

create index if not exists quote_seguimiento_fecha_cierre_idx
  on public.quote_seguimiento (fecha_cierre)
  where fecha_cierre is not null;

commit;
