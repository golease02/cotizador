import { Component, inject, signal, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogService, VehicleCatalogItem } from '../../../services/catalog.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-vehicles.html',
  styleUrls: ['./admin-vehicles.css']
})
export class AdminVehiclesComponent implements OnInit {
  private catalog = inject(CatalogService);
  private cdr = inject(ChangeDetectorRef);
  readonly toastService = inject(ToastService);

  // Listado
  vehicles = signal<VehicleCatalogItem[]>([]);
  filteredVehicles = signal<VehicleCatalogItem[]>([]);
  loading = true;
  searchTerm = '';
  brandFilter: string = 'all';
  yearFilter: string = 'all';
  typeFilter: 'all' | 'hybrid' | 'combustion' = 'all';

  // Modales
  showConfirmModal = false;
  selectedVehicleId: string | null = null;
  showFormDrawer = false;
  isEditMode = false;
  formLoading = false;
  formError = '';

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

  async loadVehicles() {
    this.loading = true;
    const { data, error } = await this.catalog.getAllVehicles();
    if (error) {
      this.toastService.error('No fue posible cargar los vehículos: ' + error.message);
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

  get hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== '' ||
      this.brandFilter !== 'all' ||
      this.yearFilter !== 'all' ||
      this.typeFilter !== 'all';
  }

  get brandOptions(): string[] {
    const set = new Set<string>();
    for (const v of this.vehicles()) {
      const brand = (v.brand || '').trim();
      if (brand) set.add(brand);
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'es'));
  }

  get brandGroups(): { brand: string; vehicles: VehicleCatalogItem[] }[] {
    const groups = new Map<string, VehicleCatalogItem[]>();
    for (const vehicle of this.filteredVehicles()) {
      const brand = (vehicle.brand || 'Sin marca').trim();
      if (!groups.has(brand)) groups.set(brand, []);
      groups.get(brand)!.push(vehicle);
    }
    return [...groups.entries()]
      .sort(([brandA], [brandB]) => brandA.localeCompare(brandB, 'es'))
      .map(([brand, vehicles]) => ({ brand, vehicles }));
  }

  scrollToBrand(brand: string): void {
    document.getElementById(`brand-${brand.toLowerCase()}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

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
    this.formLoading = true;
    let succeeded = false;
    const { error } = await this.catalog.deleteVehicle(this.selectedVehicleId);
    if (error) {
      this.toastService.error('Error al eliminar: ' + error.message);
    } else {
      this.toastService.success('Vehículo eliminado correctamente');
      succeeded = true;
    }
    this.showConfirmModal = false;
    this.selectedVehicleId = null;
    this.formLoading = false;
    if (succeeded) {
      await this.loadVehicles();
    }
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.cdr.detectChanges();
  }

  // ===================== DRAWER DE FORMULARIO =====================

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
    this.showFormDrawer = true;
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
        const { error } = await this.catalog.updateVehicle(this.vehicleForm.id, {
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric,
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
        } else {
          operationSucceeded = true;
        }
      } else {
        const { error } = await this.catalog.createVehicle({
          brand: this.vehicleForm.brand,
          model: this.vehicleForm.model,
          year: this.vehicleForm.year,
          suggestedPriceNet: this.vehicleForm.suggestedPriceNet,
          isHybridOrElectric: this.vehicleForm.isHybridOrElectric,
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
        this.toastService.success(this.isEditMode ? 'Vehículo actualizado correctamente' : 'Vehículo creado correctamente');
        await this.loadVehicles();
      }
    }
  }

  // ===================== HELPERS =====================

  getHybridLabel(isHybrid: boolean): string {
    return isHybrid ? 'Híbrido / Eléctrico' : 'Combustión';
  }

  getHybridTooltip(isHybrid: boolean): string {
    return isHybrid
      ? 'Sí, es híbrido o eléctrico. Afecta la renta mensual básica ($8,550 + IVA).'
      : 'No, es de combustión. Renta mensual básica ($6,000 + IVA).';
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
