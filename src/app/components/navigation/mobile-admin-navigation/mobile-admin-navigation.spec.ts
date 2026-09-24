import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MobileAdminNavigationComponent } from './mobile-admin-navigation';
import { AuthService } from '../../../services/auth.service';

@Component({ standalone: true, template: '' })
class LoginStubComponent {}

describe('MobileAdminNavigationComponent', () => {
  let fixture: ComponentFixture<MobileAdminNavigationComponent>;
  let component: MobileAdminNavigationComponent;
  let profile: ReturnType<typeof signal<any>>;
  let authMock: any;
  let signOutSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    profile = signal({
      id: 'admin-1',
      full_name: 'Ana Admin',
      role: 'super_admin',
      permisos: {},
    });

    authMock = {
      currentUser: signal({ id: 'admin-1' }),
      currentProfile: profile,
      isAdmin: vi.fn(() => {
        const role = profile()?.role;
        return role === 'super_admin' || role === 'socio';
      }),
      canAccessModule: vi.fn((module: string) => {
        const role = profile()?.role;
        if (role === 'super_admin') return true;
        if (role === 'socio') {
          return module === 'dashboard' || module === 'rendimiento' || module === 'seguimiento';
        }
        return false;
      }),
      isSuperAdmin: vi.fn(() => profile()?.role === 'super_admin'),
      getRoleLabel: vi.fn(() => 'Super Admin'),
      signOut: vi.fn().mockResolvedValue(undefined),
    };
    signOutSpy = authMock.signOut;

    await TestBed.configureTestingModule({
      imports: [MobileAdminNavigationComponent],
      providers: [
        provideRouter([{ path: 'login', component: LoginStubComponent }]),
        { provide: AuthService, useValue: authMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileAdminNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('muestra la navegación admin para superadmin y socio', () => {
    const items = fixture.nativeElement.querySelectorAll('.admin-mobile-bottom-nav .nav-item');
    expect(items).toHaveLength(4);
    expect(fixture.nativeElement.textContent).toContain('Seguimiento');
    expect(fixture.nativeElement.textContent).toContain('Rendimiento');
    expect(fixture.nativeElement.textContent).toContain('Más');
  });

  it('abre Más con módulos y accesos de aplicación', () => {
    fixture.nativeElement.querySelector('.nav-item-more').click();
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('#admin-mobile-more-menu');
    expect(panel.textContent).toContain('Vendedores');
    expect(panel.textContent).toContain('Asesores GoLease');
    expect(panel.textContent).toContain('Mis Cotizaciones');
    expect(panel.textContent).toContain('Nueva cotización');
    expect(panel.textContent).toContain('Mi perfil');
  });

  it('oculta Seguimiento para un socio sin ese permiso', () => {
    profile.set({ id: 'socio-1', full_name: 'Beto Socio', role: 'socio', permisos: {} });
    authMock.canAccessModule.mockImplementation((module: string) => {
      return module === 'dashboard' || module === 'rendimiento';
    });
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelectorAll('.admin-mobile-bottom-nav .nav-item'),
    ).toHaveLength(3);
    expect(
      fixture.nativeElement.querySelector('.admin-mobile-bottom-nav').textContent,
    ).not.toContain('Seguimiento');
  });

  it('no muestra navegación a un vendedor y cierra Más con Escape', () => {
    profile.set({ id: 'seller-1', full_name: 'Ana Vendedora', role: 'seller', permisos: {} });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.admin-mobile-bottom-nav')).toBeFalsy();

    profile.set({ id: 'admin-1', full_name: 'Ana Admin', role: 'super_admin', permisos: {} });
    fixture.detectChanges();
    component.openMobileMore();
    expect(component.mobileMoreOpen()).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.mobileMoreOpen()).toBe(false);

    return component.logout().then(() => expect(signOutSpy).toHaveBeenCalledOnce());
  });
});
