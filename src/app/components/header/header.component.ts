import { Component, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public supabase = inject(SupabaseService);
  private router = inject(Router);

  currentDate = new Date();
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    this.isScrolled.set(scrollY > 20);
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}