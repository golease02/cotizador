import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-seller-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-seller-form.component.html',
  styleUrls: ['./admin-seller-form.component.css']
})
export class AdminSellerFormComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode = false;
  sellerId: string | null = null;
  loading = false;
  errorMessage = '';

  seller = {
    seller_number: '',
    full_name: '',
    email: '',
    password: '',
    agency_brand: '',
    agency_location: '',
    role: 'seller',
    active: true
  };

  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'seller', label: 'Vendedor' }
  ];
  brands = ['HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI'];
  locations = [
    'Centro Histórico',
    'Juriquilla',
    'El Marqués',
    'Plaza de Toros',
    'Zaklo',
    'Paseo Querétaro',
    'Antea',
    'Ciudad del Sol'
  ];

  async ngOnInit() {
    this.sellerId = this.route.snapshot.paramMap.get('id');
    if (this.sellerId) {
      this.isEditMode = true;
      await this.loadSeller();
    }
  }

  async loadSeller() {
    this.loading = true;
    const { data, error } = await this.supabase.getProfileById(this.sellerId!);
    if (error) {
      this.errorMessage = 'Error al cargar usuario';
      console.error(error);
    } else if (data) {
      this.seller = {
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        email: data.email || '',
        password: '',
        agency_brand: data.agency_brand || '',
        agency_location: data.agency_location || '',
        role: data.role || 'seller',
        active: data.active !== false
      };
    }
    this.loading = false;
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    if (this.isEditMode) {
      // Actualizar perfil existente
      const { error } = await this.supabase.updateProfile(this.sellerId!, {
        full_name: this.seller.full_name,
        agency_brand: this.seller.agency_brand,
        agency_location: this.seller.agency_location,
        seller_number: this.seller.seller_number,
        role: this.seller.role,
        active: this.seller.active
      });
      if (error) {
        this.errorMessage = 'Error al actualizar: ' + error.message;
        this.loading = false;
        return;
      }
    } else {
      // Crear nuevo usuario (registro)
      if (!this.seller.password || this.seller.password.length < 6) {
        this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
        this.loading = false;
        return;
      }
      const email = `vendedor_${this.seller.seller_number}@golease.com`;
      const { error: authError } = await this.supabase.signUp(
        email,
        this.seller.password,
        this.seller.full_name
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
        seller_number: this.seller.seller_number,
        full_name: this.seller.full_name,
        agency_brand: this.seller.agency_brand,
        agency_location: this.seller.agency_location,
        role: this.seller.role,
        active: this.seller.active
      });
      if (profileError) {
        this.errorMessage = 'Error al guardar perfil: ' + profileError.message;
        this.loading = false;
        return;
      }
    }

    this.loading = false;
    this.router.navigate(['/admin/sellers']);
  }
}