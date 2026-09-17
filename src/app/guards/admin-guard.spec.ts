import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { adminGuard, moduleGuard, adminHomeGuard } from './admin-guard';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  const executeGuard = () => TestBed.runInInjectionContext(() => adminGuard());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

describe('moduleGuard', () => {
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  let authServiceSpy: any;

  const createModuleGuard = (
    role: 'super_admin' | 'socio' | 'seller' | null,
    permisos: Record<string, boolean> = {},
  ) => {
    authServiceSpy = {
      waitForSession: vi.fn().mockResolvedValue(undefined),
      currentProfile: vi.fn().mockReturnValue({
        role,
        active: true,
        permisos,
      }),
      canAccessModule: vi.fn((module: string) => {
        if (role === 'super_admin') return true;
        if (role === 'seller') return false;
        if (role === 'socio') {
          if (module === 'stats') return false;
          if (module === 'dashboard') return true; // inherente al socio
          if (module === 'rendimiento') return true;
          return permisos[module] === true;
        }
        return false;
      }),
      signOut: vi.fn().mockResolvedValue(undefined),
    };

    routerSpy = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceSpy }],
    });

    TestBed.inject(Router);
    Object.defineProperty(TestBed.inject(Router), 'navigate', {
      value: routerSpy.navigate,
      configurable: true,
    });
  };

  const executeModuleGuard = (module: string) =>
    TestBed.runInInjectionContext(() => moduleGuard(module)());

  it('should allow super_admin access to any module', async () => {
    createModuleGuard('super_admin');
    const result = await executeModuleGuard('dashboard');
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny seller access when an admin module is requested', async () => {
    createModuleGuard('seller');
    const result = await executeModuleGuard('quotes');
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/sin-acceso']);
  });

  it('should allow socio access when the module is granted', async () => {
    createModuleGuard('socio', { quotes: true });
    const result = await executeModuleGuard('quotes');
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should allow socio access to dashboard (inherent al rol, panel principal)', async () => {
    createModuleGuard('socio', {});
    const result = await executeModuleGuard('dashboard');
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should always deny socio access to stats (super_admin only)', async () => {
    createModuleGuard('socio', {});
    const result = await executeModuleGuard('stats');
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/sin-acceso']);
  });

  it('should allow socio access to rendimiento (inherente al rol)', async () => {
    createModuleGuard('socio', {});
    const result = await executeModuleGuard('rendimiento');
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should deny socio a non-granted module and redirect to /admin/sin-acceso (not /admin)', async () => {
    createModuleGuard('socio', { quotes: false });
    const result = await executeModuleGuard('quotes');
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/sin-acceso']);
    expect(routerSpy.navigate).not.toHaveBeenCalledWith(['/admin']);
  });

  it('should redirect to /login when no profile', async () => {
    authServiceSpy = {
      waitForSession: vi.fn().mockResolvedValue(undefined),
      currentProfile: vi.fn().mockReturnValue(null),
      canAccessModule: vi.fn().mockReturnValue(false),
      signOut: vi.fn().mockResolvedValue(undefined),
    };

    routerSpy = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    TestBed.inject(Router);
    Object.defineProperty(TestBed.inject(Router), 'navigate', {
      value: routerSpy.navigate,
      configurable: true,
    });

    const result = await TestBed.runInInjectionContext(() => moduleGuard('dashboard')());
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});

describe('adminHomeGuard', () => {
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  let authServiceSpy: any;

  const setupGuard = (
    role: 'super_admin' | 'socio' | 'seller' | null,
    active: boolean = true,
    permisos: Record<string, boolean> = {},
  ) => {
    const profileObj = role ? { role, active, permisos } : null;
    authServiceSpy = {
      waitForSession: vi.fn().mockResolvedValue(undefined),
      currentProfile: vi.fn().mockReturnValue(profileObj),
      currentUser: vi.fn().mockReturnValue(role ? { id: 'user-1' } : null),
      loadProfile: vi.fn().mockResolvedValue(profileObj),
      signOut: vi.fn().mockResolvedValue(undefined),
    };

    routerSpy = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: authServiceSpy }],
    });

    TestBed.inject(Router);
    Object.defineProperty(TestBed.inject(Router), 'navigate', {
      value: routerSpy.navigate,
      configurable: true,
    });
  };

  it('should allow super_admin to see admin-stats (return true)', async () => {
    setupGuard('super_admin');
    const result = await TestBed.runInInjectionContext(() => adminHomeGuard());
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should allow socio to see admin-stats / Dashboard (return true, no redirect)', async () => {
    setupGuard('socio');
    const result = await TestBed.runInInjectionContext(() => adminHomeGuard());
    expect(result).toBe(true);
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should redirect inactive socio to /login and signOut', async () => {
    setupGuard('socio', false);
    const result = await TestBed.runInInjectionContext(() => adminHomeGuard());
    expect(result).toBe(false);
    expect(authServiceSpy.signOut).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to /login when no profile', async () => {
    setupGuard(null, true);
    const result = await TestBed.runInInjectionContext(() => adminHomeGuard());
    expect(result).toBe(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
