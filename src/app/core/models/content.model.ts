export type Locale = 'fr' | 'en';
export type ContentStatus = 'verified' | 'pending' | 'private';

export interface BilingualText {
  fr: string;
  en: string;
}

export interface ContentFact<T = string> {
  fr: T;
  en: T;
  status: ContentStatus;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
  repoPublic: boolean;
  linkApproved: boolean;
}
