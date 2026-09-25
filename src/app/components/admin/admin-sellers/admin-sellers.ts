import {
  Component,
  inject,
  signal,
  OnInit,
  ChangeDetectorRef,
  HostListener,
  effect,
  untracked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { EntityNote, NotesService } from '../../../services/notes.service';
import { ToastService } from '../../../services/toast.service';

/** Criterios de orden de la tabla de Vendedores (Ajuste 19). */
export type SortBy = 'asesor' | 'agencia' | 'ubicacion';

/** Texto que se muestra cuando el vendedor no tiene asesor resoluble. */
export const SIN_ASESOR = 'Sin asesor';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-sellers.html',
  styleUrls: ['./admin-sellers.css'],
})
export class AdminSellersComponent implements OnInit {
  private admin = inject(AdminService);
  public auth = inject(AuthService);
  /** Solo para el resumen previo a eliminar y el alta de usuarios. */
  private client = getSupabaseClient();
  private notesService = inject(NotesService);
  private cdr = inject(ChangeDetectorRef);
  private readonly scope = inject(AdminScopeService);
  private sellersRequest = 0;
  readonly toastService = inject(ToastService);

  get canManageNotas(): boolean {
    return this.auth.canAccessModule('notas');
  }

  /** Acceso directo a las cotizaciones del vendedor (requiere permiso 'quotes'). */
  get canViewQuotes(): boolean {
    return this.auth.canAccessModule('quotes');
  }

  // ------------------- LISTADO -------------------
  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  loading = true;
  actionLoading = false;

  // ------------------- BÚSQUEDA Y ORDEN (Ajuste 19) -------------------
  /** Único criterio de filtro: texto libre sobre nombre, número, agencia, ubicación y asesor. */
  searchTerm = '';
  sortBy: SortBy = 'asesor';

  /** Valor por el que se ordena cada vendedor, según la opción elegida. */
  private readonly sortKeys: Record<SortBy, (s: any) => string> = {
    asesor: (s) => this.getAsesorName(s),
    agencia: (s) => s.agency_brand || '',
    ubicacion: (s) => s.agency_location || '',
  };

  /**
   * Aplica el texto de búsqueda y el orden elegido.
   * Debe ejecutarse DESPUÉS de `loadAsesores()`, porque el orden por asesor
   * necesita el mapa `socio_id → nombre` ya resuelto.
   */
  applyFilters() {
    let filtered = this.sellers();
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter((s) => {
        const campos: unknown[] = [s.full_name, s.seller_number, s.agency_brand, s.agency_location];
        // El asesor solo entra al comparador si es un nombre real: escribir
        // "sin asesor" no debe listar a todos los que no lo tienen.
        const asesor = this.getAsesorName(s);
        if (asesor !== SIN_ASESOR) campos.push(asesor);
        return campos.some((valor) =>
          String(valor ?? '')
            .toLowerCase()
            .includes(term),
        );
      });
    }

    // `sensitivity: 'base'` ignora mayúsculas y acentos, para que el orden no se
    // rompa con "AGENCIA" vs "Agencia" o "Querétaro" vs "Queretaro".
    const clave = this.sortKeys[this.sortBy] ?? this.sortKeys.asesor;
    filtered = [...filtered].sort((a, b) =>
      clave(a).localeCompare(clave(b), 'es', { sensitivity: 'base' }),
    );

