import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AdminSellersComponent } from './admin-sellers';
import { AdminService } from '../../../services/admin.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({ template: '' })
class DummySellersHomeComponent {}

describe('AdminSellersComponent - resumen de eliminacion', () => {
  let component: AdminSellersComponent;
  let fixture: ComponentFixture<AdminSellersComponent>;

  const SELLER_ID = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';

  const fakeSellers = [
    { id: SELLER_ID, full_name: 'Vendedor Prueba', active: true, quote_count: 2 },
  ];

  const mockAdminService = {
    getSellersWithQuoteCount: vi.fn().mockResolvedValue({ data: fakeSellers, error: null }),
  };

  const reloadCount = { current: 0 };

  const mockScopeService = {
    reloadCount: () => reloadCount.current,
    isRedMode: () => false,
    sellerIds: () => new Set<string>(),
  };

  const mockAuthService = {
    isSuperAdmin: () => true,
    getSocios: vi.fn().mockResolvedValue({ data: [], error: null }),
    canAccessModule: () => true,
    deleteUserFromAuth: vi.fn().mockResolvedValue({ error: null }),
  };

  const mockToastService = { success: vi.fn(), error: vi.fn(), undo: vi.fn() };

  const fakeQuotes = [
    {
      id: 10,
      client_name: 'Cliente Uno',
      brand: 'TOYOTA',
      model: 'HILUX',
      year: 2024,
      pricenet: 450000,
      created_at: '2026-09-01T10:00:00Z',
    },
  ];

  const fakeNotas = [
    {
      id: 5,
      texto: 'Nota de seguimiento',
      creado_por: SELLER_ID,
      created_at: '2026-09-02T10:00:00Z',
    },
  ];

  let lastTable = '';

  const chain = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn(),
    insert: vi.fn().mockResolvedValue({ error: null }),
    delete: vi.fn().mockResolvedValue({ error: null }),
  };

  const fakeClient = {
    from: vi.fn().mockImplementation((tabla: string) => {
      lastTable = tabla;
      return chain;
    }),
  };

  function respuestaResumen() {
    if (lastTable === 'quotes') return Promise.resolve({ data: fakeQuotes, error: null });
    if (lastTable === 'notas') return Promise.resolve({ data: fakeNotas, error: null });
    return Promise.resolve({ data: [], error: null });
  }

  beforeEach(async () => {
    chain.select.mockClear();
    chain.eq.mockClear();
    chain.order.mockClear();
    chain.order.mockImplementation(() => respuestaResumen());
    mockAdminService.getSellersWithQuoteCount.mockClear();
    mockAuthService.deleteUserFromAuth.mockClear();
    mockToastService.success.mockClear();

    await TestBed.configureTestingModule({
      imports: [AdminSellersComponent],
      providers: [
        provideRouter([{ path: '', component: DummySellersHomeComponent }]),
        { provide: AdminService, useValue: mockAdminService },
        { provide: AdminScopeService, useValue: mockScopeService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastService, useValue: mockToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSellersComponent);
    component = fixture.componentInstance;
    (component as any).client = fakeClient;
    await fixture.whenStable();
  });

  it('should cargar el resumen de cotizaciones y notas al abrir eliminar', async () => {
    await component.deleteSeller(SELLER_ID);

    expect(component.showConfirmModal).toBe(true);
    expect(component.deleteSummaryLoading).toBe(false);
    expect(component.deleteSummaryQuotes).toEqual(fakeQuotes);
    expect(component.deleteSummaryNotas).toEqual(fakeNotas);
  });

  it('should llamar deleteUserFromAuth al confirmar la eliminacion', async () => {
    await component.deleteSeller(SELLER_ID);
    component.confirmSellerDelete();
    await fixture.whenStable();

    expect(mockAuthService.deleteUserFromAuth).toHaveBeenCalledWith(SELLER_ID);
  });
});
