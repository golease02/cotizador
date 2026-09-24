import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  phoneNumber = '';
  password = '';
  errorMessage = signal('');

  // Errores de validación por campo
  phoneError = '';
  passwordError = '';

  // Estado de UI
  isLoading = signal(false);
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

  /**
   * Envuelve una promesa con un timeout para que el login jamás se quede
   * colgado en "Ingresando..." si la red o Supabase no responden.
   * Si expira, rechaza con un Error cuyo mensaje ya es mostrable.
   */
  private async withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(message)), ms);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      clearTimeout(timer!);
    }
  }

  async onLogin(): Promise<void> {
    this.errorMessage.set('');

    // Validar ambos campos antes de contactar al backend
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk) return;

    this.isLoading.set(true);
    try {
      const { data: profile, error: profileError } = await this.withTimeout(
        this.auth.getProfileBySellerNumber(this.phoneNumber),
        10000,
        'No se pudo contactar al servidor. Revisa tu conexión e intenta de nuevo.'
      );
      if (profileError) {
        const detail = String(profileError?.message || '').toLowerCase();
        const networkError =
          detail.includes('fetch') ||
          detail.includes('network') ||
          detail.includes('timeout') ||
          detail.includes('connection') ||
          detail.includes('failed') ||
          detail.includes('pgrst');
        this.errorMessage.set(
          networkError
            ? 'No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.'
            : 'Número de celular no registrado.',
        );
        return;
      }
      if (!profile) {
        this.errorMessage.set('Número de celular no registrado.');
        return;
      }

      // El email de autenticación es el "email espejo" guardado en
      // profiles.email (mismo valor que auth.users.email). NUNCA se construye
      // un email desde el rol/teléfono ni se usa recovery_email para loguear.
      const email = profile.email?.trim().toLowerCase();
      if (!email) {
        this.errorMessage.set('La cuenta no tiene un correo de autenticación configurado.');
        return;
      }
      const { error } = await this.withTimeout(
        this.auth.signIn(email, this.password),
        15000,
        'El servidor tardó demasiado en responder al iniciar sesión. Revisa tu conexión e intenta de nuevo.'
      );
      if (error) {
        this.errorMessage.set(error.message || 'Error al iniciar sesión.');
        return;
      }

      const user = this.auth.currentUser();
      if (!user) {
        this.errorMessage.set('No se pudo obtener el usuario.');
        return;
      }

      // signIn() ya cargó el perfil en la señal: no repetimos el viaje de red.
      // Solo si por alguna razón no quedó cargado, lo pedimos (caso excepcional).
      let loggedProfile = this.auth.currentProfile();
      if (!loggedProfile) {
        try {
          loggedProfile = await this.withTimeout(
            this.auth.loadProfile(user.id),
            10000,
            'Se inició sesión pero no se pudo cargar el perfil. Revisa tu conexión e intenta de nuevo.'
          );
        } catch (e: any) {
          this.errorMessage.set(
            e?.message || 'Se inició sesión pero no se pudo cargar el perfil.'
          );
          return;
        }
      }

      // No bloqueamos el spinner con la navegación: la página destino muestra su
      // propio estado de carga, así el login deja de verse colgado en "Ingresando...".
      if (loggedProfile?.role === 'super_admin' || loggedProfile?.role === 'socio') {
        void this.router.navigate(['/admin']);
      } else {
        void this.router.navigate(['/']);
      }
    } catch (error: any) {
      this.errorMessage.set(error?.message || 'Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
