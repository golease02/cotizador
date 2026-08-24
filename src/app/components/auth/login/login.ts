import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Iniciar Sesión</h2>
          <p>Usa tu número de celular y contraseña</p>
        </div>

        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label>Número de celular</label>
            <input 
              type="text" 
              [(ngModel)]="phoneNumber" 
              name="phoneNumber" 
              required 
              placeholder="Ej. 5512345678"
            />
          </div>

          <div class="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" class="btn-primary">Iniciar sesión</button>
        </form>

        <p class="auth-link">
          ¿No tienes cuenta? <a routerLink="/register">Regístrate</a>
        </p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
      padding: 1rem;
    }
    .auth-card {
      background: white;
      padding: 2.5rem 2rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 420px;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .auth-header h2 {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.8rem;
      color: #0f172a;
      margin: 0 0 0.3rem;
    }
    .auth-header p {
      color: #64748b;
      font-size: 0.9rem;
      margin: 0;
    }
    .form-group {
      margin-bottom: 1.2rem;
    }
    .form-group label {
      display: block;
      font-weight: 600;
      font-size: 0.9rem;
      color: #334155;
      margin-bottom: 0.3rem;
    }
    .form-group input {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      font-size: 1rem;
      transition: border 0.2s;
      box-sizing: border-box;
    }
    .form-group input:focus {
      outline: none;
      border-color: #20b038;
      box-shadow: 0 0 0 3px rgba(32,176,56,0.1);
    }
    .btn-primary {
      width: 100%;
      padding: 0.8rem;
      background: linear-gradient(135deg, #15803d, #20b038);
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #166534, #1a8a3a);
    }
    .auth-link {
      text-align: center;
      margin-top: 1.2rem;
      font-size: 0.9rem;
      color: #64748b;
    }
    .auth-link a {
      color: #15803d;
      font-weight: 600;
      text-decoration: none;
    }
    .auth-link a:hover {
      text-decoration: underline;
    }
    .error {
      color: #dc2626;
      text-align: center;
      margin-top: 0.8rem;
      font-size: 0.9rem;
    }
  `]
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

      if (profileError) {
        this.errorMessage = 'Error al buscar el perfil. Intenta de nuevo.';
        return;
      }

      if (!profile) {
        this.errorMessage = 'Número de celular no registrado. Verifica o regístrate.';
        return;
      }

      const email = `vendedor_${this.phoneNumber}@golease.com`;

      const { error } = await this.supabase.signIn(email, this.password);
      if (error) {
        this.errorMessage = error.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        return;
      }

      const loggedProfile = this.supabase.currentProfile();
      if (loggedProfile?.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
  }
}