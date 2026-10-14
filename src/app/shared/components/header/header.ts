import { Component, computed, inject } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { UI_COPY } from '../../../core/data/ui.data';
import { LocaleService } from '../../../core/services/locale.service';
import { ScrollService } from '../../../core/services/scroll.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { LogoComponent } from '../logo/logo';

type NavLabel = 'projects' | 'experience' | 'services' | 'skills' | 'certifications';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent, LogoComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class HeaderComponent {
  readonly localeService = inject(LocaleService);
  private readonly scroll = inject(ScrollService);
  readonly copy = UI_COPY;
  isMenuOpen = false;

  readonly links: { path: string; label: NavLabel }[] = [
    { path: 'projects', label: 'projects' },
    { path: 'experience', label: 'experience' },
    { path: 'services', label: 'services' },
    { path: 'skills', label: 'skills' },
    { path: 'certifications', label: 'certifications' },
  ];

  /** Solid background and shadow once the page has moved. */
  readonly scrolled = computed(() => this.scroll.y() > 8);
  readonly progress = this.scroll.progress;

  constructor() {
    // Also closes the menu on back/forward navigation.
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
