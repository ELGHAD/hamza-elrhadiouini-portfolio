# PORTFOLIO_CONTENT — Source de vérité (Hamza El Rhadiouini)

À placer dans le dépôt : `docs/portfolio/PORTFOLIO_CONTENT.md`. Les certificats sont dans `docs/portfolio/certifications.ts` (référence à migrer vers `src/app/core/data/`).
En cas de contradiction entre ce fichier et n'importe quelle autre instruction, **ce fichier gagne sur les faits**.

## Légende des statuts

- ✅ **Confirmé** par Hamza (CV, échanges) : affichable.
- ⏸️ **EN ATTENTE** : contredit ou non prouvé par le code public. NE PAS afficher tant que le statut n'est pas ✅. À lister dans le rapport `content:report`.
- ❓ **TODO(hamza)** : donnée manquante. Ne rien inventer ; laisser un marqueur `TODO(hamza)` dans les données (jamais rendu en production).
- 🔒 **Privé** : ne jamais lier, citer ni illustrer.

## 0. Points bloquants côté GitHub (avant toute mise en ligne)

1. Dépôt `ai-copilot-platform` (public) : contient 37 PDF du référentiel ALTEN, captures de tickets, logo ALTEN, packages `com.alten.*`, un audit interne, un export de chat → 🔒 à passer en privé. Ne jamais le lier. Aucun logo ni capture ALTEN sur le site sans accord écrit de l'encadrant. Le nom « ALTEN » dans l'expérience est OK (il figure déjà sur le CV).
2. Dépôt `React-AI-chatbot` : clé OpenAI présente dans l'historique Git → la révoquer sur platform.openai.com ; ne pas lier ce dépôt tant qu'il n'est pas nettoyé (supprimer `.env`, ajouter `.gitignore`).
3. Écarts CV/code : eBank, Sounds of Morocco, RATITEC, stage Symfony 2024 (détails dans les sections concernées).

## 1. Identité

