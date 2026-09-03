-- ================================================================
-- SECURITY: HARDENING RLS — Cotizador (bcsvqvibccfnsmagwkbr)
-- Fecha: 2026-03-09
-- Objetivo: eliminar las exposiciones auditadas y mantener funcionalidad.
--  1) Helper public.is_admin() (SECURITY DEFINER) para evitar recursión.
--  2) Habilitar RLS en todas las tablas.
--  3) Reemplazar políticas (solo filas permitidas) por rol.
--  4) Revocar grants excesivos (TRUNCATE/ALTER/etc; anon hace solo SELECT catálogo).
--  5) Endurecer RPCs SECURITY DEFINER (delete_user, get_profile_by_seller,
--     request_password_recovery) y eliminar update_user_email (no usado).
--  6) Triggers de defensa en profundidad en profiles y quotes.
-- Idempotente: seguro de volver a ejecutar.
-- ================================================================

-- ================================================================
-- 1) HELPER is_admin() — evita recursión de RLS sobre profiles
-- ================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
      AND COALESCE(active, true) = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;
-- ================================================================
-- 2) REVOCAR GRANTS EXCESIVOS
-- ================================================================
-- anon: eliminar TODO; solo se le re-garantiza SELECT de catálogos.
REVOKE ALL PRIVILEGES ON TABLE public.profiles FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.quotes FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.notas FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.calculator_settings FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.state_plates FROM anon;
REVOKE ALL PRIVILEGES ON TABLE public.vehicles FROM anon;

GRANT SELECT ON TABLE public.state_plates TO anon;
GRANT SELECT ON TABLE public.vehicles TO anon;

-- authenticated: quitar privilegios de tabla que no se necesitan y que
-- ignoran RLS (TRUNCATE, ALTER, REFERENCES, TRIGGER). Se conservan
-- SELECT/INSERT/UPDATE/DELETE gobernados por las políticas de fila.
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.profiles FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.quotes FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.notas FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.calculator_settings FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.state_plates FROM authenticated;
REVOKE TRUNCATE, REFERENCES, TRIGGER ON TABLE public.vehicles FROM authenticated;

-- ================================================================
-- 3) HABILITAR ROW LEVEL SECURITY (todas las tablas)
-- ================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_plates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_settings ENABLE ROW LEVEL SECURITY;
-- ================================================================
-- 4) POLÍTICAS NUEVAS (reemplazan a las anteriores)
-- ================================================================

-- ---------------- PROFILES ----------------
DROP POLICY IF EXISTS "profiles_select_own_or_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own_or_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_admin_only" ON public.profiles;

-- SELECT: solo el usuario (su propia fila) o un admin activo.
CREATE POLICY "profiles_select_own_or_admin_v2" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_admin());

-- INSERT: solo la fila propia; el trigger sanea role/active.
-- Un admin (p.ej. vía RPC create_user) también puede insertar fila propia.
CREATE POLICY "profiles_insert_own_v2" ON public.profiles
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin() OR id = auth.uid());

CREATE POLICY "profiles_update_own_or_admin_v2" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_admin())
  WITH CHECK (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_delete_admin_only_v2" ON public.profiles
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ---------------- QUOTES ----------------
-- ---------------- QUOTES ----------------
DROP POLICY IF EXISTS "quotes_select_own_or_admin" ON public.quotes;
DROP POLICY IF EXISTS "quotes_insert_own" ON public.quotes;
DROP POLICY IF EXISTS "quotes_update_own_or_admin" ON public.quotes;
DROP POLICY IF EXISTS "quotes_delete_admin_only" ON public.quotes;

CREATE POLICY "quotes_select_own_or_admin_v2" ON public.quotes
  FOR SELECT TO authenticated
  USING (seller_id = auth.uid() OR public.is_admin());

CREATE POLICY "quotes_insert_own_v2" ON public.quotes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin() OR seller_id = auth.uid());

