import {
  afterRenderEffect,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { Skill, SkillCategoryId } from '../../core/models/skill.model';
import { SkillsService } from '../../core/services/skills.service';
import { LocaleService } from '../../core/services/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

/** One line-icon family (24×24 grid, round 1.6 stroke), one icon per category. */
const CATEGORY_ICONS: Record<SkillCategoryId, string[]> = {
  languages: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  'backend-api': ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01', 'M8 17h.01', 'M12 7h4', 'M12 17h4'],
  'frontend-mobile': ['M2 5h13v10H2z', 'M5.5 19h6', 'M8.5 15v4', 'M18 8h4v12h-4z', 'M20 17h.01'],
  'ai-data': [
    'M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z',
    'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  ],
  'databases-cms': [
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z',
    'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6',
    'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  ],
  'devops-tools': ['M12 2l9 5v10l-9 5-9-5V7z', 'M3 7l9 5 9-5', 'M12 12v10'],
  'architecture-methods': ['M12 2l10 5-10 5L2 7z', 'M2 12l10 5 10-5', 'M2 17l10 5 10-5'],
  security: ['M12 3l8 3v6c0 4.8-3.4 8-8 9-4.6-1-8-4.2-8-9V6z', 'M9 12l2 2 4-4'],
  testing: ['M9 3h6', 'M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3', 'M7 15h10'],
  'methods-tools': ['M4 6h16', 'M4 12h10', 'M4 18h7', 'M17 15l2 2 3-4'],
};

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  private readonly skillsService = inject(SkillsService);
  readonly localeService = inject(LocaleService);
  readonly categories = this.skillsService.getCategories();
  readonly activeCategory = signal<SkillCategoryId | 'all'>('all');
  readonly searchTerm = signal('');
  readonly allSkills = this.skillsService.getAll();
  /** Skill hovered, focused or tapped: its evidence shows in its category's panel. */
  readonly activeSkill = signal<Skill | null>(null);
  /** Rendered card heights (px) by category, measured in the browser; null during SSR. */
  private readonly cardHeights = signal<Partial<Record<SkillCategoryId, number>> | null>(null);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  /** Matches the stylesheet breakpoint where the categories stack in one column. */
  private readonly singleColumn = signal(false);

  constructor() {
    // Re-measure after each render that changes the visible skills, and on resize: both
    // columns share one width, so a card's height does not depend on the column it lands in.
    afterRenderEffect(() => {
      this.visibleSkills();
      this.measureCards();
    });
    const onResize = () => this.measureCards();
    if (typeof window !== 'undefined') {
      const narrow = window.matchMedia('(max-width: 700px)');
      const onBreakpoint = () => this.singleColumn.set(narrow.matches);
      onBreakpoint();
      narrow.addEventListener('change', onBreakpoint);
      window.addEventListener('resize', onResize, { passive: true });
      inject(DestroyRef).onDestroy(() => {
        narrow.removeEventListener('change', onBreakpoint);
        window.removeEventListener('resize', onResize);
      });
    }
  }

  readonly visibleSkills = computed(() => {
    const category = this.activeCategory();
    const query = this.searchTerm().trim().toLocaleLowerCase(this.localeService.locale());
    return this.allSkills.filter((skill) => {
      if (category !== 'all' && skill.category !== category) return false;
      return (
        !query ||
        `${this.skillName(skill)} ${skill.name} ${this.evidenceText(skill)}`
          .toLocaleLowerCase(this.localeService.locale())
          .includes(query)
      );
    });
  });

  readonly visibleByCategory = computed(
    () =>
      Object.fromEntries(
        this.categories.map((category) => [
          category.id,
          this.visibleSkills().filter((skill) => skill.category === category.id),
        ]),
      ) as Record<SkillCategoryId, Skill[]>,
  );

  /**
   * Visible categories in two columns. On wide screens each card goes, in order, to the
   * column that is currently shorter (measured heights in the browser, estimates during SSR),
   * so both columns end close together; the last card of each column stretches (CSS) to close
   * the remaining gap. On narrow screens a single column keeps the strict 01→N order.
   */
  readonly columns = computed(() => {
    const visible = this.categories
      .map((category, index) => ({ category, index, skills: this.visibleByCategory()[category.id] }))
      .filter((entry) => entry.skills.length);
    if (visible.length < 2 || this.singleColumn()) return [visible];

    const measured = this.cardHeights();
    const weight = (entry: (typeof visible)[number]) =>
      measured?.[entry.category.id] ?? this.estimateHeight(entry.skills);
    const columns: (typeof visible)[] = [[], []];
    const heights = [0, 0];
    for (const entry of visible) {
      const target = heights[0] <= heights[1] ? 0 : 1;
      columns[target].push(entry);
      heights[target] += weight(entry);
    }
    return columns;
  });

  /** SSR fallback: header and evidence panel plus chip rows, from the chips' text length. */
  private estimateHeight(skills: Skill[]): number {
    const rowCapacity = 70; // characters of chip text (incl. padding) that fit on one row
    let rows = 1;
    let used = 0;
    for (const skill of skills) {
      const width = this.skillName(skill).length + 6;
      if (used + width > rowCapacity) {
        rows++;
        used = 0;
      }
      used += width;
    }
    return 150 + rows * 46;
  }

  private measureCards(): void {
    const container = this.host.querySelector<HTMLElement>('.skills-categories');
    if (!container) return;
    container.classList.add('is-measuring');
    const next: Partial<Record<SkillCategoryId, number>> = {};
    container.querySelectorAll<HTMLElement>('[data-category]').forEach((card) => {
      next[card.dataset['category'] as SkillCategoryId] = card.offsetHeight;
    });
    container.classList.remove('is-measuring');

    const previous = this.cardHeights();
    const changed =
      !previous ||
      (Object.keys(next) as SkillCategoryId[]).some(
        (id) => Math.abs((previous[id] ?? 0) - (next[id] ?? 0)) > 4,
      );
    if (changed) this.cardHeights.set(next);
  }

  iconPaths(category: SkillCategoryId): string[] {
    return CATEGORY_ICONS[category];
  }

  skillName(skill: Skill): string {
    return skill.localizedName?.[this.localeService.locale()] ?? skill.name;
  }

  evidenceText(skill: Skill): string {
    return skill.evidence.map((item) => item[this.localeService.locale()]).join(' · ');
  }

  evidenceHint(): string {
    return this.localeService.locale() === 'fr'
      ? 'Survolez ou sélectionnez une technologie pour voir où je l’ai utilisée.'
      : 'Hover or select a technology to see where I used it.';
  }

  countLabel(skills: Skill[]): string {
    const french = this.localeService.locale() === 'fr';
    const plural = skills.length > 1;
    return `${skills.length} ${french ? (plural ? 'technos' : 'techno') : plural ? 'tools' : 'tool'}`;
  }

  /** Only clears when the chip losing hover/focus is still the active one. */
  clearActive(skill: Skill): void {
    if (this.activeSkill()?.id === skill.id) this.activeSkill.set(null);
  }

  resetFilters(): void {
    this.activeCategory.set('all');
    this.searchTerm.set('');
  }
}
