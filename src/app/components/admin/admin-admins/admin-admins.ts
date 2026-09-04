import { Component, inject, signal, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-admins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-admins.html',
  styleUrls: ['./admin-admins.css']
})
export class AdminAdminsComponent implements OnInit {
  private auth = inject(AuthService);
  private admin = inject(AdminService);
  private client = getSupabaseClient();
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  // ------------------- LISTADO -------------------
  admins = signal<any[]>([]);
  filteredAdmins = signal<any[]>([]);
  loading = true;
  actionLoading = false;
  searchTerm = '';
  statusFilter: 'todos' | 'activos' | 'inactivos' = 'todos';
  sortBy: 'recientes' | 'nombre' | 'antiguos' = 'recientes';

  get stats() {
    const list = this.admins();
    const total = list.length;
    const activos = list.filter(a => (a.active ?? true)).length;
    return { total, activos, inactivos: total - activos };
  }

  // ------------------- CONFIRMACIÓN (solo eliminar) -------------------
  showConfirmModal = false;
  selectedAdminId: string | null = null;
  selectedAdminCardId: string | null = null;

  // ------------------- FORMULARIO (DRAWER) -------------------
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  showPassword = false;
  formValidated = false;
  fieldErrors: Record<string, string> = {};

  adminForm = {
    id: '',
    seller_number: '',
    full_name: '',
    password: '',
    active: true
  };

  // ------------------- DRAWER DE DETALLE -------------------
  showDetailDrawer = false;
  detailAdmin: any = null;

