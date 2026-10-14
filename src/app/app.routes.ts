import { Routes } from '@angular/router';
import { LocaleRedirectComponent } from './shared/components/locale-redirect/locale-redirect';

// Titles and meta tags are set by SeoService from `data.seo` (see core/data/seo.data.ts).
// `seoPath` is the path after the locale, used for canonical and hreflang URLs.
const notFound = () => import('./features/not-found/not-found').then((m) => m.NotFoundComponent);

const localizedRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.HomeComponent),
    data: { seo: 'home', seoPath: '' },
  },
  { path: 'about', pathMatch: 'full', redirectTo: '' },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services').then((m) => m.ServicesComponent),
    data: { seo: 'services', seoPath: 'services' },
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills').then((m) => m.SkillsComponent),
    data: { seo: 'skills', seoPath: 'skills' },
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects').then((m) => m.ProjectsComponent),
    data: { seo: 'projects', seoPath: 'projects' },
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then(
        (m) => m.ProjectDetailComponent,
      ),
    data: { seo: 'project' },
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience').then((m) => m.ExperienceComponent),
    data: { seo: 'experience', seoPath: 'experience' },
  },
  { path: 'education', pathMatch: 'full', redirectTo: 'experience' },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications').then((m) => m.CertificationsComponent),
    data: { seo: 'certifications', seoPath: 'certifications' },
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.ContactComponent),
    data: { seo: 'contact', seoPath: 'contact' },
  },
  // Prerendered once and copied to /404.html, which GitHub Pages serves for unknown URLs.
  { path: '404', loadComponent: notFound, data: { seo: 'not-found' } },
  { path: '**', loadComponent: notFound, data: { seo: 'not-found' } },
];

export const routes: Routes = [
  { path: 'fr', children: localizedRoutes },
  { path: 'en', children: localizedRoutes },
  { path: '', pathMatch: 'full', component: LocaleRedirectComponent },
  { path: '**', loadComponent: notFound, data: { seo: 'not-found' } },
];
