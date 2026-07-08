import { Injectable } from '@angular/core';
import { Certification, CertificationTier } from '../models/certification.model';
import { CERTIFICATIONS } from '../data/certifications.data';

@Injectable({ providedIn: 'root' })
export class CertificationsService {
  private readonly certifications: Certification[] = CERTIFICATIONS;

  getByTier(tier: CertificationTier): Certification[] {
    return this.certifications.filter(c => c.tier === tier);
  }

  getSubCoursesByTrack(track: string): Certification[] {
    return this.certifications.filter(c => c.parentTrack === track);
  }

  getIssuers(): string[] {
    return [...new Set(this.certifications.map(c => c.issuer))];
  }
}