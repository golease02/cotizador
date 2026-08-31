import { AfterViewInit, ChangeDetectorRef, Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  isAdmin = computed(() => this.supabase.isAdmin());
  loading = signal(true);
  saving = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  isSearching = signal(false);

  fullName = '';
  sellerNumber = '';
  agencyBrand = '';
  otherBrand = '';
  manualAddress = '';
  addressText = '';
  selectedCoords: { lat: number; lng: number } | null = null;

  brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MAZDA', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA', 'Otro'
  ];

  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    this.loadProfile();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    this.router.navigate(['/']);
  }

  private initMap(): void {
    if (!this.mapContainer) {
      return;
    }

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

    if (this.manualAddress || this.addressText) {
      this.map.setView(
        this.selectedCoords ? [this.selectedCoords.lat, this.selectedCoords.lng] : queretaroCoords,
        14
      );
    }
  }

  private async setMarkerAndReverseGeocode(lat: number, lng: number): Promise<void> {
    this.marker.setLatLng([lat, lng]);
    this.selectedCoords = { lat, lng };
    await this.updateAddress(lat, lng);
  }

  private async updateAddress(lat: number, lng: number): Promise<void> {
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

  async searchLocation(): Promise<void> {
    const query = this.manualAddress.trim();
    if (!query) {
      this.errorMessage.set('Escribe una ubicación para buscar.');
      return;
    }

    this.isSearching.set(true);
    this.errorMessage.set('');

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
        this.errorMessage.set('No se encontró la ubicación. Intenta con otra dirección.');
      }
    } catch {
      this.errorMessage.set('Ocurrió un error al buscar la ubicación.');
    } finally {
      this.isSearching.set(false);
    }
  }

  private async loadProfile(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');

    const user = this.supabase.currentUser();
    const profile = this.supabase.currentProfile();

    if (!user) {
      this.loading.set(false);
      return;
    }

    const loadedProfile = profile ?? (await this.supabase.loadProfile(user.id));
    const agencyBrandValue = (loadedProfile as any)?.agency_brand || '';
    const finalBrand = agencyBrandValue === 'Otro' ? 'Otro' : agencyBrandValue;

    this.fullName = loadedProfile?.full_name || '';
    this.sellerNumber = (loadedProfile as any)?.seller_number || '';
    this.agencyBrand = finalBrand;
    this.otherBrand = finalBrand === 'Otro' ? (loadedProfile as any)?.other_brand || '' : '';
    this.manualAddress = (loadedProfile as any)?.agency_location || '';
    this.addressText = this.manualAddress;

    if ((loadedProfile as any)?.latitude && (loadedProfile as any)?.longitude) {
      this.selectedCoords = {
        lat: Number((loadedProfile as any).latitude),
        lng: Number((loadedProfile as any).longitude)
      };
    }

    if (this.map && this.selectedCoords) {
      this.map.setView([this.selectedCoords.lat, this.selectedCoords.lng], 14);
      this.marker.setLatLng([this.selectedCoords.lat, this.selectedCoords.lng]);
    }

    this.loading.set(false);
  }

  async saveProfile(): Promise<void> {
    const user = this.supabase.currentUser();
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

    const locationToSave = this.manualAddress.trim() || this.addressText.trim();
    if (!locationToSave) {
      this.errorMessage.set('Debes seleccionar una ubicación válida.');
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

      if (this.selectedCoords) {
        payload.latitude = this.selectedCoords.lat;
        payload.longitude = this.selectedCoords.lng;
      }

      const { error } = await this.supabase.updateProfile(user.id, payload);

      if (error) {
        this.errorMessage.set(error.message || 'No se pudo guardar tu información.');
        return;
      }

      await this.supabase.refreshProfile();
      this.successMessage.set('Tu información se actualizó correctamente.');
      await this.loadProfile();
    } finally {
      this.saving.set(false);
    }
  }
}
