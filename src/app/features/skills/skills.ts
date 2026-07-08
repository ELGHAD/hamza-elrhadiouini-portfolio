import { Component, inject } from '@angular/core';
import { SkillsService } from '../../core/services/skills.service';
import { SkillTagComponent } from '../../shared/components/skill-tag/skill-tag';
import { SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SkillTagComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  private skillsService = inject(SkillsService);

  grouped = this.skillsService.getGroupedByCategory();

  categories: SkillCategory[] = [
    'Backend & Architecture',
    'Frontend',
    'Databases',
    'DevOps & Cloud',
    'AI & Data',
    'Methods & Tools'
  ];
}