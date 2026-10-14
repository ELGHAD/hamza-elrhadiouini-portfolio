import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BilingualText } from '../../core/models/content.model';
import { LocaleService } from '../../core/services/locale.service';
import { PROFILE } from '../../core/data/profile.data';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';

type CopyState = 'idle' | 'copied' | 'error';

/**
 * Morocco is on GMT. A fixed zone rather than 'Africa/Casablanca': time-zone databases
 * (Node's, older browsers') still disagree on Morocco's offset and showed the wrong hour.
 */
const TIME_ZONE = 'UTC';
/** Shown next to the local time. */
export const TIME_ZONE_LABEL = 'GMT';
/** Working hours, local time, every day of the week. */
const WORK_START = 9;
const WORK_END = 19;

interface Topic {
  id: string;
  label: BilingualText;
  /** Opening line written into the message when the chip is picked. */
  intro: BilingualText;
}

const TOPICS: Topic[] = [
  {
    id: 'job',
    label: { fr: 'Opportunité de poste', en: 'Job opportunity' },
    intro: {
      fr: 'Bonjour Hamza, je vous contacte au sujet d’une opportunité de poste : ',
      en: 'Hi Hamza, I’m reaching out about a job opportunity: ',
    },
  },
  {
    id: 'freelance',
    label: { fr: 'Mission freelance', en: 'Freelance project' },
    intro: {
      fr: 'Bonjour Hamza, j’ai un projet freelance à vous proposer : ',
      en: 'Hi Hamza, I have a freelance project for you: ',
    },
  },
  {
    id: 'collaboration',
    label: { fr: 'Collaboration', en: 'Collaboration' },
    intro: {
      fr: 'Bonjour Hamza, j’aimerais vous proposer une collaboration : ',
      en: 'Hi Hamza, I’d like to suggest a collaboration: ',
    },
  },
  {
    id: 'question',
    label: { fr: 'Question technique', en: 'Technical question' },
    intro: {
      fr: 'Bonjour Hamza, j’ai une question à propos de ',
      en: 'Hi Hamza, I have a question about ',
    },
  },
  {
    id: 'hello',
    label: { fr: 'Simple bonjour', en: 'Just saying hi' },
    intro: { fr: 'Bonjour Hamza, ', en: 'Hi Hamza, ' },
  },
];

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent, SpotlightDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly localeService = inject(LocaleService);
  readonly profile = PROFILE;
  readonly topics = TOPICS;
  readonly timeZoneLabel = TIME_ZONE_LABEL;
  readonly copyState = signal<CopyState>('idle');
  readonly activeTopic = signal<string | null>(null);
  /** Current time, refreshed every 20 s in the browser; null while prerendering. */
  private readonly now = signal<Date | null>(null);
  private readonly form = viewChild(ContactFormComponent);
  private copyResetTimer?: number;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.now.set(new Date());
      const timer = window.setInterval(() => this.now.set(new Date()), 20_000);
      destroyRef.onDestroy(() => window.clearInterval(timer));
    });
  }

  /** e.g. "mercredi 14:20" / "Wednesday 2:20 PM", in my time zone. */
  readonly localTime = computed(() => {
    const now = this.now();
    if (!now) return null;
    const locale = this.localeService.locale() === 'fr' ? 'fr-FR' : 'en-US';
    const day = new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: TIME_ZONE }).format(now);
    const time = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: TIME_ZONE,
    }).format(now);
    return { day: day.charAt(0).toUpperCase() + day.slice(1), time };
  });

  /** Whether it is currently a working hour for me. */
  readonly working = computed(() => {
    const now = this.now();
    if (!now) return null;
    const parts = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: TIME_ZONE,
    }).formatToParts(now);
    const hour = Number(parts.find((part) => part.type === 'hour')?.value);
    return hour >= WORK_START && hour < WORK_END;
  });

  text(copy: BilingualText): string {
    return copy[this.localeService.locale()];
  }

  pickTopic(topic: Topic): void {
    this.activeTopic.set(topic.id);
    this.form()?.startWith(this.text(topic.intro));
  }

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
