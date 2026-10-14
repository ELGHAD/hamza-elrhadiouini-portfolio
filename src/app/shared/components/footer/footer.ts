import { Component, computed, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BUILD_INFO } from '../../../../environments/build-info';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../../core/data/profile.data';
import { UI_COPY } from '../../../core/data/ui.data';
import { LocaleService } from '../../../core/services/locale.service';
import { LogoComponent } from '../logo/logo';

type PageLabel = 'projects' | 'services' | 'experience' | 'skills' | 'certifications' | 'contact';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  private readonly document = inject(DOCUMENT);
  readonly localeService = inject(LocaleService);
  readonly profile = PROFILE;
  readonly copy = UI_COPY;
  readonly buildYear = BUILD_INFO.date.slice(0, 4);

  readonly pages: { path: string; label: PageLabel }[] = [
    { path: 'projects', label: 'projects' },
    { path: 'services', label: 'services' },
    { path: 'experience', label: 'experience' },
    { path: 'skills', label: 'skills' },
    { path: 'certifications', label: 'certifications' },
    { path: 'contact', label: 'contact' },
  ];

  /** CV in the current language, when it has been published. */
  readonly cv = computed(() => {
    const file = this.localeService.locale() === 'fr' ? PROFILE.cvFr : PROFILE.cvEn;
    return file.status === 'verified' ? file[this.localeService.locale()] : undefined;
  });

  /** Back to the top (smooth unless reduced motion, via the global scroll-behavior). */
  scrollToTop(event: Event): void {
    event.preventDefault();
    this.document.defaultView?.scrollTo({ top: 0 });
    this.document.getElementById('main-content')?.focus({ preventScroll: true });
  }
}
