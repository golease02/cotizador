-- ============================================================
-- 2026-09-15 — seed_datos_prueba.sql
-- Datos de prueba para el Cotizador GoLease.
--
-- QUÉ HACE
--   1. Borra los datos de prueba: quotes, notas y TODOS los usuarios
--      (public.profiles + auth.users) EXCEPTO el super admin actual,
--      que se conserva intacto.
--   2. Crea 3 socios × 5 vendedores = 15 vendedores.
--   3. Crea 60 cotizaciones (4 por vendedor: una por cada color del
--      semáforo) y 5 notas de seguimiento.
--   4. NO TOCA state_plates ni calculator_settings (catálogos intactos).
--
-- CÓMO EJECUTARLO
--   Opción A (recomendada): Supabase → SQL Editor → pegar el contenido → Run.
--   Opción B: npx supabase db query --linked -f supabase/scripts/seed_datos_prueba.sql
--   Todo corre dentro de una transacción: si algo falla, no queda nada a medias.
--
-- CREDENCIALES (login por número de celular; contraseña 123456 en todos)
--   Super admin : 4421220799  (usuario intacto; sus cotizaciones actuales se
--                              borran en el wipe, igual que el resto de datos)
--   Socios      : 4421000001  todos los permisos
--                 4421000002  vendedores, cotizaciones y notas
--                 4421000003  SIN permisos → pantalla "Sin acceso"
--   Vendedores  : 4421100001…4421100005  (Socio 1 — GoLease Bajío)
--                 4421200001…4421200005  (Socio 2 — GoLease Occidente)
--                 4421300001…4421300005  (Socio 3 — GoLease Centro)
--   El vendedor 4421100005 queda INACTIVO a propósito: sirve para probar el
--   KPI de vendedores inactivos y que su login por celular quede bloqueado.
--
-- DETALLES TÉCNICOS
--   * Los triggers de defensa (secure_quotes_row / secure_profiles_row) leen
--     auth.uid()/is_admin(). En el SQL Editor no hay JWT, así que el script
--     publica claims locales (solo durante esta transacción) con el id del
--     super admin para que tomen la vía exenta. Sin esto, secure_quotes_row
--     sobrescribiría seller_id, revisada, fijada, color y status_color.
--   * quotes.calculation queda NULL a propósito: la app recalcula el desglose
--     desde la fila (buildInputFromRow) cuando no hay snapshot guardado.
--   * Los emails siguen la convención de la app: socio_<celular>@golease.com
--     y vendedor_<celular>@golease.com (espejo de auth.users.email).
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------
-- 0. Contexto "super admin" (solo para esta transacción)
-- ------------------------------------------------------------
DO $$
DECLARE
  v_super uuid;
BEGIN
  SELECT p.id INTO v_super
    FROM public.profiles p
   WHERE p.role = 'super_admin'
   ORDER BY p.created_at
   LIMIT 1;

  IF v_super IS NULL THEN
    RAISE EXCEPTION 'No hay ningún super_admin en public.profiles: abortado para no dejarte sin acceso.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.profiles p
     WHERE p.id = v_super
       AND p.email IS NOT NULL
       AND p.active IS NOT FALSE
  ) THEN
    RAISE EXCEPTION 'El super admin % no puede iniciar sesión (email/active): abortado.', v_super;
  END IF;

  PERFORM set_config(
    'request.jwt.claims',
    json_build_object('sub', v_super::text, 'role', 'authenticated')::text,
    true
  );

  RAISE NOTICE 'Seed: super admin conservado (%)', v_super;
END $$;

-- ------------------------------------------------------------
-- 1. Wipe de datos de prueba (el super admin se conserva)
-- ------------------------------------------------------------
DO $$
DECLARE
  v_super uuid;
BEGIN
  SELECT p.id INTO v_super
    FROM public.profiles p
   WHERE p.role = 'super_admin'
   ORDER BY p.created_at
   LIMIT 1;

  -- FK de auditoría de parámetros: si calculator_settings.updated_by apunta a
  -- un usuario que se va a eliminar, se limpia SOLO la referencia (nunca los
  -- valores de `settings`). Normalmente son 0 filas.
  UPDATE public.calculator_settings
     SET updated_by = NULL
   WHERE updated_by IS NOT NULL
     AND updated_by <> v_super;

  DELETE FROM public.notas;
  DELETE FROM public.quotes;
  DELETE FROM public.profiles      WHERE id      <> v_super;
  DELETE FROM auth.identities      WHERE user_id <> v_super;
  DELETE FROM auth.users           WHERE id      <> v_super;
