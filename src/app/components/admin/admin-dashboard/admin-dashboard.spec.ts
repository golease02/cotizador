import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal, WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminDashboardComponent } from './admin-dashboard';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';

@Component({ standalone: true, template: '' })
class LoginStubComponent {}

describe('AdminDashboardComponent - navegación móvil', () => {
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let component: AdminDashboardComponent;
  let profile: WritableSignal<any>;
  let authMock: {
    currentProfile: typeof profile;
    currentUser: ReturnType<typeof signal<any>>;
    canAccessModule: ReturnType<typeof vi.fn>;
    isSuperAdmin: ReturnType<typeof vi.fn>;
    getRoleLabel: ReturnType<typeof vi.fn>;
    signOut: ReturnType<typeof vi.fn>;
  };
  let signOutSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    profile = signal({
      id: 'admin-1',
      full_name: 'Ana Admin',
      role: 'super_admin',
      permisos: {},
    });

    authMock = {
      currentProfile: profile,
      currentUser: signal({ id: 'admin-1' }),
      canAccessModule: vi.fn((module: string) => {
        profile();
        return (
          module === 'dashboard' ||
          module === 'rendimiento' ||
          module === 'seguimiento' ||
          module === 'sellers' ||
          module === 'plates' ||
          module === 'parameters'
        );
      }),
      isSuperAdmin: vi.fn(() => {
        profile();
        return true;
      }),
      getRoleLabel: vi.fn(() => 'Super Admin'),
      signOut: vi.fn().mockResolvedValue(undefined),
    };
    signOutSpy = authMock.signOut;

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        provideRouter([{ path: 'login', component: LoginStubComponent }]),
        { provide: AuthService, useValue: authMock },
        { provide: AdminScopeService, useValue: {} },
        {
          provide: ThemeService,
          useValue: { theme: signal('light'), toggle: vi.fn() },
        },
        {
          provide: ToastService,
          useValue: { toasts: signal([]), dismiss: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('muestra cuatro accesos principales y conserva el sidebar de escritorio', () => {
    const items = fixture.nativeElement.querySelectorAll('.admin-mobile-bottom-nav .nav-item');

    expect(items).toHaveLength(4);
    expect(fixture.nativeElement.querySelector('.admin-sidebar')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Seguimiento');
    expect(fixture.nativeElement.textContent).toContain('Rendimiento');
    expect(fixture.nativeElement.textContent).toContain('Más');
  });

  it('abre Más con módulos, ambos accesos al cotizador y perfil', () => {
    fixture.nativeElement.querySelector('.nav-item-more').click();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('#admin-mobile-more-menu');
    expect(panel).toBeTruthy();
    expect(panel.textContent).toContain('Vendedores');
    expect(panel.textContent).toContain('Asesores GoLease');
    expect(panel.textContent).toContain('Placas de Estado');
    expect(panel.textContent).toContain('Parámetros');
    expect(panel.textContent).toContain('Mis Cotizaciones');
    expect(panel.textContent).toContain('Nueva cotización');
    expect(panel.textContent).toContain('Mi perfil');
    expect(panel.textContent).toContain('Cerrar sesión');
  });

  it('oculta módulos y Seguimiento cuando el socio no tiene permisos', () => {
    profile.set({
      id: 'socio-1',
      full_name: 'Beto Socio',
      role: 'socio',
      permisos: {},
    });
    authMock.canAccessModule.mockImplementation((module: string) => {
      profile();
      return module === 'dashboard' || module === 'rendimiento';
    });
    authMock.isSuperAdmin.mockImplementation(() => false);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('.admin-mobile-bottom-nav .nav-item'),
    ).toHaveLength(3);
    expect(
      fixture.nativeElement.querySelector('.admin-mobile-bottom-nav').textContent,
    ).not.toContain('Seguimiento');

    component.openMobileMore();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('#admin-mobile-more-menu');
    expect(panel.textContent).not.toContain('Vendedores');
    expect(panel.textContent).not.toContain('Asesores GoLease');
    expect(panel.textContent).toContain('Mis Cotizaciones');
  });

  it('cierra Más con Escape y mantiene la acción de cerrar sesión', async () => {
    component.openMobileMore();
    fixture.detectChanges();
    expect(component.mobileMoreOpen()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.mobileMoreOpen()).toBe(false);

    await component.logout();
    expect(signOutSpy).toHaveBeenCalledOnce();
  });
});
