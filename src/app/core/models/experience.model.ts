export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string; // e.g. "Professional internship", "End-of-study internship (PFA)"
  responsibilities: string[];
  relatedProjectId?: string; // links to a Project id
}