import { Component, inject, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin-seller-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-seller-form.component.html',
  styleUrls: ['./admin-seller-form.component.css']
})
export class AdminSellerFormComponent implements AfterViewInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  isEditMode = false;
  sellerId: string | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';

  // Datos del formulario (igual que register)
  seller = {
    seller_number: '',
    full_name: '',
    password: '',
    agency_brand: '',
    other_brand: '',
    agency_location: '',
    active: true
  };

  // Mapa
  manualAddress = '';
  selectedCoords: { lat: number; lng: number } | null = null;
  addressText = '';
  isSearching = false;
  private map!: L.Map;
  private marker!: L.Marker;

  // Listas (igual que register)
  brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA'
  ];

  locations = [
    'Centro Histórico', 'Juriquilla', 'El Marqués', 'Plaza de Toros',
    'Zaklo', 'Paseo Querétaro', 'Antea', 'Ciudad del Sol',
    'Corregidora', 'Santa Rosa Jáuregui', 'San José Iturbide',
    'Pedro Escobedo', 'Colón', 'Tequisquiapan', 'San Juan del Río',
    'Amealco', 'Cadereyta', 'Ezequiel Montes', 'Huimilpan',
    'Ampliación Paseos del Sol', 'Zona Industrial', 'Blvd. Bernardo Quintana',
    'Av. Constituyentes', 'Av. 5 de Febrero', 'Plaza La Victoria',
    'El Refugio', 'Zibatá', 'Lomas de Juriquilla', 'Residencial España',
    'La Pradera'
  ];

  async ngOnInit() {
    this.sellerId = this.route.snapshot.paramMap.get('id');
    if (this.sellerId) {
      this.isEditMode = true;
      await this.loadSeller();
    } else {
      this.isEditMode = false;
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    this.initMap();
  }

  // ===================== MAPA (igual que register) =====================

  initMap() {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
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
      this.addressText = data?.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      this.manualAddress = this.addressText;
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
    } catch (error) {
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

  // ===================== CRUD =====================

  async loadSeller() {
    this.loading = true;
    this.errorMessage = '';

    try {
      const { data, error } = await this.supabase.getProfileById(this.sellerId!);
      if (error || !data) {
        this.errorMessage = 'Error al cargar el vendedor';
        this.loading = false;
        return;
      }

      this.seller = {
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        agency_brand: data.agency_brand || '',
        other_brand: '',
        agency_location: data.agency_location || '',
        active: data.active !== false
      };

      // Si hay coordenadas, centrar el mapa
      if (data.latitude && data.longitude) {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        this.map?.setView([lat, lng], 16);
        this.marker?.setLatLng([lat, lng]);
        this.selectedCoords = { lat, lng };
        await this.updateAddress(lat, lng);
      }

      this.loading = false;
    } catch (err) {
      this.errorMessage = 'Error inesperado al cargar el vendedor';
      this.loading = false;
    }
  }

  async onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validar ubicación
    let finalLocation = '';
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
    } else {
      this.errorMessage = 'Selecciona una ubicación en el mapa o escribe una dirección y presiona "Buscar"';
      this.loading = false;
      return;
    }

    // Validar marca
    const finalBrand = this.seller.agency_brand === 'Otro' ? this.seller.other_brand : this.seller.agency_brand;
    if (!finalBrand) {
      this.errorMessage = 'Debes escribir el nombre de la marca';
      this.loading = false;
      return;
    }

    try {
      if (this.isEditMode) {
        const { error } = await this.supabase.updateProfile(this.sellerId!, {
          full_name: this.seller.full_name,
          agency_brand: finalBrand,
          agency_location: finalLocation,
          seller_number: this.seller.seller_number,
          active: this.seller.active,
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (error) {
          this.errorMessage = 'Error al actualizar: ' + error.message;
          this.loading = false;
          return;
        }
        this.successMessage = '✅ Vendedor actualizado correctamente';
        setTimeout(() => this.router.navigate(['/admin/sellers']), 1500);
      } else {
        // Crear nuevo vendedor (mismo que registro)
        const email = `vendedor_${this.seller.seller_number}@golease.com`;
        const { error: authError } = await this.supabase.signUp(
          email,
          this.seller.password || '12345678',
          this.seller.full_name
        );
        if (authError) {
          this.errorMessage = 'Error al crear usuario: ' + authError.message;
          this.loading = false;
          return;
        }

        const user = this.supabase.currentUser();
        if (!user) {
          this.errorMessage = 'No se pudo obtener el usuario';
          this.loading = false;
          return;
        }

        const { error: profileError } = await this.supabase.updateProfile(user.id, {
          seller_number: this.seller.seller_number,
          full_name: this.seller.full_name,
          agency_brand: finalBrand,
          agency_location: finalLocation,
          active: true,
          role: 'seller',
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (profileError) {
          this.errorMessage = 'Error al guardar perfil: ' + profileError.message;
          this.loading = false;
          return;
        }
        this.successMessage = '✅ Vendedor creado correctamente';
        setTimeout(() => this.router.navigate(['/admin/sellers']), 1500);
      }
    } catch (err: any) {
      this.errorMessage = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.loading = false;
    }
  }
}