import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-admin-sin-acceso',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <div class="admin-content">
        <main class="main-content">
          <section class="sin-acceso-card">
            <div class="sin-acceso-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 class="sin-acceso-title">Sin acceso a este módulo</h2>
            <p class="sin-acceso-message">
              No tienes permiso para ver esta sección. Te mostramos los módulos a los que sí
              tienes acceso.
            </p>
            <ul class="sin-acceso-modules" *ngIf="availableModules().length">
              <li *ngFor="let m of availableModules()">
                <a [routerLink]="m.route" class="module-link">
                  {{ m.label }}
                </a>
              </li>
            </ul>
            <p class="sin-acceso-no-perms" *ngIf="!availableModules().length">
              No tienes permiso en ningún módulo. Contacta al super administrador para que te
              otorgue permisos.
            </p>
            <button class="back-link-btn" (click)="logoutAndRedirect()">
              Cerrar sesión y volver al login
            </button>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .main-content{
      min-height:100vh;
      padding:1.25rem;
      display:flex;
      flex-direction:column;
      align-items:flex-start;
    }
    .sin-acceso-card{
      max-width:440px;
      width:100%;
      background:var(--surface-card);
      border:0;
      border-radius:14px;
      padding:1.5rem;
      box-shadow:0 6px 16px rgba(15,23,42,0.05);
    }
    .sin-acceso-icon{
      margin-bottom:0.5rem;
      color:var(--danger);
    }
    .sin-acceso-title{
      margin:0 0 0.35rem;
      font-size:1.4rem;
      line-height:1.2;
      color:var(--text-main);
      font-family:var(--font-heading,'Fjalla One',sans-serif);
    }
    .sin-acceso-message{
      margin:0 0 1.25rem;
      color:var(--text-secondary);
      font-size:0.92rem;
      line-height:1.5;
    }
    .sin-acceso-modules{
      list-style:none;
      padding:0;
      margin:0 0 1.25rem;
      display:flex;
      flex-direction:column;
      gap:0.5rem;
    }
    .module-link{
      display:flex;
      align-items:center;
      gap:0.5rem;
      text-decoration:none;
      color:var(--accent-green-dark);
      font-weight:600;
      font-size:0.95rem;
      padding:0.6rem 0.85rem;
      border-radius:10px;
      background:var(--surface-subtle);
      border:1px solid var(--border-color);
      transition:background 0.15s,border-color 0.15s;
    }
    .module-link:hover{
      background:var(--surface-hover);
      border-color:var(--accent-green);
    }
    .sin-acceso-no-perms{
      margin:0 0 1.25rem;
      color:var(--text-muted);
      font-size:0.9rem;
      line-height:1.5;
    }
    .back-link-btn{
      background:transparent;
      border:0;
      color:var(--text-muted);
      text-decoration:underline;
      cursor:pointer;
      font-size:0.9rem;
      padding:0;
      font-family:inherit;
    }
    .back-link-btn:hover{
      color:var(--text-main);
    }
  `],
})
export class AdminSinAccesoComponent {
  public auth = inject(AuthService);
  public theme = inject(ThemeService);
  private router = inject(Router);

  public sidebarOpen = signal(false);

  /** Módulos a los que el socio actual tiene acceso (para enlazar desde "Sin acceso"). */
  public availableModules = (): { label: string; route: string }[] => {
    const modules: { label: string; route: string; perm: string }[] = [
      { label: 'Rendimiento', route: '/admin/rendimiento', perm: 'rendimiento' },
      { label: 'Vendedores (gestión)', route: '/admin/sellers', perm: 'sellers' },
      { label: 'Cotizaciones', route: '/admin/quotes', perm: 'quotes' },
      { label: 'Seguimiento', route: '/admin/seguimiento', perm: 'seguimiento' },
      { label: 'Placas de Estado', route: '/admin/plates', perm: 'plates' },
      { label: 'Parámetros', route: '/admin/parameters', perm: 'parameters' },
    ];
    return modules.filter((m) => this.auth.canAccessModule(m.perm));
  };

  logoutAndRedirect(): void {
    void this.logout();
    window.location.href = '/#/login';
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}
