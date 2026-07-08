import { Injectable } from '@angular/core';
import { Skill, SkillCategory } from '../models/skill.model';
import { SKILLS } from '../data/skills.data';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly skills: Skill[] = SKILLS;

  getAll(): Skill[] {
    return this.skills;
  }

  getGroupedByCategory(): Record<SkillCategory, Skill[]> {
    return this.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<SkillCategory, Skill[]>);
  }
}