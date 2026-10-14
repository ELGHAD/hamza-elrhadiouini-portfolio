import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProjectsService } from '../../../core/services/projects.service';
import { LocaleService } from '../../../core/services/locale.service';
import { BilingualText } from '../../../core/models/content.model';
import { Project } from '../../../core/models/project.model';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface CaseSection {
  id: string;
  label: BilingualText;
}

/** Case-study sections in reading order; each one shows only when the project has the data. */
const SECTIONS: Array<CaseSection & { present: (project: Project) => boolean }> = [
  {
    id: 'context',
    label: { fr: 'Contexte & mission', en: 'Context & mission' },
    present: (p) => !!(p.context || p.task || p.role),
  },
  { id: 'actions', label: { fr: 'Ce que j’ai fait', en: 'What I did' }, present: (p) => !!p.actions?.length },
  {
    id: 'architecture',
    label: { fr: 'Architecture', en: 'Architecture' },
    present: (p) => !!(p.flows?.length || p.architecture),
  },
  {
    id: 'features',
    label: { fr: 'Fonctionnalités', en: 'Features' },
    present: (p) => !!p.features?.length,
  },
  { id: 'results', label: { fr: 'Résultats', en: 'Results' }, present: (p) => !!p.results?.length },
  {
    id: 'takeaways',
    label: { fr: 'Ce que j’en retiens', en: 'Takeaways' },
    present: (p) => !!(p.proves || p.nextSteps),
  },
  { id: 'stack', label: { fr: 'Stack', en: 'Stack' }, present: () => true },
];

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, ProjectCardComponent, RevealDirective],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);
  readonly localeService = inject(LocaleService);

  private readonly id = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: null,
  });

  readonly project = computed(() => this.projectsService.getById(this.id()));
  readonly sections = computed<CaseSection[]>(() => {
    const project = this.project();
    return project ? SECTIONS.filter((section) => section.present(project)) : [];
  });
  readonly repository = computed(() => {
    const project = this.project();
    return project ? this.projectsService.approvedRepository(project) : undefined;
  });
  readonly groupLabel = computed(() => {
    const project = this.project();
    const group = project && this.projectsService.getGroup(project.group);
    return group?.title[this.localeService.locale()] ?? '';
  });
  readonly previousProject = computed(() => this.adjacent(-1));
  readonly nextProject = computed(() => this.adjacent(1));
  readonly relatedProjects = computed(() => {
    const project = this.project();
    return project ? this.projectsService.getRelated(project) : [];
  });

  /** Two-digit section number shown before each heading. */
  sectionNumber(id: string): string {
    const index = this.sections().findIndex((section) => section.id === id);
    return String(index + 1).padStart(2, '0');
  }

  private adjacent(direction: -1 | 1): Project | undefined {
    const project = this.project();
    return project ? this.projectsService.getAdjacent(project.id, direction) : undefined;
  }
}
