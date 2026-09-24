import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminDashboardComponent } from './admin-dashboard';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';

@Component({ standalone: true, template: '' })
class LoginStubComponent {}

describe('AdminDashboardComponent', () => {
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let authMock: any;
  let signOutSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    authMock = {
      currentUser: signal({ id: 'admin-1' }),
      currentProfile: signal({ full_name: 'Ana Admin', role: 'super_admin' }),
      canAccessModule: vi.fn(() => true),
      isSuperAdmin: vi.fn(() => true),
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
        { provide: ThemeService, useValue: { theme: signal('light'), toggle: vi.fn() } },
        { provide: ToastService, useValue: { toasts: signal([]), dismiss: vi.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
  });

  it('conserva el layout del panel y deja la navegación global fuera del componente', () => {
    expect(fixture.nativeElement.querySelector('.admin-sidebar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.admin-mobile-topbar')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.admin-mobile-bottom-nav')).toBeFalsy();
  });

  it('mantiene las acciones de tema y cierre de sesión del sidebar', async () => {
    const themeToggle = fixture.nativeElement.querySelector('.theme-toggle');
    expect(themeToggle).toBeTruthy();
    themeToggle.click();
    expect(TestBed.inject(ThemeService).toggle).toHaveBeenCalled();

    await fixture.componentInstance.logout();
    expect(signOutSpy).toHaveBeenCalledOnce();
  });
});
