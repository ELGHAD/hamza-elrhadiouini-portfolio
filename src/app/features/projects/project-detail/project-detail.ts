import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProjectsService } from '../../../core/services/projects.service';
import { SkillTagComponent } from '../../../shared/components/skill-tag/skill-tag';
import { CtaButton } from '../../../shared/components/cta-button/cta-button';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [SkillTagComponent, CtaButton],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss'
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  private id = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id') ?? ''))
  );

  project = () => {
    const id = this.id();
    return id ? this.projectsService.getById(id) : undefined;
  };
}