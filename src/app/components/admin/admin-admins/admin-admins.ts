import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-admins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-admins.html',
  styleUrls: ['./admin-admins.css']
})
export class AdminAdminsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);

  // Listado
  admins = signal<any[]>([]);
  filteredAdmins = signal<any[]>([]);
  loading = true;
  searchTerm = '';

  // Modales
  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedAdminId: string | null = null;
  showFormModal = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  formSuccess = '';

  // Formulario
  adminForm = {
    id: '',
    seller_number: '',
    full_name: '',
    password: '',
    active: true
  };

  async ngOnInit() {
    await this.loadAdmins();
  }

  // ===================== LISTADO =====================

  async loadAdmins() {
    this.loading = true;
    const { data, error } = await this.supabase.getAdmins();
    if (error) {
      console.error('Error loading admins:', error);
    } else {
      this.admins.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.admins();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(a =>
        (a.full_name || '').toLowerCase().includes(term) ||
        (a.seller_number || '').toLowerCase().includes(term)
      );
    }
    this.filteredAdmins.set(filtered);
    this.cdr.detectChanges();
  }

  onSearch() {
    this.applyFilters();
  }

  // ===================== MODAL DE CONFIRMACIÓN =====================

  async toggleAdminStatus(adminId: string) {
    this.selectedAdminId = adminId;
    this.confirmAction = 'toggle';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async deleteAdmin(adminId: string) {
    this.selectedAdminId = adminId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmActionHandler() {
    if (!this.selectedAdminId) return;
    this.loading = true;

    if (this.confirmAction === 'delete') {
      const { error } = await this.supabase.deleteUserFromAuth(this.selectedAdminId);
      if (error) {
        alert('Error al eliminar: ' + error.message);
      }
    } else if (this.confirmAction === 'toggle') {
      const admin = this.admins().find(a => a.id === this.selectedAdminId);
      if (admin) {
        const { error } = await this.supabase.updateProfile(this.selectedAdminId, {
          active: !admin.active
        });
        if (error) {
          alert('Error al cambiar estado: ' + error.message);
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.confirmAction = null;
    await this.loadAdmins();
    this.loading = false;
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.confirmAction = null;
    this.cdr.detectChanges();
  }

  // ===================== MODAL DE FORMULARIO =====================

  openNewAdmin() {
    this.isEditMode = false;
    this.adminForm = {
      id: '',
      seller_number: '',
      full_name: '',
      password: '',
      active: true
    };
    this.formError = '';
    this.formSuccess = '';
    this.formLoading = false;
    this.showFormModal = true;
    this.cdr.detectChanges();
  }

  async openEditAdmin(admin: any) {
    this.isEditMode = true;
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.supabase.getProfileById(admin.id);
      if (error || !data) {
        this.formError = 'Error al cargar datos del administrador';
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      if (data.role !== 'admin') {
        this.formError = 'El usuario no es administrador';
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
    } catch (err) {
      this.formError = 'Error inesperado al cargar el administrador';
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  // ===================== GUARDAR (CREAR/EDITAR) - IDÉNTICO A VENDEDORES =====================

  async submitForm() {
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';

    if (!this.adminForm.seller_number || !this.adminForm.full_name) {
      this.formError = 'Número y nombre son obligatorios';
      this.formLoading = false;
      return;
    }
    if (!this.isEditMode && this.adminForm.password.length < 6) {
      this.formError = 'La contraseña es obligatoria y debe tener al menos 6 caracteres';
      this.formLoading = false;
      return;
    }
    if (this.isEditMode && this.adminForm.password && this.adminForm.password.length < 6) {
      this.formError = 'La contraseña debe tener al menos 6 caracteres';
      this.formLoading = false;
      return;
    }

    try {
      // Guardar sesión del administrador actual
      const { data: { session: adminSession } } = await this.supabase.client.auth.getSession();
      console.log('🔐 Sesión del admin guardada:', adminSession?.user?.email);

      if (this.isEditMode) {
        const { error } = await this.supabase.updateProfile(this.adminForm.id, {
          full_name: this.adminForm.full_name,
          seller_number: this.adminForm.seller_number,
          active: this.adminForm.active,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
          this.formLoading = false;
          return;
        }
        if (this.adminForm.password) {
          const { error: passwordError } = await this.supabase.updateUserPassword(
            this.adminForm.id,
            this.adminForm.password
          );
          if (passwordError) {
            this.formError = 'Error al cambiar la contraseña: ' + passwordError.message;
            this.formLoading = false;
            return;
          }
        }
        this.formSuccess = '✅ Administrador actualizado correctamente';
      } else {
        // Crear nuevo administrador
        const email = `admin_${this.adminForm.seller_number}@golease.com`;
        const { error: authError } = await this.supabase.signUp(
          email,
          this.adminForm.password,
          this.adminForm.full_name
        );
        if (authError) {
          this.formError = 'Error al crear usuario: ' + authError.message;
          this.formLoading = false;
          return;
        }

        const newUser = this.supabase.currentUser();
        if (!newUser) {
          this.formError = 'No se pudo obtener el usuario';
          this.formLoading = false;
          return;
        }

        const { error: profileError } = await this.supabase.updateProfile(newUser.id, {
          seller_number: this.adminForm.seller_number,
          full_name: this.adminForm.full_name,
          active: true,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (profileError) {
          this.formError = 'Error al guardar perfil: ' + profileError.message;
          this.formLoading = false;
          return;
        }

        // ✅ Restaurar sesión del administrador original
        if (adminSession) {
          await this.supabase.client.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token
          });
          await new Promise(resolve => setTimeout(resolve, 500));
          const adminUser = this.supabase.currentUser();
          if (adminUser) {
            await this.supabase.loadProfile(adminUser.id);
          }
          // Notificar al header que debe refrescar el perfil
          this.supabase.triggerProfileRefresh();
          this.cdr.detectChanges();
        }

        this.formSuccess = '✅ Administrador creado correctamente';

        // ✅ Forzar recarga de la página para actualizar el header (igual que en vendedores)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: any) {
      console.error('Error en submitForm:', err);
      this.formError = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.formLoading = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.showFormModal = false;
        this.loadAdmins();
      }, 1500);
    }
  }

  closeFormModal() {
    this.showFormModal = false;
    this.cdr.detectChanges();
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}
