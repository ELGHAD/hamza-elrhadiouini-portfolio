import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '../config/site.config';
import { PROFILE } from '../data/profile.data';
import { PROJECTS } from '../data/projects.data';
import { SEO_PAGES } from '../data/seo.data';
import { Locale } from '../models/content.model';
import { SeoPageKey } from '../models/seo.model';

interface PageSeo {
  title: string;
  description: string;
  /** Path after the locale, e.g. 'services' or 'projects/ebank'. Empty for the home page. */
  path: string;
  indexable: boolean;
}

/**
 * Single source of truth for <head>: title, description, canonical, hreflang,
 * Open Graph, Twitter Cards and JSON-LD. Runs during prerendering, so every
 * static HTML file ships with complete metadata (crawlers do not need to run JS).
 * Only DOCUMENT is touched (never window), which keeps it SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.update(event.urlAfterRedirects));
  }

  private update(url: string): void {
    const cleanUrl = url.split(/[?#]/, 1)[0];
    const localeSegment = cleanUrl.split('/').filter(Boolean)[0];

    // The language chooser at '/': no locale yet, points crawlers to both versions.
    if (localeSegment !== 'fr' && localeSegment !== 'en' && this.leafKey() !== 'not-found') {
      this.apply(
        'fr',
        {
          title: `${SITE_NAME} — Portfolio`,
          description:
            'Portfolio de Hamza El Rhadiouini, ingénieur logiciel Full-Stack & IA. Version française / English version.',
          path: '',
          indexable: true,
        },
        true,
      );
      return;
    }

    const locale: Locale = localeSegment === 'en' ? 'en' : 'fr';
    this.apply(locale, this.pageSeo(locale));
  }

  private pageSeo(locale: Locale): PageSeo {
    const leaf = this.leafSnapshot();
    const key = leaf.data['seo'] as SeoPageKey | 'project' | undefined;

    if (key === 'project') {
      const id = leaf.paramMap.get('id');
      const project = PROJECTS.find((item) => item.id === id && item.status === 'verified');
      if (project) {
        return {
          title: `${project.title[locale]} — ${locale === 'fr' ? 'Projet' : 'Project'} | ${SITE_NAME}`,
          description: this.truncate(project.summary[locale]),
          path: `projects/${project.id}`,
          indexable: true,
        };
      }
    }

    const pageKey: SeoPageKey = key && key !== 'project' ? key : 'not-found';
    const page = SEO_PAGES[pageKey];
    return {
      title: page.title[locale],
      description: page.description[locale],
      path: leaf.data['seoPath'] ?? '',
      indexable: pageKey !== 'not-found',
    };
  }

  private apply(locale: Locale, page: PageSeo, isLanguageChooser = false): void {
    const canonical = isLanguageChooser ? `${SITE_URL}/` : this.absoluteUrl(locale, page.path);
    const image = `${SITE_URL}/${OG_IMAGE[locale]}`;

    this.title.setTitle(page.title);
    this.setName('description', page.description);
    this.setName('robots', page.indexable ? 'index, follow' : 'noindex, follow');

    this.setProperty('og:type', 'website');
    this.setProperty('og:site_name', SITE_NAME);
    this.setProperty('og:title', page.title);
    this.setProperty('og:description', page.description);
    this.setProperty('og:url', canonical);
    this.setProperty('og:image', image);
    this.setProperty('og:image:width', String(OG_IMAGE.width));
    this.setProperty('og:image:height', String(OG_IMAGE.height));
    this.setProperty(
      'og:image:alt',
      locale === 'fr'
        ? 'Hamza El Rhadiouini, ingénieur logiciel Full-Stack et IA'
        : 'Hamza El Rhadiouini, full-stack and AI software engineer',
    );
    this.setProperty('og:locale', locale === 'fr' ? 'fr_FR' : 'en_US');
    this.setProperty('og:locale:alternate', locale === 'fr' ? 'en_US' : 'fr_FR');

    this.setName('twitter:card', 'summary_large_image');
    this.setName('twitter:title', page.title);
    this.setName('twitter:description', page.description);
    this.setName('twitter:image', image);

    this.setLinks(canonical, page, isLanguageChooser);
    this.setJsonLd(locale, page, canonical);
  }

  /** canonical + hreflang alternates. Not-found pages get neither. */
  private setLinks(canonical: string, page: PageSeo, isLanguageChooser: boolean): void {
    this.document.head
      .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());
    if (!page.indexable) return;

    this.addLink({ rel: 'canonical', href: canonical });
    this.addLink({ rel: 'alternate', hreflang: 'fr', href: this.absoluteUrl('fr', page.path) });
    this.addLink({ rel: 'alternate', hreflang: 'en', href: this.absoluteUrl('en', page.path) });
    this.addLink({
      rel: 'alternate',
      hreflang: 'x-default',
      href: isLanguageChooser || page.path === '' ? `${SITE_URL}/` : this.absoluteUrl('fr', page.path),
    });
  }

  private setJsonLd(locale: Locale, page: PageSeo, canonical: string): void {
    const personId = `${SITE_URL}/#person`;
    const person = {
      '@type': 'Person',
      '@id': personId,
      name: SITE_NAME,
      jobTitle:
        locale === 'fr'
          ? 'Ingénieur logiciel Full-Stack & IA'
          : 'Full-Stack & AI Software Engineer',
      url: `${SITE_URL}/`,
      email: `mailto:${PROFILE.email.fr}`,
      sameAs: [PROFILE.github.fr, PROFILE.linkedin.fr],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'EMSI Rabat' },
      knowsLanguage: ['fr', 'ar', 'en'],
      knowsAbout: ['Java', 'Spring Boot', 'Angular', 'React', 'FastAPI', 'RAG', 'Docker'],
    };
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        person,
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          inLanguage: ['fr', 'en'],
          author: { '@id': personId },
        },
        {
          '@type': page.path === '' ? 'ProfilePage' : 'WebPage',
          url: canonical,
          name: page.title,
          description: page.description,
          inLanguage: locale,
          isPartOf: { '@id': `${SITE_URL}/#website` },
          ...(page.path === '' ? { mainEntity: { '@id': personId } } : { about: { '@id': personId } }),
        },
      ],
    };

    let script = this.document.head.querySelector<HTMLScriptElement>('script#structured-data');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    // '<' escaped so the JSON can never close the <script> tag.
    script.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
  }

  private leafSnapshot(): ActivatedRouteSnapshot {
    let snapshot = this.router.routerState.snapshot.root;
    while (snapshot.firstChild) snapshot = snapshot.firstChild;
    return snapshot;
  }

  private leafKey(): string | undefined {
    return this.leafSnapshot().data['seo'];
  }

  /** Trailing slash matches how GitHub Pages serves prerendered folders (no redirect hop). */
  private absoluteUrl(locale: Locale, path: string): string {
    return `${SITE_URL}/${locale}/${path ? `${path}/` : ''}`;
  }

  private truncate(text: string, max = 160): string {
    if (text.length <= max) return text;
    return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content }, `name="${name}"`);
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property="${property}"`);
  }

  private addLink(attributes: Record<string, string>): void {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) link.setAttribute(name, value);
    this.document.head.appendChild(link);
  }
}
