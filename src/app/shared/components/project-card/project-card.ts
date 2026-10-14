import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../../core/services/locale.service';
import { ProjectsService } from '../../../core/services/projects.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
  readonly localeService = inject(LocaleService);
  private readonly projectsService = inject(ProjectsService);

  readonly spotlight = computed(() => this.project().tier === 'spotlight');
  readonly repository = computed(() => this.projectsService.approvedRepository(this.project()));
  readonly metrics = computed(() => {
    const { metrics = [], tier } = this.project();
    if (tier === 'spotlight') return metrics;
    return tier === 'featured' ? metrics.slice(0, 2) : [];
  });
  readonly visibleStack = computed(() =>
    this.project().techStack.slice(0, this.spotlight() ? 10 : 5),
  );
  readonly hiddenStackCount = computed(
    () => this.project().techStack.length - this.visibleStack().length,
  );
  readonly groupLabel = computed(() => {
    const group = this.projectsService.getGroup(this.project().group);
    return group?.title[this.localeService.locale()] ?? '';
  });
}
