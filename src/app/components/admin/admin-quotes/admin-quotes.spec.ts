import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { AdminQuotesComponent } from './admin-quotes';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import {
  getSupabaseClient,
  resetSessionReady,
  setSessionUser,
} from '../../../services/supabase-client';

// Se simula solo Supabase; los servicios y el template del panel son reales.
describe('AdminQuotesComponent seller drill-down', () => {
  const client = getSupabaseClient();
  const createdAt = new Date().toISOString();
  const quotes = [
    {
      id: 'quote-a',
      seller_id: 'seller-a',
      client_name: 'Ana Cliente',
      brand: 'TOYOTA',
      model: 'Hilux',
      year: 2024,
      pricenet: 500000,
      termmonths: 36,
      color: 'verde',
      revisada: true,
      fijada: false,
      created_at: createdAt,
    },
    {
      id: 'quote-b',
      seller_id: 'seller-b',
      client_name: 'Beto Cliente',
      brand: 'FORD',
      model: 'Ranger',
      year: 2023,
      pricenet: 600000,
      termmonths: 24,
      color: 'verde',
      revisada: true,
      fijada: false,
      created_at: createdAt,
    },
  ];
  const sellers = [
    {
      id: 'seller-a',
      full_name: 'Ana',
      seller_number: '4421000001',
      agency_brand: 'TOYOTA',
      quote_count: 1,
    },
    {
      id: 'seller-b',
      full_name: 'Beto',
      seller_number: '4421000002',
      agency_brand: 'FORD',
      quote_count: 1,
    },
  ];
  let fixture: ComponentFixture<AdminQuotesComponent>;
  let component: AdminQuotesComponent;
  let scope: AdminScopeService;
  let auth: AuthService;
  let profile: any;
  let queryParams: Record<string, string>;

  beforeEach(async () => {
    localStorage.removeItem('golease_admin_scope');
    // El aviso de retención se muestra una vez por sesión: cada test parte limpio.
    sessionStorage.clear();
    resetSessionReady();
    // El drill-down del semáforo de vendedores llega como /admin/quotes?seller=<id>.
    queryParams = { seller: 'seller-a' };
    profile = {
      id: 'admin-a',
      email: 'admin@example.test',
      full_name: 'Admin',
      role: 'super_admin',
      active: true,
    };
    vi.spyOn(client.auth, 'getSession').mockResolvedValue({ data: { session: null }, error: null });
    vi.spyOn(client, 'from').mockImplementation((table: string): any => {
      let columns = '';
      const query: any = {
        select: vi.fn((value: string) => {
          columns = value;
          return query;
        }),
        eq: vi.fn(() => query),
        order: vi.fn(() => query),
        limit: vi.fn(() => query),
        in: vi.fn(() => query),
        update: vi.fn(() => query),
        maybeSingle: vi.fn(async () => ({ data: profile, error: null })),
        then: (resolve: (value: unknown) => unknown) => {
          let data: unknown[] = [];
          if (table === 'quotes') data = quotes;
          else if (table === 'notas') data = [{ entidad_id: 'quote-a' }];
          else if (table === 'profiles' && columns === 'id') data = [{ id: 'seller-a' }];
          return Promise.resolve({ data, error: null }).then(resolve);
        },
      };
      return query;
    });
    // RPC `get_sellers_with_quote_counts`: devuelve [{ seller: {...} }]
    vi.spyOn(client, 'rpc').mockImplementation((): any =>
      Promise.resolve({ data: sellers.map((seller) => ({ seller })), error: null }),
    );
    await TestBed.configureTestingModule({
      imports: [AdminQuotesComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              get queryParamMap() {
                return convertToParamMap(queryParams);
              },
            },
          },
        },
      ],
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
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  async function render() {
    fixture = TestBed.createComponent(AdminQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => expect(component.loading).toBe(false));
    fixture.detectChanges();
  }

  it('should pre-apply the seller filter from the URL query param', async () => {
    await render();
    expect(component.filtroVendedor).toBe('seller-a');
    expect(component.filteredQuotes().map((q) => q.id)).toEqual(['quote-a']);
    expect(component.vendedores.map((v) => v.id)).toEqual(['seller-a', 'seller-b']);
    // El desplegable de vendedores queda posicionado en el vendedor del drill-down
    // y el listado solo muestra sus cotizaciones.
    const selects = Array.from(
      fixture.nativeElement.querySelectorAll('select'),
    ) as HTMLSelectElement[];
    expect(selects.some((s) => s.value === 'seller-a')).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Ana Cliente');
    expect(fixture.nativeElement.textContent).not.toContain('Beto Cliente');
  });

  it('should keep the seller filter when the admin scope reloads', async () => {
    await render();
    expect(component.filtroVendedor).toBe('seller-a');

    await scope.setScope('red');
    TestBed.tick();
    await fixture.whenStable();
    await vi.waitFor(() => expect(scope.reloadCount()).toBeGreaterThan(0));

    expect(component.filtroVendedor).toBe('seller-a');
    expect(component.filteredQuotes().map((q) => q.id)).toEqual(['quote-a']);
  });

  it('should not filter by seller when the URL has no seller param', async () => {
    queryParams = {};
    await render();
    expect(component.filtroVendedor).toBe('todos');
    expect(component.filteredQuotes().map((q) => q.id)).toEqual(['quote-a', 'quote-b']);
  });
});