import { TestBed, ComponentFixture } from '@angular/core/testing';
import type { User } from '@supabase/supabase-js';
import { AdminAdminsComponent } from './admin-admins';
import { AuthService } from '../../../services/auth.service';
import {
  getSupabaseClient,
  resetSessionReady,
  setSessionUser,
} from '../../../services/supabase-client';

describe('AdminAdminsComponent', () => {
  let fixture: ComponentFixture<AdminAdminsComponent>;
  let component: AdminAdminsComponent;
  let rows: any[];
  let saveError: { message: string } | null;
  let upsert: ReturnType<typeof vi.fn>;
  const admin = {
    id: 'admin-a',
    role: 'super_admin',
    full_name: 'Admin prueba',
    email: 'admin@example.test',
    seller_number: '5550000001',
    active: true,
  };
  const socio = {
    id: 'socio-a',
    role: 'socio',
    full_name: 'Socio prueba',
    seller_number: '5550000002',
    active: true,
  };

  beforeEach(async () => {
    resetSessionReady();
    saveError = null;
    rows = [
      admin,
      socio,
      { id: 'socio-b', role: 'socio', full_name: 'Socio inactivo', active: false },
      {
        id: 'seller-a',
        role: 'seller',
        full_name: 'Ana libre',
        seller_number: '5551000001',
        active: true,
        socio_id: null,
      },
      {
        id: 'seller-b',
        role: 'seller',
        full_name: 'Luis vinculado',
        seller_number: '5551000002',
        active: true,
        socio_id: admin.id,
      },
      { id: 'seller-c', role: 'seller', full_name: 'Inactivo', active: false, socio_id: null },
    ];
    const client = getSupabaseClient();
    vi.spyOn(client.auth, 'getSession').mockResolvedValue({ data: { session: null }, error: null });
    upsert = vi.fn(async (payload: any) => {
      if (!saveError)
        rows = rows.map((row) => (row.id === payload.id ? { ...row, ...payload } : row));
      return { error: saveError };
    });
    vi.spyOn(client, 'from').mockImplementation((): any => {
      const filters: ((row: any) => boolean)[] = [];
      const query: any = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        eq: vi.fn((key, value) => {
          filters.push((row) => row[key] === value);
          return query;
        }),
        is: vi.fn((key, value) => {
          filters.push((row) => row[key] === value);
          return query;
        }),
        in: vi.fn((key, values) => {
          filters.push((row) => values.includes(row[key]));
          return query;
        }),
        maybeSingle: vi.fn(async () => ({ data: admin, error: null })),
        upsert,
        then: (resolve: (value: unknown) => unknown) =>
          Promise.resolve({
            data: rows.filter((row) => filters.every((filter) => filter(row))),
            error: null,
          }).then(resolve),
      };
      return query;
    });
    await TestBed.configureTestingModule({ imports: [AdminAdminsComponent] }).compileComponents();
    setSessionUser({ id: admin.id } as User);
    await TestBed.inject(AuthService).loadProfile(admin.id);
    fixture = TestBed.createComponent(AdminAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    resetSessionReady();
    vi.restoreAllMocks();
  });

  it.each([admin, socio])('should show linked sellers when opening role $role', async (profile) => {
    component.openDetail(profile);
    await fixture.whenStable();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Vendedores vinculados');
    expect(text).not.toContain('+ Vincular vendedor');
    expect(component.linkedSellers().map((seller) => seller.id)).toEqual(
      profile.role === 'super_admin' ? ['seller-b'] : [],
    );
  });

  it('should reassign a linked seller when another network is selected', async () => {
    component.openDetail(admin);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector('.btn-reassign-mini') as HTMLButtonElement;
    expect(button.textContent).toContain('Reasignar');
    button.click();
    await fixture.whenStable();
    component.reassignTargetSocioId = socio.id;
    await component.executeReassignSeller();
    expect(upsert).toHaveBeenCalledWith(
      { id: 'seller-b', socio_id: socio.id },
      { onConflict: 'id' },
    );
    expect(component.linkedSellers()).toEqual([]);
  });

  it('should combine role and status filters when choosing a role chip', () => {
    component.setStatusFilter('activos');
    const chips = fixture.nativeElement.querySelectorAll('.role-filter button');
    chips[1].click();
    expect(component.filteredAdmins().map((row) => row.id)).toEqual(['socio-a']);
    chips[2].click();
    expect(component.filteredAdmins().map((row) => row.id)).toEqual(['admin-a']);
    component.clearFilters();
    expect(component.roleFilter()).toBe('todos');
    expect(component.filteredAdmins()).toHaveLength(3);
  });

});
