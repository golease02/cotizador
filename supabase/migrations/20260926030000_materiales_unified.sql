-- ============================================================
-- Unificación de materiales en una sola tabla (Ajuste 17, 26/09/2026)
-- ============================================================
-- Reemplaza `pre_solicitudes` por `materiales`, que administra los tres
-- materiales que ve el vendedor con una sola pantalla:
--   - 'guia'         → Guía Autométrica
--   - 'pre_fisica'   → Pre Solicitud Persona Física
--   - 'pre_moral'    → Pre Solicitud Persona Moral
--
-- Cada material admite los mismos tres modos: 'pdf', 'contenido' o 'url'.
-- Los PDFs continúan en el bucket privado `guias` y conservan sus rutas
-- actuales, por lo que no se pierde ningún archivo ya subido.
--
-- Migración autocontenida e idempotente.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Helper de permiso (mismo criterio que la guía)
-- ------------------------------------------------------------
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

-- ------------------------------------------------------------
-- 2. Tabla única de materiales
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.materiales (
  clave text PRIMARY KEY
    CHECK (clave IN ('guia', 'pre_fisica', 'pre_moral')),
  modo text NOT NULL DEFAULT 'contenido'
    CHECK (modo IN ('pdf', 'contenido', 'url')),
  titulo text NOT NULL DEFAULT '',
  descripcion text NOT NULL DEFAULT '',
  contenido text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  actualizado_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.materiales IS
  'Configuración de los materiales del vendedor: guía automática y pre solicitudes (Física/Moral).';

-- ------------------------------------------------------------
-- 3. Semilla y migración de datos desde `pre_solicitudes`
-- ------------------------------------------------------------
INSERT INTO public.materiales (clave, modo, titulo, descripcion)
VALUES
  ('guia', 'pdf', 'Guía Autométrica', 'Documento de guía automática.'),
  ('pre_fisica', 'contenido', 'Pre Solicitud Persona Física',
   'Formulario de pre solicitud para personas físicas.'),
  ('pre_moral', 'contenido', 'Pre Solicitud Persona Moral',
   'Formulario de pre solicitud para personas morales.')
ON CONFLICT (clave) DO NOTHING;

-- Traslada la configuración ya guardada por el administrador.
DO $migrate$
BEGIN
  IF to_regclass('public.pre_solicitudes') IS NOT NULL THEN
    UPDATE public.materiales m
    SET modo      = COALESCE(p.modo, m.modo),
        titulo    = COALESCE(NULLIF(p.titulo, ''), m.titulo),
        descripcion = COALESCE(p.descripcion, m.descripcion),
        contenido = COALESCE(p.contenido, m.contenido),
        url       = COALESCE(p.url, m.url),
        actualizado_at = COALESCE(p.actualizado_at, m.actualizado_at)
    FROM public.pre_solicitudes p
    WHERE p.tipo = 'fisica' AND m.clave = 'pre_fisica';

    UPDATE public.materiales m
    SET modo      = COALESCE(p.modo, m.modo),
        titulo    = COALESCE(NULLIF(p.titulo, ''), m.titulo),
        descripcion = COALESCE(p.descripcion, m.descripcion),
        contenido = COALESCE(p.contenido, m.contenido),
        url       = COALESCE(p.url, m.url),
        actualizado_at = COALESCE(p.actualizado_at, m.actualizado_at)
    FROM public.pre_solicitudes p
    WHERE p.tipo = 'moral' AND m.clave = 'pre_moral';
  END IF;
END;
$migrate$;

-- ------------------------------------------------------------
-- 4. RLS
-- ------------------------------------------------------------
ALTER TABLE public.materiales ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS materiales_select_authenticated ON public.materiales;
CREATE POLICY materiales_select_authenticated
  ON public.materiales
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS materiales_insert_admin ON public.materiales;
CREATE POLICY materiales_insert_admin
  ON public.materiales
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_guias_permission());

DROP POLICY IF EXISTS materiales_update_admin ON public.materiales;
CREATE POLICY materiales_update_admin
  ON public.materiales
  FOR UPDATE
  TO authenticated
  USING (public.has_guias_permission())
  WITH CHECK (public.has_guias_permission());

DROP POLICY IF EXISTS materiales_delete_admin ON public.materiales;
CREATE POLICY materiales_delete_admin
  ON public.materiales
  FOR DELETE
  TO authenticated
  USING (public.has_guias_permission());

REVOKE ALL ON TABLE public.materiales FROM anon;
GRANT SELECT ON public.materiales TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.materiales TO authenticated, service_role;

-- ------------------------------------------------------------
-- 5. Retira la tabla anterior (sus datos ya están en `materiales`)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS public.pre_solicitudes;

COMMENT ON FUNCTION public.has_guias_permission() IS
  'Indica si el usuario actual puede administrar los materiales (super admin o socio con permiso guias).';

COMMIT;
