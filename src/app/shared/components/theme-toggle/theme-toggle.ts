import { Component, inject } from '@angular/core';
import { UI_COPY } from '../../../core/data/ui.data';
import { LocaleService } from '../../../core/services/locale.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
  readonly localeService = inject(LocaleService);
  readonly copy = UI_COPY;

  toggle(): void {
    this.themeService.toggle();
  }
}
