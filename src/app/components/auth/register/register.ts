import { Component, inject, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import type * as Leaflet from 'leaflet';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements AfterViewInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  phoneNumber = '';
  fullName = '';
  password = '';
  agencyBrand = '';
  otherBrand = '';
  manualAddress = '';
  errorMessage = '';
  selectedCoords: { lat: number; lng: number } | null = null;
  addressText = '';
  isSearching = false;

  // Errores de validación por campo
  phoneError = '';
  passwordError = '';

  // Estado de UI
  isLoading = false;
  showPassword = false;

  private readonly phoneRegex = /^\d{10}$/;

  /** Filtra en vivo: solo dígitos, máximo 10 caracteres. */
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    this.phoneNumber = input.value;
    if (this.phoneError) this.validatePhone();
  }

  onPhoneBlur(): void {
    this.validatePhone();
  }

  validatePhone(): boolean {
    if (!this.phoneNumber) {
      this.phoneError = 'El número de celular es obligatorio.';
      return false;
    }
    if (!this.phoneRegex.test(this.phoneNumber)) {
      this.phoneError = 'Ingresa un número válido de 10 dígitos.';
      return false;
    }
    this.phoneError = '';
    return true;
  }

  onPasswordInput(): void {
    if (this.passwordError) this.validatePassword();
  }

  onPasswordBlur(): void {
    this.validatePassword();
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'La contraseña es obligatoria.';
      return false;
    }
    if (this.password.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres.';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /** Nivel de fortaleza: 0 vacía · 1 débil · 2 media · 3 fuerte */
  get passwordStrengthLevel(): number {
    const p = this.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 8) score++;
    if (/[A-Za-z]/.test(p) && /\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    if (score <= 1) return 1;
    if (score === 2) return 2;
    return 3;
  }

  get passwordStrengthLabel(): string {
    return ['Sin definir', 'Débil', 'Media', 'Fuerte'][this.passwordStrengthLevel];
  }

  get hasLetterAndNumber(): boolean {
    return /[A-Za-z]/.test(this.password) && /\d/.test(this.password);
  }

  private map!: Leaflet.Map;
  private marker!: Leaflet.Marker;

  brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA'
  ];

  async ngAfterViewInit() {
    await this.initMap();
  }

  async initMap() {
    const L = await import('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    const queretaroCoords: Leaflet.LatLngExpression = [20.5921, -100.3947];

    this.map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(queretaroCoords, { draggable: true }).addTo(this.map);

    this.map.on('click', (e: Leaflet.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.setMarkerAndReverseGeocode(lat, lng);
    });

    this.marker.on('dragend', () => {
      const pos = this.marker.getLatLng();
      this.setMarkerAndReverseGeocode(pos.lat, pos.lng);
    });
  }

  async setMarkerAndReverseGeocode(lat: number, lng: number) {
    this.marker.setLatLng([lat, lng]);
    this.selectedCoords = { lat, lng };
    await this.updateAddress(lat, lng);
  }

  async updateAddress(lat: number, lng: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        this.addressText = data.display_name;
        this.manualAddress = data.display_name;
      } else {
        this.addressText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        this.manualAddress = this.addressText;
      }
    } catch {
      this.addressText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      this.manualAddress = this.addressText;
    }
    this.cdr.detectChanges();
  }

  async searchLocation() {
    const query = this.manualAddress.trim();
    if (!query) {
      this.errorMessage = 'Escribe una dirección para buscar';
      return;
    }

    this.isSearching = true;
    this.errorMessage = '';

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        this.map.setView([lat, lng], 16);
        this.marker.setLatLng([lat, lng]);
        this.selectedCoords = { lat, lng };
        this.addressText = result.display_name || `${lat}, ${lng}`;
        this.manualAddress = this.addressText;
        this.cdr.detectChanges();
      } else {
        this.errorMessage = 'No se encontró la dirección. Intenta con otra búsqueda.';
      }
    } catch {
      this.errorMessage = 'Error al buscar la dirección. Intenta de nuevo.';
    } finally {
      this.isSearching = false;
    }
  }

  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.searchLocation();
    }
  }

  async onRegister() {
    this.errorMessage = '';

    // Validar número de celular y contraseña (errores por campo)
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk) return;

    // Validar nombre
    if (!this.fullName.trim()) {
      this.errorMessage = 'El nombre completo es obligatorio';
      return;
    }

    // Validar marca
    if (!this.agencyBrand) {
      this.errorMessage = 'Selecciona la marca de tu agencia';
      return;
    }

    // Validar ubicación
    let finalLocation = '';
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
    } else {
      this.errorMessage = 'Selecciona una ubicación en el mapa o escribe una dirección y presiona "Buscar"';
      return;
    }

    // Marca final
    const finalBrand = this.agencyBrand === 'Otro' ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage = 'Debes escribir el nombre de la marca';
      return;
    }

    // Crear email
    const email = `vendedor_${this.phoneNumber}@golease.com`;

    this.isLoading = true;
    try {
      // Registrar en Supabase Auth
      const { error: authError } = await this.auth.signUp(email, this.password, this.fullName);
      if (authError) {
        this.errorMessage = authError.message || 'Error al registrarse';
        return;
      }

      // Obtener usuario
      const user = this.auth.currentUser();
      if (!user) {
        this.errorMessage = 'No se pudo obtener el usuario después del registro';
        return;
      }

      // Guardar perfil
      const profileData: any = {
        // profiles.email es el "email espejo" del email de autenticación
        // (auth.users.email). El login lo usa como email de la cuenta.
        email,
        seller_number: this.phoneNumber,
        full_name: this.fullName.trim(),
        agency_brand: finalBrand,
        agency_location: finalLocation
      };

      if (this.selectedCoords) {
        profileData.latitude = this.selectedCoords.lat;
        profileData.longitude = this.selectedCoords.lng;
      }

      const { error: profileError } = await this.auth.updateProfile(user.id, profileData);

      if (profileError) {
        this.errorMessage = `Error al guardar datos: ${profileError.message || 'desconocido'}`;
        return;
      }

      // Redirigir al inicio
      await this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Error inesperado. Intenta de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }
}
