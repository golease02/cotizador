import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { getSupabaseClient } from '../../../services/supabase-client';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent implements OnInit {
  private auth = inject(AuthService);
  private client = getSupabaseClient();
  private router = inject(Router);

  password = '';
  confirmation = '';
  errorMessage = signal('');
  successMessage = signal('');
  loading = signal(false);

  // Errores de validación por campo
  passwordError = '';
  confirmationError = '';

  // Estado de UI
  showPassword = false;
  showConfirmation = false;

  ngOnInit() {

    const fullHash = window.location.hash;

    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    const accessMatch = fullHash.match(/access_token=([^&]+)/);
    const refreshMatch = fullHash.match(/refresh_token=([^&]+)/);

    if (accessMatch) {
      accessToken = accessMatch[1];
    }
    if (refreshMatch) {
      refreshToken = refreshMatch[1];
    }

    if (accessToken) {
      this.client.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken || ''
      }).then(({ error }) => {
        if (error) {
          this.errorMessage.set('El enlace no es válido o ya expiró.');
        }
      }).catch(() => {
        this.errorMessage.set('Error al procesar el enlace.');
      });
    } else {
      this.errorMessage.set('El enlace no es válido o ya expiró.');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmationVisibility(): void {
    this.showConfirmation = !this.showConfirmation;
  }

  onPasswordInput(): void {
    if (this.passwordError) this.validatePassword();
    if (this.confirmation && this.confirmationError) this.validateConfirmation();
  }

  onPasswordBlur(): void {
    this.validatePassword();
    if (this.confirmation) this.validateConfirmation();
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

  onConfirmationInput(): void {
    if (this.confirmationError) this.validateConfirmation();
  }

  onConfirmationBlur(): void {
    this.validateConfirmation();
  }

  validateConfirmation(): boolean {
    if (!this.confirmation) {
      this.confirmationError = 'Confirma tu nueva contraseña.';
      return false;
    }
    if (this.confirmation !== this.password) {
      this.confirmationError = 'Las contraseñas no coinciden.';
      return false;
    }
    this.confirmationError = '';
    return true;
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set('');
    this.successMessage.set('');

    // Validar ambos campos antes de contactar al backend
    const passwordOk = this.validatePassword();
    const confirmationOk = this.validateConfirmation();
    if (!passwordOk || !confirmationOk) return;

    this.loading.set(true);
    try {
      const { data: { session } } = await this.client.auth.getSession();
      if (!session) {
        this.errorMessage.set('El enlace no es válido o ya expiró.');
        this.loading.set(false);
        return;
      }

      const { error } = await this.client.auth.updateUser({ password: this.password });

      if (error) {
        this.errorMessage.set('No se pudo actualizar la contraseña.');
        this.loading.set(false);
        return;
      }

      await this.auth.signOut();

      this.successMessage.set('Contraseña actualizada. Ahora puedes iniciar sesión con tu nueva contraseña.');
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } catch {
      this.errorMessage.set('Ocurrió un error inesperado.');
    } finally {
      this.loading.set(false);
    }
  }
}
