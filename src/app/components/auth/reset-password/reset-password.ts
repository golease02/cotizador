import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrls: ['../login/login.css']
})
export class ResetPasswordComponent {
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  password = '';
  confirmation = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmation) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    const { data: { session } } = await this.supabase.client.auth.getSession();
    if (!session) {
      this.errorMessage = 'El enlace no es válido o ya expiró.';
      this.loading = false;
      return;
    }

    const { error } = await this.supabase.client.auth.updateUser({ password: this.password });
    this.loading = false;
    if (error) {
      this.errorMessage = 'No se pudo actualizar la contraseña. Solicita un nuevo enlace.';
      return;
    }

    this.successMessage = 'Contraseña actualizada. Ya puedes iniciar sesión.';
    await this.supabase.signOut();
    setTimeout(() => this.router.navigate(['/login']), 1200);
  }
}
