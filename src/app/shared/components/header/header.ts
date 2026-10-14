import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UI_COPY } from '../../../core/data/ui.data';
import { LocaleService } from '../../../core/services/locale.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly localeService = inject(LocaleService);
  readonly copy = UI_COPY;
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
