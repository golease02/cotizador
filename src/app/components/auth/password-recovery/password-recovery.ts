import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './password-recovery.html',
})
export class PasswordRecoveryComponent {
  private auth = inject(AuthService);

  phoneNumber = '';
  recoveryEmail = '';
  errorMessage = '';
  submitted = false;
  loading = false;

  // Errores de validación por campo
  phoneError = '';
  emailError = '';

  private readonly phoneRegex = /^\d{10}$/;
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  onEmailInput(): void {
    if (this.emailError) this.validateEmail();
  }

  onEmailBlur(): void {
    this.validateEmail();
  }

  validateEmail(): boolean {
    if (!this.recoveryEmail.trim()) {
      this.emailError = 'El correo de recuperación es obligatorio.';
      return false;
    }
    if (!this.emailRegex.test(this.recoveryEmail.trim())) {
      this.emailError = 'Ingresa un correo de recuperación válido.';
      return false;
    }
    this.emailError = '';
    return true;
  }

  /** Estado visual del campo de correo (check verde). */
  get emailIsValid(): boolean {
    return this.emailRegex.test(this.recoveryEmail.trim());
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';

    // Validar ambos campos antes de contactar al backend
    const phoneOk = this.validatePhone();
    const emailOk = this.validateEmail();
    if (!phoneOk || !emailOk) return;

    this.loading = true;
    try {
      await this.auth.requestPasswordRecovery(this.phoneNumber, this.recoveryEmail);
      this.submitted = true;
    } catch {
      // Keep the response generic so account existence is not disclosed.
      this.submitted = true;
    } finally {
      this.loading = false;
    }
  }
}
