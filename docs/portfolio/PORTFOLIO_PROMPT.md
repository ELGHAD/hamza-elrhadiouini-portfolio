# PROMPT MAÎTRE — Refonte du portfolio de Hamza El Rhadiouini

## 1. Rôle et objectif
Tu es un ingénieur front-end senior, directeur artistique web et expert SEO/accessibilité. Tu refonds mon portfolio https://elghad.github.io/hamza-elrhadiouini-portfolio/ (actuellement une SPA Angular rendue côté client, design basique, SEO faible) en un **site multi-pages premium, bilingue FR/EN**, qui vend mes services et mes connaissances à tout visiteur : recruteurs, clients, développeurs.

**On reste sur Angular** : le portfolio est lui-même une preuve de mon travail avec le framework de mon projet principal. On y ajoute le pré-rendu statique pour régler le SEO, et on refait le design, le contenu et l'architecture de l'information.

Le site doit être **riche et chargé** (maximum de technos, projets, certificats), mais lisible : l'essentiel et le plus solide sur l'accueil, le détail sur des pages dédiées. En 5 secondes, le visiteur comprend qui je suis, voit des preuves, et me contacte.

## 2. À lire avant tout (dans cet ordre)
1. `docs/portfolio/PORTFOLIO_CONTENT.md` : source de vérité de tous les faits (identité, expériences, projets, compétences, statuts ✅ ⏸️ ❓ 🔒).
2. `docs/portfolio/certifications.ts` : 50 certificats typés, avec liens de vérification. C'est un fichier de référence : en Phase 4, migre-le dans `src/app/core/data/certifications.data.ts` et `src/app/core/models/certification.model.ts`, qui existent déjà. Compare-les d'abord avec l'existant (Phase 0) et garde les conventions du dépôt.
3. Le dépôt existant (structure ci-dessous).

Si ce prompt et `PORTFOLIO_CONTENT.md` se contredisent sur un fait, `PORTFOLIO_CONTENT.md` gagne.

### Existant à réutiliser (vu dans VS Code)
```
src/app/
  core/data/          certifications, education, experience, projects, skills   (*.data.ts)
  core/models/        certification, education, experience, project, skill      (*.model.ts)
  core/services/      certifications, education, email, experience, projects, skills, theme   (*.service.ts)
  features/           about, certifications, contact, education, experience, home, projects (+ project-detail), skills
  shared/components/  cta-button, footer, header, project-card, section-title, skill-tag, theme-toggle, timeline-item
  styles/             _variables.scss, _typography.scss, _mixins.scss
  app.ts, app.html, app.scss, app.config.ts, app.routes.ts, app.spec.ts   (nommage Angular récent : sans suffixe .component)
public/   .github/workflows/   .vscode/
```
Respecte ces conventions : fichiers `*.data.ts`, `*.model.ts`, `*.service.ts`, composants sans suffixe `.component`. Les styles sont en SCSS : les tokens de §6 deviennent des variables CSS dans `src/app/styles/_variables.scss`, sans Tailwind sauf raison solide. `email.service.ts` et `theme.service.ts` existent déjà : étends-les, et inspecte `email.service.ts` à la recherche de toute clé en dur. Pour chaque dossier existant, décide en Phase 0 s'il est conservé, refait ou fusionné, et justifie : par exemple `about` devient une section de l'accueil, `education` rejoint `/experience`, et il faut créer `services`. Ne supprime rien sans me l'avoir listé.

