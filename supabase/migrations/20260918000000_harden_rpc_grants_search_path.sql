-- ============================================================
-- Endurecimiento de funciones SECURITY DEFINER (linter 0011/0028/0029)
-- Migracion autocontenida e idempotente. BEGIN/COMMIT.
-- No afecta al frontend ni a los flujos de login/registro anonimo.
-- ============================================================
BEGIN;

-- ---------------------------------------------------------------
-- 1) search_path fijado en funciones trigger (lint 0011)
-- ---------------------------------------------------------------
-- touch_seguimiento_updated_at: cuerpo solo usa now() (pg_catalog)
CREATE OR REPLACE FUNCTION public.touch_seguimiento_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

-- secure_quotes_row: cuerpo actual (20260917100000). Todo calificado
-- (public.profiles, auth.uid()), asi que '' es seguro.
-- CREATE OR REPLACE conserva el OID -> el trigger existente sigue valido.
CREATE OR REPLACE FUNCTION public.secure_quotes_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_is_super_admin boolean;
    v_is_socio_dueno boolean;
BEGIN
    IF TG_OP <> 'UPDATE' THEN
        RETURN NEW;
    END IF;

    -- 1) Transferencia de seller_id: exclusivo de super_admin.
    IF NEW.seller_id IS DISTINCT FROM OLD.seller_id THEN
        SELECT (p.role = 'super_admin' AND p.active)
        INTO v_is_super_admin
        FROM public.profiles p
        WHERE p.id = auth.uid();
        IF v_is_super_admin IS NOT TRUE THEN
            RAISE EXCEPTION 'No tienes permiso para reasignar la cotizacion'
                USING ERRCODE = '42501';
        END IF;
    END IF;

    -- 2) Campos de revision: super_admin o socio dueno de la red del vendedor.
    IF NEW.revisada IS DISTINCT FROM OLD.revisada
       OR NEW.fijada IS DISTINCT FROM OLD.fijada
       OR NEW.color IS DISTINCT FROM OLD.color
       OR NEW.status_color IS DISTINCT FROM OLD.status_color
       OR NEW.last_reviewed_at IS DISTINCT FROM OLD.last_reviewed_at THEN

        SELECT (p.role = 'super_admin' AND p.active)
        INTO v_is_super_admin
        FROM public.profiles p
        WHERE p.id = auth.uid();

        SELECT EXISTS (
            SELECT 1
            FROM public.profiles vendedor
            JOIN public.profiles socio
              ON socio.id = vendedor.socio_id
             AND socio.active
            WHERE vendedor.id = OLD.seller_id
              AND vendedor.socio_id = auth.uid()
        ) INTO v_is_socio_dueno;

        IF v_is_super_admin IS NOT TRUE AND v_is_socio_dueno IS NOT TRUE THEN
            RAISE EXCEPTION
                'Solo un super admin o el socio de la red pueden revisar o fijar la cotizacion'
                USING ERRCODE = '42501';
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

-- set_quotes_valid_until: la migracion original no esta en el repo (1-13
-- eliminadas del disco). Se fija search_path='public' de forma conservadora,
-- condicionado a existir con firma sin argumentos.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'set_quotes_valid_until'
      AND pg_get_function_identity_arguments(p.oid) = ''
  ) THEN
    ALTER FUNCTION public.set_quotes_valid_until() SET search_path = 'public';
  END IF;
END
$$;

-- ---------------------------------------------------------------
-- 2) Triggers: revocar EXECUTE del publico.
--    El motor de triggers no verifica privilegios EXECUTE, asi que
--    revocar no afecta al disparador, pero cierra la exposicion RPC.
-- ---------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.secure_profiles_row() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.secure_quotes_row() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_seguimiento_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_quotes_valid_until() FROM PUBLIC, anon, authenticated;

-- ---------------------------------------------------------------
-- 3) Helpers de politicas RLS
--    anon no necesita EXECUTE (todas las politicas son TO authenticated).
--    authenticated SE mantiene: las politicas RLS la invocan con el rol
--    de la sesion, por lo que revocarla romperia todo el acceso autenticado.
-- ---------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_view_profile(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_view_profile(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_view_quote(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_view_quote(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_socio_owner_of(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_socio_owner_of(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.shares_socio_group(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.shares_socio_group(uuid) TO authenticated, service_role;

-- ---------------------------------------------------------------
-- 4) RPCs de app: revocar exposicion anon donde no se usa.
--    El frontend las llama con sesion autenticada, nunca como anon.
-- ---------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.delete_user(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.get_seller_scope_ids() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_seller_scope_ids() TO authenticated, service_role;

COMMIT;
