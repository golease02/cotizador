import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { MobileAdminNavigationComponent } from './components/navigation/mobile-admin-navigation/mobile-admin-navigation';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MobileAdminNavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly toastService = inject(ToastService);

  constructor(private router: Router) { }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  hideChromeRoute(): boolean {
    const u = this.router.url;
    return u.startsWith('/admin') ||
           u.startsWith('/login') ||
           u.startsWith('/register') ||
           u.startsWith('/recuperar-contrasena') ||
           u.startsWith('/reset-password');
  }

  handleToast(t: any): void {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }
}
