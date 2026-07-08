import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}