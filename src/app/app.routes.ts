import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.HomeComponent),
    title: 'Hamza Elrhadiouini — Backend Engineer & AI Systems Builder'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.AboutComponent),
    title: 'About — Hamza Elrhadiouini'
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills').then(m => m.SkillsComponent),
    title: 'Skills — Hamza Elrhadiouini'
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then(m => m.ProjectsComponent),
    title: 'Projects — Hamza Elrhadiouini'
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail').then(
        m => m.ProjectDetailComponent
      ),
    title: 'Project Details — Hamza Elrhadiouini'
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience').then(m => m.ExperienceComponent),
    title: 'Experience — Hamza Elrhadiouini'
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./features/education/education').then(m => m.{
  path: 'education',
  loadComponent: () =>
    import('./features/education/education').then(m => m.EducationComponent),
  title: 'Education — Hamza Elrhadiouini'
},),
    title: 'Education — Hamza Elrhadiouini'
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications').then(
        m => m.Certifications
      ),
    title: 'Certifications — Hamza Elrhadiouini'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact — Hamza Elrhadiouini'
  },
  {
    path: '**',
    redirectTo: ''
  }
];