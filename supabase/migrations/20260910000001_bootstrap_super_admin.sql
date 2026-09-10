-- ============================================================
-- 2026-09-10 — Bootstrap (Opción A del usuario)
--   * Wipe de datos de prueba: quotes, notas, profiles, auth.users
--   * Se conservan catálogos: vehicles, state_plates, calculator_settings
--   * Alta del Super Admin: golease02@gmail.com
--   * Idempotente y seguro: si ya hay usuarios (ej. producción),
--     NO borra nada y delega el alta a 000003_superadmin_credentials.
-- ============================================================

-- Necesaria para crypt/gen_salt (bcrypt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- En producción (usuarios ya existentes): no tocar datos, solo asegurar extensión.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth.users LIMIT 1) THEN
    RAISE NOTICE 'Ya existen usuarios en auth: se omite el wipe/bootstrap destructivo. El Super Admin se asegura en la migración 000003.';
    RETURN;
  END IF;
END $$;

-- Wipe + Alta de Super Admin (solo se ejecuta en BD vacía; es atómico)
DO $$
DECLARE
  v_user_id uuid := gen_random_uuid();
  v_email   text := 'golease02@gmail.com';
  v_number  text := '4421220799';
  v_pass    text := '123456';          -- Credencial solicitada por el usuario
BEGIN
  -- Wipe + Alta de Super Admin (solo BD vacía)
  IF EXISTS (SELECT 1 FROM auth.users LIMIT 1) THEN
    RAISE NOTICE 'Ya existen usuarios: se omite el bootstrap destructivo.';
    RETURN;
  END IF;

  DELETE FROM public.quotes;
  DELETE FROM public.notas;
  DELETE FROM public.profiles;
  DELETE FROM auth.identities WHERE provider = 'email';
  DELETE FROM auth.users;

  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) VALUES (
    v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    lower(v_email),
    crypt(v_pass, gen_salt('bf')),
    now(), now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object('full_name', 'Super Admin'),
    now(), now(), '', '', '', ''
  );

  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES (
    v_user_id, v_user_id, gen_random_uuid(),
    jsonb_build_object('sub', v_user_id::text, 'email', lower(v_email), 'email_verified', true, 'phone_verified', false),
    'email', now(), now(), now()
  );

  UPDATE public.profiles
     SET role = 'super_admin',
         email = lower(v_email),
         full_name = 'Super Admin',
         seller_number = v_number,
         active = true
   WHERE id = v_user_id;

  RAISE NOTICE 'Super Admin creado: % (número: %)', v_email, v_number;
END $$;

-- 3. Catálogos base por si faltaran
INSERT INTO public.vehicles (id, brand, model, suggestedPriceNet, isHybridOrElectric, year) VALUES
  ('v0', 'Audi', 'Q3 Sportback', 969900, FALSE, 2026),
  ('v1', 'HINO', '616 LONG', 407900, FALSE, 2026),
  ('v2', 'TOYOTA', 'HILUX DOBLE CABINA', 520000, FALSE, 2026),
  ('v3', 'TOYOTA', 'PRIUS HEV', 485000, TRUE, 2026),
  ('v4', 'NISSAN', 'NP300', 450000, FALSE, 2026),
  ('v5', 'BYD', 'DOLPHIN MINI EV', 399800, TRUE, 2026),
  ('v6', 'FORD', 'TRANSIT CUSTOM', 780000, FALSE, 2026)
ON CONFLICT (id) DO UPDATE SET
  brand = EXCLUDED.brand, model = EXCLUDED.model,
  suggestedPriceNet = EXCLUDED.suggestedPriceNet,
  isHybridOrElectric = EXCLUDED.isHybridOrElectric, year = EXCLUDED.year;

INSERT INTO public.state_plates (id, name, costNet) VALUES
  ('cdmx', 'Ciudad de México', 2500),
  ('jalisco', 'Jalisco', 1800),
  ('nuevo_leon', 'Nuevo León', 2000),
  ('queretaro', 'Querétaro', 1500),
  ('edomex', 'Estado de México', 2200),
  ('pendiente', 'Pendiente (Sin placa)', 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, costNet = EXCLUDED.costNet;

-- 3. Catálogos base por si faltaran
INSERT INTO public.vehicles (id, brand, model, suggestedPriceNet, isHybridOrElectric, year) VALUES
  ('v0', 'Audi', 'Q3 Sportback', 969900, FALSE, 2026),
  ('v1', 'HINO', '616 LONG', 407900, FALSE, 2026),
  ('v2', 'TOYOTA', 'HILUX DOBLE CABINA', 520000, FALSE, 2026),
  ('v3', 'TOYOTA', 'PRIUS HEV', 485000, TRUE, 2026),
  ('v4', 'NISSAN', 'NP300', 450000, FALSE, 2026),
  ('v5', 'BYD', 'DOLPHIN MINI EV', 399800, TRUE, 2026),
  ('v6', 'FORD', 'TRANSIT CUSTOM', 780000, FALSE, 2026)
ON CONFLICT (id) DO UPDATE SET
  brand = EXCLUDED.brand, model = EXCLUDED.model,
  suggestedPriceNet = EXCLUDED.suggestedPriceNet,
  isHybridOrElectric = EXCLUDED.isHybridOrElectric, year = EXCLUDED.year;

INSERT INTO public.state_plates (id, name, costNet) VALUES
  ('cdmx', 'Ciudad de México', 2500),
  ('jalisco', 'Jalisco', 1800),
  ('nuevo_leon', 'Nuevo León', 2000),
  ('queretaro', 'Querétaro', 1500),
  ('edomex', 'Estado de México', 2200),
  ('pendiente', 'Pendiente (Sin placa)', 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, costNet = EXCLUDED.costNet;
-- 3. Catálogos base por si faltaran
INSERT INTO public.vehicles (id, brand, model, suggestedPriceNet, isHybridOrElectric, year) VALUES
  ('v0', 'Audi', 'Q3 Sportback', 969900, FALSE, 2026),
  ('v1', 'HINO', '616 LONG', 407900, FALSE, 2026),
  ('v2', 'TOYOTA', 'HILUX DOBLE CABINA', 520000, FALSE, 2026),
  ('v3', 'TOYOTA', 'PRIUS HEV', 485000, TRUE, 2026),
  ('v4', 'NISSAN', 'NP300', 450000, FALSE, 2026),
  ('v5', 'BYD', 'DOLPHIN MINI EV', 399800, TRUE, 2026),
  ('v6', 'FORD', 'TRANSIT CUSTOM', 780000, FALSE, 2026)
ON CONFLICT (id) DO UPDATE SET
  brand = EXCLUDED.brand, model = EXCLUDED.model,
  suggestedPriceNet = EXCLUDED.suggestedPriceNet,
  isHybridOrElectric = EXCLUDED.isHybridOrElectric, year = EXCLUDED.year;

INSERT INTO public.state_plates (id, name, costNet) VALUES
  ('cdmx', 'Ciudad de México', 2500),
  ('jalisco', 'Jalisco', 1800),
  ('nuevo_leon', 'Nuevo León', 2000),
  ('queretaro', 'Querétaro', 1500),
  ('edomex', 'Estado de México', 2200),
  ('pendiente', 'Pendiente (Sin placa)', 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, costNet = EXCLUDED.costNet;
