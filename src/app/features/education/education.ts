import { Component, inject } from '@angular/core';
import { EducationService } from '../../core/services/education.service';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TimelineItemComponent],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
  private educationService = inject(EducationService);

  education = this.educationService.getAll();
}