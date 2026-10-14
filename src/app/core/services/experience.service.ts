import { Injectable } from '@angular/core';
import { ExperienceEntry } from '../models/experience.model';
import { EXPERIENCE } from '../data/experience.data';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  private readonly experience: ExperienceEntry[] = EXPERIENCE.filter(
    (entry) => entry.status === 'verified',
  );

  getAll(): ExperienceEntry[] {
    return this.experience;
  }

  getById(id: string): ExperienceEntry | undefined {
    return this.experience.find((e) => e.id === id);
  }
}
