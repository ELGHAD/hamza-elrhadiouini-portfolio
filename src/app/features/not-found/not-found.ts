import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {
  readonly localeService = inject(LocaleService);
  readonly links = [
    { path: '', label: { fr: 'Accueil', en: 'Home' } },
    { path: 'projects', label: { fr: 'Projets', en: 'Projects' } },
    { path: 'services', label: { fr: 'Services', en: 'Services' } },
    { path: 'contact', label: { fr: 'Contact', en: 'Contact' } },
  ];
}
