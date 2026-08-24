import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Registrarse</h2>
          <p>Ingresa tus datos para comenzar a cotizar</p>
        </div>

        <form (ngSubmit)="onRegister()">
          <!-- Número de celular -->
          <div class="form-group">
            <label>Número de celular *</label>
            <input 
              type="text" 
              [(ngModel)]="phoneNumber" 
              name="phoneNumber" 
              required 
              placeholder="Ej. 5512345678"
            />
          </div>

          <!-- Nombre completo -->
          <div class="form-group">
            <label>Nombre Completo *</label>
            <input 
              type="text" 
              [(ngModel)]="fullName" 
              name="fullName" 
              required 
              placeholder="Juan Pérez"
            />
          </div>

          <!-- Contraseña -->
          <div class="form-group">
            <label>Contraseña *</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required 
              placeholder="••••••••"
            />
          </div>

          <!-- Marca (Agencia) -->
          <div class="form-group">
            <label>Marca (Agencia) *</label>
            <select [(ngModel)]="agencyBrand" name="agencyBrand" required>
              <option value="">Selecciona una marca</option>
              <option *ngFor="let brand of brands" [value]="brand">{{ brand }}</option>
              <option value="Otro">Otro</option>
            </select>
            <input 
              *ngIf="agencyBrand === 'Otro'" 
              type="text" 
              [(ngModel)]="otherBrand" 
              placeholder="Escribe la marca" 
              name="otherBrand" 
              style="margin-top: 0.5rem;"
            />
          </div>

          <!-- Ubicación de Sucursal -->
          <div class="form-group">
            <label>Ubicación de Sucursal *</label>
            <select [(ngModel)]="agencyLocation" name="agencyLocation" required>
              <option value="">Selecciona una ubicación</option>
              <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
              <option value="Otro">Otro</option>
            </select>
            <input 
              *ngIf="agencyLocation === 'Otro'" 
              type="text" 
              [(ngModel)]="otherLocation" 
              placeholder="Escribe la ubicación" 
              name="otherLocation" 
              style="margin-top: 0.5rem;"
            />
          </div>

          <button type="submit" class="btn-primary">Registrarse</button>
        </form>

        <p class="auth-link">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
      padding: 1rem;
    }
    .auth-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 420px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .auth-header h2 {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.8rem;
      color: #0f172a;
      margin: 0 0 0.3rem;
    }
    .auth-header p {
      color: #64748b;
      font-size: 0.9rem;
      margin: 0;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    .form-group label {
      display: block;
      font-weight: 600;
      font-size: 0.9rem;
      color: #334155;
      margin-bottom: 0.3rem;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 1rem;
      transition: border 0.2s;
      box-sizing: border-box;
      background: white;
    }
    .form-group input:focus, .form-group select:focus {
      outline: none;
      border-color: #20b038;
      box-shadow: 0 0 0 3px rgba(32,176,56,0.1);
    }
    .btn-primary {
      width: 100%;
      padding: 0.8rem;
      background: linear-gradient(135deg, #15803d, #20b038);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #166534, #1a8a3a);
    }
    .auth-link {
      text-align: center;
      margin-top: 1.2rem;
      font-size: 0.9rem;
      color: #64748b;
    }
    .auth-link a {
      color: #15803d;
      font-weight: 600;
      text-decoration: none;
    }
    .auth-link a:hover {
      text-decoration: underline;
    }
    .error {
      color: #dc2626;
      text-align: center;
      margin-top: 0.8rem;
      font-size: 0.9rem;
    }
  `]
})
export class RegisterComponent {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  phoneNumber = '';
  fullName = '';
  password = '';
  agencyBrand = '';
  otherBrand = '';
  agencyLocation = '';
  otherLocation = ''; // ✅ Nuevo campo para ubicación manual
  errorMessage = '';

  // ✅ Lista ampliada de marcas (agencias) presentes en Querétaro
  brands = [
    'HINO',
    'TOYOTA',
    'NISSAN',
    'BYD',
    'FORD',
    'AUDI',
    'VOLKSWAGEN',
    'CHEVROLET',
    'HONDA',
    'MAZDA',
    'HYUNDAI',
    'KIA',
    'MITSUBISHI',
    'SUZUKI',
    'RENAULT',
    'PEUGEOT',
    'BMW',
    'MERCEDES-BENZ',
    'JEEP',
    'DODGE',
    'RAM',
    'SUBARU',
    'JAGUAR',
    'LAND ROVER',
    'VOLVO',
    'PORSCHE',
    'MINI',
    'FIAT',
    'ALFA ROMEO',
    'MASERATI',
    'LEXUS',
    'INFINITI',
    'ACURA'
  ];

  // ✅ Ubicaciones de sucursales en Querétaro (zonas y concesionarios conocidos)
  locations = [
    'Centro Histórico',
    'Juriquilla',
    'El Marqués',
    'Plaza de Toros',
    'Zaklo',
    'Paseo Querétaro',
    'Antea',
    'Ciudad del Sol',
    'Corregidora',
    'Santa Rosa Jáuregui',
    'San José Iturbide',
    'Pedro Escobedo',
    'Colón',
    'Tequisquiapan',
    'San Juan del Río',
    'Amealco',
    'Cadereyta',
    'Ezequiel Montes',
    'Huimilpan',
    'Ampliación Paseos del Sol',
    'Zona Industrial',
    'Blvd. Bernardo Quintana',
    'Av. Constituyentes',
    'Av. 5 de Febrero',
    'Plaza La Victoria',
    'El Refugio',
    'Zibatá',
    'Lomas de Juriquilla',
    'Residencial España',
    'La Pradera'
  ];

  async onRegister() {
    // Validar campos obligatorios
    if (!this.phoneNumber || !this.fullName || !this.password || !this.agencyBrand || !this.agencyLocation) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    // Si seleccionó "Otro" en marca, usar el valor escrito
    const finalBrand = this.agencyBrand === 'Otro' ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage = 'Debes escribir el nombre de la marca';
      return;
    }

    // Si seleccionó "Otro" en ubicación, usar el valor escrito
    const finalLocation = this.agencyLocation === 'Otro' ? this.otherLocation : this.agencyLocation;
    if (!finalLocation) {
      this.errorMessage = 'Debes escribir la ubicación de la sucursal';
      return;
    }

    const email = `vendedor_${this.phoneNumber}@golease.com`;

    const { error: authError } = await this.supabase.signUp(email, this.password, this.fullName);
    if (authError) {
      console.error('Error de autenticación:', authError);
      this.errorMessage = authError.message || 'Error al registrarse';
      return;
    }

    const user = this.supabase.currentUser();
    if (!user) {
      this.errorMessage = 'No se pudo obtener el usuario después del registro';
      return;
    }

    const { error: profileError } = await this.supabase.updateProfile(user.id, {
      seller_number: this.phoneNumber,
      full_name: this.fullName,
      agency_brand: finalBrand,
      agency_location: finalLocation // ✅ Se guarda la ubicación (manual o seleccionada)
    });

    if (profileError) {
      console.error('Error detallado al actualizar perfil:', profileError);
      this.errorMessage = `Error al guardar datos adicionales: ${profileError.message || 'desconocido'}`;
      return;
    }

    this.router.navigate(['/']);
  }
}