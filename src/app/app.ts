import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly toastService = inject(ToastService);

  constructor(private router: Router) { }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  handleToast(t: any): void {
    if (t.action) t.action();
    this.toastService.dismiss(t.id);
  }
}
