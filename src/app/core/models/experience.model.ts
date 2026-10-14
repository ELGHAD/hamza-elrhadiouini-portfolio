import { BilingualText, ContentStatus } from './content.model';

export interface ExperienceEntry {
  id: string;
  status: ContentStatus;
  role: BilingualText;
  company: string;
  location: BilingualText;
  period: BilingualText;
  /** 'YYYY-MM': places the entry on the vertical timeline. */
  start: string;
  /** 'YYYY-MM'; omitted while the experience is ongoing. */
  end?: string;
  type: BilingualText;
  /** Short chapter title for the storytelling timeline. */
  chapter: BilingualText;
  /** Two or three sentences telling the story, built only from verified facts. */
  story: BilingualText;
  responsibilities: BilingualText[];
  stack: string[];
  relatedProjectId?: string;
}
