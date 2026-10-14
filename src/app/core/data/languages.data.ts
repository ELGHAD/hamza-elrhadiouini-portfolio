import { SpokenLanguage } from '../models/language.model';

/** No levels on purpose (PORTFOLIO_CONTENT.md §1). */
export const LANGUAGES: SpokenLanguage[] = [
  { name: 'Français', code: 'fr', label: { fr: 'Français', en: 'French' }, status: 'verified' },
  { name: 'العربية', code: 'ar', label: { fr: 'Arabe', en: 'Arabic' }, status: 'verified' },
  { name: 'English', code: 'en', label: { fr: 'Anglais', en: 'English' }, status: 'verified' },
];
