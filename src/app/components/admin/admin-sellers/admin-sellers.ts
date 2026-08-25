import { Component, inject, signal, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  // Listado
  sellers = signal<any[]>([]);
  filteredSellers = signal<any[]>([]);
  loading = true;
  searchTerm = '';

  // Modales
  showConfirmModal = false;
  confirmAction: 'delete' | 'toggle' | null = null;
  selectedSellerId: string | null = null;
  showFormModal = false;
  isEditMode = false;
  formLoading = false;
  formError = '';
  formSuccess = '';

  // Formulario
  sellerForm = {
    id: '',
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

  // Listas (igual que registro)
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
    await this.loadSellers();
  }

  // ===================== LISTADO =====================

  async loadSellers() {
    this.loading = true;
    const { data, error } = await this.supabase.getSellersWithQuoteCount();
    if (error) {
      console.error('Error loading sellers:', error);
    } else {
      this.sellers.set(data || []);
      this.applyFilters();
    }
    this.loading = false;
    this.cdr.detectChanges();
  }

  applyFilters() {
    let filtered = this.sellers();
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(s =>
        (s.full_name || '').toLowerCase().includes(term) ||
        (s.seller_number || '').toLowerCase().includes(term)
      );
    }
    this.filteredSellers.set(filtered);
    this.cdr.detectChanges();
  }

  onSearch() {
    this.applyFilters();
  }

  // ===================== MODAL DE CONFIRMACIÓN =====================

  getSellerName(): string {
    const seller = this.sellers().find(s => s.id === this.selectedSellerId);
    return seller?.full_name || 'este vendedor';
  }

  getSellerQuoteCount(): number {
    const seller = this.sellers().find(s => s.id === this.selectedSellerId);
    return seller?.quote_count || 0;
  }

  async toggleSellerStatus(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.confirmAction = 'toggle';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async deleteSeller(sellerId: string) {
    this.selectedSellerId = sellerId;
    this.confirmAction = 'delete';
    this.showConfirmModal = true;
    this.cdr.detectChanges();
  }

  async confirmActionHandler() {
    if (!this.selectedSellerId) return;
    this.loading = true;

    if (this.confirmAction === 'delete') {
      // ✅ Usar la nueva función RPC que elimina de auth
      const { error } = await this.supabase.deleteUserFromAuth(this.selectedSellerId);
      if (error) {
        alert('Error al eliminar: ' + error.message);
      }
    } else if (this.confirmAction === 'toggle') {
      const seller = this.sellers().find(s => s.id === this.selectedSellerId);
      if (seller) {
        const { error } = await this.supabase.updateProfile(this.selectedSellerId, {
          active: !seller.active
        });
        if (error) {
          alert('Error al cambiar estado: ' + error.message);
        }
      }
    }

    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
    await this.loadSellers();
    this.loading = false;
    this.cdr.detectChanges();
  }

  cancelModal() {
    this.showConfirmModal = false;
    this.selectedSellerId = null;
    this.confirmAction = null;
    this.cdr.detectChanges();
  }

  // ===================== MAPA Y FORMULARIO =====================

  initMap() {
    if (!this.mapContainer || this.map) return;

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
      if (data?.display_name) {
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
      this.formError = 'Escribe una dirección para buscar';
      return;
    }
    this.isSearching = true;
    this.formError = '';
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
        this.formError = 'No se encontró la dirección. Intenta con otra búsqueda.';
      }
    } catch {
      this.formError = 'Error al buscar la dirección. Intenta de nuevo.';
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

  // ===================== ABRIR MODALES DE FORMULARIO =====================

  openNewSeller() {
    this.isEditMode = false;
    this.sellerForm = {
      id: '',
      seller_number: '',
      full_name: '',
      password: '',
      agency_brand: '',
      other_brand: '',
      agency_location: '',
      active: true
    };
    this.manualAddress = '';
    this.selectedCoords = null;
    this.addressText = '';
    this.formError = '';
    this.formSuccess = '';
    this.formLoading = false;
    this.showFormModal = true;
    this.cdr.detectChanges();
    setTimeout(() => this.initMap(), 200);
  }

  async openEditSeller(seller: any) {
    this.isEditMode = true;
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';
    this.showFormModal = true;
    this.cdr.detectChanges();

    try {
      const { data, error } = await this.supabase.getProfileById(seller.id);
      if (error || !data) {
        this.formError = 'Error al cargar datos del vendedor';
        this.formLoading = false;
        this.cdr.detectChanges();
        return;
      }

      // ✅ Asignar los datos del formulario
      this.sellerForm = {
        id: data.id,
        seller_number: data.seller_number || '',
        full_name: data.full_name || '',
        password: '',
        agency_brand: data.agency_brand || '',
        other_brand: '',
        agency_location: data.agency_location || '',
        active: data.active !== false
      };

      // ✅ Guardar la dirección actual para el mapa
      this.manualAddress = data.agency_location || '';
      this.addressText = data.agency_location || '';

      // ✅ Si hay coordenadas, centrar el mapa y colocar marcador
      if (data.latitude && data.longitude) {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        this.selectedCoords = { lat, lng };
        // Inicializar mapa y luego centrar
        setTimeout(() => {
          this.initMap();
          if (this.map && this.marker) {
            this.map.setView([lat, lng], 16);
            this.marker.setLatLng([lat, lng]);
            this.cdr.detectChanges();
          }
        }, 200);
      } else {
        // Inicializar mapa sin coordenadas
        setTimeout(() => this.initMap(), 200);
      }

      // ✅ Forzar detección de cambios para que el formulario se muestre
      this.formLoading = false;
      this.cdr.detectChanges();

    } catch (err) {
      console.error('Error al cargar vendedor para editar:', err);
      this.formError = 'Error inesperado al cargar el vendedor';
      this.formLoading = false;
      this.cdr.detectChanges();
    }
  }

  // ===================== GUARDAR (CREAR/EDITAR) =====================

  async submitForm() {
    this.formLoading = true;
    this.formError = '';
    this.formSuccess = '';

    // Validar ubicación
    let finalLocation = '';
    if (this.selectedCoords) {
      finalLocation = this.addressText || `${this.selectedCoords.lat}, ${this.selectedCoords.lng}`;
    } else if (this.manualAddress.trim()) {
      finalLocation = this.manualAddress.trim();
    } else {
      this.formError = 'Selecciona una ubicación en el mapa o escribe una dirección y presiona "Buscar"';
      this.formLoading = false;
      return;
    }

    const finalBrand = this.sellerForm.agency_brand === 'Otro'
      ? this.sellerForm.other_brand
      : this.sellerForm.agency_brand;
    if (!finalBrand) {
      this.formError = 'Debes escribir el nombre de la marca';
      this.formLoading = false;
      return;
    }

    try {
      // Guardar sesión del administrador
      const { data: { session: adminSession } } = await this.supabase.client.auth.getSession();

      if (this.isEditMode) {
        const { error } = await this.supabase.updateProfile(this.sellerForm.id, {
          full_name: this.sellerForm.full_name,
          agency_brand: finalBrand,
          agency_location: finalLocation,
          seller_number: this.sellerForm.seller_number,
          active: this.sellerForm.active,
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (error) {
          this.formError = 'Error al actualizar: ' + error.message;
          this.formLoading = false;
          return;
        }
        this.formSuccess = '✅ Vendedor actualizado correctamente';
      } else {
        const email = `vendedor_${this.sellerForm.seller_number}@golease.com`;
        const { error: authError } = await this.supabase.signUp(
          email,
          this.sellerForm.password || '12345678',
          this.sellerForm.full_name
        );
        if (authError) {
          this.formError = 'Error al crear usuario: ' + authError.message;
          this.formLoading = false;
          return;
        }

        const newUser = this.supabase.currentUser();
        if (!newUser) {
          this.formError = 'No se pudo obtener el usuario';
          this.formLoading = false;
          return;
        }

        const { error: profileError } = await this.supabase.updateProfile(newUser.id, {
          seller_number: this.sellerForm.seller_number,
          full_name: this.sellerForm.full_name,
          agency_brand: finalBrand,
          agency_location: finalLocation,
          active: true,
          role: 'seller',
          latitude: this.selectedCoords?.lat || null,
          longitude: this.selectedCoords?.lng || null
        });
        if (profileError) {
          this.formError = 'Error al guardar perfil: ' + profileError.message;
          this.formLoading = false;
          return;
        }

        // ✅ Restaurar sesión del administrador
        if (adminSession) {
          await this.supabase.client.auth.setSession({
            access_token: adminSession.access_token,
            refresh_token: adminSession.refresh_token
          });
          await new Promise(resolve => setTimeout(resolve, 500));
          const adminUser = this.supabase.currentUser();
          if (adminUser) {
            await this.supabase.loadProfile(adminUser.id);
          }
          // ✅ Notificar al header que debe refrescar el perfil
          this.supabase.triggerProfileRefresh();
          this.cdr.detectChanges();
        }

        this.formSuccess = '✅ Vendedor creado correctamente';


        // ✅ Forzar recarga de la página para actualizar el header
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: any) {
      console.error('Error en submitForm:', err);
      this.formError = 'Error inesperado: ' + (err.message || '');
    } finally {
      this.formLoading = false;
      this.cdr.detectChanges();
      setTimeout(() => {
        this.showFormModal = false;
        this.loadSellers();
      }, 1500);
    }
  }
  closeFormModal() {
    this.showFormModal = false;
    if (this.map) {
      this.map.remove();
      this.map = null!;
      this.marker = null!;
    }
    this.cdr.detectChanges();
  }

  getStatusLabel(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }
}