CREATE POLICY "quotes_update_own_or_admin_v2" ON public.quotes
  FOR UPDATE TO authenticated
  USING (public.is_admin() OR seller_id = auth.uid())
  WITH CHECK (public.is_admin() OR seller_id = auth.uid());

CREATE POLICY "quotes_delete_admin_only_v2" ON public.quotes
  FOR DELETE TO authenticated
  USING (public.is_admin());
-- ---------------- VEHICLES ----------------
DROP POLICY IF EXISTS "Todos pueden ver vehículos" ON public.vehicles;
DROP POLICY IF EXISTS "vehicles_select_public" ON public.vehicles;
DROP POLICY IF EXISTS "Admins pueden insertar vehículos" ON public.vehicles;
DROP POLICY IF EXISTS "vehicles_insert_admin_only" ON public.vehicles;
DROP POLICY IF EXISTS "Admins pueden actualizar vehículos" ON public.vehicles;
DROP POLICY IF EXISTS "vehicles_update_admin_only" ON public.vehicles;
DROP POLICY IF EXISTS "vehicles_delete_admin_only" ON public.vehicles;

CREATE POLICY "vehicles_select_v2" ON public.vehicles
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "vehicles_insert_admin_v2" ON public.vehicles
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "vehicles_update_admin_v2" ON public.vehicles
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "vehicles_delete_admin_v2" ON public.vehicles
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ---------------- STATE_PLATES ----------------
DROP POLICY IF EXISTS "state_plates_select_public" ON public.state_plates;
DROP POLICY IF EXISTS "state_plates_insert_admin_only" ON public.state_plates;
DROP POLICY IF EXISTS "state_plates_update_admin_only" ON public.state_plates;
DROP POLICY IF EXISTS "state_plates_delete_admin_only" ON public.state_plates;

CREATE POLICY "state_plates_select_v2" ON public.state_plates
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "state_plates_insert_admin_v2" ON public.state_plates
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "state_plates_update_admin_v2" ON public.state_plates
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "state_plates_delete_admin_v2" ON public.state_plates
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ---------------- NOTAS ----------------
DROP POLICY IF EXISTS "Usuarios autenticados pueden leer notas" ON public.notas;
DROP POLICY IF EXISTS "Usuarios autenticados pueden insertar notas" ON public.notas;
DROP POLICY IF EXISTS "Usuarios autenticados pueden actualizar notas" ON public.notas;
DROP POLICY IF EXISTS "Usuarios autenticados pueden eliminar notas" ON public.notas;

CREATE POLICY "notas_select_creator_or_admin_v2" ON public.notas
  FOR SELECT TO authenticated
  USING (creado_por = auth.uid() OR public.is_admin());

CREATE POLICY "notas_insert_v2" ON public.notas
  FOR INSERT TO authenticated
  WITH CHECK (creado_por = auth.uid());

CREATE POLICY "notas_update_creator_or_admin_v2" ON public.notas
  FOR UPDATE TO authenticated
  USING (creado_por = auth.uid() OR public.is_admin())
  WITH CHECK (creado_por = auth.uid() OR public.is_admin());

CREATE POLICY "notas_delete_creator_or_admin_v2" ON public.notas
  FOR DELETE TO authenticated
  USING (creado_por = auth.uid() OR public.is_admin());

-- ---------------- CALCULATOR_SETTINGS ----------------
DROP POLICY IF EXISTS "Authenticated users can read calculator settings" ON public.calculator_settings;
DROP POLICY IF EXISTS "Admins can update calculator settings" ON public.calculator_settings;

CREATE POLICY "calculator_settings_select_authenticated_v2" ON public.calculator_settings
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "calculator_settings_insert_admin_v2" ON public.calculator_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "calculator_settings_update_admin_v2" ON public.calculator_settings
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "calculator_settings_delete_admin_v2" ON public.calculator_settings
  FOR DELETE TO authenticated
  USING (public.is_admin());

-- ================================================================
-- 5) TRIGGERS DE DEFENSA EN PROFUNDIDAD
-- ================================================================

