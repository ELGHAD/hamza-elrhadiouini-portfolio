export type ProjectCategory = 'professional' | 'personal';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  tagline: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  businessValue: string;
  techStack: string[];
  collaboration?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  screenshots?: string[];
  compact?: boolean; // true for secondary/basic entries (e.g. Alarm_Clock)
}