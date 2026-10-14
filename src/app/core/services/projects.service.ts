import { Injectable } from '@angular/core';
import {
  Project,
  ProjectCategory,
  ProjectGroup,
  ProjectGroupInfo,
  ProjectTier,
} from '../models/project.model';
import { PROJECTS, PROJECT_GROUPS } from '../data/projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly projects = PROJECTS.filter((project) => project.status === 'verified');

  getAll(): Project[] {
    return this.projects;
  }

  getById(id: string | null): Project | undefined {
    if (!id) return undefined;
    return this.projects.find((p) => p.id === id);
  }

  getGroups(): ProjectGroupInfo[] {
    return PROJECT_GROUPS;
  }

  getGroup(id: ProjectGroup): ProjectGroupInfo | undefined {
    return PROJECT_GROUPS.find((group) => group.id === id);
  }

  /** Projects of one group, optionally limited to some tiers, in display order. */
  getByGroup(group: ProjectGroup, tiers?: ProjectTier[]): Project[] {
    return this.projects.filter(
      (project) => project.group === group && (!tiers || tiers.includes(project.tier)),
    );
  }

  /** Personal projects promoted to the highlighted section (spotlight first). */
  getFeaturedPersonal(): Project[] {
    return this.projects
      .filter((project) => project.group !== 'professional')
      .filter((project) => project.tier === 'spotlight' || project.tier === 'featured')
      .sort((a, b) => Number(b.tier === 'spotlight') - Number(a.tier === 'spotlight'));
  }

  /** Previous or next project in display order, wrapping around. */
  getAdjacent(id: string, direction: -1 | 1): Project | undefined {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1 || this.projects.length < 2) return undefined;
    return this.projects[(index + direction + this.projects.length) % this.projects.length];
  }

  /** Same group first, then shared categories; exercises only relate to each other. */
  getRelated(project: Project, limit = 3): Project[] {
    const score = (candidate: Project) =>
      (candidate.group === project.group ? 2 : 0) +
      candidate.categories.filter((category) => project.categories.includes(category)).length;
    return this.projects
      .filter((candidate) => candidate.id !== project.id)
      .filter((candidate) => (candidate.tier === 'exercise') === (project.tier === 'exercise'))
      .map((candidate) => ({ candidate, score: score(candidate) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ candidate }) => candidate);
  }

  getTechnologyOptions(): string[] {
    return [...new Set(this.projects.flatMap((project) => project.techStack))].sort((a, b) =>
      a.localeCompare(b),
    );
  }

  matchesCategory(project: Project, category: ProjectCategory | 'all'): boolean {
    return category === 'all' || project.categories.includes(category);
  }

  approvedRepository(project: Project): string | undefined {
    const { repo, repoPublic, linkApproved } = project.links;
    return repoPublic && linkApproved ? repo : undefined;
  }
}
