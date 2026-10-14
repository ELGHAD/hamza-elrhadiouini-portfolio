import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { LocaleService } from './core/services/locale.service';
import { SeoService } from './core/services/seo.service';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top';

/** True for the language chooser at '/' (base href already stripped). */
const isRoot = (url: string): boolean => ['', '/'].includes(url.split(/[?#]/, 1)[0]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly localeService = inject(LocaleService);
  /**
   * The language chooser at '/' is a standalone welcome screen: no header or footer.
   * The initial value comes from the address bar, so they never flash in before the
   * first navigation ends.
   */
  readonly isLanguageChooser = toSignal(
    inject(Router).events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => isRoot(event.urlAfterRedirects)),
    ),
    { initialValue: isRoot(inject(Location).path()) },
  );

  constructor() {
    inject(SeoService).init();
  }
}
