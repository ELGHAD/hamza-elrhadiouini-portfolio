import { BilingualText, ContentStatus } from './content.model';

export type SkillCategoryId =
  | 'languages'
  | 'backend-api'
  | 'frontend-mobile'
  | 'ai-data'
  | 'databases-cms'
  | 'devops-tools'
  | 'security'
  | 'testing'
  | 'architecture-methods'
  | 'methods-tools';

export interface SkillCategory {
  id: SkillCategoryId;
  title: BilingualText;
}

export interface Skill {
  id: string;
  name: string;
  /** Only for names that translate (e.g. « Recherche sémantique »); otherwise `name` is used. */
  localizedName?: BilingualText;
  category: SkillCategoryId;
  status: ContentStatus;
  evidence: BilingualText[];
  /** Coursework only: not marked on the chip, the hover evidence says so. */
  trainingOnly?: boolean;
}
