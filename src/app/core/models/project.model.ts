import { BilingualText, ContentStatus, ProjectLinks } from './content.model';

export type ProjectCategory =
  | 'ai-rag'
  | 'backend'
  | 'full-stack'
  | 'web-cms'
  | 'mobile'
  | 'desktop'
  | 'machine-learning'
  | 'data-tools';

/**
 * Where a project sits on the projects page. One group per project; categories stay
 * multi-valued and only drive the filters.
 */
export type ProjectGroup = 'professional' | 'web' | 'ai' | 'apps' | 'foundations';

/**
 * How much space a project gets: `spotlight` (one wide card), `featured` (full card in a
 * highlighted grid), `standard` (card in its domain grid), `exercise` (one-line row).
 */
export type ProjectTier = 'spotlight' | 'featured' | 'standard' | 'exercise';

export type ProjectTeam = 'solo' | 'pair';

/** A key figure shown big. Only numbers confirmed by a source belong here. */
export interface ProjectMetric {
  value: BilingualText;
  label: BilingualText;
}

/** One block of "what I did": a short title and the detail. */
export interface ProjectAction {
  title: BilingualText;
  text: BilingualText;
}

export interface ProjectFlowStep {
  title: BilingualText;
  detail?: BilingualText;
}

/** A left-to-right flow (architecture or pipeline), drawn as connected steps. */
export interface ProjectFlow {
  title: BilingualText;
  caption?: BilingualText;
  steps: ProjectFlowStep[];
  /** Supporting pieces drawn under the flow (model provider, container runtime…). */
  support?: ProjectFlowStep[];
}

export interface Project {
  id: string;
  status: ContentStatus;
  title: BilingualText;
  group: ProjectGroup;
  tier: ProjectTier;
  categories: ProjectCategory[];
  /** Framework, company or school context, e.g. "Final-year internship · ALTEN". */
  setting?: BilingualText;
  period?: BilingualText;
  team: ProjectTeam;
  /** Confidential work: no code link, no company or client data. */
  confidential?: boolean;
  /** Honest current state: live, qualified demonstrator, works locally, partial… */
  state?: BilingualText;
  /** One sentence: what the project is. */
  summary: BilingualText;
  /** Situation: the problem or need. */
  context?: BilingualText;
  /** Task: what I was asked or set out to do. */
  task?: BilingualText;
  /** My scope; required wording for pair projects. */
  role?: BilingualText;
  actions?: ProjectAction[];
  architecture?: BilingualText;
  flows?: ProjectFlow[];
  features?: BilingualText[];
  metrics?: ProjectMetric[];
  results?: BilingualText[];
  /** What the project shows about me, written for a recruiter. */
  proves?: BilingualText;
  /** Learnings and next steps. */
  nextSteps?: BilingualText;
  techStack: string[];
  links: ProjectLinks;
}

export interface ProjectCategoryOption {
  id: ProjectCategory | 'all';
  label: BilingualText;
}

export interface ProjectGroupInfo {
  id: ProjectGroup;
  eyebrow: BilingualText;
  title: BilingualText;
  intro: BilingualText;
}

