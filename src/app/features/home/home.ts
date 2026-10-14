import { afterNextRender, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeMetric } from '../../core/models/home.model';
import {
  HOME_CERTIFICATIONS,
  HOME_EDUCATION,
  HOME_EXPERIENCES,
  HOME_METRICS,
  HOME_PROJECTS,
  HOME_SERVICES,
} from '../../core/data/home.data';
import { PROFILE } from '../../core/data/profile.data';
import { LocaleService } from '../../core/services/locale.service';
import { ThemeService } from '../../core/services/theme.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TestimonialsComponent } from '../../shared/components/testimonials/testimonials';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form';
import { JourneyTimelineComponent } from '../../shared/components/journey-timeline/journey-timeline';
import { TechMarqueeComponent } from '../../shared/components/tech-marquee/tech-marquee';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';

/** Same value as the `sizes` attribute of the hero <img> in home.html. */
const HERO_SIZES = '(max-width: 600px) calc(100vw - 2rem), (max-width: 900px) 40rem, 70vw';
const HERO_IMAGES = {
  dark: {
    src: 'images/hamza-hero-1440.webp',
    srcset: 'images/hamza-hero-720.webp 720w, images/hamza-hero-1440.webp 1440w',
  },
  light: {
    src: 'images/hamza-hero-light-1120.webp',
    srcset: 'images/hamza-hero-light-720.webp 720w, images/hamza-hero-light-1120.webp 1120w',
  },
} as const;

/** Line icons for the facts strip (same 24×24 family as the skills page). */
const METRIC_ICONS: Record<HomeMetric['icon'], string[]> = {
  projects: ['M3 6.5h7l2 2h9V19H3z', 'M3 11h18'],
  experience: ['M3 8h18v11H3z', 'M9 8V5h6v3', 'M3 13h18', 'M11 13v2h2v-2'],
  certifications: ['M12 3a5.5 5.5 0 1 0 0 11a5.5 5.5 0 1 0 0-11z', 'M8.5 13 7 21l5-2.6 5 2.6-1.5-8'],
};

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    RevealDirective,
    TestimonialsComponent,
    ContactFormComponent,
    JourneyTimelineComponent,
    TechMarqueeComponent,
    SpotlightDirective,
    TiltDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnDestroy {
  readonly localeService = inject(LocaleService);
  readonly profile = PROFILE;
  readonly services = HOME_SERVICES.filter((item) => item.status === 'verified');
  readonly projects = HOME_PROJECTS.filter((item) => item.status === 'verified');
  readonly experiences = HOME_EXPERIENCES.filter((item) => item.status === 'verified');
  readonly education = HOME_EDUCATION;
  readonly certifications = HOME_CERTIFICATIONS.filter((item) => item.status === 'verified');
  readonly metrics = HOME_METRICS;
  readonly metricIcons = METRIC_ICONS;
  private readonly theme = inject(ThemeService).theme;
  /**
   * Hero picture for the current theme: the original on its dark backdrop, or a light
   * version whose edges fade to transparent (made from assets-src/hamza-hero-light.png).
   * Only the picture of the active theme is downloaded.
   */
  readonly heroImage = computed(() => HERO_IMAGES[this.theme()]);
  readonly reducedMotion = signal(false);
  readonly typedRole = signal('Software Engineer');
  readonly metricValues = signal(this.metrics.map((metric) => metric.value));

  private readonly roleList = ['Software Engineer', 'Full-Stack Developer', 'AI Engineer'];
  private typingTimer?: number;
  private metricObserver?: IntersectionObserver;
  private readonly animationFrames = new Set<number>();
  private browserInitialized = false;

  constructor() {
    afterNextRender(() => this.initializeMotion());
  }

  path(path = ''): string {
    return this.localeService.path(path);
  }

  text(copy: { fr: string; en: string }): string {
    return copy[this.localeService.locale()];
  }

  metricValue(metric: HomeMetric, index: number): string {
    const locale = this.localeService.locale();
    const value = this.metricValues()[index] ?? metric.value;
    return `${value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      minimumFractionDigits: metric.precision,
      maximumFractionDigits: metric.precision,
    })}${metric.suffix}`;
  }

  ngOnDestroy(): void {
    if (!this.browserInitialized) return;
    if (this.typingTimer !== undefined) window.clearTimeout(this.typingTimer);
    this.metricObserver?.disconnect();
    for (const frame of this.animationFrames) window.cancelAnimationFrame(frame);
  }

  /**
   * Loads the other theme's hero picture in the background once the page is idle, so a
   * theme switch shows it at once (same srcset and sizes: the browser picks the same width).
   */
  private preloadOtherHero(): void {
    const other = HERO_IMAGES[this.theme() === 'light' ? 'dark' : 'light'];
    const load = (): void => {
      const image = new Image();
      image.sizes = HERO_SIZES;
      image.srcset = other.srcset;
      image.src = other.src;
    };
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(load, { timeout: 4000 });
    } else {
      window.setTimeout(load, 2500);
    }
  }

  private initializeMotion(): void {
    this.browserInitialized = true;
    this.preloadOtherHero();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.reducedMotion.set(prefersReducedMotion);
    if (!prefersReducedMotion) this.startRoleTyping();
    this.observeMetrics();
  }

  private startRoleTyping(): void {
    let roleIndex = 0;
    let characterIndex = this.roleList[roleIndex].length;
    let deleting = true;

    const step = (): void => {
      const role = this.roleList[roleIndex];
      if (deleting) {
        characterIndex -= 1;
        this.typedRole.set(role.slice(0, Math.max(characterIndex, 0)));
        if (characterIndex <= 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % this.roleList.length;
          this.typingTimer = window.setTimeout(step, 220);
          return;
        }
      } else {
        characterIndex += 1;
        this.typedRole.set(this.roleList[roleIndex].slice(0, characterIndex));
        if (characterIndex >= this.roleList[roleIndex].length) {
          deleting = true;
          this.typingTimer = window.setTimeout(step, 1450);
          return;
        }
      }
      this.typingTimer = window.setTimeout(step, deleting ? 34 : 58);
    };

    this.typingTimer = window.setTimeout(step, 1650);
  }

  private observeMetrics(): void {
    const counters = document.querySelectorAll<HTMLElement>('[data-metric-index]');
    if (this.reducedMotion() || !('IntersectionObserver' in window) || !counters.length) return;

    this.metricObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset['metricIndex']);
          this.animateMetric(index);
          this.metricObserver?.unobserve(entry.target);
        }
      },
      { threshold: 0.45 },
    );
    counters.forEach((counter) => this.metricObserver?.observe(counter));
  }

  private animateMetric(index: number): void {
    const target = this.metrics[index]?.value;
    if (target === undefined) return;
    const start = performance.now();
    const duration = 1100;
    this.metricValues.update((values) =>
      values.map((value, position) => (position === index ? 0 : value)),
    );

    const tick = (now: number): void => {
      // Clamped at 0: the first frame's timestamp can be slightly earlier than `start`.
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.metricValues.update((values) =>
        values.map((current, position) =>
          position === index ? (progress === 1 ? target : Math.round(target * eased)) : current,
        ),
      );
      if (progress < 1) {
        const frame = window.requestAnimationFrame((next) => {
          this.animationFrames.delete(frame);
          tick(next);
        });
        this.animationFrames.add(frame);
      }
    };
    const frame = window.requestAnimationFrame(tick);
    this.animationFrames.add(frame);
  }
}
