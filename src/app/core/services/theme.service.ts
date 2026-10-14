import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => Promise<void> | void) => { finished: Promise<void> };
};

/** Longest wait for new pictures to decode before the switch animation starts anyway. */
const IMAGE_WAIT_MS = 450;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
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

  /**
   * Switches theme. Where the View Transitions API exists (and motion is welcome), the new
   * theme opens over the old one like a twitching eye (keyframes in styles.scss); pictures
   * that change with the theme are decoded first, so they never flash in empty.
   */
  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    if (!isPlatformBrowser(this.platformId)) {
      this.theme.set(next);
      return;
    }

    const doc = document as ViewTransitionDocument;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || reduced) {
      this.theme.set(next);
      return;
    }

    const root = document.documentElement;
    root.classList.add('theme-transition');

    const transition = doc.startViewTransition(async () => {
      this.theme.set(next);
      root.setAttribute('data-theme', next);
      // Render now, so the new snapshot already holds the pictures of the new theme.
      this.appRef.tick();
      await this.decodePendingImages();
    });
    transition.finished.finally(() => root.classList.remove('theme-transition'));
  }

  private decodePendingImages(): Promise<unknown> {
    const pending = Array.from(document.images)
      .filter((image) => !image.complete)
      .map((image) => image.decode().catch(() => undefined));
    if (!pending.length) return Promise.resolve();
    return Promise.race([
      Promise.all(pending),
      new Promise((resolve) => setTimeout(resolve, IMAGE_WAIT_MS)),
    ]);
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
