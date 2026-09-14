import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  phoneNumber = '';
  fullName = '';
  password = '';
  agencyBrand = '';
  otherBrand = '';
  manualAddress = '';
  contactoGoLease = '';
  // Signals: la app corre en zoneless, así que una promesa que resuelve por su
  // cuenta (carga de contactos, resultado del registro) NO dispara change
  // detection. Con propiedades planas el select salía vacío al primer intento y
  // el spinner/errores nunca se pintaban. Con signals el template se actualiza solo.
  errorMessage = signal('');
  socios = signal<any[]>([]);

  // Errores de validación por campo
  phoneError = '';
  passwordError = '';

  // Estado de UI
  isLoading = signal(false);
  showPassword = false;

  private readonly phoneRegex = /^\d{10}$/;

  async ngOnInit(): Promise<void> {
    // Carga de socios/super-admins activos vía RPC pública (sin sesión).
    const { data, error } = await this.auth.getPublicSocios();
    if (error) {
      console.error('[register] No se pudo cargar la lista de contactos GoLease:', error.message);
      this.socios.set([]);
      return;
    }
    this.socios.set((data ?? []).filter((s: any) => s.active !== false));
  }

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

    brands = [
    'HINO', 'TOYOTA', 'NISSAN', 'BYD', 'FORD', 'AUDI',
    'VOLKSWAGEN', 'CHEVROLET', 'HONDA', 'MAZDA', 'HYUNDAI', 'KIA',
    'MITSUBISHI', 'SUZUKI', 'RENAULT', 'PEUGEOT', 'BMW', 'MERCEDES-BENZ',
    'JEEP', 'DODGE', 'RAM', 'SUBARU', 'JAGUAR', 'LAND ROVER',
    'VOLVO', 'PORSCHE', 'MINI', 'FIAT', 'ALFA ROMEO', 'MASERATI',
    'LEXUS', 'INFINITI', 'ACURA'
  ];

  async onRegister() {
    this.errorMessage.set('');

    // Validar número de celular y contraseña (errores por campo)
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk) return;

    // Validar nombre
    if (!this.fullName.trim()) {
      this.errorMessage.set('El nombre completo es obligatorio');
      return;
    }

    // Validar marca
    if (!this.agencyBrand) {
      this.errorMessage.set('Selecciona la marca de tu agencia');
      return;
    }

    // Validar ubicación
    const finalLocation = this.manualAddress.trim();
    if (!finalLocation) {
      this.errorMessage.set('Escribe la ubicación de tu sucursal');
      return;
    }

    // Validar contacto GoLease
    if (!this.contactoGoLease) {
      this.errorMessage.set('Selecciona tu contacto en GoLease');
      return;
    }

    // Marca final
    const finalBrand = this.agencyBrand === 'Otro' ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage.set('Debes escribir el nombre de la marca');
      return;
    }

    // Crear email
    const email = `vendedor_${this.phoneNumber}@golease.com`;

    this.isLoading.set(true);
    try {
      // Registrar en Supabase Auth
      const { error: authError } = await this.auth.signUp(email, this.password, this.fullName);
      if (authError) {
        this.errorMessage.set(authError.message || 'Error al registrarse');
        return;
      }

      // Obtener usuario
      const user = this.auth.currentUser();
      if (!user) {
        this.errorMessage.set('No se pudo obtener el usuario después del registro');
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
        agency_location: finalLocation,
        socio_id: this.contactoGoLease
      };

      const { error: profileError } = await this.auth.updateProfile(user.id, profileData);

      if (profileError) {
        this.errorMessage.set(`Error al guardar datos: ${profileError.message || 'desconocido'}`);
        return;
      }

      // Redirigir al inicio
      await this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Error inesperado. Intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
