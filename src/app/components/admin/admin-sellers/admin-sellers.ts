import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {
  private supabase = inject(SupabaseService);

  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  loading = true;
  searchTerm = '';

  // Modal de confirmación
  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedSellerId: string | null = null;

  // Modal de formulario (crear/editar)
  showFormModal = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  formSuccess = '';
  sellerForm = {
    id: '',
    seller_number: '',
    full_name: '',
    password: '',
    agency_brand: '',
    agency_location: '',
    active: true
  };

  brands = ['HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI'];
  locations = [
    'Centro Histórico', 'Juriquilla', 'El Marqués', 'Plaza de Toros',
    'Zaklo', 'Paseo Querétaro', 'Antea', 'Ciudad del Sol'
  ];

  async ngOnInit() {
    await this.loadSellers();
  }

  async loadSellers() {
    this.loading = true;
    const { data, error } = await this.supabase.getSellersWithQuoteCount();
    if (error) {
      console.error('Error loading sellers:', error);
    } else {
      this.sellers.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
  }

  applyFilters() {
    let filtered = this.sellers();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(s =>
        (s.full_name || '').toLowerCase().includes(term) ||
        (s.seller_number || '').toLowerCase().includes(term)
      );
    }
    this.filteredSellers.set(filtered);
  }

  onSearch() {
    this.applyFilters();
  }

  // ===================== MODAL DE CONFIRMACIÓN =====================

  async toggleSellerStatus(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.confirmAction = 'toggle';
    this.showConfirmModal = true;
  }

  async deleteSeller(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
  }

  async confirmActionHandler() {
    if (!this.selectedSellerId) return;
    this.loading = true;

    if (this.confirmAction === 'delete') {
      const { error } = await this.supabase.deleteSeller(this.selectedSellerId);
      if (error) {
        alert('Error al eliminar: ' + error.message);
      }
    } else if (this.confirmAction === 'toggle') {
      const seller = this.sellers().find(s => s.id === this.selectedSellerId);
      if (seller) {
        const { error } = await this.supabase.updateProfile(this.selectedSellerId, {
          active: !seller.active
        });
        if (error) {
          alert('Error al cambiar estado: ' + error.message);
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
    await this.loadSellers();
    this.loading = false;
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
  }

  // ===================== MODAL DE FORMULARIO =====================

  openNewSeller() {
    this.isEditMode = false;
    this.sellerForm = {
      id: '',
      seller_number: '',
      full_name: '',
      password: '',
      agency_brand: '',
      agency_location: '',
      active: true
    };
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
  }

  async openEditSeller(seller: any) {
    this.isEditMode = true;
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;

    const { data, error } = await this.supabase.getProfileById(seller.id);
    if (error || !data) {
      this.formError = 'Error al cargar datos del vendedor';
      this.formLoading = false;
      return;
    }

    this.sellerForm = {
      id: data.id,
      seller_number: data.seller_number || '',
      full_name: data.full_name || '',
      password: '',
      agency_brand: data.agency_brand || '',
      agency_location: data.agency_location || '',
      active: data.active !== false
    };
    this.formLoading = false;
  }

  async submitForm() {
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';

    if (!this.sellerForm.seller_number || !this.sellerForm.full_name) {
      this.formError = 'Número y nombre son obligatorios';
      this.formLoading = false;
      return;
    }

    if (this.isEditMode) {
      const { error } = await this.supabase.updateProfile(this.sellerForm.id, {
        full_name: this.sellerForm.full_name,
        agency_brand: this.sellerForm.agency_brand,
        agency_location: this.sellerForm.agency_location,
        seller_number: this.sellerForm.seller_number,
        active: this.sellerForm.active
      });
      if (error) {
        this.formError = 'Error al actualizar: ' + error.message;
        this.formLoading = false;
        return;
      }
      this.formSuccess = '✅ Vendedor actualizado';
    } else {
      const email = `vendedor_${this.sellerForm.seller_number}@golease.com`;
      const { error: authError } = await this.supabase.signUp(
        email,
        this.sellerForm.password || '12345678',
        this.sellerForm.full_name
      );
      if (authError) {
        this.formError = 'Error al crear usuario: ' + authError.message;
        this.formLoading = false;
        return;
      }

      const user = this.supabase.currentUser();
      if (!user) {
        this.formError = 'No se pudo obtener el usuario';
        this.formLoading = false;
        return;
      }

      const { error: profileError } = await this.supabase.updateProfile(user.id, {
        seller_number: this.sellerForm.seller_number,
        full_name: this.sellerForm.full_name,
        agency_brand: this.sellerForm.agency_brand,
        agency_location: this.sellerForm.agency_location,
        active: true,
        role: 'seller'
      });
      if (profileError) {
        this.formError = 'Error al guardar perfil: ' + profileError.message;
        this.formLoading = false;
        return;
      }
      this.formSuccess = '✅ Vendedor creado';
    }

    this.formLoading = false;
    setTimeout(() => {
      this.showFormModal = false;
      this.loadSellers();
    }, 1200);
  }

  closeFormModal() {
    this.showFormModal = false;
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}