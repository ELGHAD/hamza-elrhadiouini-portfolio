import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { SITE_URL } from '../config/site.config';
import { SeoService } from './seo.service';

@Component({ template: '' })
class BlankComponent {}

describe('SeoService', () => {
  let router: Router;
  let document: Document;

  const meta = (selector: string) =>
    document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`)?.content;
  const link = (selector: string) =>
    document.head.querySelector<HTMLLinkElement>(`link[${selector}]`)?.getAttribute('href');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'fr',
            children: [
              { path: 'services', component: BlankComponent, data: { seo: 'services', seoPath: 'services' } },
              { path: 'projects/:id', component: BlankComponent, data: { seo: 'project' } },
              { path: '**', component: BlankComponent, data: { seo: 'not-found' } },
            ],
          },
          {
            path: 'en',
            children: [
              { path: 'services', component: BlankComponent, data: { seo: 'services', seoPath: 'services' } },
            ],
          },
        ]),
      ],
    });
    TestBed.inject(SeoService).init();
    router = TestBed.inject(Router);
    document = TestBed.inject(DOCUMENT);
  });

  it('sets title, description, canonical and hreflang for a page', async () => {
    await router.navigateByUrl('/en/services');
    expect(document.title).toContain('Services');
    expect(meta('name="description"')?.length).toBeGreaterThan(50);
    expect(link('rel="canonical"')).toBe(`${SITE_URL}/en/services/`);
    expect(link('hreflang="fr"')).toBe(`${SITE_URL}/fr/services/`);
    expect(link('hreflang="en"')).toBe(`${SITE_URL}/en/services/`);
    expect(meta('property="og:locale"')).toBe('en_US');
    expect(meta('property="og:image"')).toBe(`${SITE_URL}/og/og-en.png`);
  });

  it('builds project metadata from the project data', async () => {
    await router.navigateByUrl('/fr/projects/ebank');
    expect(document.title).toContain('eBank');
    expect(link('rel="canonical"')).toBe(`${SITE_URL}/fr/projects/ebank/`);
    const jsonLd = JSON.parse(document.getElementById('structured-data')?.textContent ?? '{}');
    expect(jsonLd['@graph'][0]).toMatchObject({ '@type': 'Person', name: 'Hamza El Rhadiouini' });
  });

  it('marks unknown pages noindex and drops canonical links', async () => {
    await router.navigateByUrl('/fr/services');
    await router.navigateByUrl('/fr/does-not-exist');
    expect(meta('name="robots"')).toBe('noindex, follow');
    expect(link('rel="canonical"')).toBeUndefined();
  });

  it('treats an unknown project slug as not found', async () => {
    await router.navigateByUrl('/fr/projects/unknown-slug');
    expect(meta('name="robots"')).toBe('noindex, follow');
  });
});
