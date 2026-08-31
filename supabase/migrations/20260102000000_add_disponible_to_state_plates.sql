-- ============================================================
-- Migración: Agregar columna 'disponible' a la tabla state_plates
-- true  = la placa se muestra en el formulario del cotizador
-- false = la placa NO aparece en el cotizador
-- ============================================================

alter table public.state_plates
  add column if not exists disponible boolean not null default true;