import { BilingualText, ContentStatus } from './content.model';

export interface SpokenLanguage {
  /** Name written in the language itself. */
  name: string;
  /** BCP 47 code, used for the `lang` attribute. */
  code: string;
  /** Name in the page language. */
  label: BilingualText;
  status: ContentStatus;
}
