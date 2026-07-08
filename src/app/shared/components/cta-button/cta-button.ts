import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cta-button',
  imports: [RouterLink, NgClass],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss'
})
export class CtaButton {
  @Input() label = '';
  @Input() routerLinkTo?: string;
  @Input() href?: string;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() external = false;
}