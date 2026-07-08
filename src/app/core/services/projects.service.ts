import { Injectable } from '@angular/core';
import { Project, ProjectCategory } from '../models/project.model';
import { PROJECTS } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projects: Project[] = PROJECTS;

  getAll(): Project[] {
    return this.projects;
  }

  getByCategory(category: ProjectCategory): Project[] {
    return this.projects.filter(p => p.category === category);
  }

  getFeatured(): Project[] {
    return this.projects.filter(p => p.featured);
  }

  getById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}