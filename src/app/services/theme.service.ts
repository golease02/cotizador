import { Injectable, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'cotizador-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  /** Modo oscuro por defecto de la app (primera visita, sin preferencia guardada). */
  static readonly DEFAULT_THEME: ThemeMode = 'dark';

  private platformId = inject(PLATFORM_ID);

  readonly theme = signal<ThemeMode>(ThemeService.DEFAULT_THEME);

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
    if (!this.isBrowser()) return ThemeService.DEFAULT_THEME;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* storage no disponible */ }

    // Primera visita (sin preferencia guardada): el modo oscuro es el default, sin importar
    // la preferencia del sistema operativo. La elección explícita del usuario se respeta.
    return ThemeService.DEFAULT_THEME;
  }
}
