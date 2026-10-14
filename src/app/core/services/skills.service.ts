import { Injectable } from '@angular/core';
import { Skill, SkillCategory, SkillCategoryId } from '../models/skill.model';
import { SKILLS, SKILL_CATEGORIES } from '../data/skills.data';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly skills: Skill[] = SKILLS.filter((skill) => skill.status === 'verified');

  getAll(): Skill[] {
    return this.skills;
  }

  getCategories(): SkillCategory[] {
    return SKILL_CATEGORIES;
  }

  getGroupedByCategory(): Record<SkillCategoryId, Skill[]> {
    return this.skills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<SkillCategoryId, Skill[]>,
    );
  }
}
