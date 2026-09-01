import { Component, inject, signal, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { ToastService } from '../../../services/toast.service';
import { StatePlateOption, ESTADOS_MEXICO } from '../../../models/leasing.model';

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
  readonly toastService = inject(ToastService);

  // Listado
  plates = signal<StatePlateOption[]>([]);
  filteredPlates = signal<StatePlateOption[]>([]);
  loading = true;
  searchTerm = '';
  costFilter: 'all' | 'withCost' = 'all';
  estadoFilter = '';

  // Estados de la República Mexicana (para filtros y formulario)
  estadosMexico: string[] = ESTADOS_MEXICO;

  // Modales
  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedPlateId: string | null = null;
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  editingPlateId: string | null = null;

  // Formulario
  plateForm = {
    name: '',
    costnet: 0,
    estado: '',
    disponible: true,
  };

  async ngOnInit() {
    await this.loadPlates();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showConfirmModal) this.cancelModal();
    if (this.showFormDrawer) this.closeFormDrawer();
  }

  handleToast(t: any) {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }

  // ===================== LISTADO =====================

  async loadPlates() {
    this.loading = true;
    const { data, error } = await this.supabase.getAllStatePlates();
    if (error) {
      this.toastService.error('No fue posible cargar las placas: ' + error.message);
    } else {
      // Filtrar 'pendiente' (protegida) y mapear correctamente
      this.plates.set((data || []).filter(plate => plate.id !== 'pendiente'));
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
    }
    if (this.estadoFilter) {
      filtered = filtered.filter(p => (p.estado || '') === this.estadoFilter);
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
      this.toastService.info('La placa "pendiente" es obligatoria y no puede eliminarse.');
      return;
    }
    this.selectedPlateId = plateId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  toggleDisponibilidad(plate: StatePlateOption) {
    if (!plate || !plate.id) return;
    if (this.isProtectedPlate(plate.id)) {
      this.toastService.info('La placa "pendiente" es obligatoria y no puede deshabilitarse.');
      return;
    }
    this.selectedPlateId = plate.id;
    this.confirmAction = 'toggle';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmActionHandler() {
    if (!this.selectedPlateId) return;
    this.formLoading = true;
    let succeeded = false;

    if (this.confirmAction === 'delete') {
      const { error } = await this.supabase.deleteStatePlate(this.selectedPlateId);
      if (error) {
        this.toastService.error('Error al eliminar la placa: ' + error.message);
      } else {
        this.toastService.success('Placa eliminada correctamente');
        succeeded = true;
      }
    } else if (this.confirmAction === 'toggle') {
      const plate = this.plates().find(p => p.id === this.selectedPlateId);
      if (plate) {
        const current = plate.disponible !== false;
        const { error } = await this.supabase.toggleStatePlateAvailability(this.selectedPlateId, !current);
        if (error) {
          this.toastService.error('Error al cambiar la disponibilidad: ' + error.message);
        } else {
          this.toastService.success(
            !current ? 'Placa marcada como no disponible' : 'Placa marcada como disponible'
          );
          succeeded = true;
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedPlateId = null;
    this.confirmAction = null;
    this.formLoading = false;
    if (succeeded) {
      await this.loadPlates();
    }
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.confirmAction = null;
    this.cdr.detectChanges();
  }

  // ===================== DRAWER DE FORMULARIO =====================

  openNewPlate() {
    this.isEditMode = false;
    this.editingPlateId = null;
    this.plateForm = { name: '', costnet: 0, estado: '', disponible: true };
    this.formError = '';
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }

  openEditPlate(plate: StatePlateOption) {
    if (!plate || !plate.id) {
      return;
    }
    this.isEditMode = true;
    this.editingPlateId = plate.id;
    this.plateForm = {
      name: plate.name,
      costnet: plate.costNet,
      estado: plate.estado ?? '',
      disponible: plate.disponible !== false,
    };
    this.formError = '';
    this.showFormDrawer = true;
    this.cdr.detectChanges();
  }

  closeFormDrawer() {
    this.showFormDrawer = false;
    this.cdr.detectChanges();
  }

  async submitForm() {
    if (this.formLoading) return;
    this.formLoading = true;
    this.formError = '';
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
    if (!this.plateForm.estado) {
      this.formError = 'Selecciona un estado de la República Mexicana';
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
          estado: this.plateForm.estado,
          disponible: this.plateForm.disponible !== false,
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
        } else {
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.supabase.createStatePlate({
          name: normalizedName,
          costnet: this.plateForm.costnet,
          estado: this.plateForm.estado,
          disponible: this.plateForm.disponible !== false,
        });
        if (error) {
          this.formError = 'Error al crear: ' + error.message;
        } else {
          operationSucceeded = true;
        }
      }
    } catch (err: any) {
      this.formError = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.formLoading = false;
      this.cdr.detectChanges();
      if (operationSucceeded) {
        this.closeFormDrawer();
        this.toastService.success(this.isEditMode ? 'Placa actualizada correctamente' : 'Placa creada correctamente');
        await this.loadPlates();
      }
    }
  }

  // ===================== HELPERS =====================

  isProtectedPlate(plateId: string): boolean {
    return plateId === 'pendiente';
  }

  getAvailabilityLabel(plate: StatePlateOption): string {
    if (this.isProtectedPlate(plate.id)) return 'Protegida';
    return plate.disponible !== false ? 'Disponible' : 'No disponible';
  }

  isPlateAvailable(plate: StatePlateOption): boolean {
    return plate.disponible !== false;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(price);
  }
}
