# Portfolio — Hamza El Rhadiouini

Site bilingue FR/EN, prérendu en HTML statique et publié sur GitHub Pages :
**https://elghad.github.io/hamza-elrhadiouini-portfolio/**

- Angular 21 (composants standalone, signals, `@if`/`@for`, `@defer`), SCSS, TypeScript strict.
- Pré-rendu statique (`@angular/ssr`, `outputMode: static`) : chaque page `/fr/…` et `/en/…` est un vrai fichier HTML complet, lisible par les moteurs de recherche sans exécuter de JavaScript.
- Aucun backend : le formulaire de contact passe par EmailJS.

---

## Démarrer en local

Prérequis : Node 22+ (la CI utilise Node 24).

```bash
npm ci
npm start            # http://localhost:4200/fr
npm test             # tests unitaires (Vitest)
npm run build        # build de production + audit (voir « Garde-fous »)
```

`npm start`, `npm test` et `npm run build` génèrent d'abord deux fichiers ignorés par Git :
`src/environments/environment.ts` (identifiants EmailJS, vides par défaut) et
`src/environments/build-info.ts` (date de build affichée dans le footer).

Pour prévisualiser le build exact servi en production, servez `dist/portfolio/browser/`
sous le chemin `/hamza-elrhadiouini-portfolio/` (le `base href` de production).

---

## Modifier le contenu (sans toucher aux composants)

Tout le contenu est dans `src/app/core/data/*.data.ts`, typé par `src/app/core/models/*.model.ts`.
Chaque texte affiché existe en deux langues : `{ fr: '…', en: '…' }`.

| Je veux changer… | Fichier |
|---|---|
| Identité, e-mail, liens, CV | `profile.data.ts` |
| Contenu de l'accueil (services courts, projets phares, chiffres) | `home.data.ts` |
| Les 6 services détaillés | `services.data.ts` |
| Projets (liste et pages détail) | `projects.data.ts` |
| Expériences / formation / langues | `experience.data.ts`, `education.data.ts`, `languages.data.ts` |
| Compétences et leurs preuves (`evidence`) | `skills.data.ts` |
| Certificats | `certifications.data.ts` |
| Témoignages | `testimonials.data.ts` |
| Titres et descriptions des pages (SEO) | `seo.data.ts` |

### Règle des statuts

Chaque fait porte un `status` :

- `'verified'` : affiché ;
- `'pending'` : en attente de preuve, **jamais affiché** ;
- `'private'` : jamais affiché ni lié.

Une donnée manquante s'écrit `TODO(hamza): …` dans les fichiers de données : elle n'est jamais
rendue, et `npm run content:report` la liste.

### Cas fréquents

- **Ajouter les CV** : déposez `public/cv/Hamza_ElRhadiouini_CV_FR.pdf` et `…_CV_EN.pdf`,
  puis dans `profile.data.ts` remplacez les `TODO` de `cvFr` / `cvEn` par le chemin
  (`cv/Hamza_ElRhadiouini_CV_FR.pdf`) et passez `status` à `'verified'`.
- **Afficher un lien GitHub de projet** : dans `projects.data.ts`, `links.repo` n'est affiché que si
  `repoPublic: true` **et** `linkApproved: true`, et le dépôt doit figurer dans
  `scripts/approved-repositories.json`.
- **Publier un témoignage** : copiez le gabarit commenté de `testimonials.data.ts`, collez le texte
  **mot pour mot** avec sa langue (`quote.lang`), et mettez `publicationAuthorized: true` seulement
  avec l'accord écrit de l'auteur. La section apparaît d'elle-même sur l'accueil.
- **Ajouter une photo** : `public/images/hamza.jpg` (sinon avatar « HE »).

---

## Formulaire de contact (EmailJS)

Les identifiants ne sont **jamais** dans le code. Ils sont lus depuis `src/environments/environment.ts`,
généré par `scripts/write-emailjs-env.mjs` à partir de trois variables :
`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`.

- **En local** (facultatif) : définissez les variables puis `npm run env:emailjs`.
  Sans elles, le formulaire propose un lien `mailto:` pré-rempli.
- **En production** : dépôt GitHub → *Settings → Secrets and variables → Actions* → ajoutez les trois
  valeurs (en *Variables* ou en *Secrets*). Le déploiement échoue volontairement s'il en manque une.
