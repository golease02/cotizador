-- ============================================================
-- 2026-09-14 — Fix registro: RPC pública de socios
--   El formulario de registro ("¿Quién es tu contacto en GoLease?")
--   se llena SIN sesión (usuario anónimo). La policy RLS
--   profiles_select_socio exige auth.uid() = id OR is_super_admin()
--   OR ser el socio dueño, por lo que un anónimo obtiene 0 filas.
--
--   Solución: esta RPC SECURITY DEFINER expone ÚNICAMENTE los datos
--   mínimos (id, nombre y celular) de socios y super-admins ACTIVOS,
--   sin email, sin permisos y sin permitir escritura.
-- ============================================================
BEGIN;

-- Idempotencia: si cambia la firma/tipo de retorno hay que soltar antes.
DROP FUNCTION IF EXISTS public.get_public_socios();

CREATE OR REPLACE FUNCTION public.get_public_socios()
 RETURNS TABLE(id uuid, full_name text, seller_number text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
 AS $function$
   SELECT
     p.id::uuid           AS id,
     p.full_name::text    AS full_name,
     p.seller_number::text AS seller_number
   FROM public.profiles p
   WHERE p.role IN ('socio', 'super_admin')
     AND p.active IS DISTINCT FROM false
   ORDER BY p.full_name ASC NULLS LAST;
 $function$;

-- Permitir invocarla tanto sin sesión (registro) como autenticado.
GRANT EXECUTE ON FUNCTION public.get_public_socios() TO anon, authenticated;

COMMIT;