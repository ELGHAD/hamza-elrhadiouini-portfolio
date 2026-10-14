import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/**
 * Gentle 3D tilt toward the mouse, eased back to flat when it leaves.
 * Mouse only, and skipped with reduced motion.
 */
@Directive({ selector: '[appTilt]' })
export class TiltDirective implements OnDestroy {
  /** Maximum rotation, in degrees. */
  readonly appTilt = input(6, { transform: (value: number | '') => (value === '' ? 6 : value) });
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private frame = 0;
  private active = false;

  private readonly onMove = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse') return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const rect = this.host.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      const max = this.appTilt();
      this.host.style.transition = 'transform 120ms ease-out';
      this.host.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale(1.015)`;
    });
  };

  private readonly onLeave = (): void => {
    cancelAnimationFrame(this.frame);
    this.host.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)';
    this.host.style.transform = '';
  };

  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
      this.active = true;
      this.host.addEventListener('pointermove', this.onMove, { passive: true });
      this.host.addEventListener('pointerleave', this.onLeave);
    });
  }

  ngOnDestroy(): void {
    if (!this.active) return;
    cancelAnimationFrame(this.frame);
    this.host.removeEventListener('pointermove', this.onMove);
    this.host.removeEventListener('pointerleave', this.onLeave);
  }
}
