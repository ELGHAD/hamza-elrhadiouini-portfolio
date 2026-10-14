import { Component, computed, inject, signal } from '@angular/core';
import { Certification, CertificationGroupId } from '../../core/models/certification.model';
import { CertificationsService } from '../../core/services/certifications.service';
import { LocaleService } from '../../core/services/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-certifications',
  imports: [RevealDirective],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss',
})
export class CertificationsComponent {
  private readonly certificationsService = inject(CertificationsService);
  readonly localeService = inject(LocaleService);
  readonly count = this.certificationsService.getCount();
  readonly groups = this.certificationsService.getGroups();
  readonly query = signal('');
  readonly expandedGroups = signal<Set<CertificationGroupId>>(new Set());
  readonly expandedParents = signal<Set<string>>(new Set());
  readonly visibleCertifications = computed(() => this.certificationsService.search(this.query()));
  readonly featured = computed(() =>
    this.visibleCertifications().filter((certification) => certification.featured),
  );

  groupCertifications(groupId: CertificationGroupId): Certification[] {
    const matching = this.visibleCertifications().filter(
      (certification) => certification.group === groupId,
    );
    const matchingIds = new Set(matching.map((certification) => certification.id));
    const fullGroup = this.certificationsService.getByGroup(groupId);
    const parentIdsWithMatches = new Set(
      fullGroup
        .filter((certification) => certification.parentId && matchingIds.has(certification.id))
        .map((certification) => certification.parentId as string),
    );
    return fullGroup.filter(
      (certification) =>
        !certification.parentId &&
        (matchingIds.has(certification.id) || parentIdsWithMatches.has(certification.id)),
    );
  }

  groupCount(groupId: CertificationGroupId): number {
    return this.visibleCertifications().filter((certification) => certification.group === groupId)
      .length;
  }

  childrenFor(parentId: string): Certification[] {
    const matchingIds = new Set(
      this.visibleCertifications().map((certification) => certification.id),
    );
    return this.certificationsService
      .getChildren(parentId)
      .filter((child) => matchingIds.has(child.id));
  }

  kindLabel(certification: Certification): string {
    return this.certificationsService.getKindLabel(certification.kind)[this.localeService.locale()];
  }

  isGroupExpanded(groupId: CertificationGroupId): boolean {
    return this.expandedGroups().has(groupId);
  }

  isParentExpanded(parentId: string): boolean {
    return this.expandedParents().has(parentId);
  }

  toggleGroup(groupId: CertificationGroupId): void {
    const next = new Set(this.expandedGroups());
    if (next.has(groupId)) next.delete(groupId);
    else next.add(groupId);
    this.expandedGroups.set(next);
  }

  toggleParent(parentId: string): void {
    const next = new Set(this.expandedParents());
    if (next.has(parentId)) next.delete(parentId);
    else next.add(parentId);
    this.expandedParents.set(next);
  }
}
