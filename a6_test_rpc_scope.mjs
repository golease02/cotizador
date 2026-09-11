// Prueba Bloque 3: alcance de RPCs por rol (super_admin vs socio), corregida.
import { createClient } from '@supabase/supabase-js';

const url = 'https://bcsvqvibccfnsmagwkbr.supabase.co';
const key = 'sb_publishable_4XCIFFvfgb1Q8iUvauRFnw_0qy4kfLM';
const supabase = createClient(url, key);
const log = (...a) => console.log(...a);

const socioEmail = `socio.test.${Date.now()}@golease.com`;
const sellerEmail = `vendedor.test.${Date.now()}@golease.com`;
const pass = 'Test12345!';

// ---------- 1) SUPER ADMIN (scope NULL = global) ----------
const sa = await supabase.auth.signInWithPassword({ email: 'golease02@gmail.com', password: '123456' });
if (sa.error) { log('✖ superadmin signin:', sa.error.message); process.exit(1); }
log('✓ super admin:', sa.data.user.id);

let { data, error } = await supabase.rpc('get_sellers_with_quote_counts');
log('  sellers (admin) rows:', data?.length ?? 0, error?.message ?? '');
const stats = await supabase.rpc('get_admin_stats');
log('  stats (admin) totalSellers:', stats.data?.totalSellers, 'totalQuotes:', stats.data?.totalQuotes, stats.error?.message ?? '');

// ---------- 2) Crear socio y vendedor de prueba ----------
let u1 = await supabase.auth.signUp({ email: socioEmail, password: pass });
let u2 = await supabase.auth.signUp({ email: sellerEmail, password: pass });
if (u1.error || u2.error) { log('✖ signUp testusers:', (u1.error ?? u2.error).message); process.exit(1); }
const socioId = u1.data.user.id;
const sellerId = u2.data.user.id;

let p1 = await supabase.auth.updateUser({ data: { full_name: 'Socio Test' } });
let p2 = await supabase.auth.updateUser({ data: { full_name: 'Vendedor Test' } });

const up1 = await supabase.from('profiles').update({ role: 'socio', seller_number: '5599001122', active: true, full_name: 'Socio Test' }).eq('id', socioId);
const up2 = await supabase.from('profiles').update({ role: 'seller', seller_number: '5599002233', active: true, full_name: 'Vendedor Test', socio_id: socioId }).eq('id', sellerId);
if (up1.error || up2.error) { log('✖ profile update:', (up1.error ?? up2.error).message); process.exit(1); }
log('✓ test users creados:', socioEmail, '/', sellerEmail);

// una cotización ligada al vendedor de prueba
const ins = await supabase.from('quotes').insert({ seller_id: sellerId, client_name: 'Cliente Test', brand: 'TOYOTA', model: 'HILUX', pricenet: 1000 }).select('id');
if (ins.error) { log('✖ insert quote:', ins.error.message); process.exit(1); }
log('✓ quote test insertada:', ins.data[0].id);

// confirmar emails en auth (por si el proyecto exige confirmación)
await supabase.auth.signOut();

// ---------- 3) SESIÓN COMO SOCIO ----------
const so = await supabase.auth.signInWithPassword({ email: socioEmail, password: pass });
if (so.error) { log('  (email sin confirmar; se confirmará por CLI) ', so.error.message); }
else {
  log('✓ socio autenticado:', so.data.user.id);
  const s2 = await supabase.rpc('get_sellers_with_quote_counts');
  log('  sellers (socio) rows:', s2.data?.length ?? 0, '| owner:', s2.data?.[0]?.seller?.full_name ?? '-', s2.error?.message ?? '');
  const st2 = await supabase.rpc('get_admin_stats');
  log('  stats (socio) totalSellers:', st2.data?.totalSellers, 'totalQuotes:', st2.data?.totalQuotes, '| top:', st2.data?.topVehicles?.[0]?.name ?? '-', st2.error?.message ?? '');
}
console.log('\nIDS_PARA_LIMPIAR=' + socioId + ',' + sellerId);