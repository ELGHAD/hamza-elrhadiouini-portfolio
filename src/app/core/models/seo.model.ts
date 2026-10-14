import { BilingualText } from './content.model';

export type SeoPageKey =
  | 'home'
  | 'services'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'contact'
  | 'not-found';

export interface SeoPage {
  title: BilingualText;
  description: BilingualText;
}
