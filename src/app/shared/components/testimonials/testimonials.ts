import { Component, inject } from '@angular/core';
import { TESTIMONIALS } from '../../../core/data/testimonials.data';
import { Testimonial } from '../../../core/models/testimonial.model';
import { LocaleService } from '../../../core/services/locale.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-testimonials',
  imports: [RevealDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent {
  readonly localeService = inject(LocaleService);
  /** Hidden entirely when nothing is both verified and authorized for publication. */
  readonly testimonials = TESTIMONIALS.filter(
    (testimonial) =>
      testimonial.status === 'verified' &&
      testimonial.publicationAuthorized &&
      testimonial.quote.text.trim() !== '' &&
      !testimonial.quote.text.includes('TODO'),
  );

  /** A reviewed translation is shown when the quote is in the other language. */
  showsTranslation(testimonial: Testimonial): boolean {
    return testimonial.quote.lang !== this.localeService.locale() && !!testimonial.translation;
  }
}