    this.filteredSellers.set(filtered);
    this.cdr.detectChanges();
  }

  onSearch() {
    this.applyFilters();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilters();
  }

  setSortBy(value: SortBy) {
    this.sortBy = value;
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.sortBy = 'asesor';
    this.selectedSellerCardId = null;
    this.applyFilters();
  }

  // ------------------- ASESOR (columna inicial) -------------------
  /**
   * Mapa `socio_id → nombre del asesor`. `socio_id` viene en cada vendedor
   * porque la RPC `get_sellers_with_quote_counts()` devuelve la fila completa
   * del perfil (`to_jsonb(p)`). Se resuelve con una consulta extra a
   * `profiles`, igual que en Seguimiento.
   */
  private asesores = signal<Record<string, string>>({});

  // ------------------- CONFIRMACIÓN (solo eliminar) -------------------
  showConfirmModal = false;
  selectedSellerId: string | null = null;
  selectedSellerCardId: string | null = null;

  // ------------------- FORMULARIO (DRAWER) -------------------
  showFormDrawer = false;
  isEditMode = false;
  formStep: 1 | 2 = 1;
  formLoading = false;
  formError = '';
  showPassword = false;
  formValidated = false;
  fieldErrors: Record<string, string> = {};

  sellerForm = {
    id: '',
    seller_number: '',
    full_name: '',
    password: '',
    agency_brand: '',
    other_brand: '',
    agency_location: '',
    socio_id: '',
    active: true,
  };

  // ------------------- SOCIO (solo super admin) -------------------
  socios = signal<any[]>([]);
  isLoadingSocios = false;

  // ------------------- DRAWER DE DETALLE -------------------
  showDetailDrawer = false;
  detailSeller: any = null;

  // ------------------- NOTAS -------------------
  showNotasModal = false;
  notasVendedor: EntityNote[] = [];
  notaText = '';
  notaEditando: EntityNote | null = null;
  notaLoading = false;
  notaError = '';
  showNotaConfirmModal = false;
  notaToDelete: EntityNote | null = null;

  // ------------------- ASESOR -------------------

  /**
   * Aviso visible cuando la resolución de asesorías falla. Si no se mostrara,
   * toda la columna caería en "Sin asesor" y el orden por asesor quedaría
   * inservible sin que nadie se entere.
   */
  readonly avisoAsesores = signal('');

  /** Nombre del socio asignado al vendedor; SIN_ASESOR si no tiene o no resuelve. */
  getAsesorName(seller: any): string {
    const socioId = seller?.socio_id ? String(seller.socio_id) : '';
    if (!socioId) return SIN_ASESOR;
    return this.asesores()[socioId] || SIN_ASESOR;
  }

  /**
   * Pide al servicio el mapa `socio_id → nombre`. **Devuelve** el mapa en vez
   * de escribirlo, para que `loadSellers()` pueda descartar una respuesta vieja
   * antes de que contamine la lista vigente.
   */
  private async loadAsesores(lista: any[]): Promise<Record<string, string>> {
    const { mapa, error } = await this.admin.getAsesorNames(lista ?? []);
    this.avisoAsesores.set(
      error
        ? 'No se pudieron cargar las asesorías. Todos los vendedores aparecen como "' +
            SIN_ASESOR +
            '".'
        : '',
    );
    if (error) console.error('getAsesorNames:', error);
    return mapa;
  }

  /** Reintenta la resolución de asesorías y vuelve a aplicar búsqueda y orden. */
  async reintentarAsesores(): Promise<void> {
    const mapa = await this.loadAsesores(this.sellers());
    this.asesores.set(mapa);
    this.applyFilters();
  }

  // ------------------- MARCAS -------------------
  brands = [
    'ACURA',
    'ALFA ROMEO',
    'AUDI',
    'BMW',
    'BYD',
    'CHEVROLET',
    'DODGE',
    'FIAT',
    'FORD',
    'HINO',
    'HONDA',
    'HYUNDAI',
    'INFINITI',
    'JAGUAR',
    'JEEP',
    'KIA',
    'LAND ROVER',
    'LEXUS',
    'MASERATI',
    'MAZDA',
    'MERCEDES-BENZ',
    'MINI',
    'MITSUBISHI',
    'NISSAN',
    'PEUGEOT',
    'PORSCHE',
    'RAM',
    'RENAULT',
    'SUBARU',
    'SUZUKI',
    'TOYOTA',
    'VOLKSWAGEN',
    'VOLVO',
  ];

  constructor() {
    // La carga inicial corresponde a ngOnInit; el efecto solo atiende cambios de alcance.
    let revision = this.scope.reloadCount();
    effect(() => {
      const nextRevision = this.scope.reloadCount();
      if (nextRevision === revision) return;
      revision = nextRevision;
      untracked(() => {
        this.sellers.set([]);
        this.filteredSellers.set([]);
        this.asesores.set({});
        this.selectedSellerCardId = null;
        void this.loadSellers();
      });
    });
  }

  async ngOnInit() {
    await Promise.all([this.loadSellers(), this.loadSociosIfNeeded()]);
  }

  async loadSociosIfNeeded(): Promise<void> {
    if (!this.auth.isSuperAdmin()) return;
    this.isLoadingSocios = true;
    const { data, error } = await this.auth.getSocios();
    if (!error && data) {
      this.socios.set(data);
    }
    this.isLoadingSocios = false;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showNotaConfirmModal) this.cancelarEliminarNota();
    if (this.showConfirmModal) this.cancelModal();
    if (this.showNotasModal) this.cerrarNotas();
    if (this.showDetailDrawer) this.closeDetail();
    if (this.showFormDrawer) this.closeFormDrawer();
  }

  // ===================== LISTADO =====================

  async loadSellers() {
    const request = ++this.sellersRequest;
    const revision = this.scope.reloadCount();
    this.loading = true;
    const { data, error } = await this.admin.getSellersWithQuoteCount();
    if (request !== this.sellersRequest || revision !== this.scope.reloadCount()) return;
    if (!error) {
      // La RPC acota el alcance por rol en el servidor; el orden lo aplica
      // applyFilters() porque depende del mapa de asesores.
      const ids = this.scope.isRedMode() ? this.scope.sellerIds() : undefined;
      const lista = ids ? (data || []).filter((s) => ids.has(s.id)) : data || [];
      this.sellers.set(lista);
      // El orden por asesor necesita los nombres resueltos: primero los asesores,
      // después el filtrado/ordenado.
      const mapa = await this.loadAsesores(lista);
      // Tras el await otra carga pudo haber tomado el relevo: si es así, el
      // mapa que acabamos de resolver ya no corresponde a `sellers()` y no
      // debe escribirse, o dejaría filas con "Sin asesor" sin motivo.
      if (request !== this.sellersRequest || revision !== this.scope.reloadCount()) return;
      this.asesores.set(mapa);
      this.applyFilters();
    } else {
      this.toastService.error('No se pudieron cargar los vendedores');
    }
    if (request !== this.sellersRequest || revision !== this.scope.reloadCount()) return;
    this.loading = false;
    this.cdr.detectChanges();
  }

  // ===================== TOGGLE DE ESTADO (INLINE + DESHACER) =====================

  async toggleSellerStatus(seller: any) {
    if (this.actionLoading) return;
    const previous = seller.active ?? true;
    const next = !previous;
    this.patchSeller(seller.id, { active: next });

    const { error } = await this.auth.updateProfile(seller.id, { active: next });
    if (error) {
      this.patchSeller(seller.id, { active: previous });
      this.toastService.error('No se pudo cambiar el estado: ' + error.message);
      return;
    }

    this.toastService.undo(
      next ? `${seller.full_name} ahora está activo` : `${seller.full_name} quedó inactivo`,
      () => {
        this.patchSeller(seller.id, { active: previous });
        this.auth.updateProfile(seller.id, { active: previous });
      },
    );
  }

  private patchSeller(id: string, patch: any) {
    this.sellers.update((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    if (this.detailSeller?.id === id) {
      this.detailSeller = { ...this.detailSeller, ...patch };
    }
    this.applyFilters();
  }

  // ===================== ELIMINAR (CON CONFIRMACIÓN) =====================

  // Resumen previo a eliminar: cotizaciones + notas del vendedor.
  deleteSummaryQuotes: any[] = [];
  deleteSummaryNotas: any[] = [];
  deleteSummaryLoading = false;
  deleteSummaryError = '';

  async deleteSeller(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.showConfirmModal = true;
    this.deleteSummaryQuotes = [];
    this.deleteSummaryNotas = [];
    this.deleteSummaryError = '';
    this.deleteSummaryLoading = true;
    this.cdr.detectChanges();
    try {
      // Las notas van por NotesService (único punto de acceso, nota 21 de
      // AGENTS.md); las cotizaciones se leen directo porque no pasan por RPC.
      const [quotesRes, notasRes] = await Promise.all([
        this.client
          .from('quotes')
          .select('id, client_name, brand, model, year, pricenet, created_at')
          .eq('seller_id', sellerId)
          .order('created_at', { ascending: false }),
        this.notesService.getNotes('seller', sellerId),
      ]);
      if (quotesRes.error) throw quotesRes.error;
      if (notasRes.error) throw notasRes.error;
      this.deleteSummaryQuotes = quotesRes.data || [];
      this.deleteSummaryNotas = notasRes.data || [];
    } catch (err: any) {
      this.deleteSummaryError = 'No se pudo cargar el resumen: ' + (err?.message || 'desconocido');
    } finally {
      this.deleteSummaryLoading = false;
      this.cdr.detectChanges();
    }
  }

  getSellerName(): string {
    const seller = this.sellers().find((s) => s.id === this.selectedSellerId);
    return seller?.full_name || 'este vendedor';
  }

  confirmSellerDelete() {
    if (!this.selectedSellerId) return;
    this.actionLoading = true;
    this.cdr.detectChanges();
    this.auth.deleteUserFromAuth(this.selectedSellerId).then(({ error }) => {
      this.actionLoading = false;
      if (error) {
        this.toastService.error('Error al eliminar: ' + error.message);
      } else {
        this.toastService.success('Vendedor eliminado correctamente');
        this.showConfirmModal = false;
        this.selectedSellerId = null;
        if (this.showDetailDrawer) this.closeDetail();
        this.loadSellers();
      }
      this.cdr.detectChanges();
    });
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.cdr.detectChanges();
  }

  // ===================== DRAWER DE DETALLE =====================

  openDetail(seller: any) {
    this.detailSeller = seller;
    this.selectedSellerId = seller.id;
    this.showDetailDrawer = true;
    this.cdr.detectChanges();
  }

  closeDetail() {
    this.showDetailDrawer = false;
    this.detailSeller = null;
    this.selectedSellerId = null;
    this.cdr.detectChanges();
  }

  // ===================== FORMULARIO (DRAWER) =====================

  openNewSeller() {
    this.isEditMode = false;
    this.formStep = 1;
    this.resetForm();
    this.showFormDrawer = true;
    this.showDetailDrawer = false;
    this.cdr.detectChanges();
  }

  async openEditSeller(seller: any) {
    this.isEditMode = true;
    this.formStep = 1;
    this.resetForm();
    this.formLoading = true;
    this.showFormDrawer = true;
    this.showDetailDrawer = false;
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.auth.getProfileById(seller.id);
      if (error || !data) {
        this.formError = 'Error al cargar datos del vendedor';
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      this.sellerForm = {
        id: data.id,
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        agency_brand: data.agency_brand || '',
        other_brand: '',
        agency_location: data.agency_location || '',
        socio_id: data.socio_id || '',
        active: data.active !== false,
      };

      this.formLoading = false;
      this.cdr.detectChanges();
    } catch {
      this.formError = 'Error inesperado al cargar el vendedor';
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  private resetForm() {
    this.sellerForm = {
      id: '',
      seller_number: '',
      full_name: '',
      password: '',
      agency_brand: '',
      other_brand: '',
      agency_location: '',
      socio_id: '',
      active: true,
    };
    this.formError = '';
    this.fieldErrors = {};
    this.formValidated = false;
    this.showPassword = false;
    this.formLoading = false;
  }

  nextFormStep() {
    if (this.formStep === 1) {
      if (!this.validateStep1()) return;
      this.formStep = 2;
      this.cdr.detectChanges();
    } else {
      this.submitForm();
    }
  }

  prevFormStep() {
    if (this.formStep === 2) {
      this.formStep = 1;
    } else {
      this.closeFormDrawer();
    }
    this.cdr.detectChanges();
  }

  /** Filtra en vivo: solo dígitos, máximo 10 caracteres (igual que en el registro). */
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    this.sellerForm.seller_number = input.value;
    if (this.fieldErrors['seller_number']) this.validateStep1();
  }

  validateStep1(): boolean {
    this.formValidated = true;
    this.fieldErrors = {};
    let valid = true;
    const numberField = this.sellerForm.seller_number.trim();

    if (!this.isEditMode) {
      if (!numberField) {
        this.fieldErrors['seller_number'] = 'El número de celular es obligatorio.';
        valid = false;
      } else if (!/^\d{10}$/.test(numberField)) {
        this.fieldErrors['seller_number'] = 'Ingresa un número válido de 10 dígitos.';
        valid = false;
      }
    }

    if (!this.sellerForm.full_name.trim()) {
      this.fieldErrors['full_name'] = 'El nombre completo es obligatorio.';
      valid = false;
    }

    if (!this.isEditMode) {
      if (!this.sellerForm.password) {
        this.fieldErrors['password'] = 'La contraseña es obligatoria.';
        valid = false;
      } else if (this.sellerForm.password.length < 6) {
        this.fieldErrors['password'] = 'La contraseña debe tener al menos 6 caracteres.';
        valid = false;
      }
    } else if (this.sellerForm.password && this.sellerForm.password.length < 6) {
      this.fieldErrors['password'] = 'La contraseña debe tener al menos 6 caracteres.';
      valid = false;
    }

    this.cdr.detectChanges();
    return valid;
  }

  validateStep2(): boolean {
    this.formValidated = true;
    this.fieldErrors = {
      ...this.fieldErrors,
      agency_brand: '',
      other_brand: '',
      agency_location: '',
    };
    let valid = true;
    const finalBrand =
      this.sellerForm.agency_brand === 'Otro'
        ? this.sellerForm.other_brand
        : this.sellerForm.agency_brand;

    if (!finalBrand) {
      this.fieldErrors[this.sellerForm.agency_brand === 'Otro' ? 'other_brand' : 'agency_brand'] =
        'Selecciona o escribe la marca de la agencia.';
      valid = false;
    }
    if (!this.sellerForm.agency_location.trim()) {
      this.fieldErrors['agency_location'] = 'Escribe la dirección o ubicación de la agencia.';
      valid = false;
    }
    this.cdr.detectChanges();
    return valid;
  }

  generatePassword() {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    const rand = new Uint32Array(12);
    crypto.getRandomValues(rand);
    let pw = '';
    for (let i = 0; i < 12; i++) pw += chars[rand[i] % chars.length];
    this.sellerForm.password = pw;
    this.fieldErrors['password'] = '';
    this.cdr.detectChanges();
  }

  closeFormDrawer() {
    this.showFormDrawer = false;
    this.cdr.detectChanges();
  }

  // ===================== GUARDAR (CREAR / EDITAR) =====================

  async submitForm() {
    this.formError = '';
    if (this.formStep === 1) {
      if (!this.validateStep1()) return;
      if (!this.validateStep2()) {
        this.formStep = 2;
        this.cdr.detectChanges();
        return;
      }
    }

    const finalBrand =
      this.sellerForm.agency_brand === 'Otro'
        ? this.sellerForm.other_brand
        : this.sellerForm.agency_brand;

    const finalLocation = this.sellerForm.agency_location.trim();

    this.formLoading = true;
    this.cdr.detectChanges();

    try {
      // ---------- EDICIÓN ----------
      if (this.isEditMode) {
        const { error } = await this.auth.updateProfile(this.sellerForm.id, {
          full_name: this.sellerForm.full_name.trim(),
          agency_brand: finalBrand,
          agency_location: finalLocation,
          seller_number: this.sellerForm.seller_number.trim(),
          socio_id: this.sellerForm.socio_id || null,
          active: this.sellerForm.active,
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
          this.formLoading = false;
          this.cdr.detectChanges();
          return;
        }
        if (this.sellerForm.password) {
          const { error: pwdError } = await this.auth.updateUserPassword(
            this.sellerForm.id,
            this.sellerForm.password,
          );
          if (pwdError) {
            this.formError = 'Cambio de contraseña falló: ' + pwdError.message;
            this.formLoading = false;
            this.cdr.detectChanges();
            return;
          }
        }
        this.toastService.success('Vendedor actualizado correctamente');
        this.closeFormDrawer();
        await this.loadSellers();
        return;
      }

      // ---------- CREACIÓN ----------
      const email = `vendedor_${this.sellerForm.seller_number.trim()}@golease.com`;

      // 1) Camino preferido: RPC create_user (no cambia sesión, sin recargar)
      const created = await this.auth.createUserAsAdmin({
        email,
        password: this.sellerForm.password,
        full_name: this.sellerForm.full_name.trim(),
        role: 'seller',
      });

      if (!created.error && created.data?.id) {
        const { error: profileError } = await this.auth.updateProfile(created.data.id, {
          email,
          seller_number: this.sellerForm.seller_number.trim(),
          full_name: this.sellerForm.full_name.trim(),
          agency_brand: finalBrand,
          agency_location: finalLocation,
          socio_id: this.sellerForm.socio_id || null,
          active: true,
          role: 'seller',
        });
        if (profileError) {
          this.toastService.error('Usuario creado, pero falló su perfil: ' + profileError.message);
        } else {
          this.toastService.success('Vendedor creado correctamente');
        }
        this.closeFormDrawer();
        await this.loadSellers();
        this.cdr.detectChanges();
        return;
      }

      // 2) Fallback: signUp + restaurar sesión (base sin migrar la RPC)
      const {
        data: { session: adminSession },
      } = await this.client.auth.getSession();
      const { error: authError } = await this.auth.signUp(
        email,
        this.sellerForm.password || '12345678',
        this.sellerForm.full_name,
      );
      if (authError) {
        this.formError = 'Error al crear usuario: ' + authError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      const newUser = this.auth.currentUser();
      if (!newUser) {
        this.formError = 'No se pudo obtener el usuario';
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      // CRÍTICO: restaurar la sesión del administrador ANTES de actualizar el
      // perfil. El trigger secure_profiles_row bloquea cambios de active/rol
      // para no-admins; con la sesión del usuario recién creado podría
      // rechazar la actualización.
      await this.auth.restoreSession(adminSession);

      const { error: profileError } = await this.auth.updateProfile(newUser.id, {
        email,
        seller_number: this.sellerForm.seller_number.trim(),
        full_name: this.sellerForm.full_name.trim(),
        agency_brand: finalBrand,
        agency_location: finalLocation,
        active: true,
        role: 'seller',
      });
      if (profileError) {
        this.formError = 'Error al guardar perfil: ' + profileError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      this.toastService.success('Vendedor creado correctamente');
      this.closeFormDrawer();
      await this.loadSellers();
      this.cdr.detectChanges();
    } catch (err: any) {
      this.formError = 'Error inesperado: ' + (err.message || '');
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  // ===================== NOTAS =====================

  async abrirNotas(seller: any) {
    if (!this.canManageNotas) return;
    this.selectedSellerId = seller.id;
    this.showNotasModal = true;
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    await this.cargarNotas(seller.id);
  }

  esNotaPropia(nota: EntityNote): boolean {
    return nota.es_propia;
  }

  getNotaAutorNombre(nota: EntityNote): string {
    return nota.autor_nombre || 'Autor no disponible';
  }

  async cargarNotas(sellerId: string) {
    this.notaLoading = true;
    try {
      const { data, error } = await this.notesService.getNotes('seller', sellerId);
      if (error) {
        this.notaError = 'Error al cargar notas: ' + (error.message || 'desconocido');
      } else {
        this.notasVendedor = data;
        this.notaError = '';
      }
    } catch (err: any) {
      this.notaError = 'Error al cargar notas: ' + (err.message || 'desconocido');
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  async guardarNota() {
    if (!this.canManageNotas || !this.selectedSellerId) return;
    if (!this.notaText.trim()) return;
    this.notaLoading = true;
    this.notaError = '';

    const editando = this.notaEditando;
    const { error } = editando
      ? await this.notesService.updateOwnNote(editando.id, this.notaText.trim())
      : await this.notesService.createNote('seller', this.selectedSellerId, this.notaText.trim());

    if (error) {
      this.notaError = 'Error al guardar nota';
    } else {
      this.notaText = '';
      this.notaEditando = null;
      await this.cargarNotas(this.selectedSellerId);
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  editarNota(nota: EntityNote) {
    if (!this.canManageNotas || !this.esNotaPropia(nota)) return;
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }

  eliminarNota(nota: EntityNote) {
    if (!this.canManageNotas || !this.esNotaPropia(nota)) return;
    this.notaToDelete = nota;
    this.showNotaConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmarEliminarNota() {
    if (!this.canManageNotas) return;
    if (!this.notaToDelete || !this.esNotaPropia(this.notaToDelete)) return;
    this.notaLoading = true;
    this.showNotaConfirmModal = false;
    const { error } = await this.notesService.deleteOwnNote(this.notaToDelete.id);
    if (error) {
      this.notaError = 'Error al eliminar nota';
    } else {
      await this.cargarNotas(this.selectedSellerId!);
    }
    this.notaLoading = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cancelarEliminarNota() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.cdr.detectChanges();
  }

  cerrarNotas() {
    this.showNotaConfirmModal = false;
    this.notaToDelete = null;
    this.showNotasModal = false;
    this.notasVendedor = [];
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    this.selectedSellerId = null;
  }

  // ===================== HELPERS =====================

  getInitials(name: string): string {
    const clean = (name || '').trim().replace(/\s+/g, ' ');
    if (!clean) return '?';
    const parts = clean.split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }

  getAvatarClass(name: string): string {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = (hash * 31 + (name.charCodeAt(i) || 0)) % 1000;
    }
    return `avatar-tone-${hash % 6}`;
  }
}
