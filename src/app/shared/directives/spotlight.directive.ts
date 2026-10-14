import { afterNextRender, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

/**
 * Soft glow that follows the pointer inside a card (styles in styles.scss).
 * Browser-only and mouse-only: the glow node is added after hydration, and touch screens
 * or reduced-motion users never get it.
 */
@Directive({ selector: '[appSpotlight]' })
export class SpotlightDirective implements OnDestroy {
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private frame = 0;
  private readonly onMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const rect = this.host.getBoundingClientRect();
      this.host.style.setProperty('--spot-x', `${clientX - rect.left}px`);
      this.host.style.setProperty('--spot-y', `${clientY - rect.top}px`);
    });
  };

  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
      if (getComputedStyle(this.host).position === 'static') this.host.style.position = 'relative';
      const glow = document.createElement('span');
      glow.className = 'spotlight-glow';
      glow.setAttribute('aria-hidden', 'true');
      this.host.prepend(glow);
      this.host.classList.add('has-spotlight');
      this.host.addEventListener('pointermove', this.onMove, { passive: true });
    });
  }

  ngOnDestroy(): void {
    // Also runs during prerendering, where the browser APIs do not exist.
    if (!this.host.classList.contains('has-spotlight')) return;
    cancelAnimationFrame(this.frame);
    this.host.removeEventListener('pointermove', this.onMove);
  }
}
