-- ============================================================
-- 2026-09-10 — Credenciales Super Admin solicitadas por el usuario
--   * Login de la app es por NÚMERO DE CELULAR (no por email)
--   * Celular : 4421220799
--   * Password: 123456
--   * Email interno (auth): golease02@gmail.com
--   * Idempotente: funciona si el bootstrap ya corrió (actualiza
--     el password) o si aún no existe el usuario (lo crea).
-- ============================================================
BEGIN;

DO $$
DECLARE
  v_user_id uuid;
  v_email   text := 'golease02@gmail.com';
  v_number  text := '4421220799';
  v_pass    text := '123456';
BEGIN
  -- 1. Localizar usuario existente (por email o por número)
  SELECT id INTO v_user_id
    FROM auth.users
   WHERE lower(email) = lower(v_email)
   LIMIT 1;

  IF v_user_id IS NULL THEN
    SELECT id INTO v_user_id
      FROM public.profiles
     WHERE seller_number = v_number
     LIMIT 1;
  END IF;

  -- 2. Crear o actualizar auth.users
  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_sent_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token, email_change, email_change_token_new
    ) VALUES (
      v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      lower(v_email),
      extensions.crypt(v_pass, extensions.gen_salt('bf')),
      now(), now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('full_name', 'Super Admin'),
      now(), now(), '', '', '', ''
    );
  ELSE
    UPDATE auth.users
       SET email = lower(v_email),
           encrypted_password = extensions.crypt(v_pass, extensions.gen_salt('bf')),
           email_confirmed_at = COALESCE(email_confirmed_at, now()),
           updated_at = now()
     WHERE id = v_user_id;
  END IF;

  -- 3. Asegurar identidad email (requerida para login con password)
  IF NOT EXISTS (
    SELECT 1 FROM auth.identities
     WHERE user_id = v_user_id AND provider = 'email'
  ) THEN
    INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
    VALUES (
      v_user_id, v_user_id, gen_random_uuid(),
      jsonb_build_object('sub', v_user_id::text, 'email', lower(v_email), 'email_verified', true, 'phone_verified', false),
      'email', now(), now(), now()
    );
  END IF;

  -- 4. Asegurar perfil super_admin con el número de celular
  --    (corre como postgres en migraciones / SQL Editor: el trigger
  --    secure_profiles_row hace bypass para estos roles de servicio)
  INSERT INTO public.profiles (id, email, full_name, role, active, seller_number, created_at)
  VALUES (v_user_id, lower(v_email), 'Super Admin', 'super_admin', true, v_number, now())
  ON CONFLICT (id) DO UPDATE SET
    role = 'super_admin',
    email = lower(v_email),
    full_name = 'Super Admin',
    seller_number = v_number,
    active = true;

  RAISE NOTICE 'Super Admin OK: % (celular: %) — password actualizado', v_email, v_number;
END $$;

COMMIT;
