import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss'
})
export class SectionTitleComponent {
  @Input() title = '';
  @Input() subtitle = '';
}