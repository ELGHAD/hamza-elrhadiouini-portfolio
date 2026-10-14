import { Component, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocaleService } from '../../core/services/locale.service';
import { PROFILE } from '../../core/data/profile.data';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form';

type CopyState = 'idle' | 'copied' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly localeService = inject(LocaleService);
  readonly profile = PROFILE;
  readonly copyState = signal<CopyState>('idle');
  private copyResetTimer?: number;

  async copyEmail(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      await navigator.clipboard.writeText(this.profile.email[this.localeService.locale()]);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('error');
    }
    window.clearTimeout(this.copyResetTimer);
    this.copyResetTimer = window.setTimeout(() => this.copyState.set('idle'), 4000);
  }

  copyStatus(): string {
    const french = this.localeService.locale() === 'fr';
    switch (this.copyState()) {
      case 'copied':
        return french ? 'Adresse e-mail copiée.' : 'Email address copied.';
      case 'error':
        return french
          ? 'Copie indisponible. Sélectionnez l’adresse ci-dessus.'
          : 'Copy unavailable. Select the address above.';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) window.clearTimeout(this.copyResetTimer);
  }
}
