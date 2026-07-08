import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { SkillTagComponent } from '../skill-tag/skill-tag.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink, SkillTagComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}