- Le modèle EmailJS doit utiliser `{{name}}`, `{{email}}` et `{{message}}`.
- La clé publique est visible dans le navigateur (c'est normal pour EmailJS) : dans le tableau de
  bord EmailJS, limitez les origines autorisées à `https://elghad.github.io`.

Protections intégrées : champ piège (honeypot), délai minimal avant envoi, un envoi par session,
limitation EmailJS (60 s), blocage des navigateurs headless.

---

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` :

1. `npm ci`
2. génération de l'environnement EmailJS ;
3. `npm run check:content` (garde-fous de contenu) ;
4. `npm run generate:images` (image Open Graph et icônes, via le Chrome du runner) ;
5. `npm run build` → pré-rendu de toutes les pages, puis `postbuild` : `404.html`, `sitemap.xml`,
   `robots.txt`, `.nojekyll` et audit de chaque page ;
6. publication sur GitHub Pages.

Les autres branches et les pull requests passent par `build.yml` (vérification sans déploiement).

---

## Garde-fous

| Commande | Rôle |
|---|---|
| `npm run check:content` | Échoue si : vocabulaire interdit, mentions ALTEN internes, « 5 microservices », « Azure OpenAI », WebSockets associé au Copilot, lien vers un dépôt non approuvé ou privé, CV référencé absent de `public/cv/`, image sans `alt`, motif de secret, identifiant EmailJS écrit en dur, témoignage `verified` sans autorisation. |
| `npm run content:report` | Liste les `TODO(hamza)`, éléments en attente et liens non approuvés. |
| `postbuild` (automatique) | Vérifie dans le HTML final : un seul `<h1>`, meta description, `canonical`, JSON-LD, attribut `lang`, aucun `TODO(hamza)` rendu, `noindex` sur la 404. |

---

## SEO

- Titre, description, `canonical`, `hreflang` (fr, en, x-default), Open Graph, Twitter Cards et
  JSON-LD (`Person`, `WebSite`, `WebPage`/`ProfilePage`) sont posés par `core/services/seo.service.ts`
  pendant le pré-rendu.
- Images de partage : `public/og/og-fr.png` et `og-en.png` (1200×630), régénérées par
  `npm run generate:images` (modifiez le texte dans `scripts/generate-images.mjs`).
- `SITE_URL` est défini dans `src/app/core/config/site.config.ts`.

### Soumettre le sitemap à Google

Sur un site GitHub Pages *de projet*, `robots.txt` n'est pas lu (il doit être à la racine du domaine,
`elghad.github.io`). Le sitemap se soumet donc directement :

1. Ouvrez [Google Search Console](https://search.google.com/search-console) → *Ajouter une propriété*
   → **Préfixe de l'URL** → `https://elghad.github.io/hamza-elrhadiouini-portfolio/`.
2. Validez la propriété par **balise HTML** : ajoutez la balise `<meta name="google-site-verification" …>`
   fournie dans `<head>` de `src/index.html`, déployez, puis cliquez sur *Valider*.
3. Menu *Sitemaps* → saisissez `sitemap.xml` → *Envoyer*.
4. *Inspection d'URL* sur `/fr/` et `/en/` → *Demander une indexation*.

---

## Architecture (pourquoi ces choix)

- **Routes `/fr/…` et `/en/…`, i18n maison par signals** (`locale.service.ts`) : une seule build pour
  les deux langues, au lieu de l'i18n native d'Angular qui produit une build par langue.
  La racine `/` redirige selon la langue du navigateur.
- **Pré-rendu plutôt que rendu serveur** : GitHub Pages ne sert que des fichiers statiques ; le
  pré-rendu donne le même bénéfice SEO sans serveur. Code compatible SSR : aucun accès à `window`
  ou `localStorage` hors `isPlatformBrowser` / `afterNextRender`.
- **Contenu séparé des composants** : les données sont typées et filtrées par `status`, ce qui rend
  impossible l'affichage accidentel d'un fait non vérifié.
- **`@defer`** pour les blocs lourds sous la ligne de flottaison (formulaire de l'accueil, liste des
  certificats) et import du SDK EmailJS uniquement au moment de l'envoi.
- **Polices auto-hébergées** (Inter, JetBrains Mono, sous-ensemble latin) préchargées depuis
  `index.html` : elles arrivent avant le premier rendu, ce qui évite des remises en page coûteuses.
- **Animations** : CSS + `IntersectionObserver` (directive `appReveal`), toutes désactivées avec
  `prefers-reduced-motion`.

```
src/app/
  core/config/     site.config.ts (SITE_URL)
  core/data/       contenu bilingue (*.data.ts)
  core/models/     types (*.model.ts)
  core/services/   locale, seo, theme, email, …
  features/        une page par dossier (home, services, projects, experience, skills,
                   certifications, contact, not-found)
  shared/          header, footer, contact-form, testimonials, project-card, directives…
scripts/           check-content, postbuild, generate-images, write-*-env
public/            favicon, icônes, manifest, og/, cv/, images/
```
