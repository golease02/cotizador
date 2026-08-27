begin;

alter table public.quotes
  drop constraint if exists quotes_color_check;

alter table public.quotes
  add constraint quotes_color_check
  check (color = any (array['reciente'::text, 'verde'::text, 'amarillo'::text, 'rojo'::text]));

alter table public.quotes
  alter column color set default 'reciente';

update public.quotes
set color = 'reciente'
where coalesce(revisada, false) = false
  and color = 'verde';

commit;
