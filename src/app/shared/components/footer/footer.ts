import { Component, inject } from '@angular/core';
import { BUILD_INFO } from '../../../../environments/build-info';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../../core/data/profile.data';
import { UI_COPY } from '../../../core/data/ui.data';
import { LocaleService } from '../../../core/services/locale.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  readonly localeService = inject(LocaleService);
  readonly profile = PROFILE;
  readonly copy = UI_COPY;
  readonly buildYear = BUILD_INFO.date.slice(0, 4);
}
