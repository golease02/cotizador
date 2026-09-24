import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdminScopeService } from '../../../services/admin-scope.service';
import { ThemeService } from '../../../services/theme.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent {
  public auth = inject(AuthService);
  public theme = inject(ThemeService);
  readonly scope = inject(AdminScopeService);
  private router = inject(Router);
  public toastService = inject(ToastService);

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
