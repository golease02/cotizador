-- =====================================================================
-- Fix: un socio no podia fijar ni marcar como revisada cotizaciones de su red.
-- ---------------------------------------------------------------------
-- El trigger secure_quotes_row bloqueaba revisada/fijada/color/status_color/last_reviewed_at
-- salvo para super_admin, devolviendo HTTP 400 al socio al fijar o revisar.
-- La funcion se recrea permitiendo tambien al SOCIO dueno del vendedor (quotes.seller_id -> profiles.socio_id).
-- Patron de scope consistente con can_access_seguimiento().
-- Idempotente: DROP IF EXISTS antes de CREATE.

BEGIN;

DROP TRIGGER IF EXISTS trg_quotes_secure_row ON public.quotes;
DROP FUNCTION IF EXISTS public.secure_quotes_secure_row();
DROP FUNCTION IF EXISTS public.secure_quotes_row();

CREATE OR REPLACE FUNCTION public.secure_quotes_row()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
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

CREATE TRIGGER trg_quotes_secure_row
BEFORE UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.secure_quotes_row();

COMMIT;

