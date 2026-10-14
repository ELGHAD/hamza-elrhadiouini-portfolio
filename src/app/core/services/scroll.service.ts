import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

/**
 * Page scroll position, shared by the header (shadow + reading progress) and the
 * back-to-top button. One passive listener, throttled to one update per frame.
 * Stays at 0 during prerendering.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  /** Pixels scrolled from the top. */
  readonly y = signal(0);
  /** 0 at the top of the page, 1 at the bottom. */
  readonly progress = signal(0);

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const view = inject(DOCUMENT).defaultView;
    if (!view) return;

    let frame = 0;
    const update = (): void => {
      frame = 0;
      const root = view.document.documentElement;
      const max = root.scrollHeight - view.innerHeight;
      this.y.set(view.scrollY);
      this.progress.set(max > 0 ? Math.min(Math.max(view.scrollY / max, 0), 1) : 0);
    };
    const schedule = (): void => {
      if (!frame) frame = view.requestAnimationFrame(update);
    };
    view.addEventListener('scroll', schedule, { passive: true });
    view.addEventListener('resize', schedule, { passive: true });
    update();
  }
}
