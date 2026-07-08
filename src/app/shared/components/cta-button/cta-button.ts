import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.scss'
})
export class CtaButtonComponent {
  @Input() label = '';
  @Input() routerLinkTo?: string;
  @Input() href?: string;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() external = false;
}