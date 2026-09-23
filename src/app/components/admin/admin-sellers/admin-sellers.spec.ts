import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { AdminSellersComponent } from './admin-sellers';
import { AuthService, Profile } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import {
  getSupabaseClient,
  resetSessionReady,
  setSessionUser,
} from '../../../services/supabase-client';

// Se simula solo Supabase; los servicios y el template del panel son reales.
describe('AdminSellersComponent scope', () => {
  const client = getSupabaseClient();
  let fixture: ComponentFixture<AdminSellersComponent>;
  let component: AdminSellersComponent;
  let scope: AdminScopeService;
  let auth: AuthService;
  let profile: Profile;
  let network: { id: string }[];
  let networkError: object | null;
  let rpc: ReturnType<typeof vi.spyOn>;
  let quoteIn = vi.fn<(column: string, values: string[]) => void>();
  const sellers = [
    { id: 'seller-a', full_name: 'Ana', active: true, agency_brand: 'TOYOTA', quote_count: 2 },
    { id: 'seller-b', full_name: 'Beto', active: false, agency_brand: 'FORD', quote_count: 5 },
  ];
  const payload = () => ({ data: sellers.map((seller) => ({ seller })), error: null });

  beforeEach(async () => {
    localStorage.removeItem('golease_admin_scope');
    resetSessionReady();
    profile = {
      id: 'admin-a',
      email: 'admin@example.test',
      full_name: 'Admin',
      role: 'super_admin',
      active: true,
    };
    network = [{ id: 'seller-a' }];
    networkError = null;
    quoteIn = vi.fn();
    vi.spyOn(client.auth, 'getSession').mockResolvedValue({ data: { session: null }, error: null });
    vi.spyOn(client, 'from').mockImplementation((table: string): any => {
      let columns = '';
      let ids: string[] | undefined;
      const query: any = {
        select: vi.fn((value: string) => {
          columns = value;
          return query;
        }),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        in: vi.fn((column: string, values: string[]) => {
          if (table === 'quotes') {
            quoteIn(column, values);
            ids = values;
          }
          return query;
        }),
        maybeSingle: vi.fn(async () => ({ data: profile, error: null })),
        then: (resolve: (value: unknown) => unknown) => {
          const quotes = sellers.map((s) => ({
            seller_id: s.id,
            revisada: true,
            created_at: new Date().toISOString(),
          }));
          const data =
            table === 'quotes'
              ? quotes.filter((q) => !ids || ids.includes(q.seller_id))
              : columns === 'id'
                ? network
                : [];
          return Promise.resolve({ data, error: columns === 'id' ? networkError : null }).then(
            resolve,
          );
        },
      };
      return query;
    });
    rpc = vi.spyOn(client, 'rpc').mockImplementation((): any => Promise.resolve(payload()));
    await TestBed.configureTestingModule({
      imports: [AdminSellersComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    auth = TestBed.inject(AuthService);
    setSessionUser({ id: profile.id } as User);
    await auth.loadProfile(profile.id);
    scope = TestBed.inject(AdminScopeService);
    TestBed.tick();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    resetSessionReady();
    localStorage.removeItem('golease_admin_scope');
    vi.restoreAllMocks();
  });

  async function render() {
    fixture = TestBed.createComponent(AdminSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => expect(component.loading).toBe(false));
    fixture.detectChanges();
  }

  // NOTA (Ajuste 11): el toggle "Solo mi red" fue eliminado. El super admin ve
  // siempre la red completa y el alcance de socio/seller lo impone RLS + RPCs
  // server-side, así que ya no existe filtrado local que probar.
  it('should render the full network list without local scope filtering', async () => {
    await render();
    expect(component.filteredSellers()).toHaveLength(2);
    expect(fixture.nativeElement.textContent).toContain('Ana');
    expect(fixture.nativeElement.textContent).toContain('Beto');
  });

  it('should link to the seller quotes with the seller filter when the detail drawer opens', async () => {
    await render();
    component.openDetail(component.sellers()[0]);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector(
      '.detail-drawer .detail-quotes-link',
    ) as HTMLAnchorElement | null;
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toContain('/admin/seguimiento');
    expect(link!.getAttribute('href')).toContain('seller=seller-a');
    expect(link!.textContent).toContain('Ver cotizaciones del vendedor');
  });

  it('should hide the quotes link when the profile lacks the quotes permission', async () => {
    profile = { ...profile, role: 'socio', permisos: { sellers: true } };
    await auth.loadProfile(profile.id);
    await render();
    component.openDetail(component.sellers()[0]);
    fixture.detectChanges();
    expect(component.canViewQuotes).toBe(false);
    expect(fixture.nativeElement.querySelector('.detail-quotes-link')).toBeNull();
    // El enlace apunta a Seguimiento (Ajuste 11): el mensaje del drawer lo refleja.
    expect(fixture.nativeElement.textContent).toContain('no tiene acceso al módulo de Seguimiento');
  });

  it('should mantener el catalogo de marcas en orden alfabetico y sin duplicados', () => {
    const marcas = component.brands;

    expect(marcas).toEqual([...marcas].sort());
    expect(new Set(marcas).size).toBe(marcas.length);
  });
});
