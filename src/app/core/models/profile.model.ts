import { ContentFact } from './content.model';

export interface Profile {
  name: ContentFact;
  title: ContentFact;
  availability: ContentFact;
  email: ContentFact;
  github: ContentFact;
  linkedin: ContentFact;
  cvFr: ContentFact;
  cvEn: ContentFact;
}
