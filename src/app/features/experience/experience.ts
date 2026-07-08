import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../core/services/experience.service';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [TimelineItemComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  private experienceService = inject(ExperienceService);

  experience = this.experienceService.getAll();
}