END $$;

-- ------------------------------------------------------------
-- 2. Personas a crear (3 socios + 15 vendedores)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS seed_socios;
CREATE TEMP TABLE seed_socios (
  orden           int     PRIMARY KEY,
  full_name       text    NOT NULL,
  phone           text    NOT NULL,
  agency_name     text    NOT NULL,
  agency_location text    NOT NULL,
  permisos        jsonb   NOT NULL
);

INSERT INTO seed_socios (orden, full_name, phone, agency_name, agency_location, permisos) VALUES
  (1, 'María Fernanda Ruiz Solís',   '4421000001', 'GoLease Bajío',     'Querétaro, Qro.',
      '{"sellers": true, "quotes": true, "plates": true, "parameters": true, "notas": true}'::jsonb),
  (2, 'Jorge Alberto Mendoza Cruz',  '4421000002', 'GoLease Occidente', 'Guadalajara, Jal.',
      '{"sellers": true, "quotes": true, "notas": true}'::jsonb),
  (3, 'Ana Sofía Delgado Ortiz',     '4421000003', 'GoLease Centro',    'Ciudad de México',
      '{}'::jsonb);

DROP TABLE IF EXISTS seed_sellers;
CREATE TEMP TABLE seed_sellers (
  orden           int     PRIMARY KEY,   -- 1..15 (orden global, define su vehículo)
  socio_orden     int     NOT NULL,
  full_name       text    NOT NULL,
  phone           text    NOT NULL,
  agency_brand    text    NOT NULL,
  agency_location text    NOT NULL,
  active          boolean NOT NULL
);

INSERT INTO seed_sellers (orden, socio_orden, full_name, phone, agency_brand, agency_location, active) VALUES
  -- Socio 1 — GoLease Bajío (Querétaro)
  ( 1, 1, 'Luis Ángel Ramírez Peña',    '4421100001', 'HINO',        'Av. 5 de Febrero 1234, Querétaro, Qro.',        true),
  ( 2, 1, 'Karla Denisse Torres Vega',  '4421100002', 'TOYOTA',      'Blvd. Bernardo Quintana 300, Querétaro, Qro.',  true),
  ( 3, 1, 'Miguel Ángel Herrera Lozano','4421100003', 'NISSAN',      'Carretera México-Querétaro Km 12, Querétaro, Qro.', true),
  ( 4, 1, 'Paola Guadalupe Núñez Ríos', '4421100004', 'BYD',         'Av. Universidad 500, Querétaro, Qro.',          true),
  ( 5, 1, 'Fernando Iván Castro Mena',  '4421100005', 'FORD',        'Prol. Zaragoza 800, Querétaro, Qro.',           false),
  -- Socio 2 — GoLease Occidente (Jalisco)
  ( 6, 2, 'Ricardo Alberto Fuentes Soto','4421200001','HINO',        'Av. Lázaro Cárdenas 2500, Guadalajara, Jal.',   true),
  ( 7, 2, 'Mayra Alejandra Peña Duarte', '4421200002','TOYOTA',      'Av. Vallarta 1300, Guadalajara, Jal.',          true),
  ( 8, 2, 'Óscar Eduardo Bautista Lara', '4421200003','VOLKSWAGEN',  'Calz. Independencia 700, Guadalajara, Jal.',    true),
  ( 9, 2, 'Diana Laura Serrano Vázquez', '4421200004','KIA',         'Av. Patria 1500, Zapopan, Jal.',                true),
  (10, 2, 'Héctor Manuel Rivas Contreras','4421200005','CHEVROLET',  'Av. Colón 900, Guadalajara, Jal.',              true),
  -- Socio 3 — GoLease Centro (Ciudad de México)
  (11, 3, 'Brenda Nicole Aguilar Ponce','4421300001', 'BYD',         'Insurgentes Sur 1602, Ciudad de México',        true),
  (12, 3, 'Julio César Estrada Nava',   '4421300002', 'TOYOTA',      'Av. Revolución 1200, Ciudad de México',         true),
  (13, 3, 'Sandra Patricia Molina Reyes','4421300003','NISSAN',      'Calz. Ignacio Zaragoza 500, Ciudad de México',  true),
  (14, 3, 'Andrés Felipe Guzmán Rocha', '4421300004', 'FORD',        'Av. Ejército Nacional 700, Ciudad de México',   true),
  (15, 3, 'Verónica Itzel Cabrera Salas','4421300005','MAZDA',       'Av. Universidad 1000, Ciudad de México',        true);