-- 5.1 PROFILES: impedir auto-promoción (role) / auto-activación /
--      cambio de id. El admin (is_admin) queda exento.
CREATE OR REPLACE FUNCTION public.secure_profiles_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW.id IS DISTINCT FROM auth.uid() THEN
      RAISE EXCEPTION 'Solo puedes crear tu propio perfil';
    END IF;
    NEW.role   := 'seller';
    NEW.active := true;
    RETURN NEW;
  END IF;

  -- UPDATE
  IF NEW.id IS DISTINCT FROM OLD.id THEN
    RAISE EXCEPTION 'No puedes cambiar el id de tu perfil';
  END IF;
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    RAISE EXCEPTION 'No puedes cambiar tu rol';
  END IF;
  IF NEW.active IS DISTINCT FROM OLD.active THEN
    RAISE EXCEPTION 'No puedes cambiar tu estado de cuenta';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_secure_row ON public.profiles;
CREATE TRIGGER trg_profiles_secure_row
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.secure_profiles_row();

-- 5.2 QUOTES: un vendedor solo puede tocar sus datos; NUNCA puede cambiar
--      columnas de gestión (revisada, fijada, color, status_color,
--      last_reviewed_at, seller_id). Admin queda exento.
CREATE OR REPLACE FUNCTION public.secure_quotes_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.seller_id        := auth.uid();
    NEW.revisada         := false;
    NEW.color            := 'reciente';
    NEW.fijada           := false;
    NEW.status_color     := NULL;
    NEW.last_reviewed_at := NULL;
    RETURN NEW;
  END IF;

  -- UPDATE
  IF NEW.seller_id IS DISTINCT FROM OLD.seller_id THEN
    RAISE EXCEPTION 'No puedes transferir la cotización a otro vendedor';
  END IF;
  IF NEW.revisada IS DISTINCT FROM OLD.revisada THEN
    RAISE EXCEPTION 'No puedes cambiar el estado de revisión';
  END IF;
  IF NEW.fijada IS DISTINCT FROM OLD.fijada THEN
    RAISE EXCEPTION 'No puedes fijar/desfijar la cotización';
  END IF;
  NEW.color            := OLD.color;
  NEW.status_color     := OLD.status_color;
  NEW.last_reviewed_at := OLD.last_reviewed_at;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_quotes_secure_row ON public.quotes;
CREATE TRIGGER trg_quotes_secure_row
  BEFORE INSERT OR UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION public.secure_quotes_row();

-- ================================================================
-- 6) ENDURECIMIENTO DE RPCs SECURITY DEFINER
-- ================================================================

