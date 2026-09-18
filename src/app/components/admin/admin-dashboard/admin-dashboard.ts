import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';
import { getSupabaseClient, sessionReady } from '../../../services/supabase-client';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public auth = inject(AuthService);
  public theme = inject(ThemeService);
  readonly scope = inject(AdminScopeService);
  private router = inject(Router);
  public toastService = inject(ToastService);
  private client = getSupabaseClient();
  private routerEventsSub: Subscription;

  sidebarOpen = signal(false);

  constructor() {
    this.routerEventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.sidebarOpen.set(false));
  }

  async ngOnInit(): Promise<void> {
    await this.verificarAlertasPorCaducar();
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }

  /**
   * Cuenta las cotizaciones con color rojo (>7 días sin revisar) y muestra un
   * toast. Se ejecuta una sola vez: al entrar al panel admin justo después de
   * iniciar sesión. El layout se destruye al cerrar sesión, así que el toast vuelve
   * a mostrarse una única vez en el siguiente login y NO en cada cambio de panel.
   */
  async verificarAlertasPorCaducar(): Promise<void> {
    try {
      await sessionReady();
      const { count, error } = await this.client
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .eq('color', 'rojo');
      if (error) return;
      if (count && count > 0) {
        this.toastService.info(
          `${count} cotización${count === 1 ? '' : 'es'} por caducar`,
          10000,
          'Ver',
          () => this.router.navigate(['/admin/quotes'], { queryParams: { color: 'rojo' } }),
        );
      }
    } catch (e) {
      // Silencioso: no interrumpimos la carga del layout por la alerta.
    }
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
    this.router.navigate(['/login']);
  }

  handleToast(t: any): void {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }
}
