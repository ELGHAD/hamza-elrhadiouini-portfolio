import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Hamza Elrhadiouini — Backend Engineer & AI Systems Builder'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About — Hamza Elrhadiouini'
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Skills — Hamza Elrhadiouini'
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects — Hamza Elrhadiouini'
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./features/projects/project-detail/project-detail.component').then(
        m => m.ProjectDetailComponent
      ),
    title: 'Project Details — Hamza Elrhadiouini'
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience.component').then(m => m.ExperienceComponent),
    title: 'Experience — Hamza Elrhadiouini'
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./features/education/education.component').then(m => m.EducationComponent),
    title: 'Education — Hamza Elrhadiouini'
  },
  {
    path: 'certifications',
    loadComponent: () =>
      import('./features/certifications/certifications.component').then(
        m => m.CertificationsComponent
      ),
    title: 'Certifications — Hamza Elrhadiouini'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Hamza Elrhadiouini'
  },
  {
    path: '**',
    redirectTo: ''
  }
];