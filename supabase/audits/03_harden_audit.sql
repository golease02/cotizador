-- Auditoria post-aplicacion (unico SELECT -> CSV limpio)
SELECT p.proname AS name,
       (p.proconfig IS NOT NULL AND p.proconfig <> '{}') AS sp_fijado,
       has_function_privilege('anon'::regrole, p.oid, 'execute') AS anon_exec,
       has_function_privilege('authenticated'::regrole, p.oid, 'execute') AS auth_exec,
       CASE WHEN p.proname IN ('handle_new_user','secure_profiles_row','secure_quotes_row','touch_seguimiento_updated_at','set_quotes_valid_until') THEN 'trigger_fn'
            WHEN p.proname IN ('is_admin','is_super_admin','can_view_profile','can_view_quote','is_socio_owner_of','shares_socio_group','is_seguimiento_admin','can_access_seguimiento') THEN 'helper_rls'
            WHEN p.proname IN ('get_profile_by_seller','get_public_socios','request_password_recovery') THEN 'rpc_publica'
            ELSE 'rpc_app' END AS tipo
FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public'
  AND p.proname IN ('handle_new_user','secure_profiles_row','secure_quotes_row','touch_seguimiento_updated_at','set_quotes_valid_until','is_admin','is_super_admin','can_view_profile','can_view_quote','is_socio_owner_of','shares_socio_group','is_seguimiento_admin','can_access_seguimiento','delete_user','get_seller_scope_ids','get_profile_by_seller','get_public_socios','request_password_recovery')
UNION ALL
SELECT 'TRG:'||tg.tgname AS name, NULL::boolean AS sp_fijado, NULL::boolean AS anon_exec, NULL::boolean AS auth_exec, 'trigger_present' AS tipo
FROM pg_trigger tg
WHERE tg.tgname IN ('trg_seguimiento_touch','trg_quotes_secure_row','trg_profiles_secure_row')
ORDER BY tipo, name;
