import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { Project, ProjectCategory, ProjectGroup } from '../../core/models/project.model';
import { PROJECT_CATEGORY_OPTIONS } from '../../core/data/projects.data';
import { LocaleService } from '../../core/services/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** Domain sections shown after the professional work and the featured grid. */
const DOMAIN_GROUPS: ProjectGroup[] = ['web', 'ai', 'apps'];

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent, RevealDirective, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  private readonly projectsService = inject(ProjectsService);
  readonly localeService = inject(LocaleService);
  readonly categoryOptions = PROJECT_CATEGORY_OPTIONS;
  readonly technologyOptions = this.projectsService.getTechnologyOptions();
  readonly allProjects = this.projectsService.getAll();

  readonly professionalGroup = this.projectsService.getGroup('professional');
  readonly professional = this.projectsService.getByGroup('professional');
  readonly spotlight = this.professional.filter((project) => project.tier === 'spotlight');
  readonly professionalOthers = this.professional.filter((project) => project.tier !== 'spotlight');
  readonly featuredPersonal = this.projectsService.getFeaturedPersonal();
  readonly featuredSpotlight = this.featuredPersonal.filter((project) => project.tier === 'spotlight');
  readonly featuredOthers = this.featuredPersonal.filter((project) => project.tier !== 'spotlight');
  readonly domainSections = DOMAIN_GROUPS.map((id) => ({
    info: this.projectsService.getGroup(id)!,
    projects: this.projectsService.getByGroup(id, ['standard']),
  })).filter((section) => section.projects.length);
  readonly foundationsGroup = this.projectsService.getGroup('foundations');
  readonly exercises = this.projectsService.getByGroup('foundations', ['exercise']);

  readonly stats = [
    { value: this.allProjects.length, label: { fr: 'projets documentés', en: 'documented projects' } },
    { value: this.professional.length, label: { fr: 'missions professionnelles', en: 'professional engagements' } },
    {
      value: this.allProjects.filter((project) => project.links.live).length,
      label: { fr: 'site client en production', en: 'client site in production' },
    },
    {
      value: this.allProjects.filter((project) => this.projectsService.approvedRepository(project)).length,
      label: { fr: 'dépôts publics à explorer', en: 'public repositories to explore' },
    },
  ];

  readonly activeCategory = signal<ProjectCategory | 'all'>('all');
  readonly activeTechnology = signal('');
  readonly searchTerm = signal('');

  readonly isFiltering = computed(
    () =>
      this.activeCategory() !== 'all' || this.activeTechnology() !== '' || this.searchTerm().trim() !== '',
  );

  readonly filteredProjects = computed(() => this.filterProjects(this.allProjects));

  repository(project: Project): string | undefined {
    return this.projectsService.approvedRepository(project);
  }

  setCategory(category: ProjectCategory | 'all'): void {
    this.activeCategory.set(category);
  }

  resetFilters(): void {
    this.activeCategory.set('all');
    this.activeTechnology.set('');
    this.searchTerm.set('');
  }

  private filterProjects(projects: Project[]): Project[] {
    const locale = this.localeService.locale();
    const term = this.searchTerm().trim().toLocaleLowerCase(locale);
    const technology = this.activeTechnology();

    return projects.filter((project) => {
      if (!this.projectsService.matchesCategory(project, this.activeCategory())) return false;
      if (technology && !project.techStack.includes(technology)) return false;
      if (!term) return true;
      const searchable = [
        project.title[locale],
        project.summary[locale],
        project.setting?.[locale] ?? '',
        ...project.techStack,
      ]
        .join(' ')
        .toLocaleLowerCase(locale);
      return searchable.includes(term);
    });
  }
}
