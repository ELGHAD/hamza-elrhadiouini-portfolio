import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUILD_INFO } from '../../../environments/build-info';
import { EDUCATION, EDUCATION_PHASES, STORY_MILESTONES } from '../../core/data/education.data';
import { LANGUAGES } from '../../core/data/languages.data';
import { PROFILE } from '../../core/data/profile.data';
import { BilingualText } from '../../core/models/content.model';
import { EducationPhase, StoryMilestone } from '../../core/models/education.model';
import { ExperienceEntry } from '../../core/models/experience.model';
import { Project } from '../../core/models/project.model';
import { ExperienceService } from '../../core/services/experience.service';
import { LocaleService } from '../../core/services/locale.service';
import { ProjectsService } from '../../core/services/projects.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** One chapter of the story, placed on the month grid. */
interface Chapter {
  kind: 'experience' | 'milestone' | 'phase';
  id: string;
  number: number;
  row: number;
  experience?: ExperienceEntry;
  milestone?: StoryMilestone;
  phase?: EducationPhase;
  project?: Project;
}

interface Segment {
  id: string;
  number: number;
  rowStart: number;
  rowEnd: number;
  /** Grid column of the lane (lanes sit at columns 3 and 4). */
  column: number;
  ongoing: boolean;
}

const monthIndex = (value: string): number => {
  const [year, month] = value.split('-').map(Number);
  return year * 12 + (month - 1);
};

/**
 * Vertical storytelling timeline built on a CSS grid with one row per month:
 * the academic rail spans every row, experience bars span their months, and each
 * story card starts on the row of its first month. Rows holding a card grow to fit
 * it while empty months stay thin, so order and timing stay true without wasting space.
 */
@Component({
  selector: 'app-experience',
  imports: [RouterLink, RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent implements OnDestroy {
  readonly localeService = inject(LocaleService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly experienceService = inject(ExperienceService);
  private readonly projectsService = inject(ProjectsService);
  readonly profile = PROFILE;
  readonly emsi = EDUCATION.find((entry) => entry.id === 'emsi-engineering')!;
  readonly languages = LANGUAGES.filter((entry) => entry.status === 'verified');
  readonly timelineProgress = signal(0);
  /** Chapter highlighted from its bar or its card. */
  readonly activeId = signal<string | null>(null);

  /** "Now" is the build date, so prerendered HTML and the browser agree. */
  private readonly nowMonth = monthIndex(BUILD_INFO.date.slice(0, 7));
  private readonly axisStart = (this.emsi.startYear ?? 2021) * 12;
  private readonly phases = EDUCATION_PHASES.filter((phase) => phase.status === 'verified');
  private readonly experiences = [...this.experienceService.getAll()].sort(
    (a, b) => monthIndex(a.start) - monthIndex(b.start),
  );

  private row(month: number): number {
    return month - this.axisStart + 1;
  }

  readonly todayRow = this.row(this.nowMonth);

  readonly chapters: Chapter[] = (() => {
    const milestones = STORY_MILESTONES.filter((item) => item.status === 'verified');
    const lastEnd = Math.max(
      ...this.experiences.map((entry) => (entry.end ? monthIndex(entry.end) : this.nowMonth)),
    );
    const items: Omit<Chapter, 'number'>[] = [
      ...milestones
        .filter((item) => item.position === 'start')
        .map((milestone) => ({ kind: 'milestone' as const, id: milestone.id, row: 1, milestone })),
      ...this.phases
        .filter((phase) => phase.card)
        .map((phase) => ({
          kind: 'phase' as const,
          id: phase.id,
          row: this.row(monthIndex(phase.start)),
          phase,
        })),
      ...this.experiences.map((experience) => ({
        kind: 'experience' as const,
        id: experience.id,
        row: this.row(monthIndex(experience.start)),
        experience,
      })),
      ...milestones
        .filter((item) => item.position === 'end')
        .map((milestone) => ({
          kind: 'milestone' as const,
          id: milestone.id,
          // Graduation month is not in the sources: shown right after the last finished chapter.
          row: Math.min(this.row(lastEnd) + 1, this.todayRow),
          milestone,
        })),
    ];
    // Chronological order; the start milestone stays first, graduation last.
    items.sort((a, b) => a.row - b.row || (a.kind === 'milestone' ? -1 : 1));
    return items.map((item, index) => {
      const projectId = item.experience?.relatedProjectId ?? item.milestone?.relatedProjectId;
      return {
        ...item,
        number: index + 1,
        project: projectId ? this.projectsService.getById(projectId) : undefined,
      };
    });
  })();

  /** EMSI phases drawn as labelled segments of the academic rail. */
  readonly railPhases = this.phases.map((phase) => ({
    id: phase.id,
    label: phase.railLabel,
    rowStart: this.row(monthIndex(phase.start)),
    rowEnd: Math.min(this.row(monthIndex(phase.end)), this.todayRow) + 1,
  }));

  readonly totalRows = Math.max(this.todayRow, ...this.chapters.map((chapter) => chapter.row));

  readonly segments: Segment[] = (() => {
    const laneEnds: number[] = [];
    return this.experiences.map((entry) => {
      const start = monthIndex(entry.start);
      const end = entry.end ? monthIndex(entry.end) : this.nowMonth;
      let lane = laneEnds.findIndex((laneEnd) => start > laneEnd);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = end;
      return {
        id: entry.id,
        number: this.chapters.find((chapter) => chapter.id === entry.id)!.number,
        rowStart: this.row(start),
        rowEnd: this.row(end) + 1,
        column: 3 + Math.min(lane, 1),
        ongoing: !entry.end,
      };
    });
  })();

  readonly years = (() => {
    const first = this.axisStart / 12;
    const last = Math.floor((this.axisStart + this.totalRows - 1) / 12);
    return Array.from({ length: last - first + 1 }, (_, i) => ({
      year: first + i,
      row: this.row((first + i) * 12),
    }));
  })();

  readonly gridRows = `repeat(${this.totalRows}, minmax(0.45rem, auto))`;

  readonly languageNote = computed(() =>
    this.localeService.locale() === 'fr'
      ? 'Ce portfolio est rédigé en français et en anglais.'
      : 'This portfolio is written in French and English.',
  );

  private frame?: number;
  private browserInitialized = false;
  private readonly updateProgress = (): void => {
    if (this.frame !== undefined) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = undefined;
      const story = this.host.nativeElement.querySelector('.story') as HTMLElement | null;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      // Fill follows a reading line at 60% of the viewport height.
      const passed = window.innerHeight * 0.6 - rect.top;
      this.timelineProgress.set(Math.max(0, Math.min(1, passed / rect.height)));
    });
  };

  constructor() {
    afterNextRender(() => {
      this.browserInitialized = true;
      window.addEventListener('scroll', this.updateProgress, { passive: true });
      window.addEventListener('resize', this.updateProgress, { passive: true });
      this.updateProgress();
    });
  }

  text(copy: BilingualText): string {
    return copy[this.localeService.locale()];
  }

  ngOnDestroy(): void {
    if (!this.browserInitialized) return;
    window.removeEventListener('scroll', this.updateProgress);
    window.removeEventListener('resize', this.updateProgress);
    if (this.frame !== undefined) window.cancelAnimationFrame(this.frame);
  }
}