## 3. Règles non négociables
1. **Exactitude.** N'invente aucun chiffre, client, techno, lien, date, témoignage. Une donnée absente devient `TODO(hamza)` dans les fichiers de données (jamais rendu en production) et apparaît dans ton compte rendu.
2. **Statuts.** Rends uniquement les faits `verified`. Les faits `pending` (⏸️), `private` (🔒) et les `TODO` ne s'affichent jamais. Les chiffres du bandeau de faits sont soit des compteurs dérivés des données (nombre d'expériences, de projets, de certificats), soit des métriques confirmées (98,45 % d'exactitude CNN sur GTSRB).
3. **Confidentialité ALTEN.** Aucun logo, capture, donnée interne, nom de package ou lien vers du code ALTEN. Uniquement le schéma d'architecture générique décrit dans `PORTFOLIO_CONTENT.md` §5.1.
4. **Pas de surenchère.** Interdits : expert, architecte, senior, leader et la liste de §10 de `PORTFOLIO_CONTENT.md`. Le Copilot s'évalue ainsi : « évaluation manuelle sur 50 questions », jamais « benchmark ».
5. **Compétences sans niveaux.** Liste toutes les technos, sans « notions », sans pourcentages ni barres. Chaque techno montre où je l'ai utilisée (`evidence`) au survol/focus.
6. **Hors périmètre.** Pas d'analytics, pas de blog, pas de bandeau cookies, pas de domaine personnalisé, pas de numéro de téléphone affiché.
7. **Secrets.** Aucune clé dans le dépôt ni dans l'historique que tu écris. Les identifiants EmailJS passent par variables d'environnement.
8. **Travail par phases validées.** Tu t'arrêtes à la fin de chaque phase (§13) et tu attends mon « GO ». Tu n'enchaînes jamais seul.
9. **Pédagogie.** Explique en quelques lignes le pourquoi de chaque choix d'architecture important : je dois comprendre et maintenir le site.

## 4. Voix éditoriale
- Première personne (« Je conçois… », « Je développe… », « Je transforme… »), direct, naturel, professionnel, concis, orienté impact. Pas de ton corporate, pas de texte qui sent le généré.
- Références de style (à adapter, pas à copier tel quel) :
  - « Je conçois des architectures Java/Spring Boot sécurisées et je les livre prêtes à tourner dans Docker. »
  - « Je transforme une documentation interne dispersée en copilote IA qui répond avec ses sources. »
- Rédige les deux langues. L'anglais est un texte naturel, pas une traduction littérale. Je relis l'anglais.

## 5. Architecture de l'information
Routes identiques dans les deux langues : `/fr/…` et `/en/…`.

**Accueil `/`**
1. **Hero** : badge « Disponible immédiatement » ; H1 avec mon nom ; sous-titre statique (SEO) + rôles animés `Software Engineer · Full-Stack Developer · AI Engineer` ; accroche de 2 phrases factuelles ; CTA « Voir mes projets », « Me contacter », « Télécharger mon CV » (FR/EN) ; liens GitHub, LinkedIn, email ; photo `public/images/hamza.jpg` (avatar à initiales si absente).
2. **Bandeau de faits** : compteurs dérivés + 98,45 % CNN. Count-up discret.
3. **Ce que je construis** : 6 services en cartes courtes → `/services`.
4. **Projets phares** : 6 cartes, le Copilot ALTEN en grand format → `/projects`.
5. **Parcours** : timeline condensée (4 expériences + diplôme) → `/experience`.
6. **Stack** : technos par catégorie (icônes + noms) → `/skills`.
7. **Certifications** : 5 mises en avant + compteur « 50 certificats » → `/certifications`.
8. **Témoignages** : seulement si des données `verified` existent.
9. **Contact** : CTA et formulaire.

**`/services`** : 6 services, chacun avec ce que je livre, la stack, les preuves (liens vers les projets) et un CTA.

**`/projects`** : filtres par catégorie (IA & RAG, Backend, Full-Stack, Web & CMS, Mobile, Desktop, Machine Learning) et par techno, recherche. Sections : Phares, Autres projets (cartes compactes), Labo (lignes), lien « Voir tous mes dépôts ».
**`/projects/[slug]`** (une page par projet, gabarit complet pour les 6 phares, gabarit léger pour les autres) : Contexte et problème → Mon rôle → Architecture → Fonctionnalités clés → Stack → Résultats vérifiables → Prochaines étapes → Liens → Projet précédent/suivant. Le schéma d'architecture du Copilot est un SVG accessible (titre, description, ordre de lecture).

**`/experience`** : timeline détaillée qui se construit au scroll ; missions, stack, liens vers les projets ; formation et langues.

**`/skills`** : toutes les technos par catégorie, filtre/recherche, `evidence` au survol/focus.

**`/certifications`** : mises en avant en tête ; groupes repliables (`certGroups`) ; sous-certificats repliés sous leur parent ; recherche ; étiquette de type honnête ; lien « Vérifier » (`target="_blank" rel="noopener noreferrer"`) ; compteur dérivé.

**`/contact`** : formulaire EmailJS, bouton « copier l'email », LinkedIn, GitHub, localisation, boutons CV.

**Header** : initiales « HE », navigation, bascule FR | EN, bascule thème, CTA CV. Sticky, menu burger accessible. **Footer** : navigation, liens, date de build.

## 6. Direction artistique
Sombre premium et sobre, avec des touches « développeur » légères : badges en police mono, grille subtile, glow émeraude discret, cartes à bordure 1 px, rayon 12-16 px.

Tokens (variables CSS, thème sombre par défaut, clair disponible, persistance avec try/catch, respect de `prefers-color-scheme`) :
| Token | Sombre | Clair |
|---|---|---|
| `--bg` | `#0B0F0D` | `#F8FAFC` |
| `--surface` | `#121815` | `#FFFFFF` |
| `--border` | `#25302A` | `#E2E8F0` |
| `--text` | `#E8F0EC` | `#0F172A` |
| `--text-muted` | `#9BAAA2` | `#475569` |
| `--accent` (décor, grands éléments) | `#10B981` | `#059669` |
| `--accent-text` (liens, petit texte, fond de bouton) | `#34D399` | `#047857` |
| `--on-accent` | `#04120D` | `#FFFFFF` |

Attention contraste : en mode clair, `#059669` sur `#F8FAFC` donne environ 3,6:1, insuffisant pour du texte courant. Utilise `--accent-text` (`#047857`, environ 5,2:1) pour les liens, le petit texte et les boutons pleins ; réserve `#059669` aux bordures, icônes et grands titres. Vérifie chaque couple de couleurs (WCAG AA, 4,5:1 pour le texte).

Typographie : Inter pour le texte, JetBrains Mono pour badges/techs/labels, auto-hébergées (paquets `@fontsource` ou fichiers dans `public/fonts`), échelle fluide `clamp()`. Pas de photos de stock, une seule famille d'icônes SVG.

## 7. Animations et interactions
Fluides, élégantes, premium : elles accompagnent le contenu. Tout est désactivé ou réduit si `prefers-reduced-motion`.
- **Hero** : entrée progressive des éléments (décalage de quelques dizaines de ms). **Effet typing** sur les 3 rôles : le H1 et le sous-titre restent statiques et indexables ; le texte animé est `aria-hidden` avec une version `sr-only` complète ; en reduced-motion, les 3 rôles s'affichent statiquement.
- **Scroll** : apparition des sections (opacité + translation 12-16 px) via IntersectionObserver.
- **Timeline** d'expérience : le trait SVG se dessine en fonction de la progression du scroll (rAF throttlé), les entrées s'allument à leur tour.
- **Micro-interactions** : boutons (léger lift, focus visible), cartes projet (lift, zoom d'image subtil, liseré émeraude au hover), puces de compétences (mise en évidence + `evidence`), bouton copier avec confirmation accessible.
- **Fond du hero** : motif discret de **flux de données entre services**, inspiré du pipeline RAG (Documents → Chunks → Embeddings → pgvector → LLM → Réponse), en line-art très faible opacité (≤ 12 %) avec une impulsion lente. SVG/CSS ou canvas léger ; pause hors écran (IntersectionObserver) et onglet masqué ; version statique sur mobile bas de gamme et en reduced-motion. Interdits : particules en masse, effet « matrix/hacker », 3D lourde.
- Libre à toi de proposer mieux si c'est plus cohérent avec le design, en le justifiant en Phase 1 avant de l'implémenter.

## 8. Technique
- **Stack : on reste sur Angular** (version existante, probablement 20 d'après le nommage `app.ts` : vérifie ; si elle est inférieure à 19, propose en Phase 0 un plan de mise à jour avec `ng update` et ne le lance qu'après mon accord). Composants standalone, signals, nouveau control flow (`@if`, `@for`), `@defer` pour charger à la demande les blocs lourds (fond animé, liste des certificats), `NgOptimizedImage`, `provideRouter` avec `withInMemoryScrolling` et `withViewTransitions`, TypeScript strict. Garde SCSS (partials dans `src/app/styles`), sans Tailwind sauf raison solide.
- **Pré-rendu statique (SEO)** : ajoute `@angular/ssr` en mode prerender sans serveur, pour que chaque route (`/fr/…`, `/en/…`, chaque `/projects/:slug`) soit générée en HTML complet. Code compatible SSR : aucun accès direct à `window`, `document` ou `localStorage` hors `isPlatformBrowser` ou `afterNextRender`. `Title` et `Meta` mis à jour à chaque route ; JSON-LD injecté via `DOCUMENT`.
- **Animations** : CSS + IntersectionObserver en priorité (directive `appReveal`) ; `@angular/animations` seulement si le gain est net et le bundle reste dans le budget.
- **Contenu séparé du code** (étends `core/models` et `core/data`, déjà en place) : fichiers existants à enrichir (`experience`, `education`, `projects`, `skills`, `certifications`) et à créer (`profile`, `services`, `testimonials`, `ui`), au format `*.data.ts` + `*.model.ts`, avec champs bilingues `{ fr, en }`. Je dois pouvoir mettre à jour mon contenu sans toucher aux composants.
- **Modèle de statut** : chaque fait est `{ fr, en, status: 'verified' | 'pending' | 'private' }` ; seul `verified` est rendu. Chaque projet a `links: { live?, repo?, repoPublic, linkApproved }` ; un lien dépôt ne s'affiche que si `repoPublic && linkApproved`.
- **URLs GitHub** : si la CLI `gh` est disponible, exécute `gh repo list ELGHAD --limit 100 --json name,url,isPrivate,description` pour obtenir les vraies URLs ; sinon laisse `TODO(hamza)`.
- **i18n** : service léger basé sur signals, sans dépendance. La langue vient du premier segment de l'URL (`/fr`, `/en`), avec `hreflang`, et une redirection de `/` selon `navigator.language` (repli FR) côté navigateur + lien `<noscript>`. N'utilise pas la build multi-locale native d'Angular (un build par langue, trop lourd ici).
- **Contact** : `email.service.ts` existe déjà (vérifie son contenu, retire toute clé en dur). Utilise `@emailjs/browser`. Les valeurs sont lues dans `src/environments/environment.ts`, généré en CI par un script à partir des variables GitHub Actions `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` ; le fichier local est ignoré par Git. Honeypot, délai minimal avant envoi, limitation par session (stockage navigateur en try/catch), validation côté client, erreurs et succès annoncés (`aria-live`), repli `mailto:`.
- **Pages dynamiques** : route `projects/:slug`, avec les slugs fournis au prerender (`getPrerenderParams` à partir d'Angular 19, sinon fichier `routes.txt` généré depuis les données).

## 9. SEO et partage
Titre et meta description uniques par page et par langue ; titre d'accueil du type « Hamza El Rhadiouini — Ingénieur logiciel Full-Stack & IA (Java, Spring Boot, RAG) » ; Open Graph + Twitter Cards ; image OG 1200×630 générée au build (script) ; JSON-LD `Person` (nom, jobTitle, url, sameAs, alumniOf EMSI) ; `canonical` et `hreflang` ; `sitemap.xml` ; favicon SVG + PNG + apple-touch-icon + manifest ; page `404` personnalisée ; tout le texte présent dans le HTML pré-rendu.
Note : sur un site de projet GitHub Pages, `robots.txt` n'est pas lu (il doit être à la racine du domaine). Génère-le quand même, mais ne compte pas dessus ; indique-moi comment soumettre le sitemap via Google Search Console.

## 10. Accessibilité, responsive, performance
- **Accessibilité** : landmarks sémantiques, un seul H1 par page, hiérarchie de titres, lien « Aller au contenu », `:focus-visible` net, navigation clavier complète (menus, filtres, accordéons de certificats, formulaire), `alt` pertinents, labels de formulaire, `lang` par page, contrastes AA vérifiés.
- **Responsive** : mobile-first, tests à 320, 375, 768, 1024, 1440 px ; aucun défilement horizontal dès 320 px ; cibles tactiles ≥ 44×44 px ; `viewport-fit=cover` et `env(safe-area-inset-*)`.
- **Performance (mesurée, jamais estimée, Lighthouse mobile)** : Performance ≥ 90, Accessibilité ≥ 95, Best Practices ≥ 95, SEO ≥ 95 ; LCP < 2,5 s ; CLS < 0,1 ; JS initial de l'accueil ≤ 200 Ko gzip ; images AVIF/WebP avec dimensions déclarées et lazy-loading ; animation de fond chargée en différé.

## 11. Déploiement GitHub Pages
Garde l'URL actuelle. Build : `ng build --base-href /hamza-elrhadiouini-portfolio/` avec sortie statique prérendue ; copie `index.html` en `404.html` pour les routes inconnues ; ajoute `.nojekyll`. Constante `SITE_URL = 'https://elghad.github.io/hamza-elrhadiouini-portfolio'` pour canonical, OG et sitemap. Les assets statiques viennent de `public/` : le dossier actuel `src/app/assets/images` n'est pas l'emplacement standard, donc vérifie en Phase 0 comment `angular.json` le référence et migre-le vers `public/` si c'est pertinent. Revois le workflow existant dans `.github/workflows` : installation, génération de l'environnement EmailJS, `npm run check:content`, build, `upload-pages-artifact`, `deploy-pages`. Le build doit passer en CI.

## 12. Garde-fous de publication
Crée `scripts/check-content.ts` (commande `npm run check:content`, exécutée en CI avant le déploiement) et `npm run content:report`. Le build échoue si :
- une chaîne `TODO(hamza)` ou un fait non `verified` est rendu ;
- un lien pointe vers un dépôt privé, absent de la liste approuvée, ou vers un dépôt de §5.4 de `PORTFOLIO_CONTENT.md` ;
- un texte contient un terme interdit : « 5 microservices », « Azure OpenAI », « WebSockets » (dans le contexte du Copilot), « expert », « architecte », « senior », ou un logo/nom de package ALTEN ;
- un fichier CV référencé est absent de `public/cv/` ;
- un motif de secret apparaît dans le dépôt (par exemple `sk-`) ;
- une image n'a pas d'attribut `alt`.
`content:report` liste tous les éléments `pending`, `TODO` et liens non approuvés.

## 13. Méthode par phases (STOP après chacune)
- **PHASE 0 — Audit** : lis le dépôt actuel, identifie la version d'Angular et de Node, le système de styles, `angular.json`, le workflow CI et ce qui est réutilisable dans `core/` et `shared/components/`. Crée le tag `v1-legacy` (retour arrière) et travaille sur la branche `redesign`. Récupère les URLs avec `gh`, mesure Lighthouse sur le site actuel, scanne ce dépôt à la recherche de secrets, liste les risques, propose le plan et l'arborescence cible (décision conserver/refaire/fusionner pour chaque dossier existant). Ne modifie rien d'autre. STOP.
- **PHASE 1 — Fondations** : mise en place du pré-rendu Angular, tokens de design, layout, header/footer, thème, i18n par URL, couche de contenu avec statuts, workflow CI, scripts de garde-fous. Propose ici toute amélioration d'animation que tu juges meilleure. STOP.
- **PHASE 2 — Accueil** : hero, fond animé, bandeau de faits, services, projets phares, parcours condensé, stack, aperçu certificats. STOP.
- **PHASE 3 — Projets** : liste filtrable, pages détail, schéma d'architecture du Copilot. STOP.
- **PHASE 4 — Expérience, Compétences, Certifications** : pages complètes, avec migration de `docs/portfolio/certifications.ts` dans `core/data` et `core/models`. STOP.
- **PHASE 5 — Services, Contact, Témoignages** : EmailJS, composant de témoignages (masqué sans données). STOP.
- **PHASE 6 — Finition** : SEO complet, image OG, JSON-LD, favicon, 404, QA accessibilité/responsive/performance, scores Lighthouse avant/après, README du dépôt (modifier le contenu, déployer). STOP.

À la fin de chaque phase, rends : (1) ce qui a été fait, (2) fichiers créés/modifiés, (3) comment tester en local, (4) liste des `TODO(hamza)` et éléments `pending`, (5) mes décisions attendues.

## 14. Critères de fin
TypeScript strict sans erreur, ESLint propre, aucune erreur console, build CI vert, `check:content` vert, aucun défilement horizontal à 320 px, scores Lighthouse atteints, aucun contenu inventé, tous les `TODO(hamza)` résolus ou signalés.

**Commence maintenant par la PHASE 0 uniquement.**
