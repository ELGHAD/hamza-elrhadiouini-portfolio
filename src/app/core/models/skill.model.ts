export type SkillCategory =
  | 'Backend & Architecture'
  | 'Frontend'
  | 'Databases'
  | 'DevOps & Cloud'
  | 'AI & Data'
  | 'Methods & Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
}