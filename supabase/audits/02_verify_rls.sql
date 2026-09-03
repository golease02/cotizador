-- ================================================================
-- VERIFY RLS HARDENING — Cotizador
-- Ejecutar después de aplicar 20260309120000_harden_rls.sql
-- ================================================================

-- 1) RLS habilitado en todas las tablas
SELECT 'RLS_CHECK' as test,
       count(*) as total_tables,
       count(*) filter (where rowsecurity) as rls_enabled,
       case when count(*) = count(*) filter (where rowsecurity) then 'PASS' else 'FAIL' end as result
FROM pg_tables WHERE schemaname = 'public';

-- 2) Políticas activas por tabla
SELECT tablename, count(*) as policy_count, string_agg(policyname, ', ' order by policyname) as policies
FROM pg_policies WHERE schemaname = 'public'
GROUP BY tablename ORDER BY tablename;

-- 3) Funciones SECURITY DEFINER expuestas a anon/PUBLIC (no debería haber ninguna más allá de las esperadas)
SELECT routine_name, grantee, 'EXPOSED' as risk
FROM information_schema.role_routine_grants
WHERE routine_schema = 'public'
  AND grantee IN ('PUBLIC', 'anon')
  AND routine_name NOT IN ('is_admin', 'get_profile_by_seller', 'request_password_recovery', 'handle_new_user')
ORDER BY routine_name, grantee;

-- 4) Verificar que NO existen políticas USING(true) o WITH CHECK(true)
SELECT tablename, policyname, cmd,
       case when qual = 'true' or with_check = 'true' then 'EXPOSED' else 'OK' end as exposure
FROM pg_policies
WHERE schemaname = 'public'
  and (qual = 'true' or with_check = 'true');

-- 5) Verificar que update_user_email fue eliminada
SELECT 'DROP_CHECK' as test,
       case when count(*) = 0 then 'PASS — update_user_email eliminada' else 'FAIL — aún existe' end as result
FROM pg_proc WHERE proname = 'update_user_email' AND pronamespace = 'public'::regnamespace;

-- 6) Triggers de seguridad en profiles y quotes
SELECT event_object_table, trigger_name, action_timing, event_manipulation
FROM information_schema.triggers
WHERE trigger_schema = 'public' AND trigger_name LIKE 'trg_%'
ORDER BY event_object_table, trigger_name;

-- 7) Grants en tablas para anon
SELECT grantee, table_name, string_agg(privilege_type, ', ' order by privilege_type) as privileges
FROM information_schema.role_table_grants
WHERE table_schema = 'public' AND grantee = 'anon'
GROUP BY grantee, table_name ORDER BY grantee, table_name;
-- ================================================================
-- VERIFICACIÓN POST-MIGRACIÓN (FASE 2)
-- Corre en: supabase db query --linked --file supabase/audits/02_verify_rls.sql
-- Reporta PASS/FAIL por check crítico (SQL estándar, compatible con psql).
-- ================================================================

-- CHECK 1: RLS habilitado en todas las tablas críticas
SELECT 'CHECK 1: RLS enabled en tablas críticas' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_class c
         JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = 'public'
           AND c.relkind = 'r'
           AND c.relname IN ('profiles','quotes','notas','vehicles','state_plates','calculator_settings')
           AND c.relrowsecurity IS NOT TRUE
       ) THEN 'FAIL' ELSE 'PASS' END AS result;

-- CHECK 2: No hay políticas con USING(true) que expongan datos sensibles
SELECT 'CHECK 2: No USING(true) en tabs. sensibles' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_policy pl
         JOIN pg_class c ON c.oid = pl.polrelid
         JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = 'public'
           AND c.relname IN ('profiles','notas')
           AND pg_get_expr(pl.polqual, c.oid) LIKE '%(true)%'
       ) THEN 'FAIL' ELSE 'PASS' END AS result;

-- CHECK 3: delete_user no expuesto a anon (usa has_function_privilege)
SELECT 'CHECK 3: delete_user restringido' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_proc p
         JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname = 'public'
           AND p.proname = 'delete_user'
           AND EXISTS (
             SELECT 1 FROM pg_roles r
             WHERE r.rolname = 'anon'
               AND has_function_privilege(r.oid, p.oid, 'execute')
           )
       ) THEN 'FAIL' ELSE 'PASS' END AS result;

-- CHECK 4: is_admin() helper existe, SECURITY DEFINER, search_path vacío
SELECT 'CHECK 4: Helper is_admin() seguro' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_proc p
         JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname = 'public'
           AND p.proname = 'is_admin'
           AND p.prosecdef IS TRUE
       ) AND NOT EXISTS (
         SELECT 1 FROM pg_proc p
         JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname = 'public'
           AND p.proname = 'is_admin'
           AND (p.proconfig::text NOT LIKE '%search_path%')
       ) THEN 'PASS' ELSE 'FAIL' END AS result;

-- CHECK 5: anon sin acceso directo a profiles
SELECT 'CHECK 5: anon sin acceso a profiles' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM information_schema.role_table_grants
         WHERE table_schema = 'public' AND table_name = 'profiles' AND grantee = 'anon'
       ) THEN 'FAIL' ELSE 'PASS' END AS result;

-- CHECK 6: get_profile_by_seller no expone recovery_email
SELECT 'CHECK 6: get_profile_by_seller no expone columna sensible' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_proc p
         JOIN pg_namespace n ON n.oid = p.pronamespace
         WHERE n.nspname = 'public'
           AND p.proname = 'get_profile_by_seller'
           AND pg_get_functiondef(p.oid) ILIKE '%recovery_email%'
       ) THEN 'FAIL' ELSE 'PASS' END AS result;

-- CHECK 7: delete en quotes solo para admins
SELECT 'CHECK 7: DELETE en quotes solo admins' AS check_name,
       CASE WHEN EXISTS (
         SELECT 1 FROM pg_policy pl
         JOIN pg_class c ON c.oid = pl.polrelid
         JOIN pg_namespace n ON n.oid = c.relnamespace
         WHERE n.nspname = 'public'
           AND c.relname = 'quotes'
           AND pl.polcmd = 'd'  -- DELETE
           AND pg_get_expr(pl.polqual, c.oid) NOT LIKE '%is_admin%'
       ) THEN 'FAIL' ELSE 'PASS' END AS result;