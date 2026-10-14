import { afterNextRender, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LocaleService } from '../../../core/services/locale.service';

@Component({
  selector: 'app-locale-redirect',
  imports: [RouterLink],
  template: `
    <section class="language-choice" aria-labelledby="language-choice-title">
      <h1 id="language-choice-title">Choisissez une langue / Choose a language</h1>
      <nav aria-label="Language / Langue">
        <a [routerLink]="localeService.path('', 'fr')" lang="fr">Français</a>
        <a [routerLink]="localeService.path('', 'en')" lang="en">English</a>
      </nav>
      <noscript>
        <p><a href="fr/" lang="fr">Continuer en français</a></p>
        <p><a href="en/" lang="en">Continue in English</a></p>
      </noscript>
    </section>
  `,
  styles: [
    `
      :host {
        display: grid;
        min-height: 55vh;
        place-items: center;
        padding: 2rem 1rem;
      }
      .language-choice {
        width: min(100%, 48rem);
      }
      nav {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1.5rem;
      }
      a {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        color: var(--accent-text);
      }
    `,
  ],
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
