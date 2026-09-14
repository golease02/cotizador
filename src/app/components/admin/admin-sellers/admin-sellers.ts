import { Component, inject, signal, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {
  private admin = inject(AdminService);
  public auth = inject(AuthService);
  private client = getSupabaseClient();
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  // ------------------- LISTADO -------------------
  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  loading = true;
  actionLoading = false;
  searchTerm = '';
  statusFilter: 'todos' | 'activos' | 'inactivos' = 'todos';
  brandFilter = 'todas';
  sortBy: 'recientes' | 'nombre' | 'cotizaciones' | 'antiguos' = 'recientes';

  get stats() {
    const list = this.sellers();
    const total = list.length;
    const activos = list.filter(s => (s.active ?? true)).length;
    const cotizaciones = list.reduce((acc, s) => acc + (Number(s.quote_count) || 0), 0);
    return { total, activos, inactivos: total - activos, cotizaciones };
  }

  get brandsList(): string[] {
    const set = new Set<string>();
    this.sellers().forEach(s => { if (s.agency_brand) set.add(s.agency_brand); });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  // ------------------- CONFIRMACIÓN (solo eliminar) -------------------
  showConfirmModal = false;
  confirmAction: 'delete' | null = null;
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
    active: true
  };

  // ------------------- SOCIO (solo super admin) -------------------
  socios = signal<any[]>([]);
  isLoadingSocios = false;

  // ------------------- DRAWER DE DETALLE -------------------
  showDetailDrawer = false;
  detailSeller: any = null;

    // ------------------- NOTAS -------------------
  showNotasModal = false;
  notasVendedor: any[] = [];
  showSellerTooltip = false;
  sellerTooltipContent = '';
  sellerTooltipPosition = { x: 0, y: 0 };
  notaText = '';
  notaEditando: any = null;
  notaLoading = false;
  notaError = '';
  showNotaConfirmModal = false;
  notaToDelete: any = null;

  // ------------------- SEMAFORO COTIZACIONES -------------------
  /** Mapa de colores por vendedor: { revisadas, porCaducar, pendientes, recientes } */
  sellersQuoteColors = signal<Record<string, { revisadas: number; porCaducar: number; pendientes: number; recientes: number }>>({});

  /** Calcula los colores de cotizaciones por vendedor para el semaforo. */
  async loadSellersQuoteColors(): Promise<void> {
    try {
      const { data: quotes, error } = await this.client
        .from('quotes')
        .select('seller_id, revisada, created_at');
      if (error || !quotes) return;

      const now = Date.now();
      const map: Record<string, { revisadas: number; porCaducar: number; pendientes: number; recientes: number }> = {};

      for (const q of quotes) {
        const sid = q.seller_id;
        if (!map[sid]) map[sid] = { revisadas: 0, porCaducar: 0, pendientes: 0, recientes: 0 };

        if (q.revisada === true) {
          map[sid].revisadas++;
        } else {
          const dias = Math.floor((now - new Date(q.created_at).getTime()) / 86_400_000);
          if (dias > 7) map[sid].porCaducar++;
          else if (dias > 2) map[sid].pendientes++;
          else map[sid].recientes++;
        }
      }

      this.sellersQuoteColors.set(map);
    } catch (err) {
      console.error('Error cargando colores de cotizaciones:', err);
    }
  }

  getQuoteColors(sellerId: string): { revisadas: number; porCaducar: number; pendientes: number; recientes: number } {
    return this.sellersQuoteColors()[sellerId] || { revisadas: 0, porCaducar: 0, pendientes: 0, recientes: 0 };
  }

  // ------------------- MARCAS -------------------
  brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA'
  ];

  async ngOnInit() {
    // loadSellers(false): los colores se cargan en paralelo justo abajo, así que
    // loadSellers NO debe volver a pedirlos (antes duplicaba la consulta de quotes).
    await Promise.all([
      this.loadSellers(false),
      this.loadSellersQuoteColors(),
      this.loadSociosIfNeeded()
    ]);
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

  handleToast(t: any) {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }

  // ===================== LISTADO =====================

  async loadSellers(refreshColors = true) {
    this.loading = true;
    const { data, error } = await this.admin.getSellersWithQuoteCount();
    if (!error) {
      this.sellers.set(data || []);
      this.applyFilters();
      // En el ngOnInit los colores se piden en paralelo (refreshColors=false).
      // En los refrescos tras crear/editar/eliminar vendedor sí se recalculan.
      if (refreshColors) await this.loadSellersQuoteColors();
    } else {
      this.toastService.error('No se pudieron cargar los vendedores');
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.sellers();
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter(s =>
        (s.full_name || '').toLowerCase().includes(term) ||
        (s.seller_number || '').toLowerCase().includes(term) ||
        (s.agency_brand || '').toLowerCase().includes(term) ||
        (s.agency_location || '').toLowerCase().includes(term)
      );
    }
    if (this.statusFilter === 'activos') filtered = filtered.filter(s => (s.active ?? true));
    if (this.statusFilter === 'inactivos') filtered = filtered.filter(s => !(s.active ?? true));
    if (this.brandFilter !== 'todas') filtered = filtered.filter(s => s.agency_brand === this.brandFilter);

    switch (this.sortBy) {
      case 'nombre':
        filtered = [...filtered].sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''));
        break;
      case 'cotizaciones':
        filtered = [...filtered].sort((a, b) => (Number(b.quote_count) || 0) - (Number(a.quote_count) || 0));
        break;
      case 'antiguos':
        filtered = [...filtered].reverse();
        break;
      case 'recientes':
      default:
        break;
    }
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

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = 'todos';
    this.brandFilter = 'todas';
    this.sortBy = 'recientes';
    this.selectedSellerCardId = null;
    this.applyFilters();
  }

  setStatusFilter(f: 'todos' | 'activos' | 'inactivos') {
    this.statusFilter = f;
    this.applyFilters();
  }

  setBrandFilter(value: string) {
    this.brandFilter = value;
    this.applyFilters();
  }

  setSortBy(value: 'recientes' | 'nombre' | 'cotizaciones' | 'antiguos') {
    this.sortBy = value;
    this.applyFilters();
  }

  selectSeller(sellerId: string): void {
    this.selectedSellerCardId = sellerId;
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
      }
    );
  }

  private patchSeller(id: string, patch: any) {
    this.sellers.update(list => list.map(s => (s.id === id ? { ...s, ...patch } : s)));
    if (this.detailSeller?.id === id) {
      this.detailSeller = { ...this.detailSeller, ...patch };
    }
    this.applyFilters();
  }

  // ===================== ELIMINAR (CON CONFIRMACIÓN) =====================

  async deleteSeller(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  getSellerName(): string {
    const seller = this.sellers().find(s => s.id === this.selectedSellerId);
    return seller?.full_name || 'este vendedor';
  }

  getSellerQuoteCount(): number {
    const seller = this.sellers().find(s => s.id === this.selectedSellerId);
    return seller?.quote_count || 0;
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
        this.confirmAction = null;
        if (this.showDetailDrawer) this.closeDetail();
        this.loadSellers();
      }
      this.cdr.detectChanges();
    });
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
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
        active: data.active !== false
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
      active: true
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
    this.fieldErrors = { ...this.fieldErrors, agency_brand: '', other_brand: '', agency_location: '' };
    let valid = true;
    const finalBrand = this.sellerForm.agency_brand === 'Otro'
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

    const finalBrand = this.sellerForm.agency_brand === 'Otro'
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
          active: this.sellerForm.active
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
            this.sellerForm.password
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
        role: 'seller'
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
          role: 'seller'
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
      const { data: { session: adminSession } } = await this.client.auth.getSession();
      const { error: authError } = await this.auth.signUp(
        email,
        this.sellerForm.password || '12345678',
        this.sellerForm.full_name
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
        role: 'seller'
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
    this.selectedSellerId = seller.id;
    this.showNotasModal = true;
    this.notaText = '';
    this.notaEditando = null;
    this.notaError = '';
    await this.cargarNotas(seller.id);
  }

  async cargarNotas(sellerId: string) {
    this.notaLoading = true;
    try {
      const { data, error } = await this.client
        .from('notas')
        .select('*')
        .eq('entidad_tipo', 'seller')
        .eq('entidad_id', sellerId)
        .order('created_at', { ascending: false });
      if (error) {
        this.notaError = 'Error al cargar notas: ' + (error.message || 'desconocido');
      } else {
        this.notasVendedor = data || [];
        this.notaError = '';
      }
    } catch (err: any) {
      this.notaError = 'Error al cargar notas: ' + (err.message || 'desconocido');
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  async guardarNota() {
    if (!this.notaText.trim()) return;
    this.notaLoading = true;
    this.notaError = '';

    const user = this.auth.currentUser();
    const payload = {
      entidad_tipo: 'seller',
      entidad_id: this.selectedSellerId,
      texto: this.notaText.trim(),
      creado_por: user?.id || null,
      created_at: new Date().toISOString()
    };

    let error = null;
    if (this.notaEditando) {
      const { error: updateError } = await this.client
        .from('notas')
        .update({ texto: this.notaText.trim() })
        .eq('id', this.notaEditando.id);
      error = updateError;
    } else {
      const { error: insertError } = await this.client
        .from('notas')
        .insert([payload]);
      error = insertError;
    }

    if (error) {
      this.notaError = 'Error al guardar nota';
    } else {
      this.notaText = '';
      this.notaEditando = null;
      await this.cargarNotas(this.selectedSellerId!);
    }
    this.notaLoading = false;
    this.cdr.detectChanges();
  }

  editarNota(nota: any) {
    this.notaEditando = nota;
    this.notaText = nota.texto;
  }

  eliminarNota(nota: any) {
    this.notaToDelete = nota;
    this.showNotaConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmarEliminarNota() {
    if (!this.notaToDelete) return;
    this.notaLoading = true;
    this.showNotaConfirmModal = false;
    const { error } = await this.client
      .from('notas')
      .delete()
      .eq('id', this.notaToDelete.id);
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

  // ===================== TOOLTIP =====================

  mostrarNotasTooltip(event: MouseEvent, seller: any) {
    this.client
      .from('notas')
      .select('texto, created_at')
      .eq('entidad_tipo', 'seller')
      .eq('entidad_id', seller.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        const notes = !error && data ? data.map(note => `• ${note.texto}`).join('\n') : '';
        this.sellerTooltipContent = notes || 'Sin notas';
        this.showSellerTooltip = true;
        let x = event.clientX + 14;
        let y = event.clientY + 14;
        if (x + 300 > window.innerWidth) x = event.clientX - 314;
        if (y + 140 > window.innerHeight) y = event.clientY - 150;
        this.sellerTooltipPosition = { x, y };
        this.cdr.detectChanges();
      });
  }

  ocultarNotasTooltip() {
    this.showSellerTooltip = false;
    this.sellerTooltipContent = '';
    this.cdr.detectChanges();
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
