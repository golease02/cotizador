-- 20260922030000_profiles_socio_reassign_on_delete.sql
-- Al eliminar un socio, sus vendedores se reasignan automaticamente a la
-- cuenta por defecto del super administrador (seller_number 4421086183).
-- La FK profiles.socio_id queda ademas en ON DELETE SET NULL como red de
-- seguridad: el borrado nunca se bloquea.
-- Autocontenida e idempotente. Aplica con: npx supabase db push

BEGIN;

-- 1) Red de seguridad: socio_id -> SET NULL.
DO $$
DECLARE
  c text;
BEGIN
  SELECT con.conname INTO c
  FROM pg_constraint con
  JOIN pg_class tbl ON tbl.oid = con.conrelid
  JOIN pg_namespace ns ON ns.oid = tbl.relnamespace
  JOIN pg_class ref ON ref.oid = con.confrelid
  WHERE ns.nspname = 'public' AND con.contype = 'f'
    AND tbl.relname = 'profiles' AND ref.relname = 'profiles'
    AND con.confdeltype IN ('a', 'r')
    AND array_length(con.conkey, 1) = 1
    AND (
      SELECT a.attname FROM unnest(con.conkey) AS k(attnum)
      JOIN pg_attribute a ON a.attrelid = con.conrelid AND a.attnum = k.attnum
    ) = 'socio_id';
  IF c IS NOT NULL THEN
    EXECUTE format('ALTER TABLE public.profiles DROP CONSTRAINT %I', c);
    EXECUTE format('ALTER TABLE public.profiles ADD CONSTRAINT %I FOREIGN KEY (socio_id) REFERENCES public.profiles(id) ON DELETE SET NULL', c);
    RAISE NOTICE 'FK % recreada con ON DELETE SET NULL', c;
  END IF;
END $$;

-- 2) Reasignacion automatica a la cuenta por defecto antes de borrar.
CREATE OR REPLACE FUNCTION public.reassign_sellers_to_default_socio()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $fn$
DECLARE
  v_default uuid;
BEGIN
  IF OLD.id IS NULL THEN
    RETURN OLD;
  END IF;
  SELECT id INTO v_default
  FROM public.profiles
  WHERE role = 'super_admin' AND active AND seller_number = '4421086183'
  LIMIT 1;
  IF v_default IS NULL OR v_default = OLD.id THEN
    RETURN OLD;
  END IF;
  UPDATE public.profiles SET socio_id = v_default WHERE socio_id = OLD.id;
  RETURN OLD;
END $fn$;

DROP TRIGGER IF EXISTS trg_reassign_sellers_on_delete ON public.profiles;
CREATE TRIGGER trg_reassign_sellers_on_delete
  BEFORE DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.reassign_sellers_to_default_socio();

REVOKE EXECUTE ON FUNCTION public.reassign_sellers_to_default_socio() FROM PUBLIC, anon, authenticated;

COMMIT;
