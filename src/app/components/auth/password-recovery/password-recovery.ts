import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './password-recovery.html',
})
export class PasswordRecoveryComponent {
  private supabase = inject(SupabaseService);

  phoneNumber = '';
  recoveryEmail = '';
  errorMessage = '';
  submitted = false;
  loading = false;

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    if (!/^\d{10}$/.test(this.phoneNumber.trim())) {
      this.errorMessage = 'Ingresa un número de celular válido de 10 dígitos.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.recoveryEmail.trim())) {
      this.errorMessage = 'Ingresa un correo de recuperación válido.';
      return;
    }

    this.loading = true;
    try {
      await this.supabase.requestPasswordRecovery(this.phoneNumber, this.recoveryEmail);
      this.submitted = true;
    } catch {
      // Keep the response generic so account existence is not disclosed.
      this.submitted = true;
    } finally {
      this.loading = false;
    }
  }
}
