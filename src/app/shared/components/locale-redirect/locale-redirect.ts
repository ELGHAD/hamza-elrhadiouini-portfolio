import { afterNextRender, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocaleService } from '../../../core/services/locale.service';
import { LogoComponent } from '../logo/logo';

@Component({
  selector: 'app-locale-redirect',
  imports: [RouterLink, LogoComponent],
  templateUrl: './locale-redirect.html',
  styleUrl: './locale-redirect.scss',
})
export class LocaleRedirectComponent {
  readonly localeService = inject(LocaleService);

  constructor() {
    const router = inject(Router);
    afterNextRender(() => {
      void router.navigateByUrl(this.localeService.path('', this.localeService.preferredLocale()));
    });
  }
}
