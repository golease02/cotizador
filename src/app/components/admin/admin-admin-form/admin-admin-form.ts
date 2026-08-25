import { Component, inject, OnInit } from '@angular/core';
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

  isEditMode = false;
  adminId: string | null = null;
  loading = false;
  errorMessage = '';

  admin = {
    seller_number: '',
    full_name: '',
    password: '',
    role: 'admin'
  };

  async ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId) {
      this.isEditMode = true;
      await this.loadAdmin();
    }
  }

  async loadAdmin() {
    this.loading = true;
    const { data, error } = await this.supabase.getProfileById(this.adminId!);
    if (error) {
      this.errorMessage = 'Error al cargar administrador';
      console.error(error);
    } else if (data) {
      this.admin = {
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        role: data.role || 'admin'
      };
    }
    this.loading = false;
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode) {
      const { error } = await this.supabase.updateProfile(this.adminId!, {
        full_name: this.admin.full_name,
        seller_number: this.admin.seller_number,
        role: 'admin'
      });
      if (error) {
        this.errorMessage = 'Error al actualizar administrador: ' + error.message;
        this.loading = false;
        return;
      }
    } else {
      const email = `admin_${this.admin.seller_number}@golease.com`;
      const { error: authError } = await this.supabase.signUp(
        email,
        this.admin.password || '12345678',
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
        role: 'admin'
      });
      if (profileError) {
        this.errorMessage = 'Error al guardar perfil: ' + profileError.message;
        this.loading = false;
        return;
      }
    }

    this.loading = false;
    this.router.navigate(['/admin/admins']);
  }
}


