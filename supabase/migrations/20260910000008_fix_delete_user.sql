-- ============================================================
-- 2026-09-14 — Fix RPC delete_user: referencia ambigua de user_id
--
-- Error en producción:  column reference "user_id" is ambiguous
--   POST /rest/v1/rpc/delete_user -> 400 (Bad Request)
--
-- Causa: el parámetro de la función se llamaba igual que la columna
-- user_id de auth.identities. En PL/pgSQL, la sentencia
--   delete from auth.identities where user_id = user_id
-- no puede resolver si cada referencia es la columna o el parámetro.
--
-- Solución: renombrar el parámetro a p_user_id y calificar TODAS las
-- columnas con su tabla. Misma semántica y mismo GRANT.
-- Nota: al cambiar el nombre del parámetro hay que actualizar la llamada
-- del cliente (notación nombrada) en auth.service.ts -> { p_user_id }.
-- ============================================================
BEGIN;

DROP FUNCTION IF EXISTS public.delete_user(uuid);

CREATE OR REPLACE FUNCTION public.delete_user(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
begin
  if not exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'super_admin'
      and coalesce(profiles.active, true) = true
  ) then
    raise exception 'Solo el super admin puede eliminar usuarios.';
  end if;

  if p_user_id = auth.uid() then
    raise exception 'No puedes eliminar tu propio usuario.';
  end if;

  delete from public.profiles where public.profiles.id      = p_user_id;
  delete from auth.identities where auth.identities.user_id = p_user_id
    and auth.identities.provider = 'email';
  delete from auth.users      where auth.users.id           = p_user_id;
end;
$$;

GRANT EXECUTE ON FUNCTION public.delete_user(uuid) TO authenticated;

COMMIT;