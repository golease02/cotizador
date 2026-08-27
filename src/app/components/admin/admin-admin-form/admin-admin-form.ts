import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-admin-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-admin-form.html',
  styleUrls: ['./admin-admin-form.css']
})
export class AdminAdminFormComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  adminId: string | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  admin = {
    seller_number: '',
    full_name: '',
    password: '',
    active: true
  };

  async ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId) {
      this.isEditMode = true;
      await this.loadAdmin();
    } else {
      this.isEditMode = false;
      this.loading = false;
    }
  }

  async loadAdmin() {
    this.loading = true;
    this.errorMessage = '';
    try {
      const { data, error } = await this.supabase.getProfileById(this.adminId!);
      if (error || !data) {
        this.errorMessage = 'Error al cargar administrador';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }
      if (data.role !== 'admin') {
        this.errorMessage = 'El usuario no es administrador';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }
      this.admin = {
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        active: data.active !== false
      };
      this.loading = false;
      this.cdr.detectChanges();
    } catch (err) {
      this.errorMessage = 'Error inesperado al cargar administrador';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.admin.seller_number || !this.admin.full_name) {
      this.errorMessage = 'Número y nombre son obligatorios';
      this.loading = false;
      return;
    }
    if (!this.isEditMode && this.admin.password.length < 6) {
      this.errorMessage = 'La contraseña es obligatoria y debe tener al menos 6 caracteres';
      this.loading = false;
      return;
    }
    if (this.isEditMode && this.admin.password && this.admin.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      this.loading = false;
      return;
    }

    try {
      // Guardar sesión del administrador actual para restaurar después
      const { data: { session: adminSession } } = await this.supabase.client.auth.getSession();

      if (this.isEditMode) {
        // Actualizar administrador (sin cambio de contraseña)
        const { error } = await this.supabase.updateProfile(this.adminId!, {
          full_name: this.admin.full_name,
          seller_number: this.admin.seller_number,
          active: this.admin.active,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (error) {
          this.errorMessage = 'Error al actualizar: ' + error.message;
          this.loading = false;
          return;
        }
        if (this.admin.password) {
          const { error: passwordError } = await this.supabase.updateUserPassword(
            this.adminId!,
            this.admin.password
          );
          if (passwordError) {
            this.errorMessage = 'Error al cambiar la contraseña: ' + passwordError.message;
            this.loading = false;
            return;
          }
        }
        this.successMessage = '✅ Administrador actualizado correctamente';
        setTimeout(() => this.router.navigate(['/admin/admins']), 1500);
      } else {
        // Crear nuevo administrador
        const email = `admin_${this.admin.seller_number}@golease.com`;
        const { error: authError } = await this.supabase.signUp(
          email,
          this.admin.password,
          this.admin.full_name
        );
        if (authError) {
          this.errorMessage = 'Error al crear usuario: ' + authError.message;
          this.loading = false;
          return;
        }

        const user = this.supabase.currentUser();
        if (!user) {
          this.errorMessage = 'No se pudo obtener el usuario';
          this.loading = false;
          return;
        }

        const { error: profileError } = await this.supabase.updateProfile(user.id, {
          seller_number: this.admin.seller_number,
          full_name: this.admin.full_name,
          active: true,
          role: 'admin',
          agency_name: 'GoLease',
          agency_location: 'Querétaro'
        });
        if (profileError) {
          this.errorMessage = 'Error al guardar perfil: ' + profileError.message;
          this.loading = false;
          return;
        }

        // Restaurar sesión del administrador
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
          // Notificar al header que debe refrescar
          this.supabase.triggerProfileRefresh();
          this.cdr.detectChanges();
        }

        this.successMessage = '✅ Administrador creado correctamente';
        setTimeout(() => this.router.navigate(['/admin/admins']), 1500);
      }
    } catch (err: any) {
      this.errorMessage = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
