import { BilingualText } from './content.model';

export type UiCopyKey =
  | 'about'
  | 'certifications'
  | 'closeMenu'
  | 'contact'
  | 'email'
  | 'experience'
  | 'language'
  | 'navigation'
  | 'openMenu'
  | 'projects'
  | 'services'
  | 'skills'
  | 'themeDark'
  | 'themeLight';

export type UiCopy = Record<UiCopyKey, BilingualText>;
