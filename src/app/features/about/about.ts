import { Component } from '@angular/core';
import { CtaButton } from '../../shared/components/cta-button/cta-button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CtaButton],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {}