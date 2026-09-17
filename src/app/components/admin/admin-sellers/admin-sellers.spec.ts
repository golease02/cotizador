import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    await TestBed.configureTestingModule({ imports: [AdminSellersComponent] }).compileComponents();
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

  async function selectScope(value: 'red' | 'todos') {
    await scope.setScope(value);
    fixture.detectChanges();
    await fixture.whenStable();
    await vi.waitFor(() => expect(component.loading).toBe(false));
    fixture.detectChanges();
  }

  it('should update the rendered list when switching from all sellers to own sellers and back', async () => {
    await render();
    expect(component.filteredSellers()).toHaveLength(2);
    await selectScope('red');
    expect(component.filteredSellers().map((s) => s.id)).toEqual(['seller-a']);
    expect(fixture.nativeElement.textContent).toContain('Ana');
    expect(fixture.nativeElement.textContent).not.toContain('Beto');
    await selectScope('todos');
    expect(component.filteredSellers()).toHaveLength(2);
  });

  it('should scope metrics and brands when own sellers are selected', async () => {
    await scope.setScope('red');
    await render();
    expect(component.stats).toEqual({ total: 1, activos: 1, inactivos: 0, cotizaciones: 2 });
    expect(component.brandsList).toEqual(['TOYOTA']);
  });

  it('should scope quote colors when own sellers are selected', async () => {
    await scope.setScope('red');
    await render();
    expect(quoteIn).toHaveBeenCalledWith('seller_id', ['seller-a', 'admin-a']);
    expect(Object.keys(component.sellersQuoteColors())).toEqual(['seller-a']);
  });

  it('should show an empty list when no sellers belong to the administrator', async () => {
    network = [];
    await scope.setScope('red');
    await render();
    expect(component.filteredSellers()).toEqual([]);
    expect(component.stats.total).toBe(0);
  });

  it('should preserve search and status filters when switching scope', async () => {
    await render();
    component.searchTerm = 'Beto';
    component.setStatusFilter('inactivos');
    await selectScope('red');
    expect(component.filteredSellers()).toEqual([]);
    await selectScope('todos');
    expect(component.filteredSellers().map((s) => s.id)).toEqual(['seller-b']);
  });

  it('should ignore an older list response when a newer scope request has completed', async () => {
    await render();
    let resolve!: (value: ReturnType<typeof payload>) => void;
    rpc.mockImplementationOnce(
      (): any =>
        new Promise((r) => {
          resolve = r;
        }),
    );
    const pending = component.loadSellers(false);
    await selectScope('red');
    resolve({ data: [{ seller: { ...sellers[0], full_name: 'Obsoleto' } }], error: null });
    await pending;
    expect(component.sellers()[0].full_name).toBe('Ana');
    expect(component.loading).toBe(false);
  });

  it('should retain server scoped results when the current user is a socio', async () => {
    profile = { ...profile, role: 'socio' };
    await auth.loadProfile(profile.id);
    await render();
    await selectScope('red');
    expect(scope.isRedMode()).toBe(false);
    expect(component.filteredSellers()).toHaveLength(2);
  });

  it('should avoid displaying all sellers when loading the network fails', async () => {
    networkError = { message: 'offline' };
    await scope.setScope('red');
    await render();
    expect(component.filteredSellers()).toEqual([]);
    expect(scope.error()).toContain('Mis vendedores');
  });
});
