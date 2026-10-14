import { BilingualText, ContentStatus } from './content.model';

export interface EducationEntry {
  id: string;
  status: ContentStatus;
  degree: BilingualText;
  institution: string;
  location: BilingualText;
  period: BilingualText;
  specialization?: BilingualText;
  highlight?: boolean;
  /** Years only: the source of truth gives no months for school dates. */
  startYear?: number;
  endYear?: number;
}

export interface CurriculumModule {
  title: BilingualText;
  items: BilingualText[];
}

/**
 * One phase of the EMSI engineering degree, drawn as a segment of the academic rail.
 * Phases with `card: false` only label the rail (e.g. S10, told by the PFE experience).
 */
export interface EducationPhase {
  id: string;
  status: ContentStatus;
  semesters: string;
  /** 'YYYY-MM', derived from the semester split (10 semesters over 2021 → 2026). */
  start: string;
  end: string;
  years: BilingualText;
  railLabel: BilingualText;
  card: boolean;
  chapter?: BilingualText;
  title?: BilingualText;
  story?: BilingualText;
  /** Extra line under the story, e.g. the option chosen among those offered. */
  note?: BilingualText;
  modules?: CurriculumModule[];
}

/** A chapter of the experience-page story that is not a job (start of studies, graduation). */
export interface StoryMilestone {
  id: string;
  status: ContentStatus;
  /** 'start' sits at the top of the timeline, 'end' after the last experience. */
  position: 'start' | 'end';
  period: BilingualText;
  chapter: BilingualText;
  title: BilingualText;
  meta: BilingualText;
  story: BilingualText;
  relatedProjectId?: string;
}
