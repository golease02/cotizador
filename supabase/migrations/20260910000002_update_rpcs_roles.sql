-- ============================================================
-- 2026-09-10 — Actualización de RPCs al nuevo modelo de roles
--   * create_user: super_admin puede crear socios y vendedores;
--                  socio activo solo puede crear vendedores.
-- ============================================================
BEGIN;

CREATE OR REPLACE FUNCTION public.create_user(
  p_email text,
  p_password text,
  p_full_name text,
  p_role text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
declare
  v_user_id uuid;
  v_valid_role text;
begin
  -- 1) Autorización: super_admin crea lo que quiera; socio activo solo vendedores
  if exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin' and coalesce(active, true) = true
  ) then
    -- super admin: puede crear cualquier rol
    null;
  elsif exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'socio' and coalesce(active, true) = true
  ) then
    -- socio: solo vendedores
    if lower(p_role) <> 'seller' then
      raise exception 'Un socio solo puede crear vendedores.';
    end if;
  else
    raise exception 'No autorizado: solo un super admin o socio activo puede crear usuarios.';
  end if;

  -- 2) Validación básica
  if p_email is null or p_password is null or length(p_password) < 6 then
    raise exception 'Parámetros inválidos: email y contraseña (mínimo 6 caracteres) son obligatorios.';
  end if;

  v_valid_role := lower(p_role);
  if v_valid_role not in ('super_admin', 'socio', 'seller') then
    raise exception 'Rol inválido.';
  end if;

  if exists (select 1 from auth.users where lower(email) = lower(p_email)) then
    return jsonb_build_object('error', 'YA_EXISTE');
  end if;

  -- 3) Crear usuario en auth
  v_user_id := gen_random_uuid();
  insert into auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at,
    raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
    lower(p_email),
    crypt(p_password, gen_salt('bf')),
    now(), now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object('full_name', p_full_name),
    now(), now(), '', '', '', ''
  );

  -- 4) Identidad email
  insert into auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) values (
    v_user_id, v_user_id, gen_random_uuid(),
    jsonb_build_object('sub', v_user_id::text, 'email', lower(p_email), 'email_verified', true, 'phone_verified', false),
    'email', now(), now(), now()
  );

  -- 5) Perfil (si ya lo creó el trigger, no duplica)
  insert into public.profiles (id, email, full_name, role, active, created_at)
  values (v_user_id, lower(p_email), p_full_name, v_valid_role, true, now())
  on conflict (id) do nothing;

  return jsonb_build_object('id', v_user_id::text);
end;
$$;

-- delete_user: solo super_admin (para el CRUD de socios y usuarios)
CREATE OR REPLACE FUNCTION public.delete_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
begin
  if not exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'super_admin' and coalesce(active, true) = true
  ) then
    raise exception 'Solo el super admin puede eliminar usuarios.';
  end if;

  if user_id = auth.uid() then
    raise exception 'No puedes eliminar tu propio usuario.';
  end if;

  delete from public.profiles where id = user_id;
  delete from auth.identities where user_id = user_id and provider = 'email';
  delete from auth.users where id = user_id;
end;
$$;

GRANT EXECUTE ON FUNCTION public.create_user(text,text,text,text), public.delete_user(uuid) TO authenticated;

COMMIT;