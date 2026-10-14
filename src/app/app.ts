import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { LocaleService } from './core/services/locale.service';
import { SeoService } from './core/services/seo.service';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly localeService = inject(LocaleService);
  /** The language chooser at '/' is a standalone welcome screen: no header or footer. */
  readonly isLanguageChooser = toSignal(
    inject(Router).events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/, 1)[0] === '/'),
    ),
    { initialValue: false },
  );

  constructor() {
    inject(SeoService).init();
  }
}
