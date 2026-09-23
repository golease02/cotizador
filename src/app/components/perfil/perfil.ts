import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  readonly authService = this.auth;

  isAdmin = computed(() => this.auth.isAdmin());
  loading = signal(true);
  isEditing = signal(false);
  saving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  fullName = '';
  sellerNumber = '';
  agencyBrand = '';
  otherBrand = '';
  manualAddress = '';

  brands = [
    'ACURA',
    'ALFA ROMEO',
    'AUDI',
    'BMW',
    'BYD',
    'CHEVROLET',
    'DODGE',
    'FIAT',
    'FORD',
    'HINO',
    'HONDA',
    'HYUNDAI',
    'INFINITI',
    'JAGUAR',
    'JEEP',
    'KIA',
    'LAND ROVER',
    'LEXUS',
    'MASERATI',
    'MAZDA',
    'MERCEDES-BENZ',
    'MINI',
    'MITSUBISHI',
    'NISSAN',
    'PEUGEOT',
    'PORSCHE',
    'RAM',
    'RENAULT',
    'SUBARU',
    'SUZUKI',
    'TOYOTA',
    'VOLKSWAGEN',
    'VOLVO',
  ];

  ngOnInit(): void {
    this.loadProfile();
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    this.router.navigate(['/']);
  }

  startEditing(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.isEditing.set(true);
  }

  async cancelEditing(): Promise<void> {
    this.successMessage.set('');
    this.isEditing.set(false);
    await this.loadProfile();
  }

  get displayAgencyBrand(): string {
    return this.agencyBrand === 'Otro'
      ? this.otherBrand.trim() || 'Otro'
      : this.agencyBrand || '—';
  }

  private async loadProfile(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');

    const user = this.auth.currentUser();

    if (!user) {
      this.loading.set(false);
      this.errorMessage.set('No hay una sesión activa.');
      return;
    }

    const loadedProfile = await this.auth.loadProfile(user.id);

    if (!loadedProfile) {
      this.loading.set(false);
      this.errorMessage.set('No se pudo cargar tu información de perfil.');
      return;
    }

    const agencyBrandValue = loadedProfile.agency_brand || '';
    const isKnownBrand =
      agencyBrandValue && this.brands.some((b) => b.toLowerCase() === agencyBrandValue.toLowerCase());
    const finalBrand = agencyBrandValue && !isKnownBrand ? 'Otro' : agencyBrandValue;

    this.fullName = loadedProfile.full_name || '';
    this.sellerNumber = loadedProfile.seller_number || '';
    this.agencyBrand = finalBrand;
    this.otherBrand = finalBrand === 'Otro' && agencyBrandValue ? agencyBrandValue : '';
    this.manualAddress = loadedProfile.agency_location || '';

    this.loading.set(false);
  }

  async saveProfile(): Promise<void> {
    const user = this.auth.currentUser();
    if (!user) {
      this.errorMessage.set('No hay una sesión activa.');
      return;
    }

    if (!this.fullName.trim()) {
      this.errorMessage.set('El nombre completo es obligatorio.');
      return;
    }

    if (!this.sellerNumber.trim()) {
      this.errorMessage.set('El número de vendedor es obligatorio.');
      return;
    }

    const brandToSave = this.agencyBrand === 'Otro' ? (this.otherBrand || '').trim() : this.agencyBrand.trim();
    if (!brandToSave) {
      this.errorMessage.set('Debes seleccionar o escribir la marca o agencia.');
      return;
    }

    const locationToSave = this.manualAddress.trim();
    if (!locationToSave) {
      this.errorMessage.set('Debes escribir la dirección o ubicación.');
      return;
    }

    this.saving.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    try {
      const payload: any = {
        full_name: this.fullName.trim(),
        seller_number: this.sellerNumber.trim(),
        agency_brand: brandToSave,
        agency_location: locationToSave
      };

      const { error } = await this.auth.updateProfile(user.id, payload);

      if (error) {
        this.errorMessage.set(error.message || 'No se pudo guardar tu información.');
        return;
      }

      this.successMessage.set('Tu información se actualizó correctamente.');
      this.isEditing.set(false);
      await this.loadProfile();
    } finally {
      this.saving.set(false);
    }
  }
}
