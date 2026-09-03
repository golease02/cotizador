import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  phoneNumber = '';
  password = '';
  errorMessage = '';

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

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    // Validar ambos campos antes de contactar al backend
    const phoneOk = this.validatePhone();
    const passwordOk = this.validatePassword();
    if (!phoneOk || !passwordOk) return;

    this.isLoading = true;
    try {
      const { data: profile, error: profileError } = await this.supabase.getProfileBySellerNumber(this.phoneNumber);
      if (profileError || !profile) {
        this.errorMessage = 'Número de celular no registrado.';
        return;
      }

      // El email de autenticación es el "email espejo" guardado en
      // profiles.email (mismo valor que auth.users.email). NUNCA se construye
      // un email desde el rol/teléfono ni se usa recovery_email para loguear.
      const email = profile.email?.trim().toLowerCase();
      if (!email) {
        this.errorMessage = 'La cuenta no tiene un correo de autenticación configurado.';
        return;
      }
      const { error } = await this.supabase.signIn(email, this.password);
      if (error) {
        this.errorMessage = error.message || 'Error al iniciar sesión.';
        return;
      }

      const user = this.supabase.currentUser();
      if (!user) {
        this.errorMessage = 'No se pudo obtener el usuario.';
        return;
      }

      const loggedProfile = await this.supabase.loadProfile(user.id);

      if (loggedProfile?.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } catch {
      // Error silencioso: no se muestra en consola
      this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
    } finally {
      this.isLoading = false;
    }
  }
}
