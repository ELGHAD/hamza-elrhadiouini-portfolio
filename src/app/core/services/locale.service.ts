import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Locale } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  readonly locale = signal<Locale>(this.localeFromUrl(this.router.url));

  constructor() {
    this.applyLocale(this.locale());
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const locale = this.localeFromUrl(event.urlAfterRedirects);
        this.locale.set(locale);
        this.applyLocale(locale);
      });
  }

  preferredLocale(): Locale {
    if (!isPlatformBrowser(this.platformId)) return 'fr';
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr';
  }

  path(path = '', locale: Locale = this.locale()): string {
    const suffix = path.replace(/^\/+/, '');
    return suffix ? `/${locale}/${suffix}` : `/${locale}`;
  }

  switchPath(locale: Locale): string {
    const currentPath = this.router.url.split(/[?#]/, 1)[0];
    const localizedPath = currentPath.replace(/^\/(?:fr|en)(?=\/|$)/, '');
    return this.path(localizedPath, locale);
  }

  private localeFromUrl(url: string): Locale {
    const firstSegment = url.split(/[?#]/, 1)[0].split('/').filter(Boolean)[0];
    return firstSegment === 'en' ? 'en' : 'fr';
  }

  private applyLocale(locale: Locale): void {
    this.document.documentElement.lang = locale;
  }
}
