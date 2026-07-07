export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  specialization?: string;
  highlight?: boolean; // true for the engineering degree (emphasized in UI)
}