-- 6.1 delete_user: AGREGAR validación de admin y prohibir auto-borrado.
--      (La versión actual es SECURITY DEFINER, sin checks y con EXECUTE
--       público → cualquiera podía borrar usuarios). Reescribimos y
--      restringimos el grant a authenticated y service_role.
CREATE OR REPLACE FUNCTION public.delete_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'No autorizado: solo un administrador activo puede eliminar usuarios.';
  END IF;

  IF auth.uid() = user_id THEN
    RAISE EXCEPTION 'No puedes eliminar tu propia cuenta.';
  END IF;

  DELETE FROM public.quotes   WHERE seller_id = user_id;
  DELETE FROM public.notas    WHERE entidad_tipo = 'seller' AND entidad_id = user_id::text;
  DELETE FROM public.profiles WHERE id = user_id;
  DELETE FROM auth.users      WHERE id = user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_user(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_user(uuid) FROM anon;
GRANT  EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated, service_role;

-- Revocar EXECUTE de funciones trigger (solo el motor debe invocarlas)
REVOKE ALL ON FUNCTION public.secure_profiles_row() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.secure_quotes_row() FROM PUBLIC, anon;

-- 6.2 get_profile_by_seller: limitar columnas expuestas.
--      Se devuelve SOLO lo necesario para el login (NO recovery_email,
--      phone, lat/long, agency fields). Mantiene EXECUTE a anon porque
--      se usa en el flujo público de login por número.
-- Nota: la firma original devolvía SETOF profiles; aquí se cambia el
-- esquema de columnas, por lo que se usa DROP + CREATE (no CREATE OR REPLACE).
DROP FUNCTION IF EXISTS public.get_profile_by_seller(text) CASCADE;

CREATE FUNCTION public.get_profile_by_seller(seller_number_input text)
RETURNS TABLE (
  id             uuid,
  email          text,
  full_name      text,
  seller_number  text,
  active         boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT p.id, p.email, p.full_name, p.seller_number, p.active
  FROM public.profiles p
  WHERE p.seller_number = btrim(seller_number_input)
    AND p.active IS NOT FALSE
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_profile_by_seller(text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.get_profile_by_seller(text) TO anon, authenticated, service_role;

-- 6.3 request_password_recovery: endurecer para evitar account-takeover.
--      Si recovery_email no está enrolado, se exige que coincida con el
--      email de autenticación (profiles.email espejo) → impide que un
--      atacante que solo conozca el número enrole un corridor arbitrario.
CREATE OR REPLACE FUNCTION public.request_password_recovery(
  seller_number_input  text,
  recovery_email_input text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_seller_number  text := btrim(coalesce(seller_number_input, ''));
  v_recovery_email text := lower(btrim(coalesce(recovery_email_input, '')));
  v_email          text;
  v_user_id        uuid;
  v_current        text;
BEGIN
  -- Validaciones de formato
  IF v_seller_number !~ '^[0-9]{10}$' THEN
    RETURN false;
  END IF;
  IF length(v_recovery_email) > 160
     OR v_recovery_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN false;
  END IF;

  SELECT id, email, recovery_email
    INTO v_user_id, v_email, v_current
  FROM public.profiles
  WHERE seller_number = v_seller_number
    AND active IS NOT FALSE
  LIMIT 1;

  -- No revelar si el número existe
  IF v_user_id IS NULL THEN
    RETURN false;
  END IF;

  -- El perfil requiere email espejo para resolver el login
  IF v_email IS NULL OR btrim(v_email) = '' THEN
    RETURN false;
  END IF;

  -- Enrolamiento inicial: exigir que coincida con el email de autenticación
  -- (bloquea registro de un correo arbitrario → account takeover).
  IF v_current IS NULL OR btrim(v_current) = '' THEN
    IF v_recovery_email <> lower(btrim(v_email)) THEN
      RETURN false;
    END IF;
  ELSE
    -- Re-enrolamiento: sólo aceptar coincidencia exacta.
    IF lower(btrim(v_current)) <> v_recovery_email THEN
      RETURN false;
    END IF;
  END IF;

  -- Persistir correo personal y enviar enlace de reset al mismo buzón.
  UPDATE public.profiles
     SET recovery_email = v_recovery_email
   WHERE id = v_user_id;

  UPDATE auth.users
     SET email      = v_recovery_email,
         updated_at = now()
   WHERE id = v_user_id
     AND (auth.users.email IS DISTINCT FROM v_recovery_email);

  UPDATE public.profiles
     SET email = v_recovery_email
   WHERE id = v_user_id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.request_password_recovery(text, text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.request_password_recovery(text, text) TO anon, authenticated, service_role;

-- 6.4 update_user_password: revocar de anon/PUBLIC (solo authenticated).
REVOKE ALL ON FUNCTION public.update_user_password(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.update_user_password(uuid, text) FROM anon;
GRANT  EXECUTE ON FUNCTION public.update_user_password(uuid, text) TO authenticated, service_role;

-- 6.5 handle_new_user: asegurar search_path (evita shadowing).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'seller'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;

-- 6.6 update_user_email: placeholder inofensivo pero SECURITY DEFINER → DROP.
--      (No se referencia en el código frontend; la edición de email se hace
--       vía request_password_recovery / create_user).
DROP FUNCTION IF EXISTS public.update_user_email(uuid, text) CASCADE;

