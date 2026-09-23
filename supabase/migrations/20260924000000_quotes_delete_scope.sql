/* ============================================================
   AJUSTES 12 (24/09/2026) — Borrado manual de cotizaciones con scope
   ============================================================
   El botón ELIMINAR del Seguimiento borra filas de `public.quotes`
   (cotizaciones repetidas o que no se van a usar). El borrado debe
   funcionar para super_admin Y para el socio dueño de la red
   (vendedor cuyo profiles.socio_id = auth.uid()).
   Las migraciones 1-13 no están en disco; por eso este archivo es
   AUTOCONTENIDO e IDEMPOTENTE (no asume políticas previas):
   - Crea helpers SECURITY DEFINER propios (evitan recursión de RLS).
   - Elimina CUALQUIER política DELETE previa en quotes/notas (nombres
     desconocidos) antes de crear las nuevas.
   - `quote_seguimiento` cae por ON DELETE CASCADE (sin cambios).
   - Las `notas` con entidad_tipo='quote' no tienen FK: se borran a mano
     desde el cliente; esta migración les da el mismo alcance.
   Aplicar con: npx supabase db push
   ============================================================ */

begin;

-- ------------------------------------------------------------
-- 1. Helpers SECURITY DEFINER (set search_path fijo)
-- ------------------------------------------------------------
create or replace function public.seg_quote_owner(p_quote_id bigint)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.quotes q
    join public.profiles v on v.id = q.seller_id
    join public.profiles yo on yo.id = auth.uid()
    where q.id = p_quote_id
      and v.socio_id = yo.id
      and yo.role = 'socio'
      and coalesce(yo.active, true) = true
  );
$$;

create or replace function public.seg_note_owner(p_entidad_tipo text, p_entidad_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select case
    when p_entidad_tipo = 'quote' then public.seg_quote_owner(p_entidad_id::bigint)
    when p_entidad_tipo = 'seller' then exists (
      select 1
      from public.profiles v
      join public.profiles yo on yo.id = auth.uid()
      where v.id = p_entidad_id::uuid
        and v.socio_id = yo.id
        and yo.role = 'socio'
        and coalesce(yo.active, true) = true
    )
    else false
  end;
$$;

revoke all on function public.seg_quote_owner(bigint) from public, anon;
grant execute on function public.seg_quote_owner(bigint) to authenticated, service_role;

revoke all on function public.seg_note_owner(text, text) from public, anon;
grant execute on function public.seg_note_owner(text, text) to authenticated, service_role;

-- ------------------------------------------------------------
-- 2. DELETE en quotes: super_admin + socio dueño de la red
-- ------------------------------------------------------------
do $$
declare
  pol record;
begin
  -- Eliminar cualquier política DELETE previa (nombres desconocidos).
  for pol in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'quotes'
      and cmd = 'DELETE'
  loop
    execute format('drop policy if exists %I on public.quotes', pol.policyname);
  end loop;

  -- Nueva política con alcance por socio.
  execute $sql$
    create policy quotes_delete_scope
      on public.quotes
      for delete
      to authenticated
      using (
        public.is_super_admin()
        or public.seg_quote_owner(id)
      )
  $sql$;
end
$$;

-- ------------------------------------------------------------
-- 3. DELETE en notas: super_admin + socio dueño (quote o seller)
-- ------------------------------------------------------------
do $$
declare
  pol record;
begin
  -- Eliminar cualquier política DELETE previa que NO use is_admin
  -- (las que usan is_admin se conservan: el super admin ya está cubierto).
  for pol in
    select policyname, qual
    from pg_policies
    where schemaname = 'public'
      and tablename = 'notas'
      and cmd = 'DELETE'
      and coalesce(qual, '') not like '%is_admin%'
  loop
    execute format('drop policy if exists %I on public.notas', pol.policyname);
  end loop;

  -- Política adicional de alcance por socio (aditiva: no toca is_admin).
  drop policy if exists notas_delete_scope on public.notas;
  execute $sql$
    create policy notas_delete_scope
      on public.notas
      for delete
      to authenticated
      using (public.seg_note_owner(entidad_tipo, entidad_id))
  $sql$;
end
$$;

commit;
