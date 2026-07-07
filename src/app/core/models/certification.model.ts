export type CertificationTier = 'featured' | 'sub-course' | 'additional';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  tier: CertificationTier;
  parentTrack?: string; // e.g. "Meta Back-End Developer" for sub-courses
}