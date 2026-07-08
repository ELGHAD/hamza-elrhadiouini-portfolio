import { Component, inject, signal } from '@angular/core';
import { CertificationsService } from '../../core/services/certifications.service';

@Component({
  selector: 'app-certifications',
  standalone: true,
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss'
})
export class CertificationsComponent {
  private certificationsService = inject(CertificationsService);

  featured = this.certificationsService.getByTier('featured');
  additional = this.certificationsService.getByTier('additional');

  backendTrack = this.certificationsService.getSubCoursesByTrack('Meta Back-End Developer');
  frontendTrack = this.certificationsService.getSubCoursesByTrack('Meta Front-End Developer');

  issuers = this.certificationsService.getIssuers();

  expandedTracks = signal<Set<string>>(new Set());

  toggleTrack(track: string): void {
    const current = new Set(this.expandedTracks());
    if (current.has(track)) {
      current.delete(track);
    } else {
      current.add(track);
    }
    this.expandedTracks.set(current);
  }

  isExpanded(track: string): boolean {
    return this.expandedTracks().has(track);
  }
}