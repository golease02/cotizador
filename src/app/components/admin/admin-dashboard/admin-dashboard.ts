import { Component, inject, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnDestroy {
  public supabase = inject(SupabaseService);
  private router = inject(Router);
  private routerEventsSub: Subscription;

  /** Controla el drawer lateral en pantallas móviles/tablets. */
  sidebarOpen = signal(false);

  constructor() {
    this.routerEventsSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.sidebarOpen.set(false));
  }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}