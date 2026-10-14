import { Component, inject } from '@angular/core';
import { EducationService } from '../../core/services/education.service';
import { LocaleService } from '../../core/services/locale.service';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TimelineItemComponent],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class EducationComponent {
  private readonly educationService = inject(EducationService);
  readonly localeService = inject(LocaleService);

  readonly education = this.educationService.getAll();
}
