import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() period = '';
  @Input() highlight = false;
}