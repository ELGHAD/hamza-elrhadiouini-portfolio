import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { Locale } from '../../../core/models/content.model';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../../core/services/locale.service';
import { LogoComponent } from '../logo/logo';

/**
 * Welcome screen at '/': the visitor picks a language, then lands on that home page with
 * the header and footer. No automatic redirect, so the choice is always theirs.
 */
@Component({
  selector: 'app-locale-redirect',
  imports: [RouterLink, LogoComponent],
  templateUrl: './locale-redirect.html',
  styleUrl: './locale-redirect.scss',
})
export class LocaleRedirectComponent {
  readonly localeService = inject(LocaleService);
  /** Browser language, highlighted as the suggested option (known only in the browser). */
  readonly suggested = signal<Locale | null>(null);

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    // The background glow follows the mouse.
    afterNextRender(() => {
      this.suggested.set(this.localeService.preferredLocale());
      if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
      let frame = 0;
      const onMove = (event: PointerEvent): void => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          host.style.setProperty('--glow-x', `${(event.clientX / innerWidth) * 100}%`);
          host.style.setProperty('--glow-y', `${(event.clientY / innerHeight) * 100}%`);
        });
      };
      host.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        host.removeEventListener('pointermove', onMove);
      });
    });
  }
}
