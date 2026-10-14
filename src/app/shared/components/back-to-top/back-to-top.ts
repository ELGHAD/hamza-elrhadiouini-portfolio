import { Component, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocaleService } from '../../../core/services/locale.service';
import { ScrollService } from '../../../core/services/scroll.service';

/** Ring circumference for r = 22 (see the template). */
const RING = 2 * Math.PI * 22;

/**
 * Floating "back to top" button, bottom right on every page. Appears once the visitor has
 * scrolled past the first screen; its ring fills with the reading progress.
 */
@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.scss',
})
export class BackToTopComponent {
  private readonly document = inject(DOCUMENT);
  private readonly scroll = inject(ScrollService);
  readonly localeService = inject(LocaleService);
  readonly ring = RING;
  readonly visible = computed(() => this.scroll.y() > 480);
  readonly dashOffset = computed(() => RING * (1 - this.scroll.progress()));

  /** Smooth unless reduced motion (global scroll-behavior), then focus the page start. */
  toTop(): void {
    this.document.defaultView?.scrollTo({ top: 0 });
    this.document.getElementById('main-content')?.focus({ preventScroll: true });
  }
}
