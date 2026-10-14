import { BilingualText, ContentStatus } from './content.model';

export interface HomeService {
  id: string;
  status: ContentStatus;
  title: BilingualText;
  description: BilingualText;
  stack: string[];
  /** Projects that prove the service, linked to their case studies. */
  evidence: HomeEvidence[];
}

export interface HomeEvidence {
  projectId: string;
  label: BilingualText;
}

export interface HomeProject {
  id: string;
  status: ContentStatus;
  title: BilingualText;
  category: BilingualText;
  description: BilingualText;
  stack: string[];
  result?: BilingualText;
  liveUrl?: string;
  repoUrl?: string;
  confidential?: boolean;
  featured?: boolean;
}

export interface HomeExperience {
  id: string;
  status: ContentStatus;
  role: BilingualText;
  organization: BilingualText;
  period: BilingualText;
  /** 'YYYY-MM', used to place the entry on the home timeline. */
  start: string;
  /** 'YYYY-MM'; omitted while the experience is ongoing. */
  end?: string;
  location: BilingualText;
  project: BilingualText;
}

export interface HomeEducation {
  status: ContentStatus;
  startYear: number;
  endYear: number;
  degree: BilingualText;
  school: BilingualText;
  period: BilingualText;
}

export interface HomeStackGroup {
  id: string;
  status: ContentStatus;
  title: BilingualText;
  technologies: string[];
}

export interface HomeCertification {
  id: string;
  status: ContentStatus;
  title: string;
  issuer: string;
  kind: BilingualText;
}

export interface HomeMetric {
  id: string;
  value: number;
  precision: number;
  suffix: string;
  label: BilingualText;
  detail: BilingualText;
  /** Page the card links to (without locale). */
  path: string;
  icon: 'projects' | 'experience' | 'certifications';
}
