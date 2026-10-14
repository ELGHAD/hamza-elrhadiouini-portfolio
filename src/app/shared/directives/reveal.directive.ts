import { afterNextRender, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements OnDestroy {
  private readonly element = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      document.documentElement.classList.add('reveal-ready');
      if (!('IntersectionObserver' in window)) {
        this.element.nativeElement.classList.add('is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          entry.target.classList.add('is-visible');
          this.observer?.unobserve(entry.target);
        },
        { rootMargin: '0px 0px -48px 0px', threshold: 0.08 },
      );
      this.observer.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
