import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  templateUrl: './timeline-item.html',
  styleUrl: './timeline-item.scss'
})
export class TimelineItemComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() period = '';
  @Input() highlight = false;
}