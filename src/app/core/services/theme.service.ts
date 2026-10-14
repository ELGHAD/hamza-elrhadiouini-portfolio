import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'portfolio-theme';
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const current = this.theme();
      document.documentElement.setAttribute('data-theme', current);
      try {
        localStorage.setItem(this.storageKey, current);
      } catch {
        // Storage may be unavailable in private browsing contexts.
      }
    });
  }

  toggle(): void {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) return 'dark';

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }
}
