-- ============================================================
-- Guía automática en Supabase Storage (Ajuste 17, 26/09/2026)
-- ============================================================
-- El super admin (y los socios con permiso JSONB `guias`) cargan un único
-- PDF en el bucket privado `guias`. Los vendedores autenticados pueden
-- descargar una URL firmada, sin poder subir ni eliminar el documento.
--
-- Migración autocontenida e idempotente.
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Bucket privado
-- ------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('guias', 'guias', false)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------
-- 2. Helper de permiso administrativo (super admin o socio con `guias`)
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
-- 3. Políticas de storage.objects para el bucket `guias`
--    Solo se removes las políticas previas de ESTE bucket.
-- ------------------------------------------------------------
DO $policies$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname LIKE 'guias_%'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', r.policyname);
  END LOOP;
END;
$policies$;

-- Cualquier autenticado puede ver los metadatos (necesario para el listado),
-- pero la descarga real se hace con una URL firmada de corta duración.
CREATE POLICY guias_select_authenticated
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'guias');

-- Solo quien administra la guía puede subir o reemplazar el PDF.
CREATE POLICY guias_insert_admin
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'guias' AND public.has_guias_permission());

CREATE POLICY guias_update_admin
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'guias' AND public.has_guias_permission())
  WITH CHECK (bucket_id = 'guias' AND public.has_guias_permission());

CREATE POLICY guias_delete_admin
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'guias' AND public.has_guias_permission());

COMMENT ON FUNCTION public.has_guias_permission() IS
  'Indica si el usuario actual puede administrar la guía automática (super admin o socio con permiso guias).';

COMMIT;
