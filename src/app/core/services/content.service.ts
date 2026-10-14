import { Injectable } from '@angular/core';
import { ContentFact, Locale, ProjectLinks } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  value<T>(fact: ContentFact<T>, locale: Locale): T | undefined {
    return fact.status === 'verified' ? fact[locale] : undefined;
  }

  visible<T>(fact: ContentFact<T>): boolean {
    return fact.status === 'verified';
  }

  approvedRepository(links: ProjectLinks): string | undefined {
    return links.repoPublic && links.linkApproved ? links.repo : undefined;
  }
}