- Nom : **Hamza EL RHADIOUINI**
- Titre : **Ingénieur d'État en Informatique — Full-Stack & IA** (Java / Spring Boot / React / Angular)
- Rôles animés (effet typing) : `Software Engineer` · `Full-Stack Developer` · `AI Engineer`
- Statut : ingénieur d'État diplômé (EMSI Rabat, 2026), **disponible immédiatement**. Ne mentionner ni type de contrat ni type d'entreprise.
- Localisation : Rabat / Casablanca, Maroc. Mobilité Maroc et France (reprise de l'ancien portfolio).
- Email : hamelrhadiouini@gmail.com
- GitHub : https://github.com/ELGHAD
- LinkedIn : https://www.linkedin.com/in/hamza-elrhadiouini/ ✅
- Téléphone : présent sur le CV mais **ne pas afficher sur le site public** (option `showPhone = false`).
- Photo : `public/images/hamza.jpg` (déposée par Hamza). Si absente : avatar à initiales « HE ».
- CV : `public/cv/Hamza_ElRhadiouini_CV_FR.pdf` et `public/cv/Hamza_ElRhadiouini_CV_EN.pdf` (à déposer plus tard). Boutons de téléchargement prévus dans le header, le hero et le contact.
- Langues parlées : Français, Arabe, Anglais (sans niveaux).

## 2. Services (ce que je propose) — à rédiger à la première personne, avec preuves

1. **Backend Java / Spring Boot & microservices** : Spring Cloud Gateway, JWT / BCrypt / RBAC, REST + OpenAPI. Preuves : Copilot ALTEN, RATITEC, eBank.
2. **Applications full-stack** : Angular, React, Next.js. Preuves : Copilot (Angular), eBank (React), Sounds of Morocco (Next.js).
3. **Copilotes IA / RAG sur vos documents** : FastAPI, LangChain, OpenAI, pgvector, réponses streamées avec sources, escalade vers un humain. Preuve : Copilot ALTEN.
4. **Sites et plateformes administrables** : Next.js + Strapi (CMS headless) + Supabase/PostgreSQL, mise en production, CI/CD GitHub Actions, maintenance. Preuve : Sounds of Morocco.
5. **Conteneurisation et livraison** : Docker, Docker Compose, Nginx, GitHub Actions. Preuves : Copilot, Sounds of Morocco.
6. **IA appliquée (vision)** : CNN TensorFlow/Keras. Preuve : Traffic-Sign-Recognition (98,45 % d'exactitude sur GTSRB).

## 3. Expériences

### 3.1 ALTEN Delivery Center Maroc — Rabat — Software Engineering Intern (PFE), Full-Stack & IA — mars → sept. 2026 ✅

Projet : **AI Copilot interne** (Spring Boot, FastAPI, Angular, RAG, pgvector).
Faits ✅ :

- Conçu et développé en autonomie un copilote IA qui répond en langage naturel à partir de la documentation interne (PDF, DOCX) indexée dans PostgreSQL/pgvector, avec réponses sourcées et escalade vers un ticket de support humain.
- Architecture microservices Spring Cloud : **API Gateway + 4 services Spring Boot (auth, user, document, chat) + service RAG FastAPI**. Sécurité JWT, BCrypt, RBAC sur 3 rôles (ADMIN, EXPERT, OPÉRATIONNEL), filtrage des sources dès la phase de retrieval.
- Pipeline RAG Python/FastAPI, LangChain, OpenAI, pgvector : extraction, découpage (chunking), embeddings, recherche sémantique (retrieval MMR présent dans le code), réponses streamées en SSE avec citation des sources.
- Application Angular : chat, back-office (documents, utilisateurs), système de tickets (formulaires dynamiques par catégorie en JSONB, pièces jointes images, fil d'activité).
- 13 sprints Scrum ; API documentées (OpenAPI, Postman) ; cahier des charges fonctionnel rédigé.
- Livré en démonstrateur conteneurisé (Docker Compose), qualifié en staging interne.
- Évaluation : **98 % de réponses correctes sur 50 questions de test validées manuellement** (confirmé le 2026-10-13) (évaluation manuelle, pas de jeu de test formel) ; premier token en moins de 1,5 s. Toujours écrire « évaluation manuelle ».

Formulation unique à utiliser partout : « API Gateway + 4 services Spring Boot + service RAG FastAPI ; OpenAI ; streaming SSE ».
**Interdits** (ancien portfolio, contredisent le CV) : « 5 microservices », « Azure OpenAI », « WebSockets ».
⏸️ Nombre de documents : le CV dit « 50+ », le dépôt contient 37 PDF → écrire « plusieurs dizaines de documents (PDF, DOCX) ». ❓ `TODO(hamza)` confirmer le chiffre et OpenAI vs Azure OpenAI.
🔒 Aucun lien de code. Visuels autorisés : schéma d'architecture générique (SVG, voir §5.1) ; captures anonymisées uniquement si Hamza les fournit avec l'accord d'ALTEN.

### 3.2 Sounds of Morocco — Freelance Full-Stack (en binôme) — oct. 2025 → présent — À distance ✅

- Plateforme du label musical, **en production : https://soundsofmorocco.com**. Client : Yasser Rhmt.
- Stack : Next.js 14 (App Router, TypeScript, Tailwind CSS), CMS headless Strapi v5, Supabase/PostgreSQL, CI/CD GitHub Actions.
- Missions : architecture technique, frontend, CMS, base de données ; pipeline CI/CD ; maintenance évolutive en production (SEO, performances, mises à jour Strapi, nouvelles fonctionnalités).
- Catalogue, sorties, actualités, merch ; le label met à jour son site sans développeur.
- ❓ `TODO(hamza)` : périmètre exact de Hamza vs son binôme (à formuler honnêtement : « en binôme »).
- 🔒 Dépôts publics `Sounds_Of_Morocco` et `SOM` : ne reflètent pas la stack réelle → ne pas lier (lien vers le site uniquement).
- ❓ Témoignage du client : voir §8.

### 3.3 RATITEC ENR — Mohammedia — Java / Spring Boot Developer Intern — juil. → août 2025 ✅

- Plateforme de gestion de projets énergétiques : backend développé en binôme, **12+ API REST Spring Boot** en architecture en couches (Controller, Service, Repository, DTO), JPA/Hibernate, MySQL, utilisées pour le suivi de **15+ projets**.
- Logique de facturation (validation, génération, cycle de paiement, notifications) et module d'interventions terrain (statuts, historique) ; Scrum, Git ; tests JUnit/Mockito.
- 🔒 Dépôt `renewable-energy-app` (frontend v0, README évoquant Laravel) : ne pas lier ; le passer en privé ou réécrire son README.

### 3.4 ALTEN — Fès — Full-Stack Developer Intern — août → sept. 2024

- Application de gestion de tâches (Symfony, PHP, Twig, MySQL, Doctrine).
- ✅ À afficher : « Conception en autonomie d'une application MVC de gestion de tâches (Symfony, Doctrine, Twig, MySQL) : modélisation du domaine (entités, héritage JOINED, énumérations). »
- ⏸️ Ne pas afficher tant que non confirmés (le README du dépôt `gestionnaire-tache` dit « contrôleurs et sécurité non implémentés ») : authentification, RBAC, tableau de bord, statuts/priorités, historique, commentaires.

## 4. Formation

- Diplôme d'Ingénieur d'État en Informatique et Réseaux, option MIAGE — EMSI Rabat — 2021 → 2026 ✅
- Baccalauréat Sciences Physiques (PC) — Al Maarif High School, Salé — 2021 ✅

### 4.1 Programme EMSI (fourni par Hamza le 2026-10-11) ✅

10 semestres de 2021 à 2026 ; les années de chaque phase sont déduites de ce découpage (S10 = PFE, mars → sept. 2026).

- **Années préparatoires (S1 → S4)** : sciences fondamentales (mathématiques, physique, électronique, informatique) ; technologies de base (circuits électriques, automatisme, algorithmique) ; langages de programmation, bases de données, systèmes d’exploitation ; initiation à l’IA et à la gestion d’entreprise ; projets pratiques et mini-laboratoires ; compétences transversales (communication, langues, soft skills).
- **Cycle ingénieur commun (S5 → S7)** : développement (C++, Python, Java, .NET, Angular, React) ; ingénierie logicielle (méthodes agiles, DevOps, qualité logicielle, UML) ; systèmes & cloud (Unix, Windows, virtualisation, cloud computing) ; réseaux & cybersécurité (TCP/IP, protocoles, sécurité, forensic) ; IA (machine learning, data science, IA appliquée) ; bases de données (SQL, NoSQL, Oracle, MS SQL Server) ; gestion de projet & IT (PMP, ITIL, outils de pilotage) ; soft & digital skills (communication, entrepreneuriat, employabilité, management de projet).
- **Cycle ingénieur spécialisé (S8 → S9)** — option choisie : **Développement Digital & SI** (parmi IA & Data Science, Cybersécurité & Réseaux, Développement Digital & SI) : DevOps & architecture microservices ; ERP, sécurité applicative & développement multiplateforme ; tuning de bases de données & Big Data ; frameworks (JEE, front-end, back-end) ; systèmes distribués & data mining ; intégration SI & IA pour les applications métier.
- ❓ `TODO(hamza)` : le diplôme est intitulé « option MIAGE » (CV) ; confirmer le lien entre « MIAGE » et l’option S8–S9 « Développement Digital & SI ».

## 5. Projets

Champs de chaque projet : slug · catégorie · stack · pitch · problème · rôle · faits ✅ · ⏸️ · liens · prochaines étapes.
Les URLs GitHub réelles doivent venir de `gh repo list ELGHAD --json name,url,isPrivate`. Ne jamais deviner un lien. Un lien n'est affiché que si le dépôt est public ET marqué `linkApproved: true`.

### Réponses de Hamza (2026-10-13) — elles remplacent les points ❓ / ⏸️ correspondants ci-dessous

- CV FR et EN fournis → `public/cv/Hamza_ElRhadiouini_CV_FR.pdf` et `_EN.pdf`, boutons de téléchargement actifs.
- Témoignages : abandonnés (aucun). Section masquée, TODO supprimés.
- Copilot : tous les documents fournis sont indexés → « 50+ documents PDF/DOCX » (CV). Modèle : OpenAI. Dépôt `ai-copilot-platform` : privé.
- Sounds of Morocco : binôme sans découpage, tout a été fait ensemble.
- EMSI Association : réalisé **seul** (la mention « en binôme » était une erreur).
- ALTEN 2024 : garder la version actuelle (modélisation), malgré le CV plus détaillé.
- MIAGE = option S8–S9 « Méthodes Informatiques Appliquées à la Gestion des Entreprises » (remplace « Développement Digital & SI »).
- Cours Meta Front-End : rattachés au certificat professionnel.
- PyMuPDF, python-docx, tiktoken (copilot) ; PL/SQL, MongoDB, Kafka, GraphQL, architecture événementielle (EMSI, formation) : confirmés.
- Oracle : liens de vérification à venir. eBank : code à jour à pousser par Hamza.

### 5.0 Refonte de la page Projets (2026-10-13)

Source ajoutée : PDF « Portfolio projects » (26 projets) + stage ALTEN 2024. Les 27 projets sont dans `src/app/core/data/projects.data.ts`, groupés (`group`) et hiérarchisés (`tier`) : expérience pro (Copilot en spotlight, Sounds of Morocco, RATITEC, ALTEN 2024) → 6 projets perso phares → Backend & web / IA & données / Mobile, desktop & console → Fondamentaux Java (lignes compactes).
Écarts relevés, version prudente affichée en attendant la réponse de Hamza :
- ✅ Copilot : **98 %** de réponses correctes sur 50 questions, évaluation manuelle (confirmé par Hamza le 2026-10-13).
- Section Labo supprimée de la page Projets (demande de Hamza, 2026-10-13).
- ✅ eBank (confirmé par Hamza le 2026-10-13, description complète fournie) : SaaS multi-tenant, 4 rôles, moteur de virement transactionnel, tests, CI/CD, AWS. ⚠️ Le dépôt public `ebank` montre encore l'ancienne version (2 rôles, sans tests ni CI) : pousser le code à jour.
- ⏸️ Clothing E-commerce : le PDF dit « register and log in », le README dit l’authentification non finalisée → statut « partiel ».
- ✅ Liens publiés (2026-10-13) : `React-AI-chatbot`, `Pharmacy-Manager`, `Restaurant_Management`, `gestionnaire-tache`. Dépôts nettoyés par Hamza et vérifiés le même jour (plus de `.env`, sources Java présentes, plus de `bin/`/`obj/` ni de `vendor/`/`var/`).

### 5.1 Projets phares (6, dans cet ordre)

1. **`ai-copilot` — ALTEN AI Copilot (PFE)** · catégories : IA & RAG, Backend, Full-Stack
   - Pitch : question en langage naturel → réponse sourcée, streamée, avec escalade vers un ticket humain.
   - Problème : documentation interne dispersée, recherche manuelle lente, pas de passage fluide vers le support humain.
   - Faits : voir §3.1. Statut : terminé (démonstrateur qualifié en staging interne). Liens : aucun (🔒).
   - **Schéma d'architecture générique (SVG accessible)**, uniquement ces blocs : Angular → Spring Cloud Gateway → services Spring Boot (auth, user, document, chat) → service RAG FastAPI + LangChain → PostgreSQL/pgvector ; OpenAI (LLM et embeddings) ; Docker Compose. Aucun autre composant.
   - Prochaines étapes (vraies, à garder courtes) : jeu de test formel à constituer, au-delà des 50 questions validées manuellement.
2. **`sounds-of-morocco` — Sounds of Morocco (freelance, en binôme)** · Web & CMS, Full-Stack — voir §3.2. Lien : site en production uniquement.
3. **`ebank` — eBank** · Backend, Full-Stack
   - Stack ✅ : Java 17, Spring Boot, Spring Security, JWT, Spring Data JPA, MySQL, React, Docker Compose, Nginx.
   - Application bancaire full-stack conteneurisée, deux rôles (**CLIENT**, **AGENT_GUICHET** — noms du code ; le CV dit « client/admin »), gestion des clients, comptes et opérations.
   - Problème : démontrer une API REST sécurisée et conteneurisée sur un domaine métier réaliste.
   - ⏸️ Redis (cache de sessions, rate limiting), tests JUnit/Mockito, CI GitHub Actions : absents du dépôt public. À afficher seulement quand Hamza aura poussé le code correspondant (ou à retirer définitivement).
4. **`job-hunter` — Job Hunter** · Python, Flask, SerpAPI (Google Jobs), PostgreSQL, pandas, openpyxl, HTML/JS · Data & Outils
   - Agrégateur d'offres : une recherche interroge plusieurs plateformes, déduplique, score la pertinence, historise, exporte en Excel. Problème : veille emploi manuelle et répétitive sur 7 sites.
   - Statut : fonctionnel en local, pas de démo en ligne (à écrire tel quel). Lien GitHub.
5. **`traffic-sign-recognition` — Traffic-Sign-Recognition** · Python, TensorFlow, Keras, CNN, Jupyter · Machine Learning
   - Classification de panneaux routiers sur GTSRB (43 classes), **98,45 % d'exactitude sur le jeu de test**. Brique de perception pour l'aide à la conduite : distinguer des panneaux visuellement proches. Terminé (notebook). Lien GitHub.
6. **`emsi-association` — EMSI Association** · PHP, Laravel, Blade, MySQL · Web
   - Plateforme de la vie associative de l'EMSI : clubs, adhésions, événements, actualités, espace admin. Problème : vie associative gérée via groupes WhatsApp et affiches. Terminé. Lien GitHub. ❓ captures d'écran à fournir (le README a des emplacements vides).

### 5.2 Autres projets (cartes compactes)

- **Restaurant Management** — C#, .NET 8, ASP.NET Core MVC, EF Core, SQL Server, Identity, Razor, Bootstrap : plats, ingrédients (many-to-many), commandes, ventes, réservations, employés. (Lien après nettoyage des dossiers `bin/` et `obj/` commités.)
- **Clothing Ecommerce** — PHP 8.2, Laravel 12, Blade, Tailwind 4, Vite, SQLite : catalogue filtrable, panier invité/connecté, checkout transactionnel, historique de commandes. Statut honnête : « partiel » (authentification Breeze non finalisée).
- **TaskManager (Android)** — Java + Kotlin, Room, MVVM, RecyclerView, Material Design : tâches avec persistance locale hors ligne. Rappels non implémentés.
- **Pharmacy Manager** — Java, Swing, MySQL (JDBC) : stock, facturation, rôles pharmacien/admin. ⏸️ Dépôt sans sources (.class seulement) → pas de lien tant que les sources ne sont pas poussées.
- **Little Lemon (Django)** — Python, Django 5, SQLite, Pillow : site vitrine avec menu dynamique et back-office Django Admin.
- **Chatbot API (Spring Boot)** — Java 17, Spring Boot 3.4, RestTemplate, OpenAI : API REST qui relaie les messages vers un LLM sans exposer de clé côté navigateur.
- **React AI Chatbot** — React, Vite : interface de chat. 🔒 Lien suspendu (clé exposée dans l'historique). Option : le brancher sur l'API Spring Boot ci-dessus pour en faire un vrai projet full-stack.
- **Tournament Manager** — C++20, CMake, POO : tournoi en console (équipes, arbitres, terrains, matchs, classement).
  Note : l'inventaire PDF annonce des totaux (Tier 2 : 8, Tier 3 : 20) supérieurs aux lignes détaillées ; seules les lignes détaillées font foi.

### 5.3 Labo (une ligne chacun, sans carte)

- notification-system — Spring Boot, WebSocket, Thymeleaf (exercice, pas de README → sans lien tant que non documenté).
- Lien « Voir tous mes dépôts » vers https://github.com/ELGHAD.

### 5.4 À ne jamais afficher

`alten-copilot`, `ebank-backend`, `ebank-frontend` (vides) · `messenger` · `demo-conflit` · `tprest`, `tpdatarest` (TP de cours) · `LittleLemon` (doublon) · `Sounds_Of_Morocco`, `SOM` · `renewable-energy-app` · `Portfolio`, `Handmade_Portfolio`, `React_Portfolio` · `ai-copilot-platform` · `CRUD_SpringBoot` (README gonflé) · `gestionnaire-tache` (écart CV/code) · les exercices Java/React/JS/C (Store-SpringBoot, RestSpringBoot, scrapping-DB, scrapping-tutto, Alarm_Clock, Music_Player, Login_System, E-commerce_System, Student_*, StudentHub, CollectionsJava, Challenge_Java, To-Do-List-React, Learn-React, LearnJS, Learn_C) · le « Movie Recommendation System » de l'ancien portfolio (aucun dépôt).

## 6. Compétences — tout lister, sans niveaux ni pourcentages

Chaque techno porte une liste `evidence` (projets, expériences, certificats) affichée au survol/focus : « Utilisée dans : … ». Une techno issue uniquement d'une formation est marquée « formation ».

- **Langages** : Java · Python · TypeScript · JavaScript · PHP · SQL · C# · C++ · Kotlin · C (formation)
- **Backend & API** : Spring Boot · Spring Cloud (Gateway) · Spring Security · Spring Data JPA · Hibernate · FastAPI · Flask · Symfony · Laravel · ASP.NET Core MVC · Django · REST · OpenAPI/Swagger · JWT · BCrypt · RBAC · SSE · WebSocket
- **Frontend & mobile** : Angular · React · Next.js · Tailwind CSS · Twig · Blade · Bootstrap · HTML/CSS · Material Design · Android (Java/Kotlin, Room) · React Native (formation Meta)
- **IA & Data** : RAG · LangChain · OpenAI (GPT) · Embeddings · Recherche sémantique · MMR · pgvector · TensorFlow · Keras · CNN · pandas · openpyxl · Jupyter · Prompt engineering (IBM)
- **Bases de données & CMS** : PostgreSQL · MySQL · Oracle Database · SQL Server · SQLite · Supabase · Strapi
- **DevOps & outils** : Docker · Docker Compose · Nginx · GitHub Actions · Git · GitHub · Maven · Postman · Jira · Kubernetes / OpenShift (formation IBM) · AWS (formation Board Infinity) · Unix (formation)
- **Architecture & méthodes** : Microservices · MVC · MVVM · Design Patterns · UML · Scrum/Agile · JUnit · Mockito
- **Embarqué** : Arduino (formation)
- ⏸️ **Redis** : ne pas afficher tant que eBank n'est pas aligné (seule preuve : le CV).

## 7. Certifications

Voir `docs/portfolio/certifications.ts` (50 entrées : 2 Oracle + 48 Coursera). Mises en avant : Oracle OCP Java SE 17 · Oracle Database 19c · Full-Stack Java Dev with Spring & Spring Boot · Meta Back-End Developer · Meta Front-End Developer.
Les sous-certificats (3 Board Infinity, 9 Meta Back-End, 7 Meta Front-End) s'affichent repliés sous leur parent. Pas d'années. Étiqueter chaque carte (« Certification officielle » / « Spécialisation Coursera » / « Certificat Coursera »). Le CV écrit « Generative AI for Developers — IBM » : sur le site, utiliser les titres exacts des 3 cours IBM, sans parler de spécialisation.

## 8. Témoignages

Hamza dispose de témoignages d'encadrants et du client de Sounds of Morocco. ❓ `TODO(hamza)` pour chacun : texte exact, nom, rôle, entreprise, **autorisation de publication**. Afficher uniquement les textes fournis, mot pour mot. Section masquée si aucune donnée `verified`.

## 9. Contact

Formulaire EmailJS (déjà configuré chez Hamza). Variables : `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` (valeurs ❓ à fournir en local et dans les variables GitHub Actions ; un script de CI génère `src/environments/environment.ts`). La clé publique EmailJS est visible dans le bundle : restreindre les origines autorisées dans le tableau de bord EmailJS.

## 10. Vocabulaire

- Interdit : expert, architecte, senior, leader, passionné, dynamique, force de proposition, solutions innovantes, au service de, « de A à Z ».
- Toujours préférer : un fait vérifiable (techno, périmètre, chiffre confirmé) à un adjectif.
