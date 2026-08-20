import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="app-header">
      <div class="header-container">
        <div class="brand-logo-container">
          <img 
            src="https://img1.wsimg.com/isteam/ip/b2c8c497-599d-4df4-9ab6-2aaaf690a095/LOGO%20GOLEASE%20SIN%20FONDO.png" 
            alt="GO LEASE MX Logo" 
            class="header-logo-img"
          />
          <div class="logo-text">
            <div class="title-row">
              <span class="brand-title">GO LEASE MX</span>
            </div>
            <span class="brand-slogan">"Haz de tus impuestos, la renta de tu auto"</span>
          </div>
        </div>

        <div class="header-meta">
          <!-- Mostrar información del vendedor si está autenticado -->
          <div *ngIf="supabase.currentUser()" class="user-info">
            <span class="user-name">
              {{ supabase.currentProfile()?.full_name || 'Vendedor' }}
            </span>
            <button class="logout-btn" (click)="logout()">Cerrar sesión</button>
          </div>

          <!-- Fecha y vigencia -->
          <div class="meta-item">
            <span class="meta-label">Cotizador Oficial:</span>
            <span class="meta-value">{{ currentDate | date: 'dd/MM/yyyy' }}</span>
          </div>
          <div class="meta-badge">
            <span class="pulse-dot"></span>
            <span>Vigencia 7 días</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 0.85rem 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    }

    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .header-logo-img {
      height: 52px;
      width: auto;
      object-fit: contain;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .title-row {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .brand-title {
      font-family: 'Fjalla One', sans-serif;
      font-size: 1.5rem;
      color: #0f172a;
      letter-spacing: 1px;
      line-height: 1;
    }

    .brand-slogan {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 0.825rem;
      color: #20b038;
      font-style: italic;
      font-weight: 700;
      margin-top: 2px;
    }

    .header-meta {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: #f8fafc;
      padding: 0.3rem 0.8rem 0.3rem 1.2rem;
      border-radius: 30px;
      border: 1px solid #e2e8f0;
    }

    .user-name {
      font-weight: 700;
      color: #0f172a;
      font-size: 0.9rem;
    }

    .logout-btn {
      background: #ef4444;
      color: white;
      border: none;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.8rem;
      transition: background 0.2s;
    }

    .logout-btn:hover {
      background: #dc2626;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .meta-label {
      font-size: 0.65rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .meta-value {
      font-size: 0.875rem;
      font-weight: 700;
      color: #0f172a;
    }

    .meta-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 0.4rem 0.85rem;
      border-radius: 20px;
      font-size: 0.775rem;
      font-weight: 700;
      color: #15803d;
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: #20b038;
      border-radius: 50%;
      box-shadow: 0 0 8px #20b038;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(0.95); opacity: 0.9; }
      50% { transform: scale(1.25); opacity: 0.5; }
      100% { transform: scale(0.95); opacity: 0.9; }
    }
  `]
})
export class HeaderComponent {
  public supabase = inject(SupabaseService);  // ← público para el template
  private router = inject(Router);

  currentDate = new Date();

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}