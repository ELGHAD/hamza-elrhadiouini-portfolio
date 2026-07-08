import { Component, inject, signal, computed } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card';
import { ProjectCategory } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);

  activeTab = signal<ProjectCategory>('professional');

  allProjects = this.projectsService.getAll();

  mainProjects = computed(() =>
    this.allProjects.filter(p => p.category === this.activeTab() && !p.compact)
  );

  compactProjects = computed(() =>
    this.allProjects.filter(p => p.category === this.activeTab() && p.compact)
  );

  setTab(tab: ProjectCategory): void {
    this.activeTab.set(tab);
  }
}