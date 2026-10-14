// Runs after `ng build` (npm "postbuild" hook) on the static output:
//  1. turns the prerendered /fr/404 page into /404.html (served by GitHub Pages for unknown URLs);
//  2. writes sitemap.xml (with hreflang alternates), robots.txt and .nojekyll;
//  3. audits every prerendered page and fails the build on a publishing error.
import { cp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'dist', 'portfolio', 'browser');
const siteConfig = await readFile(join(root, 'src/app/core/config/site.config.ts'), 'utf8');
const SITE_URL = siteConfig.match(/SITE_URL = '([^']+)'/)?.[1];
if (!SITE_URL) throw new Error('SITE_URL not found in site.config.ts');

async function htmlPages(directory) {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...(await htmlPages(path)));
    else if (entry.name === 'index.html') pages.push(path);
  }
  return pages;
}

/** '/fr/services/' style route for an index.html file. */
const routeOf = (file) => {
  const folder = relative(outDir, file).replaceAll('\\', '/').replace(/index\.html$/, '');
  return `/${folder}`;
};

async function main() {
  await stat(outDir);

  // 1. 404 page
  const notFoundSource = join(outDir, 'fr', '404', 'index.html');
  await cp(notFoundSource, join(outDir, '404.html'));
  await rm(join(outDir, 'fr', '404'), { recursive: true, force: true });
  await rm(join(outDir, 'en', '404'), { recursive: true, force: true });

  // 3. audit (before writing anything else)
  const failures = [];
  const pages = await htmlPages(outDir);
  const indexable = [];
  let redirects = 0;
  for (const file of [...pages, join(outDir, '404.html')]) {
    const html = await readFile(file, 'utf8');
    const route = file.endsWith('404.html') ? '/404.html' : routeOf(file);

    // Legacy URLs (/about, /education) are prerendered as meta-refresh stubs: keep them out of
    // the index and point search engines at their target.
    const refreshTarget = html.match(/http-equiv="refresh" content="0; url=([^"]+)"/)?.[1];
    if (refreshTarget) {
      const basePath = new URL(SITE_URL).pathname;
      const target = `${SITE_URL}${refreshTarget.slice(basePath.length).replace(/\/?$/, '/')}`;
      await writeFile(
        file,
        html.replace(
          '</head>',
          `  <meta name="robots" content="noindex">\n    <link rel="canonical" href="${target}">\n  </head>`,
        ),
      );
      redirects += 1;
      continue;
    }

    const isNotFound = route === '/404.html';
    const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1Count !== 1) failures.push(`${route}: ${h1Count} <h1> (1 attendu)`);
    if (!/<meta name="description" content="[^"]{20,}"/.test(html)) failures.push(`${route}: meta description absente`);
    if (/TODO\(hamza\)/.test(html.replace(/<script[^]*?<\/script>/g, ''))) failures.push(`${route}: TODO(hamza) rendu`);
    for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt=/.test(image[0])) failures.push(`${route}: <img> sans alt`);
    }
    if (isNotFound) {
      if (!/<meta name="robots" content="noindex/.test(html)) failures.push(`${route}: noindex absent`);
      continue;
    }
    if (!/<link rel="canonical" href="https:\/\//.test(html)) failures.push(`${route}: canonical absent`);
    if (!/application\/ld\+json/.test(html)) failures.push(`${route}: JSON-LD absent`);
    if (!/<html lang="(fr|en)"/.test(html)) failures.push(`${route}: attribut lang absent`);
    if (/^\/(fr|en)\//.test(route)) indexable.push(route);
  }

  if (failures.length) {
    console.error(`postbuild audit failed (${failures.length} issue(s)):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  // 2. sitemap, robots, .nojekyll
  const today = new Date().toISOString().slice(0, 10);
  const urls = indexable
    .filter((route) => route.startsWith('/fr/'))
    .sort()
    .map((frRoute) => {
      const suffix = frRoute.slice('/fr'.length);
      const alternates = ['fr', 'en']
        .map((locale) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}/${locale}${suffix}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${suffix === '/' ? '/' : `/fr${suffix}`}"/>`)
        .join('\n');
      return ['fr', 'en']
        .map(
          (locale) =>
            `  <url>\n    <loc>${SITE_URL}/${locale}${suffix}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`,
        )
        .join('\n');
    });
  await writeFile(
    join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
  );
  // Note: on a GitHub Pages *project* site, crawlers only read robots.txt at the domain root,
  // so this file is informative. Submit the sitemap in Google Search Console instead.
  await writeFile(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  await writeFile(join(outDir, '.nojekyll'), '');

  console.log(
    `postbuild: ${pages.length - redirects} pages audited, ${redirects} legacy redirects, ${indexable.length} URLs in sitemap.xml, 404.html ready.`,
  );
}

await main();
