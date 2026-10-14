import { BilingualText, ContentStatus } from './content.model';

export interface ServiceProof {
  label: BilingualText;
  /** Route without locale prefix, e.g. '/projects/ebank'. */
  path: string;
  /** Optional anchor on the target page, without '#'. */
  fragment?: string;
}

export type ServiceIcon =
  | 'server'
  | 'layout'
  | 'sparkles'
  | 'eye'
  | 'edit'
  | 'phone'
  | 'cloud'
  | 'workflow';

export interface ServiceOffer {
  id: string;
  status: ContentStatus;
  icon: ServiceIcon;
  title: BilingualText;
  summary: BilingualText;
  deliverables: BilingualText[];
  stack: string[];
  proofs: ServiceProof[];
}

/** A language ecosystem I have shipped in; its project count is computed from projects.data.ts. */
export interface ServiceEcosystem {
  id: string;
  name: string;
  /** What I build with it, in a few words. */
  focus: BilingualText;
  frameworks: string[];
}

/** One step of the learning path: a year, a new ecosystem, where it happened. */
export interface ServiceMilestone {
  year: BilingualText;
  title: BilingualText;
  detail: BilingualText;
  path: string;
}

export interface ServiceStep {
  title: BilingualText;
  text: BilingualText;
}
