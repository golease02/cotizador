import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { StatePlateOption } from '../../../models/leasing.model';

@Component({
  selector: 'app-admin-plates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-plates.html',
  styleUrls: ['./admin-plates.css']
})
export class AdminPlatesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);

  // Listado
  plates = signal<StatePlateOption[]>([]);
  filteredPlates = signal<StatePlateOption[]>([]);
  loading = true;
  searchTerm = '';
  // Filtro por costo: 'all' | 'withCost' | 'pending'
  costFilter: 'all' | 'withCost' | 'pending' = 'all';

  // Modales
  showConfirmModal = false;
  selectedPlateId: string | null = null;
  showFormModal = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  formSuccess = '';
  loadError = '';

  // Formulario (el ID se genera automáticamente al crear)
  plateForm = {
    name: '',
    costnet: 0,
  };
  // ID de la placa que se está editando (solo edición)
  editingPlateId: string | null = null;

  async ngOnInit() {
    await this.loadPlates();
  }

  // ===================== LISTADO =====================

  async loadPlates() {
    this.loading = true;
    this.loadError = '';
    const { data, error } = await this.supabase.getAllStatePlates();
    if (error) {
      console.error('Error loading state plates:', error);
      this.loadError = 'No fue posible cargar las placas. ' + error.message;
    } else {
      this.plates.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.plates();
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      filtered = filtered.filter(p => (p.name || '').toLowerCase().includes(term));
    }
    if (this.costFilter === 'withCost') {
      filtered = filtered.filter(p => p.costNet > 0);
    } else if (this.costFilter === 'pending') {
      filtered = filtered.filter(p => p.costNet <= 0);
    }
    this.filteredPlates.set(filtered);
    this.cdr.detectChanges();
  }

  onSearch() {
    this.applyFilters();
  }

  // ===================== MODAL DE CONFIRMACIÓN =====================

  deletePlate(plateId: string) {
    if (plateId === 'pendiente') {
      alert('La placa "pendiente" es obligatoria y no puede eliminarse.');
      return;
    }
    this.selectedPlateId = plateId;
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmActionHandler() {
    if (!this.selectedPlateId) return;
    this.loading = true;

    const { error } = await this.supabase.deleteStatePlate(this.selectedPlateId);
    if (error) {
      alert('Error al eliminar: ' + error.message);
    }

    this.showConfirmModal = false;
    this.selectedPlateId = null;
    await this.loadPlates();
    this.loading = false;
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.cdr.detectChanges();
  }

  // ===================== MODAL DE FORMULARIO =====================

  openNewPlate() {
    this.isEditMode = false;
    this.editingPlateId = null;
    this.plateForm = { name: '', costnet: 0 };
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
    this.cdr.detectChanges();
  }

  openEditPlate(plate: StatePlateOption) {
    this.isEditMode = true;
    this.editingPlateId = plate.id;
    this.plateForm = {
      name: plate.name,
      costnet: plate.costNet,
    };
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
    this.cdr.detectChanges();
  }

  closeFormModal() {
    this.showFormModal = false;
    this.cdr.detectChanges();
  }

  async submitForm() {
    if (this.formLoading) return;
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';
    let operationSucceeded = false;

    const normalizedName = this.plateForm.name.trim();
    if (!normalizedName) {
      this.formError = 'El nombre es obligatorio';
      this.formLoading = false;
      return;
    }
    if (this.plateForm.costnet < 0) {
      this.formError = 'El costo no puede ser negativo';
      this.formLoading = false;
      return;
    }

    try {
      if (this.isEditMode) {
        if (!this.editingPlateId) {
          this.formError = 'Error: no se identificó la placa a editar';
          this.formLoading = false;
          return;
        }
        const { error } = await this.supabase.updateStatePlate(this.editingPlateId, {
          name: normalizedName,
          costnet: this.plateForm.costnet,
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
        } else {
          this.formSuccess = '✅ Placa actualizada correctamente';
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.supabase.createStatePlate({
          name: normalizedName,
          costnet: this.plateForm.costnet,
        });
        if (error) {
          this.formError = 'Error al crear: ' + error.message;
        } else {
          this.formSuccess = '✅ Placa creada correctamente';
          operationSucceeded = true;
        }
      }
    } catch (err: any) {
      console.error('Error en submitForm:', err);
      this.formError = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.formLoading = false;
      this.cdr.detectChanges();
      if (operationSucceeded) {
        setTimeout(() => {
          this.showFormModal = false;
          this.loadPlates();
        }, 1500);
      }
    }
  }

  // ===================== HELPERS =====================

  isProtectedPlate(plateId: string): boolean {
    return plateId === 'pendiente';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(price);
  }
}
