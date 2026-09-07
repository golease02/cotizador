import { AfterViewInit, ChangeDetectorRef, Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import type * as Leaflet from 'leaflet';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, AfterViewInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  isAdmin = computed(() => this.auth.isAdmin());
  loading = signal(true);
  isEditing = signal(false);
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

  private map?: Leaflet.Map;
  private marker?: Leaflet.Marker;

  ngOnInit(): void {
    this.loadProfile();
  }

  ngOnDestroy(): void {
    this.destroyMap();
  }

  async ngAfterViewInit(): Promise<void> {
    // El contenedor del mapa vive dentro de *ngIf="!loading()", por lo que
    // normalmente aún no existe en el DOM cuando corre este hook. Si ya está
    // presente (perfil cargado muy rápido), lo inicializamos de inmediato.
    if (this.mapContainer && !this.map) {
      await this.initMap();
    }
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
    this.syncMapEditMode();
    this.map?.invalidateSize();
  }

  async cancelEditing(): Promise<void> {
    this.successMessage.set('');
    this.isEditing.set(false);
    this.syncMapEditMode();
    await this.loadProfile();
    this.map?.invalidateSize();
  }

  get displayAgencyBrand(): string {
    return this.agencyBrand === 'Otro'
      ? this.otherBrand.trim() || 'Otro'
      : this.agencyBrand || '—';
  }

  private syncMapEditMode(): void {
    const marker = this.marker;
    if (!marker?.dragging) {
      return;
    }

    if (this.isEditing()) {
      marker.dragging.enable();
    } else {
      marker.dragging.disable();
    }
  }

  private destroyMap(): void {
    if (this.marker) {
      this.marker.off();
      this.marker.remove();
      this.marker = undefined;
    }
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = undefined;
    }
  }

  private async initMap(): Promise<void> {
    if (!this.mapContainer || this.map) {
      return;
    }

    const L = await import('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });

    const queretaroCoords: Leaflet.LatLngExpression = [20.5921, -100.3947];
    const map = L.map(this.mapContainer.nativeElement).setView(queretaroCoords, 13);
    this.map = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker(queretaroCoords, { draggable: true }).addTo(map);
    this.marker = marker;

    map.on('click', (e: Leaflet.LeafletMouseEvent) => {
      if (!this.isEditing()) {
        return;
      }
      const { lat, lng } = e.latlng;
      this.setMarkerAndReverseGeocode(lat, lng);
    });

    marker.on('dragend', () => {
      if (!this.isEditing()) {
        return;
      }
      const pos = marker.getLatLng();
      this.setMarkerAndReverseGeocode(pos.lat, pos.lng);
    });

    this.syncMapEditMode();

    if (this.manualAddress || this.addressText) {
      map.setView(
        this.selectedCoords ? [this.selectedCoords.lat, this.selectedCoords.lng] : queretaroCoords,
        14
      );
    }
  }

  private async setMarkerAndReverseGeocode(lat: number, lng: number): Promise<void> {
    if (!this.isEditing() || !this.marker) {
      return;
    }

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
    if (!this.isEditing()) {
      return;
    }

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

        this.map?.setView([lat, lng], 16);
        this.marker?.setLatLng([lat, lng]);
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
    // Al alternar loading, el *ngIf destruye y recrea el contenedor del mapa:
    // descartamos la instancia de Leaflet actual para volver a crearla fresca.
    this.destroyMap();

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
    this.addressText = this.manualAddress;

    if (loadedProfile.latitude && loadedProfile.longitude) {
      this.selectedCoords = {
        lat: Number(loadedProfile.latitude),
        lng: Number(loadedProfile.longitude)
      };
    }

    if (this.map && this.selectedCoords && this.marker) {
      this.map.setView([this.selectedCoords.lat, this.selectedCoords.lng], 14);
      this.marker.setLatLng([this.selectedCoords.lat, this.selectedCoords.lng]);
    }

    this.loading.set(false);

    // El contenedor del mapa está dentro de *ngIf="!loading()": una vez que
    // loading pasa a false y se renderiza el formulario, inicializamos el mapa.
    this.cdr.detectChanges();
    if (!this.map) {
      await this.initMap();
    }
    this.map?.invalidateSize();
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

      const { error } = await this.auth.updateProfile(user.id, payload);

      if (error) {
        this.errorMessage.set(error.message || 'No se pudo guardar tu información.');
        return;
      }

      this.successMessage.set('Tu información se actualizó correctamente.');
      this.isEditing.set(false);
      this.syncMapEditMode();
      await this.loadProfile();
    } finally {
      this.saving.set(false);
    }
  }
}
