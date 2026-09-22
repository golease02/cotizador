import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private client = getSupabaseClient();

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

  confirmPassword = '';
  confirmError = '';
  showConfirmPassword = false;
  contactoOtro = '';

  // Asesor GoLease por defecto cuando el vendedor elige OTRO:
  // cuenta del super administrador (4421086183).
  private readonly defaultContactSellerNumber = '4421086183';

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
    const prevConfirmError = this.confirmError;
    this.validatePassword();
    if (prevConfirmError) this.validateConfirmPassword();
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

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onConfirmInput(): void {
    if (this.confirmError) this.validateConfirmPassword();
  }

  onConfirmBlur(): void {
    this.validateConfirmPassword();
  }

  validateConfirmPassword(): boolean {
    if (!this.confirmPassword) {
      this.confirmError = 'Confirma tu contraseña.';
      return false;
    }
    if (this.confirmPassword !== this.password) {
      this.confirmError = 'Las contraseñas no coinciden.';
      return false;
    }
    this.confirmError = '';
    return true;
  }

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
    'ACURA',
  ];

  async onRegister() {
    this.errorMessage.set('');

    // Validar número de celular y contraseña (errores por campo)
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    const confirmOk = this.validateConfirmPassword();
    if (!phoneOk || !passwordOk || !confirmOk) return;

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

    const esOtro = this.contactoGoLease === 'otro';
    const textoOtro = this.contactoOtro.trim();
    if (esOtro && !textoOtro) {
      this.errorMessage.set('Escribe el nombre de tu contacto en GoLease');
      return;
    }

    // Marca final
    const finalBrand = this.agencyBrand === 'Otro' ? this.otherBrand : this.agencyBrand;
    if (!finalBrand) {
      this.errorMessage.set('Debes escribir el nombre de la marca');
      return;
    }

    // Asesor por defecto para OTRO: cuenta del super administrador.
    const asesorPorDefecto = esOtro
      ? this.socios().find((s: any) => s.seller_number === this.defaultContactSellerNumber)
      : null;

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
        socio_id: esOtro ? (asesorPorDefecto?.id ?? null) : this.contactoGoLease,
      };

      const { error: profileError } = await this.auth.updateProfile(user.id, profileData);

      if (profileError) {
        this.errorMessage.set(`Error al guardar datos: ${profileError.message || 'desconocido'}`);
        return;
      }

      if (esOtro) {
        try {
          const nombreAsesor = asesorPorDefecto?.full_name ?? 'sin asesor disponible';
          const leyenda =
            'Registro con "OTRO" en Asesor GoLease. Contacto indicado: "' +
            textoOtro +
            '". Asesor asignado por defecto: ' +
            nombreAsesor +
            '.';
          const { error: notaError } = await this.client.from('notas').insert([
            {
              entidad_tipo: 'seller',
              entidad_id: user.id,
              texto: leyenda,
              creado_por: user.id,
              created_at: new Date().toISOString(),
            },
          ]);
          if (notaError) {
            console.error(
              '[register] No se pudo guardar la nota de contacto OTRO:',
              notaError.message || notaError,
            );
          }
        } catch (notaEx) {
          console.error('[register] Error inesperado al guardar la nota de contacto OTRO:', notaEx);
        }
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
