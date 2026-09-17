import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { AdminStatsComponent } from './admin-stats';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import {
  getSupabaseClient,
  resetSessionReady,
  setSessionUser,
} from '../../../services/supabase-client';

describe('AdminStatsComponent scope reload', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
    resetSessionReady();
    localStorage.removeItem('golease_admin_scope');
    vi.restoreAllMocks();
  });

  it('should retain network metrics when an older global response arrives last', async () => {
    localStorage.removeItem('golease_admin_scope');
    resetSessionReady();
    const client = getSupabaseClient();
    const profile = {
      id: 'admin-a',
      email: 'admin@example.test',
      full_name: 'Admin',
      role: 'super_admin',
      active: true,
    };
    vi.spyOn(client.auth, 'getSession').mockResolvedValue({ data: { session: null }, error: null });
    vi.spyOn(client, 'from').mockImplementation((table: string): any => {
      const query: any = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn(async () => ({ data: profile, error: null })),
        then: (resolve: (value: unknown) => unknown) =>
          Promise.resolve({
            data: table === 'profiles' ? [{ id: 'seller-a', active: true }] : [],
            error: null,
          }).then(resolve),
      };
      return query;
    });
    let resolveGlobal!: (value: any) => void;
    const globalResponse = new Promise<any>((resolve) => {
      resolveGlobal = resolve;
    });
    vi.spyOn(client, 'rpc').mockReturnValue(globalResponse as any);
    await TestBed.configureTestingModule({
      imports: [AdminStatsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const auth = TestBed.inject(AuthService);
    setSessionUser({ id: profile.id } as User);
    await auth.loadProfile(profile.id);
    const scope = TestBed.inject(AdminScopeService);
    TestBed.tick();
    const fixture = TestBed.createComponent(AdminStatsComponent);
    fixture.detectChanges();
    expect(client.rpc).toHaveBeenCalledWith('get_admin_stats');

    await scope.setScope('red');
    TestBed.tick();
    await fixture.whenStable();
    await vi.waitFor(() => expect(fixture.componentInstance.totalSellers()).toBe(1));
    expect(fixture.componentInstance.totalQuotes()).toBe(0);

    resolveGlobal({ data: { totalSellers: 50, totalQuotes: 100 }, error: null });
    await globalResponse;
    await fixture.whenStable();
    expect(fixture.componentInstance.totalQuotes()).toBe(0);
    expect(fixture.componentInstance.totalSellers()).toBe(1);
  });
});
