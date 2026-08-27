import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService, VehicleCatalogItem } from '../../../services/supabase.service';

@Component({
  selector: 'app-admin-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-vehicles.html',
  styleUrls: ['./admin-vehicles.css']
})
export class AdminVehiclesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);

  // Listado
  vehicles = signal<VehicleCatalogItem[]>([]);
  filteredVehicles = signal<VehicleCatalogItem[]>([]);
  loading = true;
  searchTerm = '';
  // Filtros: 'all' | marca seleccionada
  brandFilter: string = 'all';
  // Filtro de año: 'all' | año seleccionado
  yearFilter: string = 'all';
  // Filtro de tipo: 'all' | 'hybrid' | 'combustion'
  typeFilter: 'all' | 'hybrid' | 'combustion' = 'all';

  // Modales
  showConfirmModal = false;
  selectedVehicleId: string | null = null;
  showFormModal = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  formSuccess = '';
  loadError = '';

  // Formulario
  vehicleForm = {
    id: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    suggestedPriceNet: 0,
    isHybridOrElectric: false,
  };

  async ngOnInit() {
    await this.loadVehicles();
  }

  // ===================== LISTADO =====================

  async loadVehicles() {
    this.loading = true;
    this.loadError = '';
    const { data, error } = await this.supabase.getAllVehicles();
    if (error) {
      console.error('Error loading vehicles:', error);
      this.loadError = 'No fue posible cargar los vehículos. ' + error.message;
    } else {
      this.vehicles.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.vehicles();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(v =>
        (v.brand || '').toLowerCase().includes(term) ||
        (v.model || '').toLowerCase().includes(term)
      );
    }
    if (this.brandFilter !== 'all') {
      filtered = filtered.filter(v => v.brand === this.brandFilter);
    }
    if (this.yearFilter !== 'all') {
      filtered = filtered.filter(v => String(v.year) === this.yearFilter);
    }
    if (this.typeFilter === 'hybrid') {
      filtered = filtered.filter(v => v.isHybridOrElectric);
    } else if (this.typeFilter === 'combustion') {
      filtered = filtered.filter(v => !v.isHybridOrElectric);
    }
    this.filteredVehicles.set(filtered);
    this.cdr.detectChanges();
  }

  onSearch() {
    this.applyFilters();
  }

  resetFilters() {
    this.searchTerm = '';
    this.brandFilter = 'all';
    this.yearFilter = 'all';
    this.typeFilter = 'all';
    this.applyFilters();
  }

  // Indica si hay algún filtro/búsqueda activa para mostrar el botón "Limpiar filtros"
  get hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== '' ||
      this.brandFilter !== 'all' ||
      this.yearFilter !== 'all' ||
      this.typeFilter !== 'all';
  }

  // Opciones únicas de marca para el dropdown (ordenadas alfabéticamente)
  get brandOptions(): string[] {
    const set = new Set<string>();
    for (const v of this.vehicles()) {
      const brand = (v.brand || '').trim();
      if (brand) set.add(brand);
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'es'));
  }

  // Opciones únicas de año para el dropdown (orden descendente)
  get yearOptions(): number[] {
    const set = new Set<number>();
    for (const v of this.vehicles()) {
      if (v.year) set.add(v.year);
    }
    return [...set].sort((a, b) => b - a);
  }

  // ===================== MODAL DE CONFIRMACIÓN =====================

  deleteVehicle(vehicleId: string) {
    this.selectedVehicleId = vehicleId;
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmActionHandler() {
    if (!this.selectedVehicleId) return;
    this.loading = true;
    const { error } = await this.supabase.deleteVehicle(this.selectedVehicleId);
    if (error) {
      alert('Error al eliminar: ' + error.message);
    }
    this.showConfirmModal = false;
    this.selectedVehicleId = null;
    await this.loadVehicles();
    this.loading = false;
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.cdr.detectChanges();
  }

  // ===================== MODAL DE FORMULARIO =====================

  openNewVehicle() {
    this.isEditMode = false;
    this.vehicleForm = {
      id: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      suggestedPriceNet: 0,
      isHybridOrElectric: false,
    };
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
    this.cdr.detectChanges();
  }

  openEditVehicle(vehicle: VehicleCatalogItem) {
    this.isEditMode = true;
    this.vehicleForm = {
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      suggestedPriceNet: vehicle.suggestedPriceNet,
      isHybridOrElectric: vehicle.isHybridOrElectric,
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

    if (!this.vehicleForm.brand || !this.vehicleForm.model) {
      this.formError = 'Marca y Modelo son obligatorios';
      this.formLoading = false;
      return;
    }
    if (this.vehicleForm.year < 2010 || this.vehicleForm.year > 2030) {
      this.formError = 'El año debe estar entre 2010 y 2030';
      this.formLoading = false;
      return;
    }
    if (this.vehicleForm.suggestedPriceNet <= 0) {
      this.formError = 'El precio neto debe ser mayor a 0';
      this.formLoading = false;
      return;
    }

    try {
      if (this.isEditMode) {
        const { error } = await this.supabase.updateVehicle(this.vehicleForm.id, {
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric,
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
        } else {
          this.formSuccess = '✅ Vehículo actualizado correctamente';
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.supabase.createVehicle({
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric,
        });
        if (error) {
          this.formError = 'Error al crear: ' + error.message;
        } else {
          this.formSuccess = '✅ Vehículo creado correctamente';
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
          this.loadVehicles();
        }, 1500);
      }
    }
  }

  // ===================== HELPERS =====================

  getHybridLabel(isHybrid: boolean): string {
    return isHybrid ? 'Sí' : 'No';
  }

  getHybridClass(isHybrid: boolean): string {
    return isHybrid ? 'status-hybrid' : 'status-combustion';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(price);
  }
}
