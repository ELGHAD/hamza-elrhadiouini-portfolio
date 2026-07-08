import { Injectable } from '@angular/core';
import { EducationEntry } from '../models/education.model';
import { EDUCATION } from '../data/education.data';

@Injectable({ providedIn: 'root' })
export class EducationService {
  private readonly education: EducationEntry[] = EDUCATION;

  getAll(): EducationEntry[] {
    return this.education;
  }
}