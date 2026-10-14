import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  SERVICE_ECOSYSTEMS,
  SERVICE_MILESTONES,
  SERVICE_STEPS,
  SERVICES,
} from '../../core/data/services.data';
import { PROJECTS } from '../../core/data/projects.data';
import { SKILLS } from '../../core/data/skills.data';
import { certificationsCount } from '../../core/data/certifications.data';
import { ServiceIcon } from '../../core/models/service.model';
import { LocaleService } from '../../core/services/locale.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import {
  siCplusplus,
  siDotnet,
  siFlutter,
  siOpenjdk,
  siPhp,
  siPython,
  siTypescript,
} from 'simple-icons';

/** Logo of each language ecosystem (Simple Icons, drawn in the accent colour). */
const ECOSYSTEM_LOGOS: Record<string, string> = {
  java: siOpenjdk.path,
  python: siPython.path,
  typescript: siTypescript.path,
  php: siPhp.path,
  dotnet: siDotnet.path,
  mobile: siFlutter.path,
  systems: siCplusplus.path,
};

/** Line icons, same 24×24 family as the skills page. */
const SERVICE_ICONS: Record<ServiceIcon, string[]> = {
  server: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01', 'M8 17h.01', 'M12 7h4', 'M12 17h4'],
  layout: ['M3 4h18v16H3z', 'M3 9h18', 'M9 9v11'],
  sparkles: [
    'M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z',
    'M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z',
  ],
  eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z', 'M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6z'],
  edit: ['M4 20h4L19 9l-4-4L4 16z', 'M13.5 6.5l4 4'],
  phone: ['M7 2h10v20H7z', 'M11 18h2'],
  cloud: ['M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.3 9.5 4.3 4.3 0 0 0 7 18z'],
  workflow: ['M4 4h6v6H4z', 'M14 14h6v6h-6z', 'M10 7h4a3 3 0 0 1 3 3v4'],
};

@Component({
  selector: 'app-services',
  imports: [RouterLink, RevealDirective, SpotlightDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  readonly localeService = inject(LocaleService);
  readonly services = SERVICES.filter((service) => service.status === 'verified');
  readonly milestones = SERVICE_MILESTONES;
  readonly steps = SERVICE_STEPS;

  private readonly projects = PROJECTS.filter((project) => project.status === 'verified');

  readonly ecosystems = SERVICE_ECOSYSTEMS.map((ecosystem) => ({
    ...ecosystem,
    logo: ECOSYSTEM_LOGOS[ecosystem.id],
  }));

  /** Every figure is counted from the data files. */
  readonly stats = [
    { value: this.projects.length, label: { fr: 'projets documentés', en: 'documented projects' } },
    { value: SERVICE_ECOSYSTEMS.length, label: { fr: 'écosystèmes de langages', en: 'language ecosystems' } },
    {
      value: SKILLS.filter((skill) => skill.category === 'languages' && !skill.trainingOnly).length,
      label: { fr: 'langages utilisés en projet', en: 'languages used in projects' },
    },
    { value: certificationsCount, label: { fr: 'certificats', en: 'certificates' } },
  ];

  iconPaths(icon: ServiceIcon): string[] {
    return SERVICE_ICONS[icon];
  }
}
