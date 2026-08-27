BEGIN;

-- ============================================================
-- Migration: Seed catálogos de vehículos y placas de estado
-- Fuente: COT GO WEB.csv
-- ============================================================

-- ============================================================
-- STATE_PLATES (Alta de placas de estado)
-- Costos extraídos del archivo CSV "COT GO WEB.csv"
-- El campo 'costnet' incluye IVA (el cotizador lo divide entre 1.16 para obtener el neto)
-- La opción 'pendiente' es obligatoria: es la opción por defecto del cotizador (costo $0)
-- ============================================================
INSERT INTO public.state_plates (id, name, costnet)
VALUES
    ('cdmx',          'Alta de placas CDMX',                    1432),
    ('edomex',        'Alta de placas Edo de Mex',              1432),
    ('guanajuato',    'Alta de placas Guanajuato',              4454),
    ('michoacan',     'Alta de placas Michoacan',               7948),
    ('queretaro',     'Alta de placas Querétaro',               6679),
    ('slp',           'Alta de placas San Luis Potosi',          6933),
    ('jalisco',       'Alta Placas Jalisco',                    11460),
    ('pendiente',     'Alta de placas pendientes x cotizar',        0)
ON CONFLICT (id) DO UPDATE
    SET name = EXCLUDED.name,
        costnet = EXCLUDED.costnet;

-- ============================================================
-- VEHICLES (Catálogo de vehículos preestablecidos)
-- Datos extraídos del archivo CSV "COT GO WEB.csv"
-- Marca: HINO, Modelo: 616 LONG, Año: 2026, Precio Neto: $407,900
-- ============================================================
INSERT INTO public.vehicles (id, brand, model, suggestedpricenet, ishybridorelectric, year)
VALUES
    ('veh_hino_616long_2026', 'HINO', '616 LONG', 407900, false, 2026)
ON CONFLICT (id) DO UPDATE
    SET brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        suggestedpricenet = EXCLUDED.suggestedpricenet,
        ishybridorelectric = EXCLUDED.ishybridorelectric,
        year = EXCLUDED.year;

-- ============================================================
-- RLS (Row Level Security)
-- Habilita el acceso de escritura para administradores y de
-- lectura para cualquier usuario autenticado.
-- ============================================================

-- ---- STATE_PLATES ----
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'state_plates'
    ) THEN
        ALTER TABLE public.state_plates ENABLE ROW LEVEL SECURITY;

        -- Todos los usuarios autenticados pueden consultar el catálogo de placas
        CREATE POLICY "state_plates_select_authenticated"
            ON public.state_plates FOR SELECT
            TO authenticated
            USING (true);

        -- Solo los administradores pueden escribir en el catálogo
        CREATE POLICY "state_plates_admin_insert"
            ON public.state_plates FOR INSERT
            TO authenticated
            WITH CHECK (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));

        CREATE POLICY "state_plates_admin_update"
            ON public.state_plates FOR UPDATE
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ))
            WITH CHECK (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));

        CREATE POLICY "state_plates_admin_delete"
            ON public.state_plates FOR DELETE
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));
    END IF;
END $$;

-- ---- VEHICLES ----
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'vehicles'
    ) THEN
        ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

        CREATE POLICY "vehicles_select_authenticated"
            ON public.vehicles FOR SELECT
            TO authenticated
            USING (true);

        CREATE POLICY "vehicles_admin_insert"
            ON public.vehicles FOR INSERT
            TO authenticated
            WITH CHECK (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));

        CREATE POLICY "vehicles_admin_update"
            ON public.vehicles FOR UPDATE
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ))
            WITH CHECK (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));

        CREATE POLICY "vehicles_admin_delete"
            ON public.vehicles FOR DELETE
            TO authenticated
            USING (EXISTS (
                SELECT 1 FROM public.profiles
                WHERE id = auth.uid() AND role = 'admin'
            ));
    END IF;
END $$;




ROLLBACK;
