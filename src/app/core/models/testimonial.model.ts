import { BilingualText, ContentStatus, Locale } from './content.model';

export interface Testimonial {
  id: string;
  /** Only 'verified' testimonials are rendered. */
  status: ContentStatus;
  /** Written consent from the author to publish this text on the portfolio. */
  publicationAuthorized: boolean;
  /** The quote exactly as written by its author, never rewritten. */
  quote: {
    text: string;
    lang: Locale;
  };
  /**
   * Optional translation into the other language, shown with a "translated" label.
   * Only add one that Hamza has reviewed (ideally approved by the author).
   */
  translation?: string;
  author: string;
  role: BilingualText;
  organization: string;
  /** Relationship to Hamza, e.g. internship supervisor or client. */
  context: BilingualText;
}
