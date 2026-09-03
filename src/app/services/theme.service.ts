import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cotizador-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  readonly theme = signal<ThemeMode>('light');

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor() {
    const initial = this.loadInitialTheme();
    this.theme.set(initial);

    // Persiste y aplica el tema cada vez que cambia.
    if (this.isBrowser()) {
      effect(() => {
        const current = this.theme();
        document.documentElement.setAttribute('data-theme', current);
        try {
          localStorage.setItem(STORAGE_KEY, current);
        } catch { /* storage no disponible */ }
      });
    }
  }

  toggle(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }

  private loadInitialTheme(): ThemeMode {
    if (!this.isBrowser()) return 'light';

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* storage no disponible */ }

    // Primera visita: seguir la preferencia del sistema.
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}
