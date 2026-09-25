import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { User } from '@supabase/supabase-js';
import { AdminSellersComponent } from './admin-sellers';
import { AdminService } from '../../../services/admin.service';
import { AuthService, Profile } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { NotesService } from '../../../services/notes.service';
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
  let notes: NotesService;
  let auth: AuthService;
  let profile: Profile;
  let network: { id: string }[];
  let networkError: object | null;
  let rpc: ReturnType<typeof vi.spyOn>;
  let profileIn = vi.fn<(column: string, values: string[]) => void>();
  const sellers = [
    {
      id: 'seller-a',
      full_name: 'Ana',
      active: true,
      agency_brand: 'TOYOTA',
      agency_location: 'Blvd. Bernardo Quintana 300, Querétaro',
      quote_count: 2,
      socio_id: 'socio-1',
    },
    {
      id: 'seller-b',
      full_name: 'Beto',
      active: false,
      agency_brand: 'FORD',
      agency_location: 'Av. Reino Unido 100, CDMX',
      quote_count: 5,
      socio_id: '',
    },
  ];
  const advisors = [{ id: 'socio-1', full_name: 'César González' }];
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
    profileIn = vi.fn();
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
          // Solo la resolución de asesores consulta profiles por `id`; getSocios()
          // filtra por `role` y no debe contar para esta aserción.
          if (table === 'profiles' && column === 'id') {
            profileIn(column, values);
            ids = values;
          }
          return query;
        }),
        maybeSingle: vi.fn(async () => ({ data: profile, error: null })),
        then: (resolve: (value: unknown) => unknown) => {
          const data =
            table === 'profiles'
              ? advisors.filter((p) => !ids || ids.includes(p.id))
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
    await TestBed.configureTestingModule({
      imports: [AdminSellersComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    auth = TestBed.inject(AuthService);
    setSessionUser({ id: profile.id } as User);
    await auth.loadProfile(profile.id);
    scope = TestBed.inject(AdminScopeService);
    notes = TestBed.inject(NotesService);
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

  // NOTA (Ajuste 11): el toggle "Solo mi red" fue eliminado. El super admin ve
  // siempre la red completa y el alcance de socio/seller lo impone RLS + RPCs
  // server-side, así que ya no existe filtrado local que probar.
  it('should render the full network list without local scope filtering', async () => {
    await render();
    expect(component.filteredSellers()).toHaveLength(2);
    expect(fixture.nativeElement.textContent).toContain('Ana');
    expect(fixture.nativeElement.textContent).toContain('Beto');
  });

  // Ajuste 18: la tabla arranca con ASESOR y todos los rótulos van en
  // mayúsculas sin acentos (Whatsapp, Ubicacion).
  it('should render the header in order starting with the advisor column', async () => {
    await render();
    const headers = Array.from(
      fixture.nativeElement.querySelectorAll('.users-table thead th') as NodeListOf<HTMLElement>,
    ).map((th) => th.textContent?.trim());

    expect(headers).toEqual(['Asesor', 'Agencia', 'Nombre', 'Whatsapp', 'Ubicacion', 'Acciones']);
    expect(headers.join(' ')).not.toContain('Semáforo');
    expect(headers.join(' ')).not.toContain('Teléfono');
    expect(headers.join(' ')).not.toContain('Ubicación');
  });

  // Ajuste 19: la barra vuelve a existir, pero solo con buscador y orden.
  it('should keep a toolbar with only the search box and the sort select', async () => {
    await render();
    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelectorAll('.toolbar')).toHaveLength(1);
    expect(root.querySelectorAll('.search-wrapper')).toHaveLength(1);
    expect(root.querySelectorAll('.search-input')).toHaveLength(1);
    expect(root.querySelectorAll('.toolbar-select')).toHaveLength(1);
    // El contador de resultados y el filtro de estatus no vuelven.
    expect(root.querySelector('.results-count')).toBeNull();
    expect(root.querySelector('.chip-group')).toBeNull();
    expect(root.querySelectorAll('.toolbar-select option[value="todas"]')).toHaveLength(0);
  });

  // Ajuste 18: las tarjetas de resumen y el semáforo siguen fuera.
  it('should drop the summary cards and the traffic light', async () => {
    await render();
    const root: HTMLElement = fixture.nativeElement;

    expect(root.querySelector('.stats-grid')).toBeNull();
    expect(root.querySelector('.stat-card')).toBeNull();
    expect(root.querySelector('.semaforo-cell')).toBeNull();
    expect(root.querySelector('.dot')).toBeNull();
  });

  it('should offer only the three A-Z sort options', async () => {
    await render();
    const opciones = Array.from(
      fixture.nativeElement.querySelectorAll(
        '.toolbar-select option',
      ) as NodeListOf<HTMLOptionElement>,
    ).map((o) => o.textContent?.trim());

    expect(opciones).toEqual(['Asesor A-Z', 'Agencia A-Z', 'Ubicacion A-Z']);
    const texto = opciones.join(' ');
    expect(texto).not.toContain('Más recientes');
    expect(texto).not.toContain('Más cotizaciones');
    expect(texto).not.toContain('Antiguos');
    expect(texto).not.toContain('Nombre A');
  });

  // Ajuste 20: los anchos fijos evitan que ACCIONES (la única columna sin tope)
  // absorbiera el sobrante y dejara un hueco entre UBICACION y los botones.
  it('should declare fixed column widths for the six columns', async () => {
    await render();
    const root: HTMLElement = fixture.nativeElement;
    const cols = Array.from(root.querySelectorAll('colgroup col') as NodeListOf<HTMLElement>);
    const pcts = cols.map((c) => c.getAttribute('style'));

    expect(cols).toHaveLength(6);
    expect(pcts).toEqual([
      'width: 16%;',
      'width: 13%;',
      'width: 17%;',
      'width: 12%;',
      'width: 25%;',
      'width: 17%;',
    ]);
    // Reparto completo: ninguna columna se queda sin ancho.
    const total = pcts.reduce((acc, s) => acc + parseFloat(String(s).replace(/[^0-9.]/g, '')), 0);
    expect(total).toBe(100);
  });

  it('should sort by advisor by default', async () => {
    await render();

    expect(component.sortBy).toBe('asesor');
    const celdas = Array.from(
      fixture.nativeElement.querySelectorAll('td.asesor-cell') as NodeListOf<HTMLElement>,
    ).map((td) => td.textContent?.trim());

    // "César González" (C) antes que "Sin asesor" (S).
    expect(celdas).toEqual(['César González', 'Sin asesor']);
  });

  it('should search by the advisor name', async () => {
    await render();

    component.searchTerm = 'César';
    component.onSearch();
    fixture.detectChanges();

    expect(component.filteredSellers().map((s: any) => s.full_name)).toEqual(['Ana']);

    component.clearSearch();
    fixture.detectChanges();
    expect(component.filteredSellers()).toHaveLength(2);
  });

  it('should sort by agency and by location on demand', async () => {
    await render();
    const nombres = () => component.filteredSellers().map((s: any) => s.full_name);

    component.setSortBy('agencia');
    // TOYOTA antes que FORD: T > F.
    expect(nombres()).toEqual(['Beto', 'Ana']);

    component.setSortBy('ubicacion');
    // "Av. Reino Unido" antes que "Blvd. Bernardo Quintana".
    expect(nombres()).toEqual(['Beto', 'Ana']);
  });

  it('should show the empty state and restore the list when nothing matches', async () => {
    await render();

    component.searchTerm = 'no-existe-este-texto';
    component.onSearch();
    fixture.detectChanges();

    const vacio = fixture.nativeElement.querySelector('.empty-state') as HTMLElement;
    expect(component.filteredSellers()).toHaveLength(0);
    expect(vacio.textContent).toContain('Sin resultados');
    expect(vacio.textContent).toContain('Ajusta tu búsqueda');

    component.clearFilters();
    fixture.detectChanges();
    expect(component.searchTerm).toBe('');
    expect(component.sortBy).toBe('asesor');
    expect(component.filteredSellers()).toHaveLength(2);
  });

  it('should resolve the advisor name and fall back to "Sin asesor"', async () => {
    await render();

    // Una sola consulta con el socio_id de cada vendedor + el usuario en sesión.
    expect(profileIn).toHaveBeenCalledTimes(1);
    const [, ids] = profileIn.mock.calls[0];
    expect(ids).toEqual(expect.arrayContaining(['socio-1']));

    const celdas = Array.from(
      fixture.nativeElement.querySelectorAll('td.asesor-cell') as NodeListOf<HTMLElement>,
    ).map((td) => td.textContent?.trim());

    expect(celdas).toEqual(['César González', 'Sin asesor']);
  });

  it('should link to the seller quotes with the seller filter when the detail drawer opens', async () => {
    await render();
    component.openDetail(component.sellers()[0]);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector(
      '.detail-drawer .detail-quotes-link',
    ) as HTMLAnchorElement | null;
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toContain('/admin/seguimiento');
    expect(link!.getAttribute('href')).toContain('seller=seller-a');
    expect(link!.textContent).toContain('Ver cotizaciones del vendedor');
  });

  it('should hide the quotes link when the profile lacks the quotes permission', async () => {
    profile = { ...profile, role: 'socio', permisos: { sellers: true } };
    await auth.loadProfile(profile.id);
    await render();
    component.openDetail(component.sellers()[0]);
    fixture.detectChanges();
    expect(component.canViewQuotes).toBe(false);
    expect(fixture.nativeElement.querySelector('.detail-quotes-link')).toBeNull();
    // El enlace apunta a Seguimiento (Ajuste 11): el mensaje del drawer lo refleja.
    expect(fixture.nativeElement.textContent).toContain('no tiene acceso al módulo de Seguimiento');
  });

  it('should mantener el catalogo de marcas en orden alfabetico y sin duplicados', () => {
    const marcas = component.brands;

    expect(marcas).toEqual([...marcas].sort());
    expect(new Set(marcas).size).toBe(marcas.length);
  });

  it('should show note authors and only allow actions on notes created by the advisor', async () => {
    await render();
    const ownNote = {
      id: '3f1b9a52-0c4d-4f7e-9a11-2b6c8d5e4f30',
      entidad_tipo: 'seller' as const,
      entidad_id: 'seller-a',
      texto: 'Nota del asesor',
      creado_por: 'admin-a',
      created_at: new Date().toISOString(),
      autor_nombre: 'César González',
      autor_rol: 'super_admin' as const,
      es_propia: true,
    };
    const otherNote = {
      ...ownNote,
      id: '8c2d0e11-77aa-4b1c-8e02-51d9f0a3b6c4',
      es_propia: false,
      autor_nombre: 'Otro Asesor',
      autor_rol: 'socio' as const,
    };
    vi.spyOn(notes, 'getNotes').mockResolvedValue({ data: [ownNote, otherNote], error: null });

    await component.abrirNotas(component.sellers()[0]);
    fixture.detectChanges();

    const root: HTMLElement = fixture.nativeElement;
    const authors = root.querySelectorAll('.nota-autor');
    expect(authors.length).toBe(2);
    expect(authors[0].textContent?.trim()).toBe('César González');
    expect(authors[1].textContent?.trim()).toBe('Otro Asesor');
    expect(root.querySelectorAll('.nota-acciones').length).toBe(1);

    // Orden de la fila: fecha -> autor -> acciones dentro de .nota-meta
    const meta = authors[0].closest('.nota-meta') as HTMLElement;
    expect(meta).toBeTruthy();
    const order = Array.from(meta.children).map((el) => el.className);
    expect(order[0]).toContain('nota-fecha');
    expect(order[1]).toContain('nota-autor');
    expect(order[2]).toContain('nota-acciones');

    component.editarNota(otherNote);
    expect(component.notaEditando).toBeNull();
    component.eliminarNota(otherNote);
    expect(component.showNotaConfirmModal).toBe(false);
  });

  it('should not find sellers without an advisor when searching "sin asesor"', async () => {
    await render();

    component.searchTerm = 'Sin asesor';
    component.onSearch();
    fixture.detectChanges();

    // "Sin asesor" es la etiqueta de ausencia, no un nombre: no debe filtrar.
    expect(component.filteredSellers()).toHaveLength(0);
  });

  it('should warn and show every seller as "Sin asesor" when the advisor lookup fails', async () => {
    vi.spyOn(TestBed.inject(AdminService), 'getAsesorNames').mockResolvedValue({
      mapa: {},
      error: { message: 'fallo de red' },
    });
    await render();
    fixture.detectChanges();

    const banner = fixture.nativeElement.querySelector('.sellers-alert') as HTMLElement;
    expect(banner).toBeTruthy();
    expect(banner.textContent).toContain('No se pudieron cargar las asesorías');
    expect(component.avisoAsesores()).not.toBe('');

    const celdas = Array.from(
      fixture.nativeElement.querySelectorAll('td.asesor-cell') as NodeListOf<HTMLElement>,
    ).map((td) => td.textContent?.trim());
    expect(celdas).toEqual(['Sin asesor', 'Sin asesor']);
  });

  it('should discard a stale advisor lookup when a newer load takes over', async () => {
    // Componente aislado con su propio `admin`: así el spy no recibe llamadas de
    // los componentes que crearon los tests anteriores (mismo servicio root).
    const lonely = TestBed.createComponent(AdminSellersComponent).componentInstance;

    let liberar: (v: { mapa: Record<string, string>; error: any }) => void = () => {};
    let llamada = 0;
    const advisorSpy = vi.fn(async () => {
      llamada++;
      // La 1a llamada (la de ngOnInit) queda en espera: es la que va a quedar vieja.
      if (llamada === 1) return new Promise((res) => (liberar = res)) as any;
      return { mapa: { 'socio-1': 'César González' }, error: null };
    });
    (lonely as any).admin = {
      getSellersWithQuoteCount: async () => ({
        data: sellers.map((s) => ({ seller: s })),
        error: null,
      }),
      getAsesorNames: advisorSpy,
    };

    // La carga de ngOnInit se queda esperando el mapa de asesores.
    await vi.waitFor(() => expect(advisorSpy).toHaveBeenCalledTimes(1));

    // La segunda carga la supera y escribe el mapa vigente.
    await lonely.loadSellers();
    expect(lonely.getAsesorName({ socio_id: 'socio-1' })).toBe('César González');

    // La respuesta vieja por fin llega: ya no debe escribirse.
    liberar({ mapa: { 'socio-1': 'NOMBRE OBSOLETO' }, error: null });
    await new Promise((r) => setTimeout(r, 0));

    expect(advisorSpy).toHaveBeenCalledTimes(2);
    expect(lonely.getAsesorName({ socio_id: 'socio-1' })).toBe('César González');
  });
});
