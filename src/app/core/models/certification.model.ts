import { BilingualText, ContentStatus } from './content.model';

export type CertificationKind =
  'official' | 'specialization' | 'professional-certificate' | 'course';

export type CertificationGroupId =
  | 'oracle'
  | 'java-spring'
  | 'meta-backend'
  | 'meta-frontend'
  | 'ai-ml'
  | 'web'
  | 'cloud-devops-data'
  | 'software-engineering'
  | 'other';

export interface CertificationGroup {
  id: CertificationGroupId;
  title: BilingualText;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  kind: CertificationKind;
  group: CertificationGroupId;
  status: ContentStatus;
  parentId?: string;
  verifyUrl?: string;
  courseUrl?: string;
  featured?: boolean;
  note?: string;
  todo?: string;
}

export interface CertificationKindLabel {
  id: CertificationKind;
  label: BilingualText;
}
