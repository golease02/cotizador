import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AdminAdminsComponent } from './admin-admins';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({ template: '' })
class DummyAdminsHomeComponent {}

describe('AdminAdminsComponent - aviso de reasignacion', () => {
  let component: AdminAdminsComponent;
  let fixture: ComponentFixture<AdminAdminsComponent>;

  const SOCIO_ID = 'bbbbbbbb-cccc-dddd-eeee-ffffffffffff';

  const mockAdminService = {};

  const mockAuthService = {
    getSocios: vi.fn().mockResolvedValue({ data: [], error: null }),
    getSellersBySocio: vi.fn().mockResolvedValue({ data: [], error: null }),
    canAccessModule: () => true,
    isSuperAdmin: () => true,
    deleteUserFromAuth: vi.fn().mockResolvedValue({ error: null }),
  };

  const mockToastService = { success: vi.fn(), error: vi.fn() };

  beforeEach(async () => {
    mockAuthService.getSocios.mockClear();
    mockAuthService.getSellersBySocio.mockClear().mockResolvedValue({ data: [], error: null });
    mockAuthService.deleteUserFromAuth.mockClear();

    await TestBed.configureTestingModule({
      imports: [AdminAdminsComponent],
      providers: [
        provideRouter([{ path: '', component: DummyAdminsHomeComponent }]),
        { provide: AdminService, useValue: mockAdminService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAdminsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should contar los vendedores a reasignar al abrir eliminar', async () => {
    mockAuthService.getSellersBySocio.mockResolvedValueOnce({
      data: [
        { id: 'v1', full_name: 'Vendedor Uno' },
        { id: 'v2', full_name: 'Vendedor Dos' },
      ],
      error: null,
    });

    await component.deleteAdmin(SOCIO_ID);

    expect(component.showConfirmModal).toBe(true);
    expect(component.sellersToReassignLoading).toBe(false);
    expect(component.sellersToReassignCount).toBe(2);
  });

  it('should confirmar la eliminacion con deleteUserFromAuth', async () => {
    await component.deleteAdmin(SOCIO_ID);
    component.confirmAdminDelete();
    await fixture.whenStable();

    expect(mockAuthService.deleteUserFromAuth).toHaveBeenCalledWith(SOCIO_ID);
  });
});
