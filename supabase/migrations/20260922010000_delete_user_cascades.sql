-- 20260922010000_delete_user_cascades.sql
-- Permite eliminar usuarios aunque tengan cotizaciones o notas:
-- recrea con ON DELETE CASCADE las FK de public.notas y public.quotes
-- hacia auth.users sin accion, y limpia las notas huerfanas sobre el perfil.
-- Autocontenida e idempotente. Aplica con: npx supabase db push

BEGIN;

-- 1) FKs hacia auth.users sin accion -> ON DELETE CASCADE.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT con.conname, tbl.relname AS table_name, att.attname AS column_name
    FROM pg_constraint con
    JOIN pg_class tbl ON tbl.oid = con.conrelid
    JOIN pg_namespace ns ON ns.oid = tbl.relnamespace
    JOIN pg_class ref ON ref.oid = con.confrelid
    JOIN unnest(con.conkey) AS k(attnum) ON true
    JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = k.attnum
    JOIN pg_namespace rns ON rns.oid = ref.relnamespace
    WHERE ns.nspname = 'public' AND con.contype = 'f'
      AND con.confdeltype IN ('a', 'r')
      AND rns.nspname = 'auth' AND ref.relname = 'users'
      AND tbl.relname IN ('notas', 'quotes')
      AND array_length(con.conkey, 1) = 1
  LOOP
    EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT %I', r.table_name, r.conname);
    EXECUTE format('ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES auth.users(id) ON DELETE CASCADE', r.table_name, r.conname, r.column_name);
    RAISE NOTICE 'FK % recreada con ON DELETE CASCADE', r.conname;
  END LOOP;
END $$;

-- 2) Limpieza de notas huerfanas sobre el perfil eliminado.
CREATE OR REPLACE FUNCTION public.cleanup_seller_notes_on_delete()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $fn$
BEGIN
  DELETE FROM public.notas WHERE entidad_tipo = 'seller' AND entidad_id = OLD.id::text;
  RETURN OLD;
END $fn$;

DROP TRIGGER IF EXISTS trg_cleanup_seller_notes ON public.profiles;
CREATE TRIGGER trg_cleanup_seller_notes
  AFTER DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.cleanup_seller_notes_on_delete();

REVOKE EXECUTE ON FUNCTION public.cleanup_seller_notes_on_delete() FROM PUBLIC, anon, authenticated;

COMMIT;
