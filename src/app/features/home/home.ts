import { Component, inject } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { SkillTagComponent } from '../../shared/components/skill-tag/skill-tag';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CtaButton, ProjectCardComponent, SkillTagComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private projectsService = inject(ProjectsService);

  featuredProjects = this.projectsService.getFeatured();

  previewSkills = ['Spring Boot', 'Angular', 'LangChain', 'Docker', 'pgvector', 'PostgreSQL'];
}