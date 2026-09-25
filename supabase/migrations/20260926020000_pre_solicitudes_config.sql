-- ============================================================
-- Pre Solicitudes: configuración por variante (Ajuste 17, 26/09/2026)
-- ============================================================
-- Una fila por tipo ('fisica' | 'moral') con el modo de contenido que el
-- administrador elige: 'pdf' (archivo en el bucket `guias`), 'contenido'
-- (texto editable en la app) o 'url' (enlace externo). Los vendedores solo
-- leen; escribir exige super admin o el permiso JSONB `guias`.
--
-- Migración autocontenida e idempotente.
-- ============================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.pre_solicitudes (
  id smallint PRIMARY KEY,
  tipo text NOT NULL UNIQUE CHECK (tipo IN ('fisica', 'moral')),
  modo text NOT NULL DEFAULT 'contenido' CHECK (modo IN ('pdf', 'contenido', 'url')),
  titulo text NOT NULL DEFAULT '',
  descripcion text NOT NULL DEFAULT '',
  contenido text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  actualizado_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.pre_solicitudes IS
  'Configuración de la Pre Solicitud (Física/Moral) definida por el administrador.';

-- Valores iniciales: por defecto cada variante muestra su propio texto.
INSERT INTO public.pre_solicitudes (id, tipo, modo, titulo, descripcion)
VALUES
  (1, 'fisica', 'contenido', 'Pre Solicitud Persona Física',
   'Formulario de pre solicitud para personas físicas.'),
  (2, 'moral', 'contenido', 'Pre Solicitud Persona Moral',
   'Formulario de pre solicitud para personas morales.')
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
ALTER TABLE public.pre_solicitudes ENABLE ROW LEVEL SECURITY;

-- El helper `has_guias_permission()` lo crea 20260926010000_guia_storage.sql.
-- Se recrea aquí para que esta migración sea autocontenida.
CREATE OR REPLACE FUNCTION public.has_guias_permission()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND COALESCE(p.active, true) = true
      AND (
        p.role = 'super_admin'
        OR (
          p.role = 'socio'
          AND COALESCE(p.permisos ->> 'guias', 'false') = 'true'
        )
      )
  );
$fn$;

REVOKE ALL ON FUNCTION public.has_guias_permission() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_guias_permission() TO authenticated, service_role;

-- Lectura: cualquier usuario autenticado (los vendedores necesitan verlas).
-- Escritura: solo quien administra la guía.
DROP POLICY IF EXISTS pre_solicitudes_select_authenticated ON public.pre_solicitudes;
CREATE POLICY pre_solicitudes_select_authenticated
  ON public.pre_solicitudes
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS pre_solicitudes_insert_admin ON public.pre_solicitudes;
CREATE POLICY pre_solicitudes_insert_admin
  ON public.pre_solicitudes
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_guias_permission());

DROP POLICY IF EXISTS pre_solicitudes_update_admin ON public.pre_solicitudes;
CREATE POLICY pre_solicitudes_update_admin
  ON public.pre_solicitudes
  FOR UPDATE
  TO authenticated
  USING (public.has_guias_permission())
  WITH CHECK (public.has_guias_permission());

DROP POLICY IF EXISTS pre_solicitudes_delete_admin ON public.pre_solicitudes;
CREATE POLICY pre_solicitudes_delete_admin
  ON public.pre_solicitudes
  FOR DELETE
  TO authenticated
  USING (public.has_guias_permission());

REVOKE ALL ON TABLE public.pre_solicitudes FROM anon;
GRANT SELECT ON public.pre_solicitudes TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pre_solicitudes TO authenticated, service_role;

COMMIT;
