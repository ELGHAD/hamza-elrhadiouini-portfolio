import { afterNextRender, Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeMetric } from '../../core/models/home.model';
import {
  HOME_CERTIFICATIONS,
  HOME_EDUCATION,
  HOME_EXPERIENCES,
  HOME_METRICS,
  HOME_PROJECTS,
  HOME_SERVICES,
  HOME_STACK,
} from '../../core/data/home.data';
import { PROFILE } from '../../core/data/profile.data';
import { LocaleService } from '../../core/services/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { TestimonialsComponent } from '../../shared/components/testimonials/testimonials';
import { ContactFormComponent } from '../../shared/components/contact-form/contact-form';
import { JourneyTimelineComponent } from '../../shared/components/journey-timeline/journey-timeline';

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
  readonly stack = HOME_STACK.filter((item) => item.status === 'verified');
  readonly certifications = HOME_CERTIFICATIONS.filter((item) => item.status === 'verified');
  readonly metrics = HOME_METRICS;
  readonly metricIcons = METRIC_ICONS;
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

  private initializeMotion(): void {
    this.browserInitialized = true;
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
      const progress = Math.min((now - start) / duration, 1);
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
