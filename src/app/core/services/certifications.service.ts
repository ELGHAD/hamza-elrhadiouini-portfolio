import { Injectable } from '@angular/core';
import {
  Certification,
  CertificationGroup,
  CertificationGroupId,
  CertificationKindLabel,
} from '../models/certification.model';
import {
  CERTIFICATION_GROUPS,
  CERTIFICATION_KIND_LABELS,
  certificationsCount,
  VERIFIED_CERTIFICATIONS,
} from '../data/certifications.data';

@Injectable({ providedIn: 'root' })
export class CertificationsService {
  private readonly certifications: Certification[] = VERIFIED_CERTIFICATIONS;

  getAll(): Certification[] {
    return this.certifications;
  }

  getCount(): number {
    return certificationsCount;
  }

  getFeatured(): Certification[] {
    return this.certifications.filter((certification) => certification.featured);
  }

  getGroups(): CertificationGroup[] {
    return CERTIFICATION_GROUPS;
  }

  getByGroup(group: CertificationGroupId): Certification[] {
    return this.certifications.filter((certification) => certification.group === group);
  }

  getChildren(parentId: string): Certification[] {
    return this.certifications.filter((certification) => certification.parentId === parentId);
  }

  getKindLabel(kind: Certification['kind']): CertificationKindLabel['label'] {
    return (
      CERTIFICATION_KIND_LABELS.find((label) => label.id === kind)?.label ??
      CERTIFICATION_KIND_LABELS[0].label
    );
  }

  getIssuers(): string[] {
    return [...new Set(this.certifications.map((c) => c.issuer))];
  }

  search(query: string): Certification[] {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return this.certifications;
    return this.certifications.filter((certification) =>
      `${certification.title} ${certification.issuer}`.toLocaleLowerCase().includes(term),
    );
  }
}
