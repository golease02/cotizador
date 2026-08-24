import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-admins',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-admins.html',
  styleUrls: ['./admin-admins.css']
})
export class AdminAdminsComponent implements OnInit {
  private supabase = inject(SupabaseService);

  admins = signal<any[]>([]);
  filteredAdmins = signal<any[]>([]);
  loading = true;
  searchTerm = '';

  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedAdminId: string | null = null;

  async ngOnInit() {
    await this.loadAdmins();
  }

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
  }

  onSearch() {
    this.applyFilters();
  }

  async toggleAdminStatus(adminId: string, currentStatus: boolean) {
    this.selectedAdminId = adminId;
    this.confirmAction = 'toggle';
    this.showConfirmModal = true;
  }

  async deleteAdmin(adminId: string) {
    this.selectedAdminId = adminId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
  }

  async confirmActionHandler() {
    if (!this.selectedAdminId) return;

    if (this.confirmAction === 'delete') {
      const { error } = await this.supabase.deleteSeller(this.selectedAdminId);
      if (error) {
        alert('Error al eliminar administrador: ' + error.message);
      } else {
        await this.loadAdmins();
      }
    } else if (this.confirmAction === 'toggle') {
      const admin = this.admins().find(a => a.id === this.selectedAdminId);
      if (admin) {
        const newStatus = !admin.active;
        const { error } = await this.supabase.updateProfile(this.selectedAdminId, {
          active: newStatus
        });
        if (error) {
          alert('Error al cambiar estado: ' + error.message);
        } else {
          await this.loadAdmins();
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.confirmAction = null;
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedAdminId = null;
    this.confirmAction = null;
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}