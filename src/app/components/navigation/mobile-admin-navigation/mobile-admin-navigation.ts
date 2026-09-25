import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

type AdminMobileModule = {
  label: string;
  route: string;
  permission: string;
  icon: 'sellers' | 'advisors' | 'plates' | 'parameters';
};

@Component({
  selector: 'app-mobile-admin-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-admin-navigation.html',
  styleUrl: './mobile-admin-navigation.css',
})
export class MobileAdminNavigationComponent implements OnDestroy {
  readonly auth = inject(AuthService);
  private router = inject(Router);
  private routerEventsSub: Subscription;

  readonly mobileMoreOpen = signal(false);
  private readonly currentUrl = signal(this.router.url);

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
      { label: 'Materiales', route: '/admin/materiales', permission: 'guias', icon: 'parameters' },
    ];

    return modules.filter(
      (module) =>
        this.auth.canAccessModule(module.permission) ||
        (module.permission === 'admins' && this.auth.isSuperAdmin()),
    );
  });

  readonly isMoreRouteActive = computed(() => {
    const path = this.currentUrl().split(/[?#]/)[0];
    return (
      path === '/' ||
      path === '/cotizador' ||
      path === '/perfil' ||
      path.startsWith('/admin/sin-acceso') ||
      this.mobileMoreModules().some((module) => path.startsWith(module.route))
    );
  });

  constructor() {
    this.routerEventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set((event as NavigationEnd).urlAfterRedirects);
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

  async logout(): Promise<void> {
    this.closeMobileMore();
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
