import { Component, inject, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements AfterViewInit {
  private supabase = inject(SupabaseService);
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

  private map!: L.Map;
  private marker!: L.Marker;

  brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA'
  ];

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    // Evita que Leaflet concatene el imagePath detectado (p.ej. http://localhost:4200/media/)
    // delante de la URL de los iconos (causa de los errores 404).
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    const queretaroCoords: L.LatLngExpression = [20.5921, -100.3947];

    this.map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker(queretaroCoords, { draggable: true }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
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
    } catch (error) {
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
    } catch (error) {
      console.error('Error en geocodificación:', error);
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
    console.log('🚀 Iniciando registro...');

    // 1. Validar campos obligatorios
    if (!this.phoneNumber || !this.fullName || !this.password || !this.agencyBrand) {
      this.errorMessage = 'Todos los campos son obligatorios';
      console.warn('❌ Campos faltantes:', { phone: !!this.phoneNumber, name: !!this.fullName, pass: !!this.password, brand: !!this.agencyBrand });
      return;
    }

    // 2. Validar ubicación
    let finalLocation = '';
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
      console.log('📍 Usando coordenadas:', this.selectedCoords);
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
      console.log('📍 Usando dirección manual:', finalLocation);
    } else {
      this.errorMessage = 'Selecciona una ubicación en el mapa o escribe una dirección y presiona "Buscar"';
      console.warn('❌ Sin ubicación seleccionada');
      return;
    }

    // 3. Marca final
    const finalBrand = this.agencyBrand === 'Otro' ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage = 'Debes escribir el nombre de la marca';
      return;
    }

    // 4. Crear email
    const email = `vendedor_${this.phoneNumber}@golease.com`;
    console.log('📧 Email generado:', email);

    try {
      // 5. Registrar en Supabase Auth
      console.log('🔐 Registrando en Supabase Auth...');
      const { error: authError } = await this.supabase.signUp(email, this.password, this.fullName);
      if (authError) {
        console.error('❌ Error en Auth:', authError);
        this.errorMessage = authError.message || 'Error al registrarse';
        return;
      }

      // 6. Obtener usuario
      const user = this.supabase.currentUser();
      if (!user) {
        console.error('❌ Usuario no encontrado después del registro');
        this.errorMessage = 'No se pudo obtener el usuario después del registro';
        return;
      }
      console.log('✅ Usuario creado:', user.id);

      // 7. Guardar perfil
      console.log('💾 Guardando perfil...');
      const profileData: any = {
        seller_number: this.phoneNumber,
        full_name: this.fullName,
        agency_brand: finalBrand,
        agency_location: finalLocation
      };

      if (this.selectedCoords) {
        profileData.latitude = this.selectedCoords.lat;
        profileData.longitude = this.selectedCoords.lng;
      }

      const { error: profileError } = await this.supabase.updateProfile(user.id, profileData);

      if (profileError) {
        console.error('❌ Error al guardar perfil:', profileError);
        this.errorMessage = `Error al guardar datos: ${profileError.message || 'desconocido'}`;
        return;
      }

      console.log('✅ Registro completado exitosamente');
      // 8. Redirigir
      await this.router.navigate(['/']);
    } catch (error: any) {
      console.error('❌ Error inesperado:', error);
      this.errorMessage = error.message || 'Error inesperado. Intenta de nuevo.';
    }
  }
}
