import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './core/data/projects.data';

// Only verified projects get a page; anything else falls through to the 404 page.
const projectParams = async () =>
  PROJECTS.filter(({ status }) => status === 'verified').map(({ id }) => ({ id }));

export const serverRoutes: ServerRoute[] = [
  { path: 'fr/projects/:id', renderMode: RenderMode.Prerender, getPrerenderParams: projectParams },
  { path: 'en/projects/:id', renderMode: RenderMode.Prerender, getPrerenderParams: projectParams },
  // Wildcard app routes are skipped by the prerenderer; GitHub Pages serves 404.html for them.
  { path: '**', renderMode: RenderMode.Prerender },
];
