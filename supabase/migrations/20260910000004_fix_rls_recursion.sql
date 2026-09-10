-- ============================================================
-- 2026-09-10 — FIX: recursión infinita en políticas RLS
--   * Causa: las policies de profiles/quotes sub-consultaban
--     public.profiles dentro de su propia policy => bucle
--     "infinite recursion detected in policy" (42P17).
--   * Fix: mover las sub-consultas a funciones SECURITY DEFINER
--     (ejecutan con privilegios del propietario y no invocan RLS).
-- ============================================================
BEGIN;

-- 1) Helper: el usuario actual es el socio dueño de un perfil-seller
--    (el perfil-seller tiene socio_id = auth.uid() y el actual es socio).
CREATE OR REPLACE FUNCTION public.is_socio_owner_of(target_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles me
    JOIN public.profiles target ON target.id = target_id
    WHERE me.id = auth.uid()
      AND me.role = 'socio'
      AND me.active IS DISTINCT FROM false
      AND target.socio_id = me.id
  );
$func$;

-- 2) Helper: el usuario actual pertenece al mismo grupo de socio que el target
--    (sellers bajo el mismo socio). Super admin ya cubierto por is_super_admin().
CREATE OR REPLACE FUNCTION public.shares_socio_group(target_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles me
    JOIN public.profiles target ON target.id = target_id
    WHERE me.id = auth.uid()
      AND me.role IN ('socio', 'super_admin')
      AND me.active IS DISTINCT FROM false
      AND me.socio_id IS NOT NULL
      AND me.socio_id = target.socio_id
  );
$func$;

-- 3) Helper completo para SELECT/UPDATE sobre profiles
CREATE OR REPLACE FUNCTION public.can_view_profile(target_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT auth.uid() = target_id
      OR public.is_super_admin()
      OR public.is_socio_owner_of(target_id)
      OR public.shares_socio_group(target_id);
$func$;

-- 4) Helper completo para SELECT/UPDATE sobre quotes
CREATE OR REPLACE FUNCTION public.can_view_quote(target_seller_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = ''
AS $func$
  SELECT auth.uid() = target_seller_id
      OR public.is_super_admin()
      OR EXISTS (
        SELECT 1
        FROM public.profiles s
        JOIN public.profiles m ON m.id = s.socio_id
        WHERE s.id = target_seller_id
          AND m.id = auth.uid()
          AND m.role = 'socio'
          AND m.active IS DISTINCT FROM false
      );
$func$;

-- 5) Reescribir políticas de profiles (quitamos las sub-consultas inline)
DROP POLICY IF EXISTS "profiles_select_socio" ON public.profiles;
CREATE POLICY "profiles_select_socio"
ON public.profiles FOR SELECT
USING (public.can_view_profile(id));

DROP POLICY IF EXISTS "profiles_update_socio" ON public.profiles;
CREATE POLICY "profiles_update_socio"
ON public.profiles FOR UPDATE
USING (public.can_view_profile(id))
WITH CHECK (
  auth.uid() = id
  OR public.is_super_admin()
  OR public.is_socio_owner_of(id)
  OR public.shares_socio_group(id)
);

-- 6) Reescribir políticas de quotes
DROP POLICY IF EXISTS "quotes_select_socio" ON public.quotes;
CREATE POLICY "quotes_select_socio"
ON public.quotes FOR SELECT
USING (public.can_view_quote(seller_id));

DROP POLICY IF EXISTS "quotes_update_socio" ON public.quotes;
CREATE POLICY "quotes_update_socio"
ON public.quotes FOR UPDATE
USING (public.can_view_quote(seller_id))
WITH CHECK (
  auth.uid() = seller_id
  OR public.is_super_admin()
  OR EXISTS (
    SELECT 1
    FROM public.profiles s
    JOIN public.profiles m ON m.id = s.socio_id
    WHERE s.id = quotes.seller_id
      AND m.id = auth.uid()
      AND m.role = 'socio'
      AND m.active IS DISTINCT FROM false
  )
);

-- 7) El trigger de defensa también lee profiles; hacerlo SECURITY DEFINER
--    para que una actualización no vuelva a invocar la policy de SELECT.
CREATE OR REPLACE FUNCTION public.secure_profiles_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $fn$
DECLARE
  cur_role text;
  session_role text;
BEGIN
  SELECT current_role INTO session_role;
  IF session_role IN ('postgres', 'supabase_admin', 'service_role') THEN
    RETURN NEW;
  END IF;

  SELECT role INTO cur_role FROM public.profiles WHERE id = auth.uid();
  IF cur_role IS NULL THEN cur_role := 'seller'; END IF;

  IF NEW.id IS DISTINCT FROM OLD.id AND NEW.id = auth.uid() THEN
    RAISE EXCEPTION 'No se puede modificar el id del usuario.';
  END IF;

  IF cur_role <> 'super_admin' THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Solo el super admin puede cambiar roles.';
    END IF;
    IF NEW.socio_id IS DISTINCT FROM OLD.socio_id AND NEW.id <> auth.uid() THEN
      RAISE EXCEPTION 'Solo el super admin puede reasignar vendedores entre socios.';
    END IF;
  END IF;

  IF NEW.active IS DISTINCT FROM OLD.active THEN
    IF cur_role <> 'super_admin' AND auth.uid() = NEW.id THEN
      RAISE EXCEPTION 'No puedes desactivar tu propia cuenta.';
    END IF;
  END IF;

  RETURN NEW;
END;
$fn$;

-- Grants
GRANT EXECUTE ON FUNCTION public.is_socio_owner_of(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.shares_socio_group(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_view_profile(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_view_quote(uuid) TO authenticated;

COMMIT;
