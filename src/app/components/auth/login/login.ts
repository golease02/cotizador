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

  async onLogin() {
    if (!this.phoneNumber || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    try {
      const { data: profile, error: profileError } = await this.supabase.getProfileBySellerNumber(this.phoneNumber);
      if (profileError || !profile) {
        this.errorMessage = 'Número de celular no registrado.';
        return;
      }

      const emailPrefix = profile.role === 'admin' ? 'admin' : 'vendedor';
      const email = profile.recovery_email || `${emailPrefix}_${this.phoneNumber}@golease.com`;
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
    } catch (error) {
      // Error silencioso: no se muestra en consola
      this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
  }
}
