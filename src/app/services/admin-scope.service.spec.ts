import { TestBed } from '@angular/core/testing';
import type { User } from '@supabase/supabase-js';
import { AdminScopeService } from './admin-scope.service';
import { AuthService, Profile } from './auth.service';
import { AdminService } from './admin.service';
import { getSupabaseClient, resetSessionReady, setSessionUser } from './supabase-client';

// Solo se sustituye el cliente externo; AuthService y AdminScopeService son reales.
describe('AdminScopeService', () => {
  const client = getSupabaseClient();
  let auth: AuthService;
  let profile: Profile;
  let rows: { id: string }[];
  let queryError: object | null;
  let eq: ReturnType<typeof vi.fn>;

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
    rows = [{ id: 'seller-a' }];
    queryError = null;
    vi.spyOn(client.auth, 'getSession').mockResolvedValue({ data: { session: null }, error: null });
    const query: any = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn(async () => ({ data: profile, error: null })),
      then: (resolve: (value: unknown) => unknown) =>
        Promise.resolve({ data: rows, error: queryError }).then(resolve),
    };
    eq = query.eq;
    vi.spyOn(client, 'from').mockReturnValue(query);
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
    setSessionUser({ id: profile.id } as User);
    await auth.loadProfile(profile.id);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    resetSessionReady();
    localStorage.removeItem('golease_admin_scope');
    vi.restoreAllMocks();
  });

  function createScope() {
    const scope = TestBed.inject(AdminScopeService);
    TestBed.tick();
    return scope;
  }

  it('should default to all data when no preference exists', () => {
    expect(createScope().scope()).toBe('todos');
  });

  it('should query associated sellers and include own quotes when selecting the network', async () => {
    const scope = createScope();
    await scope.setScope('red');
    expect(eq).toHaveBeenCalledWith('role', 'seller');
    expect(eq).toHaveBeenCalledWith('socio_id', 'admin-a');
    expect(scope.sellerIds()).toEqual(new Set(['seller-a', 'admin-a']));
    expect(localStorage.getItem('golease_admin_scope')).toBe('red');
  });

  it('should restore the network when a persisted preference exists', async () => {
    localStorage.setItem('golease_admin_scope', 'red');
    const scope = createScope();
    await vi.waitFor(() => expect(scope.sellerIds().has('seller-a')).toBe(true));
    expect(scope.isRedMode()).toBe(true);
  });

  it('should include only own quotes when no sellers are associated', async () => {
    rows = [];
    const scope = createScope();
    await scope.setScope('red');
    expect(scope.sellerIds()).toEqual(new Set(['admin-a']));
  });

  it('should keep an empty network and report an error when the query fails', async () => {
    queryError = { message: 'offline' };
    const scope = createScope();
    await scope.setScope('red');
    expect(scope.isRedMode()).toBe(true);
    expect(scope.sellerIds().size).toBe(0);
    expect(scope.error()).toBeTruthy();
  });

  it('should discard an obsolete response when returning to all data', async () => {
    const scope = createScope();
    const pending = scope.setScope('red');
    await scope.setScope('todos');
    await pending;
    expect(scope.scope()).toBe('todos');
    expect(scope.sellerIds().size).toBe(0);
    expect(localStorage.getItem('golease_admin_scope')).toBeNull();
  });

  it.each(['socio', 'seller'] as const)(
    'should ignore the toggle when the role is %s',
    async (role) => {
      profile = { ...profile, role };
      await auth.loadProfile(profile.id);
      const scope = createScope();
      await scope.setScope('red');
      expect(scope.isScopeVisible()).toBe(false);
      expect(scope.isRedMode()).toBe(false);
    },
  );

  it('should allow dashboard without granular permissions when the role is socio', async () => {
    profile = { ...profile, role: 'socio', permisos: {} };
    await auth.loadProfile(profile.id);
    expect(auth.canAccessModule('dashboard')).toBe(true);
    expect(auth.canAccessModule('rendimiento')).toBe(true);
    expect(auth.canAccessModule('quotes')).toBe(false);
  });

  it('should deny admin modules when the role is seller even with permissions', async () => {
    profile = { ...profile, role: 'seller', permisos: { dashboard: true, quotes: true } };
    await auth.loadProfile(profile.id);
    expect(auth.canAccessModule('dashboard')).toBe(false);
    expect(auth.canAccessModule('quotes')).toBe(false);
  });

  it('should return zero metrics instead of global RPC data when the network is empty', async () => {
    const rpc = vi.spyOn(client, 'rpc');
    const admin = TestBed.inject(AdminService);
    const stats = await admin.getStats(new Set());
    const performance = await admin.getSellerPerformance(30, new Set());
    expect(stats.error).toBeNull();
    expect(stats.data.totalQuotes).toBe(0);
    expect(stats.data.totalSellers).toBe(0);
    expect(performance.data?.sellers).toEqual([]);
    expect(rpc).not.toHaveBeenCalled();
  });
});
