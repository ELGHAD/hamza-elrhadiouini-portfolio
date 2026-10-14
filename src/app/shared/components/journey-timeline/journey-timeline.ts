import { Component, computed, inject, input, signal } from '@angular/core';
import { BUILD_INFO } from '../../../../environments/build-info';
import { HomeEducation, HomeExperience } from '../../../core/models/home.model';
import { LocaleService } from '../../../core/services/locale.service';
import { RevealDirective } from '../../directives/reveal.directive';

interface Segment {
  entry: HomeExperience;
  number: number;
  left: number;
  width: number;
  lane: number;
  ongoing: boolean;
}

/** Months between two segments sharing a lane: closer ones move to the next lane. */
const LANE_GAP_MONTHS = 5;

const monthIndex = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

/**
 * Academic track on one long line, experiences below it on the same linear time axis.
 * The chart is decorative (aria-hidden); the ordered list underneath carries the content.
 */
@Component({
  selector: 'app-journey-timeline',
  imports: [RevealDirective],
  templateUrl: './journey-timeline.html',
  styleUrl: './journey-timeline.scss',
})
export class JourneyTimelineComponent {
  readonly experiences = input.required<HomeExperience[]>();
  readonly education = input.required<HomeEducation>();
  readonly localeService = inject(LocaleService);
  /** Experience highlighted on both the chart and its card. */
  readonly activeId = signal<string | null>(null);

  /** "Now" is the build date, so prerendered HTML and the browser agree. */
  private readonly nowMonth = monthIndex(BUILD_INFO.date.slice(0, 7));

  private readonly axis = computed(() => {
    const start = this.education().startYear * 12;
    const lastYear = Math.max(this.education().endYear, Math.floor(this.nowMonth / 12));
    return { start, end: (lastYear + 1) * 12, firstYear: this.education().startYear, lastYear };
  });

  readonly years = computed(() => {
    const { firstYear, lastYear } = this.axis();
    return Array.from({ length: lastYear - firstYear + 1 }, (_, i) => ({
      year: firstYear + i,
      left: this.percent((firstYear + i) * 12),
    }));
  });

  readonly educationBar = computed(() => ({
    left: this.percent(this.education().startYear * 12),
    width:
      this.percent((this.education().endYear + 1) * 12) -
      this.percent(this.education().startYear * 12),
  }));

  readonly today = computed(() => this.percent(this.nowMonth + 0.5));

  readonly segments = computed<Segment[]>(() => {
    const laneEnds: number[] = [];
    return [...this.experiences()]
      .sort((a, b) => monthIndex(a.start) - monthIndex(b.start))
      .map((entry, index) => {
        const start = monthIndex(entry.start);
        const end = entry.end ? monthIndex(entry.end) + 1 : this.nowMonth + 1;
        let lane = laneEnds.findIndex((laneEnd) => start - laneEnd >= LANE_GAP_MONTHS);
        if (lane === -1) lane = laneEnds.length;
        laneEnds[lane] = end;
        return {
          entry,
          number: index + 1,
          left: this.percent(start),
          width: this.percent(end) - this.percent(start),
          lane,
          ongoing: !entry.end,
        };
      });
  });

  readonly laneCount = computed(
    () => Math.max(0, ...this.segments().map((segment) => segment.lane)) + 1,
  );

  text(copy: { fr: string; en: string }): string {
    return copy[this.localeService.locale()];
  }

  private percent(month: number): number {
    const { start, end } = this.axis();
    return ((month - start) / (end - start)) * 100;
  }
}
