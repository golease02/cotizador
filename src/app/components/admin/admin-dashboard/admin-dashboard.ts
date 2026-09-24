import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';

type AdminMobileModule = {
  label: string;
  route: string;
  permission: string;
  icon: 'sellers' | 'advisors' | 'plates' | 'parameters';
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnDestroy {
  public auth = inject(AuthService);
  public theme = inject(ThemeService);
  readonly scope = inject(AdminScopeService);
  private router = inject(Router);
  public toastService = inject(ToastService);
  private routerEventsSub: Subscription;

  readonly mobileMoreOpen = signal(false);
  private readonly currentAdminUrl = signal(this.router.url);

  readonly mobileMoreModules = computed<AdminMobileModule[]>(() => {
    const modules: AdminMobileModule[] = [
      { label: 'Vendedores', route: '/admin/sellers', permission: 'sellers', icon: 'sellers' },
      {
        label: 'Asesores GoLease',
        route: '/admin/admins',
        permission: 'admins',
        icon: 'advisors',
      },
      { label: 'Placas de Estado', route: '/admin/plates', permission: 'plates', icon: 'plates' },
      {
        label: 'Parámetros',
        route: '/admin/parameters',
        permission: 'parameters',
        icon: 'parameters',
      },
    ];

    return modules.filter(
      (module) =>
        this.auth.canAccessModule(module.permission) ||
        (module.permission === 'admins' && this.auth.isSuperAdmin()),
    );
  });

  readonly isMoreRouteActive = computed(() => {
    const url = this.currentAdminUrl();
    return (
      url.startsWith('/admin/sin-acceso') ||
      this.mobileMoreModules().some((module) => url.startsWith(module.route))
    );
  });

  constructor() {
    this.routerEventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentAdminUrl.set((event as NavigationEnd).urlAfterRedirects);
        this.closeMobileMore();
      });
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }

  openMobileMore(): void {
    this.mobileMoreOpen.set(true);
  }

  closeMobileMore(): void {
    this.mobileMoreOpen.set(false);
  }

  toggleMobileMore(): void {
    this.mobileMoreOpen.update((open) => !open);
  }

  @HostListener('document:keydown.escape')
  closeMobileMoreOnEscape(): void {
    if (this.mobileMoreOpen()) {
      this.closeMobileMore();
    }
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  async logout(): Promise<void> {
    this.closeMobileMore();
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  handleToast(t: any): void {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }
}
