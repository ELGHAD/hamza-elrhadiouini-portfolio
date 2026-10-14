import { Component, inject } from '@angular/core';
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
}