  async ngOnInit() {
    await this.loadAdmins();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showConfirmModal) this.cancelModal();
    if (this.showDetailDrawer) this.closeDetail();
    if (this.showFormDrawer) this.closeFormDrawer();
  }

  handleToast(t: any) {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }

  // ===================== DETALLE (DRAWER) =====================

  openDetail(admin: any) {
    this.detailAdmin = admin;
    this.showDetailDrawer = true;
  }

  closeDetail() {
    this.showDetailDrawer = false;
    this.detailAdmin = null;
  }

  detailEdit() {
    const admin = this.detailAdmin;
    this.closeDetail();
    if (admin) this.openEditAdmin(admin);
  }

  detailDelete() {
    const admin = this.detailAdmin;
    this.closeDetail();
    if (admin) this.deleteAdmin(admin.id);
  }

  // ===================== LISTADO =====================

  async loadAdmins() {
    this.loading = true;
    const { data, error } = await this.auth.getAdmins();
    if (!error) {
      this.admins.set(data || []);
      this.applyFilters();
    } else {
      this.toastService.error('No se pudieron cargar los administradores');
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.admins();
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      filtered = filtered.filter(a =>
        (a.full_name || '').toLowerCase().includes(term) ||
        (a.seller_number || '').toLowerCase().includes(term)
      );
    }
    if (this.statusFilter === 'activos') filtered = filtered.filter(a => (a.active ?? true));
    if (this.statusFilter === 'inactivos') filtered = filtered.filter(a => !(a.active ?? true));

    switch (this.sortBy) {
      case 'nombre':
        filtered = [...filtered].sort((a, b) => (a.full_name || '').localeCompare(b.full_name || ''));
        break;
      case 'antiguos':
        filtered = [...filtered].reverse();
        break;
      case 'recientes':
      default:
        break;
    }
    this.filteredAdmins.set(filtered);
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
    this.sortBy = 'recientes';
    this.selectedAdminCardId = null;
    this.applyFilters();
  }

  setStatusFilter(f: 'todos' | 'activos' | 'inactivos') {
    this.statusFilter = f;
    this.applyFilters();
  }

  setSortBy(value: 'recientes' | 'nombre' | 'antiguos') {
    this.sortBy = value;
    this.applyFilters();
  }

  selectAdmin(adminId: string): void {
    this.selectedAdminCardId = adminId;
  }

  // ===================== TOGGLE DE ESTADO (INLINE + DESHACER) =====================

  async toggleAdminStatus(admin: any) {
    if (this.actionLoading) return;
    const previous = admin.active ?? true;
    const next = !previous;
    this.patchAdmin(admin.id, { active: next });

    const { error } = await this.auth.updateProfile(admin.id, { active: next });
    if (error) {
      this.patchAdmin(admin.id, { active: previous });
      this.toastService.error('No se pudo cambiar el estado: ' + error.message);
      return;
    }

    this.toastService.undo(
      next ? `${admin.full_name} ahora está activo` : `${admin.full_name} quedó inactivo`,
      () => {
        this.patchAdmin(admin.id, { active: previous });
        this.auth.updateProfile(admin.id, { active: previous });
      }
    );
  }

  private patchAdmin(id: string, patch: any) {
    this.admins.update(list => list.map(a => (a.id === id ? { ...a, ...patch } : a)));
    this.applyFilters();
  }




  // ===================== ELIMINAR (CON CONFIRMACIÓN) =====================

  deleteAdmin(adminId: string) {
    this.selectedAdminId = adminId;
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  getAdminName(): string {
    const admin = this.admins().find(a => a.id === this.selectedAdminId);
    return admin?.full_name || 'este administrador';
  }

  confirmAdminDelete() {
    if (!this.selectedAdminId) return;
    this.actionLoading = true;
    this.cdr.detectChanges();
    this.auth.deleteUserFromAuth(this.selectedAdminId).then(({ error }) => {
      this.actionLoading = false;
      if (error) {
        this.toastService.error('Error al eliminar: ' + error.message);
      } else {
        this.toastService.success('Administrador eliminado correctamente');
        this.showConfirmModal = false;
        this.selectedAdminId = null;
        this.loadAdmins();
      }
      this.cdr.detectChanges();
    });
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.cdr.detectChanges();
  }

  // ===================== FORMULARIO (DRAWER) =====================

  openNewAdmin() {
    this.isEditMode = false;
    this.resetForm();
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }

  async openEditAdmin(admin: any) {
    this.isEditMode = true;
    this.resetForm();
    this.formLoading = true;
    this.showFormDrawer = true;
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.auth.getProfileById(admin.id);
      if (error || !data || data.role !== 'admin') {
        this.formError = 'Error al cargar datos del administrador';
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      this.adminForm = {
        id: data.id,
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        active: data.active !== false
      };

      this.formLoading = false;
      this.cdr.detectChanges();
    } catch {
      this.formError = 'Error inesperado al cargar el administrador';
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  private resetForm() {
    this.adminForm = { id: '', seller_number: '', full_name: '', password: '', active: true };
    this.formError = '';
    this.fieldErrors = {};
    this.formValidated = false;
    this.showPassword = false;
    this.formLoading = false;
  }

  validateForm(): boolean {
    this.formValidated = true;
    this.fieldErrors = {};
    let valid = true;
    const numberField = this.adminForm.seller_number.trim();

    if (!numberField) {
      this.fieldErrors['seller_number'] = 'El N° de contacto es obligatorio.';
      valid = false;
    } else if (!/^\d+$/.test(numberField) || numberField.length < 3) {
      this.fieldErrors['seller_number'] = 'Ingresa un N° de contacto válido.';
      valid = false;
    }

    if (!this.adminForm.full_name.trim()) {
      this.fieldErrors['full_name'] = 'El nombre completo es obligatorio.';
      valid = false;
    }

    if (!this.isEditMode) {
      if (!this.adminForm.password) {
        this.fieldErrors['password'] = 'La contraseña es obligatoria.';
        valid = false;
      } else if (this.adminForm.password.length < 6) {
        this.fieldErrors['password'] = 'La contraseña debe tener al menos 6 caracteres.';
        valid = false;
      }
    } else if (this.adminForm.password && this.adminForm.password.length < 6) {
      this.fieldErrors['password'] = 'La contraseña debe tener al menos 6 caracteres.';
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
    this.adminForm.password = pw;
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
    if (!this.validateForm()) return;

    this.formLoading = true;
    this.cdr.detectChanges();

    try {
      // ---------- EDICIÓN ----------
      if (this.isEditMode) {
        const { error } = await this.auth.updateProfile(this.adminForm.id, {
          full_name: this.adminForm.full_name.trim(),
          seller_number: this.adminForm.seller_number.trim(),
          active: this.adminForm.active,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
          this.formLoading = false;
          this.cdr.detectChanges();
          return;
        }
        if (this.adminForm.password) {
          const { error: pwdError } = await this.auth.updateUserPassword(
            this.adminForm.id,
            this.adminForm.password
          );
          if (pwdError) {
            this.formError = 'Error al cambiar la contraseña: ' + pwdError.message;
            this.formLoading = false;
            this.cdr.detectChanges();
            return;
          }
        }
        this.toastService.success('Administrador actualizado correctamente');
        this.closeFormDrawer();
        await this.loadAdmins();
        return;
      }

      // ---------- CREACIÓN ----------
      const email = `admin_${this.adminForm.seller_number.trim()}@golease.com`;

      // 1) Camino preferido: RPC create_user (no cambia sesión, sin recargar)
      const created = await this.auth.createUserAsAdmin({
        email,
        password: this.adminForm.password,
        full_name: this.adminForm.full_name.trim(),
        role: 'admin'
      });

      if (!created.error && created.data?.id) {
        const { error: profileError } = await this.auth.updateProfile(created.data.id, {
          email,
          seller_number: this.adminForm.seller_number.trim(),
          full_name: this.adminForm.full_name.trim(),
          active: true,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (profileError) {
          this.toastService.error('Usuario creado, pero falló su perfil: ' + profileError.message);
        } else {
          // Verificación: confirmar que el rol quedó como admin
          const roleOk = await this.ensureRole(created.data.id, 'admin');
          if (roleOk) {
            this.toastService.success('Administrador creado correctamente');
          } else {
            this.toastService.error('El usuario se creó pero quedó como Vendedor. Elimínalo desde el CRUD e intenta de nuevo.');
          }
        }
        this.closeFormDrawer();
        await this.loadAdmins();
        this.cdr.detectChanges();
        return;
      }

      // 2) Fallback: signUp + restaurar sesión (base sin migrar la RPC)
      const { data: { session: adminSession } } = await this.client.auth.getSession();
      const { error: authError } = await this.auth.signUp(
        email,
        this.adminForm.password,
        this.adminForm.full_name
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
      // perfil. El trigger secure_profiles_row solo exime de cambios de rol a
      // is_admin(); con la sesión del usuario recién creado el cambio sería
      // rechazado y el perfil quedaría como "seller".
      await this.auth.restoreSession(adminSession);

      const { error: profileError } = await this.auth.updateProfile(newUser.id, {
        email,
        seller_number: this.adminForm.seller_number.trim(),
        full_name: this.adminForm.full_name.trim(),
        active: true,
        role: 'admin',
        agency_name: 'GoLease',
        agency_location: 'Querétaro'
      });
      if (profileError) {
        this.formError = 'Error al guardar perfil: ' + profileError.message;
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      // Verificación: confirmar que el rol quedó como admin.
      const roleOk = await this.ensureRole(newUser.id, 'admin');
      if (!roleOk) {
        this.formError = 'El usuario se creó pero quedó como Vendedor. Elimínalo desde el CRUD e intenta de nuevo.';
        this.toastService.error(this.formError);
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      this.toastService.success('Administrador creado correctamente');
      this.closeFormDrawer();
      await this.loadAdmins();
      this.cdr.detectChanges();
    } catch (err: any) {
      this.formError = 'Error inesperado: ' + (err.message || '');
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  // ===================== HELPERS =====================

  /** Confirma que el perfil quedó con el rol esperado tras la creación. */
  private async ensureRole(userId: string, expected: 'admin' | 'seller'): Promise<boolean> {
    const { data } = await this.auth.getProfileById(userId);
    return !!data && data.role === expected;
  }

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
