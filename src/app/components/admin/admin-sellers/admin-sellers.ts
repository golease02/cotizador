import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {
  private supabase = inject(SupabaseService);

  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  loading = true;
  searchTerm = '';

  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedSellerId: string | null = null;

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
        (s.seller_number || '').toLowerCase().includes(term) ||
        (s.email || '').toLowerCase().includes(term)
      );
    }
    this.filteredSellers.set(filtered);
  }

  onSearch() {
    this.applyFilters();
  }

  async toggleSellerStatus(sellerId: string, currentStatus: boolean) {
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

    if (this.confirmAction === 'delete') {
      const { error } = await this.supabase.deleteSeller(this.selectedSellerId);
      if (error) {
        alert('Error al eliminar vendedor: ' + error.message);
      } else {
        await this.loadSellers();
      }
    } else if (this.confirmAction === 'toggle') {
      const seller = this.sellers().find(s => s.id === this.selectedSellerId);
      if (seller) {
        const newStatus = !seller.active;
        const { error } = await this.supabase.updateProfile(this.selectedSellerId, {
          active: newStatus
        });
        if (error) {
          alert('Error al cambiar estado: ' + error.message);
        } else {
          await this.loadSellers();
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}