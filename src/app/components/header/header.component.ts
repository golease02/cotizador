// src/app/components/header/header.component.ts
import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public supabase = inject(SupabaseService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  currentDate = new Date();
  private refreshSubscription: Subscription | null = null;

  async ngOnInit() {
    const user = this.supabase.currentUser();
    if (user) {
      if (!this.supabase.currentProfile()) {
        await this.supabase.loadProfile(user.id);
      }
      console.log('📋 Header - Perfil:', this.supabase.currentProfile());
    }

    // Suscribirse a los eventos de refresco de perfil
    this.refreshSubscription = this.supabase.refreshProfile$.subscribe(async () => {
      console.log('🔄 Header: Recibiendo evento de refresco de perfil');
      const user = this.supabase.currentUser();
      if (user) {
        await this.supabase.loadProfile(user.id);
        this.cdr.detectChanges();
        console.log('📋 Header - Perfil actualizado:', this.supabase.currentProfile());
      }
    });
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}