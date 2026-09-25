-- ============================================================
-- Autoría y propiedad de notas (Ajuste 16, 25/09/2026)
-- ============================================================
-- Objetivo:
--   1. Cada nota expone el nombre real de quien la escribió.
--   2. Solo el autor puede editar o borrar su nota (incluido super_admin).
--   3. Los tres módulos (Mis Cotizaciones, Seguimiento y Vendedores) usan
--      las mismas RPCs y el mismo alcance.
--
-- La migración es autocontenida: recrea los helpers y las políticas que
-- necesita public.notas, sin depender de los archivos históricos del repo.
-- ============================================================

BEGIN;

ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 1. Alcance de lectura/escritura
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.can_access_entity_notes(
  p_entidad_tipo text,
  p_entidad_id text
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_usuario record;
  v_permitido boolean := false;
BEGIN
  IF auth.uid() IS NULL
     OR p_entidad_tipo IS NULL
     OR p_entidad_id IS NULL
     OR p_entidad_id = '' THEN
    RETURN false;
  END IF;

  SELECT id, role, activo, es_socio, es_super_admin, permiso_notas
  INTO v_usuario
  FROM (
    SELECT
      p.id,
      p.role,
      COALESCE(p.active, true) AS activo,
      (p.role = 'socio') AS es_socio,
      (p.role = 'super_admin') AS es_super_admin,
      COALESCE(p.permisos ->> 'notas', 'false') = 'true' AS permiso_notas
    FROM public.profiles p
    WHERE p.id = auth.uid()
  ) usuario;

  IF NOT FOUND OR NOT COALESCE(v_usuario.activo, false) THEN
    RETURN false;
  END IF;

  -- Super admin: acceso total.
  IF v_usuario.es_super_admin THEN
    RETURN true;
  END IF;

  -- Vendedor: únicamente notas de sus propias cotizaciones.
  IF v_usuario.role = 'seller' AND p_entidad_tipo = 'quote' THEN
    IF p_entidad_id !~ '^[1-9][0-9]*$'
       OR p_entidad_id::numeric > 9223372036854775807 THEN
      RETURN false;
    END IF;

    SELECT EXISTS (
      SELECT 1
      FROM public.quotes q
      WHERE q.id = p_entidad_id::bigint
        AND q.seller_id = auth.uid()
    ) INTO v_permitido;

    RETURN v_permitido;
  END IF;

  -- Socio: requiere permiso granular `notas` y la nota debe pertenecer a su red.
  IF v_usuario.es_socio AND COALESCE(v_usuario.permiso_notas, false) THEN
    IF p_entidad_tipo = 'quote'
       AND p_entidad_id ~ '^[1-9][0-9]*$'
       AND p_entidad_id::numeric <= 9223372036854775807 THEN
      SELECT EXISTS (
        SELECT 1
        FROM public.quotes q
        LEFT JOIN public.profiles vendedor ON vendedor.id = q.seller_id
        WHERE q.id = p_entidad_id::bigint
          AND (
            q.seller_id = auth.uid()
            OR vendedor.socio_id = auth.uid()
          )
      ) INTO v_permitido;
    ELSIF p_entidad_tipo = 'seller'
      AND p_entidad_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
      SELECT EXISTS (
        SELECT 1
        FROM public.profiles vendedor
        WHERE vendedor.id = p_entidad_id::uuid
          AND vendedor.socio_id = auth.uid()
      ) INTO v_permitido;
    END IF;
  END IF;

  RETURN v_permitido;
END;
$fn$;

-- ------------------------------------------------------------
-- 2. Lectura de notas con autor resuelto
-- ------------------------------------------------------------
-- public.notas.id es uuid: si una versión anterior de esta función declaró
-- bigint, es necesario eliminarla antes de recrear el tipo de retorno.
DROP FUNCTION IF EXISTS public.get_entity_notes(text, text);

CREATE OR REPLACE FUNCTION public.get_entity_notes(
  p_entidad_tipo text,
  p_entidad_id text
)
RETURNS TABLE (
  id uuid,
  entidad_tipo text,
  entidad_id text,
  texto text,
  creado_por uuid,
  created_at timestamptz,
  autor_nombre text,
  autor_rol text,
  es_propia boolean
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
BEGIN
  IF NOT public.can_access_entity_notes(p_entidad_tipo, p_entidad_id) THEN
    RAISE EXCEPTION 'No tienes permiso para consultar estas notas'
      USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT
    n.id,
    n.entidad_tipo,
    n.entidad_id,
    n.texto,
    n.creado_por,
    n.created_at,
    COALESCE(NULLIF(BTRIM(autor.full_name), ''), 'Autor no disponible') AS autor_nombre,
    autor.role AS autor_rol,
    (n.creado_por = auth.uid()) AS es_propia
  FROM public.notas n
  LEFT JOIN public.profiles autor ON autor.id = n.creado_por
  WHERE n.entidad_tipo = p_entidad_tipo
    AND n.entidad_id = p_entidad_id
  ORDER BY n.created_at DESC, n.id DESC;
END;
$fn$;

-- ------------------------------------------------------------
-- 3. Crear nota: el servidor fija autor y fecha
-- ------------------------------------------------------------
-- public.notas.id es uuid: DROP previo si existía una versión con bigint.
DROP FUNCTION IF EXISTS public.create_entity_note(text, text, text);

CREATE OR REPLACE FUNCTION public.create_entity_note(
  p_entidad_tipo text,
  p_entidad_id text,
  p_texto text
)
RETURNS uuid
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_note_id uuid;
BEGIN
  IF NOT public.can_access_entity_notes(p_entidad_tipo, p_entidad_id) THEN
    RAISE EXCEPTION 'No tienes permiso para agregar una nota a esta entidad'
      USING ERRCODE = '42501';
  END IF;

  IF p_texto IS NULL OR BTRIM(p_texto) = '' THEN
    RAISE EXCEPTION 'La nota no puede estar vacía'
      USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.notas (
    entidad_tipo,
    entidad_id,
    texto,
    creado_por,
    created_at
  )
  VALUES (
    p_entidad_tipo,
    p_entidad_id,
    BTRIM(p_texto),
    auth.uid(),
    now()
  )
  RETURNING id INTO v_note_id;

  RETURN v_note_id;
END;
$fn$;

-- ------------------------------------------------------------
-- 4. Editar/eliminar: únicamente el autor
-- ------------------------------------------------------------
-- public.notas.id es uuid: DROP previo si existía una versión con bigint.
DROP FUNCTION IF EXISTS public.update_own_entity_note(bigint, text);
DROP FUNCTION IF EXISTS public.update_own_entity_note(uuid, text);

CREATE OR REPLACE FUNCTION public.update_own_entity_note(
  p_note_id uuid,
  p_texto text
)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $fn$
BEGIN
  IF p_texto IS NULL OR BTRIM(p_texto) = '' THEN
    RAISE EXCEPTION 'La nota no puede estar vacía'
      USING ERRCODE = '22023';
  END IF;

  UPDATE public.notas n
  SET texto = BTRIM(p_texto)
  WHERE n.id = p_note_id
    AND n.creado_por = auth.uid()
    AND public.can_access_entity_notes(n.entidad_tipo, n.entidad_id);

  IF NOT FOUND THEN
    RAISE EXCEPTION 'La nota no existe o no fue creada por este usuario'
      USING ERRCODE = '42501';
  END IF;

  RETURN;
END;
$fn$;

-- public.notas.id es uuid: DROP previo si existía una versión con bigint.
DROP FUNCTION IF EXISTS public.delete_own_entity_note(bigint);
DROP FUNCTION IF EXISTS public.delete_own_entity_note(uuid);

CREATE OR REPLACE FUNCTION public.delete_own_entity_note(
  p_note_id uuid
)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $fn$
BEGIN
  DELETE FROM public.notas n
  WHERE n.id = p_note_id
    AND n.creado_por = auth.uid()
    AND public.can_access_entity_notes(n.entidad_tipo, n.entidad_id);

  IF NOT FOUND THEN
    RAISE EXCEPTION 'La nota no existe o no fue creada por este usuario'
      USING ERRCODE = '42501';
  END IF;

  RETURN;
END;
$fn$;

-- ------------------------------------------------------------
-- 5. Limpieza operativa al eliminar la entidad padre
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.delete_notes_for_quote(p_quote_id bigint)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $fn$
DECLARE
  v_permitido boolean := false;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.quotes q
    LEFT JOIN public.profiles vendedor ON vendedor.id = q.seller_id
    JOIN public.profiles usuario ON usuario.id = auth.uid()
    WHERE q.id = p_quote_id
      AND COALESCE(usuario.active, true) = true
      AND (
        usuario.role = 'super_admin'
        OR (
          usuario.role = 'socio'
          AND COALESCE(usuario.permisos ->> 'seguimiento', 'false') = 'true'
          AND (
            q.seller_id = auth.uid()
            OR vendedor.socio_id = auth.uid()
          )
        )
      )
  ) INTO v_permitido;

  IF NOT v_permitido THEN
    RAISE EXCEPTION 'No tienes permiso para eliminar esta cotización'
      USING ERRCODE = '42501';
  END IF;

  DELETE FROM public.notas
  WHERE entidad_tipo = 'quote'
    AND entidad_id = p_quote_id::text;

  RETURN;
END;
$fn$;

-- ------------------------------------------------------------
-- 6. Conteo de notas de las cotizaciones propias del vendedor
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_seller_quote_note_counts()
RETURNS TABLE (
  quote_id bigint,
  notas_count bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $fn$
  SELECT q.id, count(n.id)::bigint
  FROM public.quotes q
  LEFT JOIN public.notas n
    ON n.entidad_tipo = 'quote'
   AND n.entidad_id = q.id::text
  WHERE q.seller_id = auth.uid()
  GROUP BY q.id
  ORDER BY q.id;
$fn$;

-- ------------------------------------------------------------
-- 7. Políticas RLS canónicas
--    Se eliminan todas las políticas previas de public.notas para evitar que
--    una política antigua permita editar/borrar notas de otro autor.
-- ------------------------------------------------------------
DO $policies$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'notas'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.notas', r.policyname);
  END LOOP;
END;
$policies$;

CREATE POLICY notas_select_scope
  ON public.notas
  FOR SELECT
  TO authenticated
  USING (public.can_access_entity_notes(entidad_tipo, entidad_id));

CREATE POLICY notas_insert_own
  ON public.notas
  FOR INSERT
  TO authenticated
  WITH CHECK (
    creado_por = auth.uid()
    AND (
      public.can_access_entity_notes(entidad_tipo, entidad_id)
      OR (
        entidad_tipo = 'seller'
        AND entidad_id = auth.uid()::text
      )
    )
  );

CREATE POLICY notas_update_own
  ON public.notas
  FOR UPDATE
  TO authenticated
  USING (
    creado_por = auth.uid()
    AND public.can_access_entity_notes(entidad_tipo, entidad_id)
  )
  WITH CHECK (
    creado_por = auth.uid()
    AND public.can_access_entity_notes(entidad_tipo, entidad_id)
  );

CREATE POLICY notas_delete_own
  ON public.notas
  FOR DELETE
  TO authenticated
  USING (
    creado_por = auth.uid()
    AND public.can_access_entity_notes(entidad_tipo, entidad_id)
  );

-- ------------------------------------------------------------
-- 8. Grants y comentarios
-- ------------------------------------------------------------
COMMENT ON FUNCTION public.can_access_entity_notes(text, text) IS
  'Indica si el usuario actual puede leer y crear notas de la entidad indicada.';

COMMENT ON FUNCTION public.get_entity_notes(text, text) IS
  'Lista las notas de una entidad con el nombre y rol de su autor.';

COMMENT ON FUNCTION public.create_entity_note(text, text, text) IS
  'Crea una nota con autor y fecha fijados por el servidor.';

COMMENT ON FUNCTION public.update_own_entity_note(uuid, text) IS
  'Actualiza únicamente una nota creada por el usuario conectado.';

COMMENT ON FUNCTION public.delete_own_entity_note(uuid) IS
  'Elimina únicamente una nota creada por el usuario conectado.';

COMMENT ON FUNCTION public.delete_notes_for_quote(bigint) IS
  'Limpia operativamente las notas al eliminar una cotización autorizada.';

REVOKE ALL ON FUNCTION public.can_access_entity_notes(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_access_entity_notes(text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.get_entity_notes(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_entity_notes(text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.create_entity_note(text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_entity_note(text, text, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.update_own_entity_note(uuid, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.update_own_entity_note(uuid, text) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.delete_own_entity_note(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_own_entity_note(uuid) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.delete_notes_for_quote(bigint) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.delete_notes_for_quote(bigint) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.get_seller_quote_note_counts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_seller_quote_note_counts() TO authenticated, service_role;

COMMIT;
