import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
})
export class ResetPasswordComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  password = '';
  confirmation = '';
  errorMessage = '';
  successMessage = '';
  loading = false;

  async ngOnInit() {
    try {
      // 🔍 Leer parámetros del query string (después del ?)
      const queryParams = await firstValueFrom(this.route.queryParams);
      console.log('📦 Query params:', queryParams);

      let accessToken = queryParams['access_token'];
      let refreshToken = queryParams['refresh_token'];

      // Si no hay token en query params, intentar leer del fragmento (después del #)
      if (!accessToken) {
        const fragment = await firstValueFrom(this.route.fragment);
        console.log('📦 Fragmento:', fragment);
        if (fragment) {
          const fragmentParams = new URLSearchParams(fragment);
          accessToken = fragmentParams.get('access_token') || undefined;
          refreshToken = fragmentParams.get('refresh_token') || undefined;
        }
      }

      console.log('🔑 Access Token encontrado:', accessToken ? '✅ Sí' : '❌ No');

      if (accessToken) {
        // Establecer la sesión con el token
        const { data, error } = await this.supabase.client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || ''
        });

        console.log('📡 Resultado de setSession:', { data, error });

        if (error) {
          this.errorMessage = 'El enlace no es válido o ya expiró.';
          console.error('❌ Error al establecer sesión:', error);
        } else {
          console.log('✅ Sesión establecida correctamente');
          // La sesión ya está activa, el formulario está listo
        }
      } else {
        // No hay token en la URL, verificar si ya hay una sesión activa
        const { data: { session } } = await this.supabase.client.auth.getSession();
        console.log('🔐 Sesión activa:', session ? '✅ Sí' : '❌ No');
        if (!session) {
          this.errorMessage = 'El enlace no es válido o ya expiró.';
        }
      }
    } catch (error) {
      console.error('💥 Error en ngOnInit:', error);
      this.errorMessage = 'Ocurrió un error al procesar el enlace.';
    }
  }

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

    try {
      const { data: { session } } = await this.supabase.client.auth.getSession();
      if (!session) {
        this.errorMessage = 'El enlace no es válido o ya expiró.';
        this.loading = false;
        return;
      }

      const { error } = await this.supabase.client.auth.updateUser({ password: this.password });
      if (error) {
        this.errorMessage = 'No se pudo actualizar la contraseña. Solicita un nuevo enlace.';
        console.error('❌ Error al actualizar contraseña:', error);
        this.loading = false;
        return;
      }

      this.successMessage = 'Contraseña actualizada. Ya puedes iniciar sesión.';
      await this.supabase.signOut();
      setTimeout(() => this.router.navigate(['/login']), 1200);
    } catch (error) {
      this.errorMessage = 'Ocurrió un error inesperado.';
      console.error('💥 Error en onSubmit:', error);
    } finally {
      this.loading = false;
    }
  }
}