-- Mapa kind/orden → id creado (lo llenan los pasos 3 y 4)
DROP TABLE IF EXISTS seed_ids;
CREATE TEMP TABLE seed_ids (
  kind       text NOT NULL,   -- 'socio' | 'seller'
  orden      int  NOT NULL,
  profile_id uuid NOT NULL,
  email      text NOT NULL,
  PRIMARY KEY (kind, orden)
);

-- ------------------------------------------------------------
-- 3. Alta de usuarios (auth.users + auth.identities + profiles)
--    Contraseña de todos: 123456
-- ------------------------------------------------------------
DO $$
DECLARE
  r      record;
  v_id   uuid;
  v_mail text;
BEGIN
  -- 3.1 Socios
  FOR r IN SELECT * FROM seed_socios ORDER BY orden LOOP
    v_id   := gen_random_uuid();
    v_mail := 'socio_' || r.phone || '@golease.com';

    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_sent_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token, email_change, email_change_token_new
    ) VALUES (
      v_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      v_mail, crypt('123456', gen_salt('bf')),
      now(), now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('full_name', r.full_name),
      now() - interval '45 days', now() - interval '45 days',
      '', '', '', ''
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      v_id, v_id, gen_random_uuid(),
      jsonb_build_object('sub', v_id::text, 'email', v_mail, 'email_verified', true, 'phone_verified', false),
      'email', now(), now(), now()
    );

    -- El trigger handle_new_user() puede haber creado ya el perfil como
    -- 'seller': el upsert lo deja con el rol y los datos definitivos.
    INSERT INTO public.profiles (
      id, email, full_name, role, active, created_at,
      seller_number, agency_name, agency_location, socio_id, permisos
    ) VALUES (
      v_id, v_mail, r.full_name, 'socio', true, now() - interval '45 days',
      r.phone, r.agency_name, r.agency_location, NULL, r.permisos
    )
    ON CONFLICT (id) DO UPDATE SET
      email           = EXCLUDED.email,
      full_name       = EXCLUDED.full_name,
      role            = EXCLUDED.role,
      active          = EXCLUDED.active,
      seller_number   = EXCLUDED.seller_number,
      agency_name     = EXCLUDED.agency_name,
      agency_location = EXCLUDED.agency_location,
      socio_id        = EXCLUDED.socio_id,
      permisos        = EXCLUDED.permisos,
      created_at      = EXCLUDED.created_at;

    INSERT INTO seed_ids (kind, orden, profile_id, email) VALUES ('socio', r.orden, v_id, v_mail);
  END LOOP;

  -- 3.2 Vendedores (5 por socio, ligados por socio_id)
  FOR r IN SELECT * FROM seed_sellers ORDER BY orden LOOP
    v_id   := gen_random_uuid();
    v_mail := 'vendedor_' || r.phone || '@golease.com';

    INSERT INTO auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_sent_at,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token, email_change, email_change_token_new
    ) VALUES (
      v_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      v_mail, crypt('123456', gen_salt('bf')),
      now(), now(),
      jsonb_build_object('provider', 'email', 'providers', array['email']),
      jsonb_build_object('full_name', r.full_name),
      now() - interval '30 days' + make_interval(days => r.orden), now(),
      '', '', '', ''
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      v_id, v_id, gen_random_uuid(),
      jsonb_build_object('sub', v_id::text, 'email', v_mail, 'email_verified', true, 'phone_verified', false),
      'email', now(), now(), now()
    );

    INSERT INTO public.profiles (
      id, email, full_name, role, active, created_at,
      seller_number, agency_brand, agency_location, socio_id, permisos
    ) VALUES (
      v_id, v_mail, r.full_name, 'seller', r.active,
      now() - interval '30 days' + make_interval(days => r.orden),
      r.phone, r.agency_brand, r.agency_location,
      (SELECT si.profile_id FROM seed_ids si WHERE si.kind = 'socio' AND si.orden = r.socio_orden),
      '{}'::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      email           = EXCLUDED.email,
      full_name       = EXCLUDED.full_name,
      role            = EXCLUDED.role,
      active          = EXCLUDED.active,
      seller_number   = EXCLUDED.seller_number,
      agency_brand    = EXCLUDED.agency_brand,
      agency_location = EXCLUDED.agency_location,
      socio_id        = EXCLUDED.socio_id,
      created_at      = EXCLUDED.created_at;

    INSERT INTO seed_ids (kind, orden, profile_id, email) VALUES ('seller', r.orden, v_id, v_mail);
  END LOOP;

  RAISE NOTICE 'Seed: 3 socios y 15 vendedores creados (contraseña 123456).';
END $$;

-- ------------------------------------------------------------
-- 4. Cotizaciones: 4 por vendedor, una por cada color del semáforo
--      rojo     created hace 12 días, sin revisar  → KPI "Por caducar"
--      amarillo created hace 5 días,  sin revisar  → y queda FIJADA
--      reciente created hace 1 día,   sin revisar
--      verde    created hace 8 días,  revisada
--    (Para bajar el volumen, quita filas de la lista "colores".)
-- ------------------------------------------------------------
WITH vehiculos AS (
  SELECT row_number() OVER (ORDER BY brand, model) - 1 AS idx, brand, model, year, pricenet, hybrid
  FROM (VALUES
    ('HINO',        '300 SERIES',     2026,  689000, false),
    ('HINO',        'DUTRO',          2025,  545000, false),
    ('TOYOTA',      'HILUX',          2026,  749900, false),
    ('TOYOTA',      'RAV4 HYBRID',    2026,  789000, true),
    ('NISSAN',      'NP300',          2025,  495000, false),
    ('NISSAN',      'X-TRAIL E-POWER',2026,  699900, true),
    ('BYD',         'DOLPHIN MINI EV',2026,  399800, true),
    ('BYD',         'SONG PLUS EV',   2026,  649000, true),
    ('FORD',        'RANGER',         2026,  859000, false),
    ('FORD',        'TRANSIT',        2025,  989000, false),
    ('VOLKSWAGEN',  'JETTA',          2026,  439900, false),
    ('KIA',         'K3 SEDAN',       2026,  389900, false),
    ('CHEVROLET',   'SILVERADO',      2026,  929000, false),
    ('MAZDA',       'CX-5',           2026,  639900, false),
    ('HINO',        '500 SERIES',     2026, 1249000, false),
    ('TOYOTA',      'COROLLA',        2026,  449900, false)
  ) AS v(brand, model, year, pricenet, hybrid)
),
clientes AS (
  SELECT row_number() OVER (ORDER BY name) - 1 AS idx, name
  FROM (VALUES
    ('Transportes del Bajío SA de CV'),
    ('Logística Integral Querétaro'),
    ('Distribuidora López Hermanos'),
    ('Grupo Comercial Ranco'),
    ('Servicios Ambientales del Norte'),
    ('Alimentos La Huasteca SA de CV'),
    ('Constructora Zenit'),
    ('Farmacias del Valle'),
    ('Refacciones Industriales MGM'),
    ('Agroindustrias San Miguel'),
    ('Tecnología Empresarial TecnoBa'),
    ('Muebles y Decoración Casa Bella')
  ) AS c(name)
),
colores AS (
  SELECT * FROM (VALUES
    (1, 12, false, false, 'rojo',     48),
    (2,  5, false, true,  'amarillo', 36),
    (3,  1, false, false, 'reciente', 12),
    (4,  8, true,  false, 'verde',    24)
  ) AS c(slot, days_ago, revisada, fijada, color, termmonths)
),
plan AS (
  SELECT si.profile_id                 AS seller_id,
         ((se.orden - 1) * 4 + co.slot) AS pick,
         co.days_ago, co.revisada, co.fijada, co.color, co.termmonths
    FROM seed_ids si
    JOIN seed_sellers se ON se.orden = si.orden
    CROSS JOIN colores co
   WHERE si.kind = 'seller'
)
INSERT INTO public.quotes (
  seller_id, client_name, brand, model, year, pricenet, ishybridorelectric,
  termmonths, extraordinaryrentpct, securitydepositpct, selectedstateplateid,
  isinsuranceestimated, totalpayment, calculation,
  revisada, fijada, color, status_color,
  created_at, last_reviewed_at, ultima_actualizacion, valid_until
)
SELECT
  p.seller_id,
  cl.name,
  ve.brand,
  ve.model,
  ve.year,
  ve.pricenet,
  ve.hybrid,
  p.termmonths,
  0.10,                                        -- renta extraordinaria mínima (10%)
  0,                                           -- depósito en garantía (lo aplica el motor)
  'pendiente',                                 -- placa por cotizar
  ve.hybrid,                                   -- seguro estimado en híbridos/eléctricos
  0,                                           -- totalpayment (la app guarda 0)
  NULL,                                        -- calculation: la app recalcula desde la fila
  p.revisada,
  p.fijada,
  p.color,
  NULL,                                        -- status_color
  now() - make_interval(days => p.days_ago),
  CASE WHEN p.revisada
       THEN now() - make_interval(days => p.days_ago - 1)
       ELSE NULL END,
  now() - make_interval(days => p.days_ago),
  now() - make_interval(days => p.days_ago) + interval '7 days'
FROM plan p
JOIN vehiculos ve ON ve.idx = p.pick % 16
JOIN clientes  cl ON cl.idx = p.pick % 12;

-- ------------------------------------------------------------
-- 5. Notas de seguimiento (3 de vendedor + 2 de cotización)
-- ------------------------------------------------------------
INSERT INTO public.notas (entidad_tipo, entidad_id, texto, creado_por, created_at)
SELECT 'seller', ven.profile_id::text, n.texto, soc.profile_id,
       now() - make_interval(days => n.days_ago)
  FROM (VALUES
    (1, 'Se acordó visita a la agencia el viernes para revisar unidades.', 6),
    (2, 'Pidió comparativa de 36 vs 48 meses. Enviar desglose.',           4),
    (3, 'Vendedor nuevo: dar seguimiento telefónico esta semana.',         2)
  ) AS n(socio_orden, texto, days_ago)
  JOIN seed_ids soc ON soc.kind = 'socio'  AND soc.orden = n.socio_orden
  JOIN seed_ids ven ON ven.kind = 'seller' AND ven.orden = (n.socio_orden - 1) * 5 + 1;

INSERT INTO public.notas (entidad_tipo, entidad_id, texto, creado_por, created_at)
SELECT 'quote', q.id::text, n.texto, soc.profile_id,
       now() - make_interval(days => n.days_ago)
  FROM (VALUES
    (1, 'El cliente confirmó presupuesto; queda fijada para seguimiento.', 3),
    (2, 'Pendiente validar placa y color de unidad con el cliente.',        1)
  ) AS n(socio_orden, texto, days_ago)
  JOIN seed_ids soc ON soc.kind = 'socio'  AND soc.orden = n.socio_orden
  JOIN seed_ids ven ON ven.kind = 'seller' AND ven.orden = (n.socio_orden - 1) * 5 + 1
  JOIN public.quotes q ON q.seller_id = ven.profile_id AND q.fijada IS TRUE;

-- ------------------------------------------------------------
-- 6. Resumen de lo que quedó en la BD
-- ------------------------------------------------------------
SELECT jsonb_pretty(jsonb_build_object(
  'super_admin',            (SELECT jsonb_build_object('email', email, 'celular', seller_number, 'role', role)
                               FROM public.profiles WHERE role = 'super_admin' ORDER BY created_at LIMIT 1),
  'socios',                 (SELECT count(*) FROM public.profiles WHERE role = 'socio'),
  'vendedores',             (SELECT count(*) FROM public.profiles WHERE role = 'seller'),
  'vendedores_inactivos',   (SELECT count(*) FROM public.profiles WHERE role = 'seller' AND active IS FALSE),
  'cotizaciones',           (SELECT count(*) FROM public.quotes),
  'cotizaciones_por_color', (SELECT jsonb_object_agg(color, total) FROM
                              (SELECT color, count(*) AS total FROM public.quotes GROUP BY color) c),
  'cotizaciones_fijadas',   (SELECT count(*) FROM public.quotes WHERE fijada IS TRUE),
  'notas',                  (SELECT count(*) FROM public.notas),
  'placas_sin_tocar',       (SELECT count(*) FROM public.state_plates),
  'parametros_sin_tocar',   (SELECT jsonb_build_object('filas', count(*), 'updated_at', max(updated_at))
                               FROM public.calculator_settings)
)) AS resumen_seed;

COMMIT;
