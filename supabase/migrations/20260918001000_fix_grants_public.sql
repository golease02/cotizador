-- ============================================================
-- Fix incremental: revocar EXECUTE de PUBLIC para helpers RLS y RPCs de app.
-- Su grant era a PUBLIC (heredado por anon); REVOKE FROM anon no alcanzaba.
-- Se otorga explicitamente authenticated + service_role para que las
-- políticas RLS y el frontend autenticado sigan funcionando.
-- Autocontenida e idempotente (REVOKE no falla si no hay grant; GRANT idempotent).
-- ============================================================
BEGIN;

-- Helpers de pol�ticas RLS: anon no necesita EXECUTE; authenticated S�.
REVOKE EXECUTE ON FUNCTION public.can_view_profile(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_view_profile(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_view_quote(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_view_quote(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_socio_owner_of(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_socio_owner_of(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.shares_socio_group(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.shares_socio_group(uuid) TO authenticated, service_role;

-- Idempotentes: is_admin / is_seguimiento_admin / can_access_seguimiento ya
-- estaban revocados de anon, pero se refuerzan por si el grant era a PUBLIC.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_seguimiento_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_seguimiento_admin() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.can_access_seguimiento(bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_access_seguimiento(bigint) TO authenticated, service_role;

-- RPCs de app que no deben ser anon: delete_user / get_seller_scope_ids.
REVOKE EXECUTE ON FUNCTION public.delete_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.get_seller_scope_ids() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_seller_scope_ids() TO authenticated, service_role;

COMMIT;
