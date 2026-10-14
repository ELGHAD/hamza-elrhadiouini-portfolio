import { BilingualText, ProjectLinks } from '../models/content.model';
import {
  Project,
  ProjectCategoryOption,
  ProjectGroupInfo,
} from '../models/project.model';

/**
 * Facts come from PORTFOLIO_CONTENT.md, the project PDF (2026-10) and the public
 * repositories. When sources disagree, the most prudent version is written here.
 * Array order is the display order on the projects page.
 */
const t = (fr: string, en: string): BilingualText => ({ fr, en });

const privateLinks: ProjectLinks = { repoPublic: false, linkApproved: false };
/** Public repository whose link is approved (listed in scripts/approved-repositories.json). */
const publicRepo = (repo: string): ProjectLinks => ({ repo, repoPublic: true, linkApproved: true });

export const PROJECT_CATEGORY_OPTIONS: ProjectCategoryOption[] = [
  { id: 'all', label: t('Toutes', 'All') },
  { id: 'ai-rag', label: t('IA & RAG', 'AI & RAG') },
  { id: 'backend', label: t('Backend', 'Backend') },
  { id: 'full-stack', label: t('Full-Stack', 'Full-Stack') },
  { id: 'web-cms', label: t('Web & CMS', 'Web & CMS') },
  { id: 'mobile', label: t('Mobile', 'Mobile') },
  { id: 'desktop', label: t('Desktop & console', 'Desktop & console') },
  { id: 'machine-learning', label: t('Machine Learning', 'Machine Learning') },
  { id: 'data-tools', label: t('Data & outils', 'Data & tools') },
];

export const PROJECT_GROUPS: ProjectGroupInfo[] = [
  {
    id: 'professional',
    eyebrow: t('En entreprise et pour des clients', 'For companies and clients'),
    title: t('Expérience professionnelle', 'Professional work'),
    intro: t(
      'Quatre missions réelles, racontées en détail : le contexte, ce que j’ai fait, et ce que cela a donné.',
      'Four real engagements, told in full: the context, what I did, and what came out of it.',
    ),
  },
  {
    id: 'web',
    eyebrow: t('Java, PHP, C#, Python', 'Java, PHP, C#, Python'),
    title: t('Backend & applications web', 'Backend & web applications'),
    intro: t(
      'La même rigueur de modélisation, appliquée dans plusieurs écosystèmes.',
      'The same modelling discipline, applied across several ecosystems.',
    ),
  },
  {
    id: 'ai',
    eyebrow: t('Vision, LLM, collecte de données', 'Vision, LLMs, data collection'),
    title: t('IA & données', 'AI & data'),
    intro: t(
      'Des modèles évalués honnêtement et des outils qui exploitent des API d’IA ou de recherche.',
      'Honestly evaluated models, and tools built on AI or search APIs.',
    ),
  },
  {
    id: 'apps',
    eyebrow: t('Android, Swing, C++', 'Android, Swing, C++'),
    title: t('Mobile, desktop & console', 'Mobile, desktop & console'),
    intro: t(
      'Des applications hors navigateur, où l’architecture et la gestion des ressources comptent autant que l’interface.',
      'Apps outside the browser, where architecture and resource handling matter as much as the interface.',
    ),
  },
  {
    id: 'foundations',
    eyebrow: t('Exercices ciblés', 'Focused exercises'),
    title: t('Fondamentaux Java', 'Java fundamentals'),
    intro: t(
      'De petits programmes, chacun écrit pour maîtriser un concept précis.',
      'Small programs, each written to master one specific concept.',
    ),
  },
];

export const PROJECTS: Project[] = [
  // ── Professional work ──────────────────────────────────────────────────────────
  {
    id: 'ai-copilot',
    status: 'verified',
    title: t('Copilote IA à accès contrôlé (RAG)', 'Access-controlled AI copilot (RAG)'),
    group: 'professional',
    tier: 'spotlight',
    categories: ['ai-rag', 'backend', 'full-stack'],
    setting: t(
      'Stage de fin d’études (PFE) · ALTEN Delivery Center Maroc · Rabat',
      'Final-year internship (PFE) · ALTEN Delivery Center Maroc · Rabat',
    ),
    period: t('Mars → sept. 2026', 'Mar → Sep 2026'),
    team: 'solo',
    confidential: true,
    state: t('Démonstrateur qualifié en staging interne', 'Demonstrator qualified in internal staging'),
    summary: t(
      'Un copilote interne qui répond aux questions des collaborateurs à partir de la documentation de l’entreprise, cite ses sources, respecte les droits de chacun et passe la main au support humain quand il le faut.',
      'An internal copilot that answers employees’ questions from company documentation, cites its sources, respects who may read what, and hands over to human support when needed.',
    ),
    context: t(
      'Le savoir de l’entreprise était dispersé dans des documents PDF et DOCX. Trouver la bonne réponse voulait dire chercher à la main ou interrompre un collègue. Un chatbot générique ne convenait pas : il ne sait pas dire d’où vient sa réponse, et il ignore qui a le droit de lire quoi.',
      'Company knowledge was scattered across PDF and DOCX documents. Finding the right answer meant searching by hand or interrupting a colleague. A generic chatbot was not an option: it cannot say where an answer comes from, and it has no notion of who is allowed to read what.',
    ),
    task: t(
      'Pour mon PFE, ALTEN m’a confié la conception et le développement, en partant de zéro, d’une plateforme de copilote IA interne : questions en langage naturel sur la documentation, réponses sourcées, contrôle d’accès par rôle, et escalade vers le support humain quand l’IA ne suffit pas.',
      'For my final-year project, ALTEN asked me to design and build an internal AI copilot platform from scratch: natural-language questions over the documentation, source-grounded answers, role-based access control, and escalation to human support when the AI is not enough.',
    ),
    role: t(
      'J’ai mené le projet en autonomie : architecture, pipeline RAG, sécurité, application Angular, documentation des API et livraison du démonstrateur.',
      'I ran the project independently: architecture, RAG pipeline, security, Angular application, API documentation and delivery of the demonstrator.',
    ),
    actions: [
      {
        title: t('Architecture microservices', 'Microservices architecture'),
        text: t(
          'Spring Cloud avec une API Gateway, quatre services Spring Boot (auth, utilisateurs, documents, chat) et un service RAG en FastAPI. PostgreSQL et pgvector servent à la fois à la persistance et à la recherche vectorielle.',
          'Spring Cloud with an API Gateway, four Spring Boot services (auth, users, documents, chat) and a FastAPI RAG service. PostgreSQL with pgvector handles both persistence and vector search.',
        ),
      },
      {
        title: t('Pipeline RAG', 'RAG pipeline'),
        text: t(
          'Python, LangChain et OpenAI : extraction de plus de 50 documents PDF et DOCX, découpage, embeddings, recherche sémantique (MMR), puis génération sourcée. Les réponses arrivent en streaming via SSE.',
          'Python, LangChain and OpenAI: extraction of 50+ PDF and DOCX documents, chunking, embeddings, semantic search (MMR), then source-grounded generation. Answers stream over SSE.',
        ),
      },
      {
        title: t('Sécurité dès la conception', 'Security by design'),
        text: t(
          'JWT, BCrypt et RBAC sur trois rôles. Les documents autorisés sont filtrés pendant la recherche, avant que le LLM ne génère quoi que ce soit : un contenu restreint ne peut pas se retrouver dans une réponse.',
          'JWT, BCrypt and RBAC across three roles. Authorized documents are filtered during retrieval, before the LLM generates anything, so restricted content can never leak into an answer.',
        ),
      },
      {
        title: t('Application Angular', 'Angular application'),
        text: t(
          'Chat avec historique des conversations, tableau de bord d’administration, gestion des documents et des utilisateurs, suivi de l’indexation, et module de tickets de support avec formulaires par catégorie et pièces jointes.',
          'Chat with conversation history, admin dashboard, document and user management, indexing status tracking, and a support-ticket module with category-based forms and attachments.',
        ),
      },
      {
        title: t('Livraison', 'Delivery'),
        text: t(
          'API documentées et validées avec OpenAPI/Swagger et Postman, démonstrateur conteneurisé avec Docker Compose, 13 sprints Scrum suivis dans Jira.',
          'APIs documented and validated with OpenAPI/Swagger and Postman, demonstrator containerized with Docker Compose, 13 Scrum sprints tracked in Jira.',
        ),
      },
    ],
    flows: [
      {
        title: t('Architecture du démonstrateur', 'Demonstrator architecture'),
        caption: t(
          'Schéma générique : aucun détail interne à l’entreprise.',
          'Generic diagram: no company-internal detail.',
        ),
        steps: [
          { title: t('Angular', 'Angular'), detail: t('Chat · back-office', 'Chat · back office') },
          {
            title: t('Spring Cloud Gateway', 'Spring Cloud Gateway'),
            detail: t('Point d’entrée unique', 'Single entry point'),
          },
          {
            title: t('4 services Spring Boot', '4 Spring Boot services'),
            detail: t('auth · utilisateurs · documents · chat', 'auth · users · documents · chat'),
          },
          { title: t('Service RAG FastAPI', 'FastAPI RAG service'), detail: t('LangChain', 'LangChain') },
          {
            title: t('PostgreSQL + pgvector', 'PostgreSQL + pgvector'),
            detail: t('Données · vecteurs', 'Data · vectors'),
          },
        ],
        support: [
          { title: t('OpenAI', 'OpenAI'), detail: t('LLM · embeddings', 'LLM · embeddings') },
          {
            title: t('Docker Compose', 'Docker Compose'),
            detail: t('Démonstrateur conteneurisé', 'Containerized demonstrator'),
          },
        ],
      },
      {
        title: t('Le trajet d’une question', 'The path of a question'),
        caption: t(
          'Le contrôle d’accès intervient avant la génération, pas après.',
          'Access control happens before generation, not after.',
        ),
        steps: [
          { title: t('Question', 'Question'), detail: t('Utilisateur authentifié', 'Authenticated user') },
          {
            title: t('Recherche filtrée', 'Filtered retrieval'),
            detail: t('Seuls les documents autorisés', 'Authorized documents only'),
          },
          { title: t('Contexte', 'Context'), detail: t('Passages pertinents (MMR)', 'Relevant passages (MMR)') },
          { title: t('Génération', 'Generation'), detail: t('Fondée sur les sources', 'Grounded in sources') },
          { title: t('Réponse streamée', 'Streamed answer'), detail: t('SSE · citations', 'SSE · citations') },
        ],
        support: [
          {
            title: t('Ticket de support', 'Support ticket'),
            detail: t('Quand l’IA ne suffit pas', 'When the AI is not enough'),
          },
        ],
      },
    ],
    metrics: [
      {
        value: t('98 %', '98%'),
        label: t('de réponses correctes (évaluation manuelle, 50 questions)', 'correct answers (manual evaluation, 50 questions)'),
      },
      { value: t('< 1,5 s', '< 1.5 s'), label: t('avant le premier token streamé', 'to the first streamed token') },
      { value: t('50+', '50+'), label: t('documents PDF et DOCX indexés', 'PDF and DOCX documents indexed') },
      { value: t('13', '13'), label: t('sprints Scrum', 'Scrum sprints') },
    ],
    results: [
      t('Démonstrateur qualifié en staging interne chez ALTEN.', 'Demonstrator qualified in internal staging at ALTEN.'),
      t('Premier token streamé en moins de 1,5 s.', 'First streamed token in under 1.5 s.'),
      t(
        '98 % de réponses correctes lors d’une évaluation manuelle sur 50 questions de test validées.',
        '98% correct answers in a manual evaluation of 50 validated test questions.',
      ),
      t(
        'Chaque réponse renvoie à ses documents sources et respecte le rôle de l’utilisateur.',
        'Every answer links back to its source documents and respects the user’s role.',
      ),
    ],
    nextSteps: t(
      'Filtrer les documents au moment de la recherche, plutôt qu’après la génération, a été le choix décisif pour un RAG d’entreprise digne de confiance. Suites naturelles : passer du staging à la production, élargir le jeu d’évaluation au-delà de 50 questions et automatiser le suivi de la qualité.',
      'Filtering documents at retrieval time, rather than after generation, was the decisive choice for a trustworthy enterprise RAG. Natural next steps: move from staging to production, grow the evaluation set beyond 50 questions, and automate quality monitoring.',
    ),
    techStack: [
      'Java',
      'Spring Boot',
      'Spring Cloud Gateway',
      'Python',
      'FastAPI',
      'LangChain',
      'OpenAI',
      'PostgreSQL',
      'pgvector',
      'Angular',
      'Docker Compose',
      'JWT',
      'BCrypt',
      'RBAC',
      'SSE',
      'OpenAPI',
      'Postman',
      'Jira',
    ],
    links: { ...privateLinks },
  },
  {
    id: 'sounds-of-morocco',
    status: 'verified',
    title: t('Sounds of Morocco · plateforme d’un label', 'Sounds of Morocco · label platform'),
    group: 'professional',
    tier: 'featured',
    categories: ['web-cms', 'full-stack'],
    setting: t('Mission freelance · en binôme', 'Freelance engagement · in a pair'),
    period: t('Oct. 2025 → aujourd’hui', 'Oct 2025 → present'),
    team: 'pair',
    state: t('En production · maintenu', 'Live · maintained'),
    summary: t(
      'Le site et le CMS d’un label indépendant de musique marocaine, en production sur soundsofmorocco.com et maintenu depuis.',
      'The website and CMS of an independent Moroccan music label, live at soundsofmorocco.com and maintained since.',
    ),
    context: t(
      'Sounds of Morocco est un label indépendant qui accompagne des artistes marocains de musique électronique et traditionnelle. Il lui fallait une vraie maison en ligne : un site éditorial riche en audio et en visuels, une équipe capable de publier sans développeur, et un canal pour que artistes et partenaires puissent le contacter.',
      'Sounds of Morocco is an independent label supporting Moroccan electronic and traditional music artists. It needed a proper online home: an editorial site rich in audio and visuals, a team able to publish without a developer, and a channel for artists and partners to reach out.',
    ),
    task: t(
      'En freelance, en binôme avec un autre développeur, construire la plateforme du label, la mettre en production et la faire vivre.',
      'As freelancers, working in a pair with another developer, build the label’s platform, take it live and keep it running.',
    ),
    role: t(
      'Pas de découpage figé : à deux, nous avons tout conçu et développé ensemble, de l’architecture au front-end Next.js, au CMS Strapi, à la base Supabase/PostgreSQL, à la CI/CD et à la maintenance en production.',
      'No fixed split: the two of us designed and built everything together, from the architecture to the Next.js front end, the Strapi CMS, the Supabase/PostgreSQL database, CI/CD and production maintenance.',
    ),
    actions: [
      {
        title: t('Architecture découplée', 'Decoupled architecture'),
        text: t(
          'Next.js pour l’interface, Strapi pour le contenu, Supabase/PostgreSQL pour les données : trois responsabilités séparées, qui évoluent indépendamment.',
          'Next.js for the interface, Strapi for content, Supabase/PostgreSQL for data: three separate responsibilities that evolve independently.',
        ),
      },
      {
        title: t('Front-end éditorial', 'Editorial front end'),
        text: t(
          'Interface responsive avec Next.js (App Router), TypeScript et Tailwind CSS, optimisée pour la performance et les médias.',
          'Responsive interface with Next.js (App Router), TypeScript and Tailwind CSS, tuned for performance and media delivery.',
        ),
      },
      {
        title: t('Contenus et médias', 'Content and media'),
        text: t(
          'Strapi pour les contenus, Cloudinary pour gérer les visuels et les servir via CDN, React Markdown pour le rendu des textes.',
          'Strapi for content, Cloudinary to manage visuals and serve them over a CDN, React Markdown to render text.',
        ),
      },
      {
        title: t('Formulaires entrants', 'Inbound forms'),
        text: t(
          'Envoi de démos par les artistes et demandes de partenariat, avec validation et traitement asynchrone.',
          'Demo submissions from artists and partnership requests, with validation and asynchronous processing.',
        ),
      },
      {
        title: t('Livraison continue', 'Continuous delivery'),
        text: t(
          'Déploiement sur Vercel et Railway, builds automatisés avec GitHub Actions, puis maintenance évolutive : SEO, performances, mises à jour de Strapi et nouvelles fonctionnalités.',
          'Deployed on Vercel and Railway, builds automated with GitHub Actions, then ongoing maintenance: SEO, performance, Strapi updates and new features.',
        ),
      },
    ],
    architecture: t(
      'Next.js 14 (App Router, TypeScript, Tailwind CSS) pour l’interface, Strapi v5 comme CMS headless, Supabase/PostgreSQL pour les données, Cloudinary pour les médias. Hébergement sur Vercel et Railway, CI/CD avec GitHub Actions.',
      'Next.js 14 (App Router, TypeScript, Tailwind CSS) for the interface, Strapi v5 as the headless CMS, Supabase/PostgreSQL for data, Cloudinary for media. Hosted on Vercel and Railway, CI/CD with GitHub Actions.',
    ),
    flows: [
      {
        title: t('Du contenu au visiteur', 'From content to visitor'),
        steps: [
          { title: t('Équipe du label', 'Label team'), detail: t('Publie sans développeur', 'Publishes without a developer') },
          { title: t('Strapi v5', 'Strapi v5'), detail: t('CMS headless', 'Headless CMS') },
          { title: t('Next.js 14', 'Next.js 14'), detail: t('App Router · TypeScript', 'App Router · TypeScript') },
          { title: t('Visiteurs', 'Visitors'), detail: t('soundsofmorocco.com', 'soundsofmorocco.com') },
        ],
        support: [
          { title: t('Supabase', 'Supabase'), detail: t('PostgreSQL', 'PostgreSQL') },
          { title: t('Cloudinary', 'Cloudinary'), detail: t('Médias · CDN', 'Media · CDN') },
          { title: t('Vercel · Railway', 'Vercel · Railway'), detail: t('Hébergement', 'Hosting') },
          { title: t('GitHub Actions', 'GitHub Actions'), detail: t('CI/CD', 'CI/CD') },
        ],
      },
    ],
    metrics: [
      { value: t('En ligne', 'Live'), label: t('en production depuis octobre 2025', 'in production since October 2025') },
      { value: t('2', '2'), label: t('développeurs, en binôme', 'developers, working as a pair') },
    ],
    features: [
      t('Catalogue, sorties, actualités et merch du label.', 'The label’s catalogue, releases, news and merch.'),
      t('L’équipe du label publie elle-même via le CMS.', 'The label’s team publishes on its own through the CMS.'),
      t('Formulaires d’envoi de démos et de demandes de partenariat.', 'Demo submission and partnership request forms.'),
    ],
    results: [
      t('Plateforme en production sur soundsofmorocco.com.', 'Platform live at soundsofmorocco.com.'),
      t(
        'L’équipe du label gère ses contenus en autonomie via le CMS.',
        'The label’s team manages its content independently through the CMS.',
      ),
      t(
        'Artistes et partenaires passent par des formulaires validés et sécurisés.',
        'Artists and partners reach the label through validated, secure forms.',
      ),
    ],
    proves: t(
      'Que je sais livrer et faire vivre un produit réel pour un vrai client : un site en production, une équipe autonome sur son contenu, et une maintenance qui continue.',
      'That I can ship and run a real product for a real client: a live site, a team that owns its content, and maintenance that keeps going.',
    ),
    nextSteps: t(
      'La mission continue : je maintiens et fais évoluer la plateforme. Elle m’apprend à faire vivre un vrai produit en production, de la séparation des responsabilités à la CI/CD et à la maintenance au quotidien, en me coordonnant avec mon binôme.',
      'The engagement is ongoing: I keep maintaining and evolving the platform. It teaches me to run a real product in production, from separation of concerns to CI/CD and day-to-day maintenance, while coordinating with my teammate.',
    ),
    techStack: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Strapi 5',
      'Supabase',
      'PostgreSQL',
      'Cloudinary',
      'React Markdown',
      'Vercel',
      'Railway',
      'GitHub Actions',
    ],
    links: { live: 'https://soundsofmorocco.com', ...privateLinks },
  },
  {
    id: 'ratitec',
    status: 'verified',
    title: t('RATITEC · backend de projets énergétiques', 'RATITEC · energy project backend'),
    group: 'professional',
    tier: 'featured',
    categories: ['backend'],
    setting: t('Stage backend · RATITEC ENR · Mohammedia · en binôme', 'Backend internship · RATITEC ENR · Mohammedia · in a pair'),
    period: t('Juil. → août 2025', 'Jul → Aug 2025'),
    team: 'pair',
    confidential: true,
    state: t('Livré pendant le stage', 'Delivered during the internship'),
    summary: t(
      'Le backend Spring Boot d’une plateforme qui relie les projets d’énergie renouvelable, les interventions terrain et la facturation.',
      'The Spring Boot backend of a platform that connects renewable-energy projects, field interventions and billing.',
    ),
    context: t(
      'Dans les énergies renouvelables, une entreprise suit ses projets, envoie des techniciens sur le terrain et facture ses clients. Ces activités doivent être reliées et traçables, pas éparpillées entre plusieurs outils.',
      'In renewable energy, a company follows its projects, dispatches technicians to the field and bills its clients. These activities need to be connected and traceable, not scattered across separate tools.',
    ),
    task: t(
      'Pendant ce stage d’été, co-concevoir et développer en binôme le backend de la plateforme : projets, interventions terrain et facturation, avec quelques intégrations côté front-end React.',
      'During this summer internship, co-design and build the platform’s backend in a pair: projects, field interventions and billing, plus a few integration tasks on the React front end.',
    ),
    role: t(
      'Mon périmètre dans le binôme : la logique de facturation et le module d’interventions terrain, plus de petites tâches d’intégration sur le front-end React.',
      'My scope within the pair: the billing logic and the field-intervention module, plus small integration tasks on the React front end.',
    ),
    actions: [
      {
        title: t('API REST en couches', 'Layered REST APIs'),
        text: t(
          'Controller, Service, Repository, DTO : chaque couche a une responsabilité claire.',
          'Controller, Service, Repository, DTO: each layer has one clear responsibility.',
        ),
      },
      {
        title: t('Modèle de données', 'Data model'),
        text: t(
          'Projets, clients, techniciens, interventions et factures persistés avec Spring Data JPA, Hibernate et MySQL, avec traçabilité des opérations.',
          'Projects, clients, technicians, interventions and invoices persisted with Spring Data JPA, Hibernate and MySQL, with operation traceability.',
        ),
      },
      {
        title: t('Facturation', 'Billing'),
        text: t(
          'Règles de validation, génération des factures, cycle de vie des paiements et déclenchement des notifications.',
          'Validation rules, invoice generation, payment lifecycle and notification triggers.',
        ),
      },
      {
        title: t('Interventions terrain', 'Field interventions'),
        text: t(
          'Gestion des statuts et historique des opérations, exposés au front-end React par des API REST.',
          'Status management and operation history, exposed to the React front end through REST APIs.',
        ),
      },
      {
        title: t('Travail en équipe', 'Teamwork'),
        text: t(
          'Scrum (sprints, revues, backlog qui évolue) et Git au quotidien.',
          'Scrum (sprints, reviews, an evolving backlog) and Git day to day.',
        ),
      },
    ],
    architecture: t(
      'Une API Spring Boot en couches : les contrôleurs exposent des DTO, les services portent les règles métier (validation, facturation, statuts), les repositories Spring Data JPA persistent les entités dans MySQL via Hibernate. Le front-end React consomme ces API.',
      'A layered Spring Boot API: controllers expose DTOs, services hold the business rules (validation, billing, statuses), Spring Data JPA repositories persist entities in MySQL through Hibernate. The React front end consumes these APIs.',
    ),
    flows: [
      {
        title: t('La chaîne métier couverte', 'The business chain covered'),
        steps: [
          { title: t('Projet', 'Project'), detail: t('Clients · techniciens', 'Clients · technicians') },
          { title: t('Intervention', 'Intervention'), detail: t('Statuts · historique', 'Statuses · history') },
          { title: t('Facture', 'Invoice'), detail: t('Validation · génération', 'Validation · generation') },
          { title: t('Paiement', 'Payment'), detail: t('Cycle de vie · notifications', 'Lifecycle · notifications') },
        ],
      },
      {
        title: t('Les couches de l’API', 'API layers'),
        steps: [
          { title: t('React', 'React'), detail: t('Front-end', 'Front end') },
          { title: t('Controller', 'Controller'), detail: t('REST · DTO', 'REST · DTOs') },
          { title: t('Service', 'Service'), detail: t('Règles métier', 'Business rules') },
          { title: t('Repository', 'Repository'), detail: t('Spring Data JPA', 'Spring Data JPA') },
          { title: t('MySQL', 'MySQL'), detail: t('Hibernate', 'Hibernate') },
        ],
      },
    ],
    metrics: [
      { value: t('12+', '12+'), label: t('API REST Spring Boot', 'Spring Boot REST APIs') },
      { value: t('15+', '15+'), label: t('projets suivis sur la plateforme', 'projects tracked on the platform') },
      { value: t('4', '4'), label: t('maillons : projet, intervention, facture, paiement', 'links: project, intervention, invoice, payment') },
      { value: t('2 mois', '2 months'), label: t('de la conception à la livraison', 'from design to delivery') },
    ],
    results: [
      t(
        'Un backend qui couvre toute la chaîne : projet, intervention, facture, paiement.',
        'A backend covering the whole chain: project, intervention, invoice, payment.',
      ),
      t(
        'Des règles métier appliquées côté serveur, avec un historique pour chaque intervention.',
        'Business rules enforced server-side, with a history for every intervention.',
      ),
      t(
        'Des API consommées par le front-end React, livrées dans les deux mois du stage.',
        'APIs consumed by the React front end, delivered within the two-month internship.',
      ),
    ],
    proves: t(
      'Que je sais traduire un métier réel en règles backend fiables et traçables, en équipe et dans un délai court.',
      'That I can turn a real business into reliable, traceable backend rules, as part of a team and on a short timeline.',
    ),
    nextSteps: t(
      'Ma première expérience backend en entreprise. Elle m’a donné des bases solides en conception en couches et en modélisation de règles métier, que j’ai ensuite poussées plus loin sur eBank et sur le copilote IA chez ALTEN.',
      'My first backend experience in a company. It gave me solid foundations in layered design and business-rule modelling, which I then pushed further on eBank and on the AI copilot at ALTEN.',
    ),
    techStack: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'React', 'JUnit', 'Mockito', 'Git', 'Scrum'],
    links: { ...privateLinks },
  },
  {
    id: 'alten-task-manager-2024',
    status: 'verified',
    title: t('Gestion de tâches collaborative · ALTEN 2024', 'Collaborative task manager · ALTEN 2024'),
    group: 'professional',
    tier: 'featured',
    categories: ['backend', 'full-stack'],
    setting: t('Stage full-stack · ALTEN · Fès', 'Full-stack internship · ALTEN · Fes'),
    period: t('Août → sept. 2024', 'Aug → Sep 2024'),
    team: 'solo',
    confidential: true,
    state: t('Projet de stage', 'Internship project'),
    summary: t(
      'Mon premier projet en entreprise : concevoir en autonomie une application collaborative de gestion de tâches avec Symfony, en partant d’un modèle de domaine solide.',
      'My first project in a company: independently designing a collaborative task management application with Symfony, starting from a solid domain model.',
    ),
    context: t(
      'Août 2024, premier stage en entreprise, chez ALTEN à Fès. Le sujet : une application collaborative de gestion de tâches, où plusieurs personnes partagent et suivent le même travail.',
      'August 2024, my first internship, at ALTEN in Fes. The subject: a collaborative task management application, where several people share and follow the same work.',
    ),
    task: t(
      'Concevoir et développer l’application en autonomie, en commençant par la modélisation du domaine, dans une architecture MVC.',
      'Design and build the application independently, starting from the domain model, in an MVC architecture.',
    ),
    role: t(
      'J’ai mené la conception et le développement en autonomie. Ce projet confidentiel est distinct de mon dépôt public « gestionnaire-tache ».',
      'I ran the design and development independently. This confidential project is separate from my public “gestionnaire-tache” repository.',
    ),
    actions: [
      {
        title: t('Le modèle d’abord', 'Model first'),
        text: t(
          'Avant d’écrire la moindre vue, j’ai modélisé le domaine : les entités et leurs relations, posées avant les écrans.',
          'Before writing a single view, I modelled the domain: entities and their relationships, set before the screens.',
        ),
      },
      {
        title: t('Héritage JOINED', 'JOINED inheritance'),
        text: t(
          'Héritage Doctrine en stratégie JOINED : une table par type, des données communes factorisées, sans colonnes vides.',
          'Doctrine inheritance with the JOINED strategy: one table per type, shared data factored out, no empty columns.',
        ),
      },
      {
        title: t('Énumérations', 'Enumerations'),
        text: t(
          'Des valeurs métier typées par énumérations plutôt que par chaînes libres.',
          'Business values typed with enumerations instead of free strings.',
        ),
      },
      {
        title: t('Architecture MVC', 'MVC architecture'),
        text: t(
          'Application Symfony structurée en MVC : Doctrine ORM pour la persistance sur MySQL, Twig pour les vues.',
          'A Symfony application structured as MVC: Doctrine ORM for persistence on MySQL, Twig for the views.',
        ),
      },
    ],
    architecture: t(
      'Symfony en MVC : les contrôleurs orchestrent, les entités Doctrine portent le modèle de domaine (héritage JOINED, énumérations) et sont persistées dans MySQL, Twig rend les vues.',
      'Symfony as MVC: controllers orchestrate, Doctrine entities carry the domain model (JOINED inheritance, enumerations) and are persisted in MySQL, Twig renders the views.',
    ),
    flows: [
      {
        title: t('Architecture MVC', 'MVC architecture'),
        steps: [
          { title: t('Contrôleurs', 'Controllers'), detail: t('Symfony', 'Symfony') },
          { title: t('Modèle de domaine', 'Domain model'), detail: t('Entités · JOINED · enums', 'Entities · JOINED · enums') },
          { title: t('Doctrine ORM', 'Doctrine ORM'), detail: t('Persistance', 'Persistence') },
          { title: t('MySQL', 'MySQL') },
        ],
        support: [{ title: t('Twig', 'Twig'), detail: t('Vues', 'Views') }],
      },
    ],
    results: [
      t(
        'Une application collaborative de gestion de tâches conçue en autonomie, sur un domaine modélisé avant les écrans.',
        'A collaborative task management application designed independently, on a domain modelled before the screens.',
      ),
      t(
        'Une première expérience complète en entreprise : du sujet à l’application, avec Symfony, Doctrine, Twig et MySQL.',
        'A first complete experience in a company: from subject to application, with Symfony, Doctrine, Twig and MySQL.',
      ),
    ],
    proves: t(
      'Que, dès mon premier stage, je savais faire avancer un sujet en autonomie et poser un modèle de données propre avant de construire.',
      'That from my very first internship, I could move a subject forward independently and lay a clean data model before building.',
    ),
    nextSteps: t(
      'Premier stage, première habitude durable : partir d’un modèle de données bien posé avant de construire les écrans.',
      'First internship, first lasting habit: start from a well-designed data model before building the screens.',
    ),
    techStack: ['PHP', 'Symfony', 'Doctrine', 'Twig', 'MySQL', 'MVC'],
    links: { ...privateLinks },
  },
  {
    id: 'ebank',
    status: 'verified',
    title: t('eBank · SaaS bancaire multi-tenant', 'eBank · multi-tenant banking SaaS'),
    group: 'web',
    tier: 'spotlight',
    categories: ['backend', 'full-stack'],
    setting: t(
      'Projet personnel · plateforme SaaS de simulation bancaire',
      'Personal project · banking simulation SaaS platform',
    ),
    team: 'solo',
    state: t('En cours de développement', 'In active development'),
    summary: t(
      'Une plateforme SaaS bancaire multi-tenant : chaque organisation gère ses clients, ses comptes, ses virements simulés et ses permissions, strictement isolée des autres. Spring Boot, React et MySQL, avec un moteur de virement transactionnel, des tests automatisés et un déploiement sur AWS.',
      'A multi-tenant banking SaaS platform: each organization manages its customers, accounts, simulated transfers and permissions, strictly isolated from the others. Spring Boot, React and MySQL, with a transactional transfer engine, automated tests and deployment on AWS.',
    ),
    context: t(
      'Dans une application financière, une erreur ne se voit pas à l’écran : c’est un solde faux, un virement compté deux fois ou une organisation qui lit les données d’une autre. Ce sont précisément ces risques que les projets bancaires de démonstration ignorent le plus souvent.',
      'In a financial application, bugs do not show up on screen: they are a wrong balance, a transfer counted twice, or one organization reading another’s data. These are exactly the risks demo banking projects usually ignore.',
    ),
    task: t(
      'Concevoir une plateforme bancaire de simulation comme un vrai produit SaaS : isolation des organisations, virements cohérents même en concurrence, sécurité appliquée côté serveur, tests qui vérifient les invariants métier, puis conteneurisation, CI et déploiement cloud. Aucun paiement réel, aucun réseau bancaire réel.',
      'Design a banking simulation platform as a real SaaS product: organization isolation, transfers that stay consistent under concurrency, server-side security, tests that check business invariants, then containerization, CI and cloud deployment. No real payments, no real banking network.',
    ),
    role: t(
      'Projet personnel que je fais évoluer étape par étape : modélisation du domaine, règles métier, sécurité, tests, conteneurisation, CI/CD et infrastructure AWS.',
      'A personal project I evolve step by step: domain modelling, business rules, security, testing, containerization, CI/CD and AWS infrastructure.',
    ),
    actions: [
      {
        title: t('Architecture multi-tenant', 'Multi-tenant architecture'),
        text: t(
          'Données isolées par organisation : clients, comptes, transactions et ressources d’administration ne sont accessibles que dans leur tenant. Quatre rôles (administrateur plateforme, administrateur d’organisation, agent, client), autorisation appliquée côté backend.',
          'Data isolated per organization: customers, accounts, transactions and admin resources are only reachable inside their tenant. Four roles (platform admin, organization admin, agent, client), with authorization enforced in the backend.',
        ),
      },
      {
        title: t('Moteur de virement', 'Transfer engine'),
        text: t(
          'Validation serveur du montant, du statut, de la propriété et du solde ; débit et crédit atomiques dans une seule transaction ; contrôle de concurrence contre les soldes incohérents ; idempotence contre les doubles requêtes ; rollback explicite en cas d’échec.',
          'Server-side validation of amount, status, ownership and balance; atomic debit and credit in a single transaction; concurrency control against inconsistent balances; idempotency against duplicate requests; explicit rollback on failure.',
        ),
      },
      {
        title: t('Grand livre et intégrité', 'Ledger and integrity'),
        text: t(
          'Écritures de débit et de crédit cohérentes pour chaque virement, enregistrées dans la même transaction ; mouvements terminés protégés contre la modification ; contrôles de rapprochement entre soldes et écritures.',
          'Consistent debit and credit entries for every transfer, persisted in the same transaction; completed records protected from modification; reconciliation checks between balances and recorded movements.',
        ),
      },
      {
        title: t('Sécurité', 'Security'),
        text: t(
          'Authentification sans état par JWT, mots de passe hachés, RBAC avec Spring Security, contrôles de propriété et de tenant côté serveur, validation des requêtes, erreurs d’API cohérentes, secrets par environnement et journal d’audit des opérations sensibles.',
          'Stateless JWT authentication, hashed passwords, RBAC with Spring Security, server-side ownership and tenant checks, request validation, consistent API errors, environment-based secrets and an audit trail of sensitive operations.',
        ),
      },
      {
        title: t('Administration SaaS', 'SaaS administration'),
        text: t(
          'Gestion des organisations et des utilisateurs, plans d’abonnement et quotas d’usage vérifiés par le backend, statuts d’abonnement et facturation simulée. L’administration plateforme est séparée des permissions d’organisation.',
          'Organization and user management, subscription plans and usage quotas enforced by the backend, subscription statuses and simulated billing. Platform administration is kept separate from organization permissions.',
        ),
      },
      {
        title: t('Interface React', 'React interface'),
        text: t(
          'Vues dédiées aux clients, agents et administrateurs ; tableaux de bord de comptes et historique paginé ; formulaires de virement avec validation et confirmation ; recherche, filtres, états de chargement, vides et d’erreur ; navigation protégée.',
          'Dedicated views for customers, agents and administrators; account dashboards and paginated history; transfer forms with validation and confirmation; search, filters, loading, empty and error states; protected navigation.',
        ),
      },
      {
        title: t('Stratégie de test', 'Testing strategy'),
        text: t(
          'Tests unitaires des règles métier, tests d’API et de sécurité, intégration base de données avec Testcontainers, régression sur le rollback et les doublons, tests de concurrence sur des comptes partagés, tests front-end et end-to-end, le tout lancé en CI.',
          'Unit tests for business rules, API and security tests, database integration with Testcontainers, regression tests for rollback and duplicates, concurrency tests on shared accounts, front-end and end-to-end tests, all run in CI.',
        ),
      },
      {
        title: t('DevOps & AWS', 'DevOps & AWS'),
        text: t(
          'Docker et Docker Compose pour des environnements reproductibles ; GitHub Actions pour les tests, les builds et le déploiement, avec des identifiants AWS éphémères via GitHub OIDC ; infrastructure décrite en code.',
          'Docker and Docker Compose for reproducible environments; GitHub Actions for tests, builds and deployment, with short-lived AWS credentials through GitHub OIDC; infrastructure described as code.',
        ),
      },
    ],
    architecture: t(
      'Un monolithe modulaire, découpé par responsabilité métier plutôt qu’en services inutiles : identité, organisations, clients, comptes, virements, grand livre, abonnements et audit. Les couches présentation, API, domaine, persistance, sécurité et infrastructure restent séparées. Le modèle MySQL utilise des contraintes relationnelles, des index, des types décimaux précis pour l’argent et des migrations versionnées.',
      'A modular monolith, split by business responsibility rather than into needless services: identity, organizations, customers, accounts, transfers, ledger, subscriptions and audit. Presentation, API, domain, persistence, security and infrastructure layers stay separate. The MySQL model uses relational constraints, indexes, precise decimal types for money and versioned migrations.',
    ),
    flows: [
      {
        title: t('Les couches de l’application', 'Application layers'),
        steps: [
          { title: t('Présentation', 'Presentation'), detail: t('React · routes · formulaires', 'React · routes · forms') },
          { title: t('API REST', 'REST API'), detail: t('Contrôleurs · DTO · validation', 'Controllers · DTOs · validation') },
          {
            title: t('Domaine', 'Domain'),
            detail: t('Règles · virements · abonnements', 'Rules · transfers · subscriptions'),
          },
          { title: t('Persistance', 'Persistence'), detail: t('JPA · Hibernate · MySQL', 'JPA · Hibernate · MySQL') },
        ],
        support: [
          {
            title: t('Sécurité', 'Security'),
            detail: t('Spring Security · JWT · isolation des tenants', 'Spring Security · JWT · tenant isolation'),
          },
          {
            title: t('Infrastructure', 'Infrastructure'),
            detail: t('Docker · Nginx · CI/CD · AWS', 'Docker · Nginx · CI/CD · AWS'),
          },
        ],
      },
      {
        title: t('Le trajet d’un virement', 'The path of a transfer'),
        caption: t(
          'Tout est validé ou rien n’est écrit : un débit sans crédit est impossible.',
          'Everything commits or nothing does: a debit without its credit is impossible.',
        ),
        steps: [
          { title: t('Contrôle d’accès', 'Access check'), detail: t('JWT · permissions · tenant', 'JWT · permissions · tenant') },
          {
            title: t('Validation', 'Validation'),
            detail: t('Montant · statut · devise · solde', 'Amount · status · currency · balance'),
          },
          { title: t('Idempotence', 'Idempotency'), detail: t('Pas de double traitement', 'No double processing') },
          { title: t('Transaction', 'Transaction'), detail: t('Contrôle de concurrence', 'Concurrency control') },
          { title: t('Débit · crédit', 'Debit · credit'), detail: t('+ écritures du grand livre', '+ ledger entries') },
          { title: t('Commit', 'Commit'), detail: t('Sinon rollback complet', 'Otherwise full rollback') },
        ],
      },
      {
        title: t('Déploiement sur AWS', 'Deployment on AWS'),
        steps: [
          { title: t('CloudFront + S3', 'CloudFront + S3'), detail: t('Front-end React · CDN', 'React front end · CDN') },
          {
            title: t('ECS Fargate', 'ECS Fargate'),
            detail: t('API Spring Boot conteneurisée', 'Containerized Spring Boot API'),
          },
          { title: t('RDS for MySQL', 'RDS for MySQL'), detail: t('Base managée', 'Managed database') },
        ],
        support: [
          { title: t('IAM', 'IAM'), detail: t('Moindre privilège', 'Least privilege') },
          {
            title: t('Secrets Manager', 'Secrets Manager'),
            detail: t('Configuration sensible', 'Sensitive configuration'),
          },
          { title: t('CloudWatch', 'CloudWatch'), detail: t('Logs · alertes', 'Logs · alerts') },
          { title: t('Certificate Manager', 'Certificate Manager'), detail: t('TLS', 'TLS') },
          {
            title: t('Terraform / CloudFormation', 'Terraform / CloudFormation'),
            detail: t('Infrastructure as Code', 'Infrastructure as Code'),
          },
          { title: t('GitHub Actions', 'GitHub Actions'), detail: t('CI/CD · OIDC', 'CI/CD · OIDC') },
        ],
      },
    ],
    metrics: [
      {
        value: t('4', '4'),
        label: t('rôles, du client à l’admin plateforme', 'roles, from client to platform admin'),
      },
      {
        value: t('9', '9'),
        label: t('étapes contrôlées par virement', 'controlled steps per transfer'),
      },
      {
        value: t('1', '1'),
        label: t('transaction pour le débit et le crédit', 'transaction for debit and credit'),
      },
      {
        value: t('6', '6'),
        label: t('couches séparées, de React à AWS', 'separate layers, from React to AWS'),
      },
    ],
    results: [
      t(
        'Un projet d’ingénierie complet : front-end, architecture backend, modèle relationnel, authentification, autorisation, transactions, tests, conteneurisation et déploiement cloud.',
        'A complete engineering project: front end, backend architecture, relational model, authentication, authorization, transactions, testing, containerization and cloud deployment.',
      ),
      t(
        'Des invariants métier protégés par le code et par les tests : soldes cohérents, virements traçables, organisations isolées.',
        'Business invariants protected by code and by tests: consistent balances, traceable transfers, isolated organizations.',
      ),
      t(
        'Une simulation pédagogique assumée : aucun paiement réel, aucun réseau bancaire réel.',
        'An openly educational simulation: no real payments, no real banking network.',
      ),
    ],
    proves: t(
      'Que je sais raisonner sur des flux métier critiques, concevoir des API REST fiables, faire respecter des frontières de sécurité, garantir l’intégrité des données et faire évoluer une application jusqu’au cloud, avec des tests à chaque étape.',
      'That I can reason about business-critical workflows, design reliable REST APIs, enforce security boundaries, guarantee data integrity and take an application all the way to the cloud, with tests at every step.',
    ),
    nextSteps: t(
      'Principes suivis tout au long du projet : séparation des responsabilités, SOLID là où il simplifie, invariants métier explicites, sécurité par défaut, tests de régression automatisés, environnements reproductibles, Infrastructure as Code, observabilité, et décisions d’architecture documentées.',
      'Principles followed throughout: separation of concerns, SOLID where it simplifies, explicit business invariants, secure-by-default authorization, automated regression tests, reproducible environments, Infrastructure as Code, observability, and documented architecture decisions.',
    ),
    techStack: [
      'Java 17',
      'Spring Boot 3.2',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'JWT',
      'Bean Validation',
      'MySQL 8',
      'React 19',
      'React Router',
      'Axios',
      'JUnit 5',
      'Mockito',
      'MockMvc',
      'Testcontainers',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Docker',
      'Docker Compose',
      'Nginx',
      'GitHub Actions',
      'AWS ECS Fargate',
      'Amazon RDS',
      'Amazon S3',
      'CloudFront',
      'AWS IAM',
      'Secrets Manager',
      'CloudWatch',
      'Terraform',
    ],
    links: publicRepo('https://github.com/ELGHAD/ebank'),
  },
  {
    id: 'job-hunter',
    status: 'verified',
    title: t('Job Hunter Morocco · agrégateur d’offres', 'Job Hunter Morocco · job aggregator'),
    group: 'ai',
    tier: 'featured',
    categories: ['data-tools', 'backend'],
    setting: t('Projet personnel · data & API', 'Personal project · data & APIs'),
    team: 'solo',
    state: t('Fonctionnel en local · pas de démo en ligne', 'Works locally · no online demo'),
    summary: t(
      'Une seule recherche interroge les principaux sites d’emploi, puis déduplique, classe par pertinence, historise et exporte les offres dans un classeur Excel prêt à l’emploi.',
      'One search queries the main job boards, then deduplicates, ranks by relevance, stores and exports the listings into a ready-to-use Excel workbook.',
    ),
    context: t(
      'Chercher un emploi au Maroc, c’est refaire la même recherche sur LinkedIn, Bayt, Rekrute, Emploi.ma, Indeed, Glassdoor et d’autres, puis trier les doublons à la main, sans savoir quelles offres méritent d’être lues en premier.',
      'Job hunting in Morocco means running the same search on LinkedIn, Bayt, Rekrute, Emploi.ma, Indeed, Glassdoor and more, then weeding out duplicates by hand, with no idea which listings deserve to be read first.',
    ),
    task: t(
      'Construire un outil qui part des compétences du candidat et lui montre les meilleures offres en premier, avec un historique et un export directement exploitable.',
      'Build a tool that starts from the candidate’s skills and shows the best matches first, with a history and a directly usable export.',
    ),
    role: t(
      'Projet conçu et développé seul : collecte, traitement, score, base de données, API, interface et export.',
      'Designed and built on my own: collection, processing, scoring, database, API, interface and export.',
    ),
    actions: [
      {
        title: t('Collecte multi-sources', 'Multi-source collection'),
        text: t(
          'Google Jobs via SerpApi, complété par des recherches ciblées sur Bayt, Rekrute et Emploi.ma.',
          'Google Jobs through SerpApi, plus targeted searches on Bayt, Rekrute and Emploi.ma.',
        ),
      },
      {
        title: t('Normalisation et déduplication', 'Normalisation and deduplication'),
        text: t(
          'Les résultats des différentes recherches se recoupent : ils sont normalisés puis dédupliqués avant tout classement.',
          'Results from different searches overlap: they are normalised and deduplicated before any ranking.',
        ),
      },
      {
        title: t('Score de pertinence explicable', 'Explainable relevance score'),
        text: t(
          'Cinq critères : mots-clés dans le titre, mots-clés dans la description, qualité de la source, présence d’un salaire et fraîcheur de l’offre. Un classement heuristique, présenté comme tel.',
          'Five criteria: keywords in the title, keywords in the description, source quality, salary information and freshness. A heuristic ranking, presented as such.',
        ),
      },
      {
        title: t('Historique PostgreSQL', 'PostgreSQL history'),
        text: t(
          'Offres et recherches stockées dans PostgreSQL : historique complet et statistiques consultables.',
          'Listings and searches stored in PostgreSQL: full history and statistics on demand.',
        ),
      },
      {
        title: t('Export Excel soigné', 'Polished Excel export'),
        text: t(
          'Classeur avec une feuille d’offres et une feuille de synthèse, pertinence colorée et liens de candidature cliquables.',
          'A workbook with listings and summary sheets, colour-coded relevance and clickable apply links.',
        ),
      },
      {
        title: t('API REST et interface', 'REST API and interface'),
        text: t(
          'API Flask (/api/search, /api/export/excel, /api/history, /api/stats, /health) et interface monopage légère, avec un badge de pertinence sur chaque offre. Identifiants séparés du code par variables d’environnement.',
          'Flask API (/api/search, /api/export/excel, /api/history, /api/stats, /health) and a lightweight single-page interface with a relevance badge on every job card. Credentials kept out of the code through environment variables.',
        ),
      },
    ],
    architecture: t(
      'Chaque responsabilité est séparée : l’interface appelle l’API Flask, qui lance la recherche via SerpApi, normalise et déduplique les résultats, calcule le score, puis enregistre dans PostgreSQL et produit l’export Excel.',
      'Each responsibility is separate: the interface calls the Flask API, which runs the search through SerpApi, normalises and deduplicates results, computes the score, then stores to PostgreSQL and produces the Excel export.',
    ),
    flows: [
      {
        title: t('Le pipeline d’une recherche', 'The search pipeline'),
        steps: [
          { title: t('Interface', 'Interface'), detail: t('Compétences du candidat', 'Candidate skills') },
          { title: t('API Flask', 'Flask API'), detail: t('/api/search', '/api/search') },
          { title: t('SerpApi', 'SerpApi'), detail: t('Google Jobs · sites ciblés', 'Google Jobs · targeted boards') },
          { title: t('Déduplication', 'Deduplication'), detail: t('Normalisation', 'Normalisation') },
          { title: t('Score', 'Scoring'), detail: t('5 critères', '5 criteria') },
        ],
        support: [
          { title: t('PostgreSQL', 'PostgreSQL'), detail: t('Historique · stats', 'History · stats') },
          { title: t('Export Excel', 'Excel export'), detail: t('Offres · synthèse', 'Listings · summary') },
        ],
      },
    ],
    metrics: [
      { value: t('6+', '6+'), label: t('sites d’emploi couverts', 'job boards covered') },
      { value: t('5', '5'), label: t('critères dans le score de pertinence', 'criteria in the relevance score') },
      { value: t('5', '5'), label: t('endpoints REST', 'REST endpoints') },
      { value: t('1', '1'), label: t('recherche au lieu d’une par site', 'search instead of one per board') },
    ],
    results: [
      t(
        'Une recherche unique remplace la même requête répétée sur chaque site.',
        'A single search replaces the same query repeated on every board.',
      ),
      t(
        'Des offres dédupliquées et classées, avec un score dont chaque critère est connu.',
        'Deduplicated, ranked listings, with a score whose every criterion is known.',
      ),
      t(
        'Un historique consultable et un export Excel prêt à partager.',
        'A searchable history and an Excel export ready to share.',
      ),
    ],
    proves: t(
      'Que je sais transformer une tâche répétitive en produit complet : collecte de données, règles de classement explicables, persistance, API et export prêt à l’emploi.',
      'That I can turn a repetitive chore into a complete product: data collection, explainable ranking rules, persistence, an API and a ready-to-use export.',
    ),
    nextSteps: t(
      'Le projet tourne en local. Les recherches peuvent déjà être planifiées avec un outil externe comme cron ; une démo en ligne serait la prochaine étape.',
      'The project runs locally. Searches can already be scheduled with an external tool such as cron; an online demo would be the next step.',
    ),
    techStack: ['Python', 'Flask', 'PostgreSQL', 'SerpApi', 'pandas', 'openpyxl', 'REST', 'HTML', 'CSS', 'JavaScript'],
    links: publicRepo('https://github.com/ELGHAD/job-hunter'),
  },
  {
    id: 'traffic-sign-recognition',
    status: 'verified',
    title: t('Reconnaissance de panneaux routiers', 'Traffic sign recognition'),
    group: 'ai',
    tier: 'featured',
    categories: ['machine-learning'],
    setting: t('Projet personnel · deep learning', 'Personal project · deep learning'),
    team: 'solo',
    state: t('Terminé', 'Completed'),
    summary: t(
      'Un réseau convolutif qui reconnaît 43 classes de panneaux routiers allemands, avec 98,45 % d’exactitude sur le jeu de test officiel, proche du niveau humain.',
      'A convolutional network that recognizes 43 classes of German road signs, with 98.45% accuracy on the official test set, close to human level.',
    ),
    context: t(
      'Une brique de perception pour l’aide à la conduite doit distinguer des panneaux qui se ressemblent beaucoup. Et un score n’a de valeur que s’il est mesuré sur des données vraiment inédites.',
      'A perception building block for driver assistance has to tell apart signs that look very similar. And a score is only worth something if it is measured on truly unseen data.',
    ),
    task: t(
      'Entraîner un classifieur sur le German Traffic Sign Recognition Benchmark (GTSRB) et mesurer honnêtement ses performances.',
      'Train a classifier on the German Traffic Sign Recognition Benchmark (GTSRB) and measure its performance honestly.',
    ),
    role: t(
      'Projet mené seul, de la préparation des données à l’analyse des résultats.',
      'Done on my own, from data preparation to results analysis.',
    ),
    actions: [
      {
        title: t('Prétraitement', 'Preprocessing'),
        text: t(
          'Égalisation d’histogramme sur le canal de luminosité HSV, images redimensionnées en 48×48.',
          'Histogram equalisation on the HSV brightness channel, images resized to 48×48.',
        ),
      },
      {
        title: t('Modèle', 'Model'),
        text: t(
          'CNN de type VGG d’environ 1,36 M de paramètres, entraîné avec Keras et TensorFlow.',
          'A VGG-style CNN of about 1.36 M parameters, trained with Keras and TensorFlow.',
        ),
      },
      {
        title: t('Augmentation adaptée au domaine', 'Domain-aware augmentation'),
        text: t(
          'Rotations, décalages, zoom et cisaillement, mais aucun retournement horizontal : il inverserait les panneaux « gauche » et « droite ».',
          'Rotation, shifts, zoom and shear, but no horizontal flip: it would swap “left” and “right” signs.',
        ),
      },
      {
        title: t('Évaluation honnête', 'Honest evaluation'),
        text: t(
          'La précision de validation (~99,8 %) surestime la réalité : les images GTSRB viennent de vidéos, donc un découpage aléatoire laisse passer des quasi-doublons. Le chiffre retenu est celui du test officiel.',
          'Validation accuracy (~99.8%) overstates reality: GTSRB frames come from video, so a random split leaks near-duplicates. The figure reported is the official test score.',
        ),
      },
    ],
    architecture: t(
      'Un pipeline en notebook : préparation des images, augmentation à la volée pendant l’entraînement, CNN de type VGG, puis évaluation sur les 12 630 images du test officiel, gardées à l’écart de tout le reste.',
      'A notebook pipeline: image preparation, on-the-fly augmentation during training, a VGG-style CNN, then evaluation on the 12,630 official test images, kept apart from everything else.',
    ),
    flows: [
      {
        title: t('Le pipeline', 'The pipeline'),
        steps: [
          { title: t('GTSRB', 'GTSRB'), detail: t('43 classes', '43 classes') },
          { title: t('Prétraitement', 'Preprocessing'), detail: t('HSV · 48×48', 'HSV · 48×48') },
          { title: t('Augmentation', 'Augmentation'), detail: t('Sans retournement', 'No flipping') },
          { title: t('CNN type VGG', 'VGG-style CNN'), detail: t('~1,36 M paramètres', '~1.36 M parameters') },
          { title: t('Test officiel', 'Official test'), detail: t('12 630 images', '12,630 images') },
        ],
      },
    ],
    metrics: [
      { value: t('98,45 %', '98.45%'), label: t('exactitude sur le test officiel', 'accuracy on the official test set') },
      { value: t('98,84 %', '98.84%'), label: t('référence humaine sur ce benchmark', 'human benchmark on this dataset') },
      { value: t('43', '43'), label: t('classes de panneaux', 'sign classes') },
      { value: t('+1,15 pt', '+1.15 pt'), label: t('grâce à l’augmentation', 'from augmentation') },
    ],
    results: [
      t(
        '98,45 % sur les 12 630 images du test officiel, proche de la référence humaine (98,84 %).',
        '98.45% on the 12,630 official test images, close to the 98.84% human benchmark.',
      ),
      t(
        'L’augmentation de données fait passer l’exactitude de 97,30 % à 98,45 %.',
        'Data augmentation lifts accuracy from 97.30% to 98.45%.',
      ),
      t(
        'La fuite de données du découpage aléatoire est identifiée et documentée.',
        'The data leakage caused by a random split is identified and documented.',
      ),
    ],
    proves: t(
      'Que je ne m’arrête pas au meilleur chiffre : je choisis des augmentations qui respectent le domaine et je repère la fuite de données qui gonflerait les résultats.',
      'That I do not stop at the best-looking number: I pick augmentations that respect the domain and catch the data leakage that would inflate results.',
    ),
    techStack: ['Python', 'TensorFlow', 'Keras', 'CNN', 'scikit-image', 'scikit-learn', 'NumPy', 'pandas', 'Matplotlib', 'Jupyter'],
    links: publicRepo('https://github.com/ELGHAD/Traffic-Sign-Recognition'),
  },
  {
    id: 'xray-pneumonia',
    status: 'verified',
    title: t('Détection de pneumonie sur radiographies', 'Pneumonia detection from chest X-rays'),
    group: 'ai',
    tier: 'featured',
    categories: ['machine-learning'],
    setting: t('Projet personnel · transfer learning', 'Personal project · transfer learning'),
    team: 'solo',
    summary: t(
      'Un ResNet50 en transfer learning qui classe des radiographies pédiatriques en « normal » ou « pneumonie », suivi d’un audit critique de mon propre modèle et d’un pipeline reproductible.',
      'A ResNet50 transfer-learning model that classifies pediatric chest X-rays as normal or pneumonia, followed by a critical audit of my own model and a reproducible pipeline.',
    ),
    context: t(
      'Sur des images médicales, un bon score ne suffit pas : il faut savoir ce qu’il mesure vraiment, surtout quand les classes sont déséquilibrées et qu’un faux négatif coûte cher.',
      'On medical images, a good score is not enough: you need to know what it really measures, especially when classes are imbalanced and a false negative is costly.',
    ),
    task: t(
      'Classer les 5 856 radiographies du jeu Kermany, puis auditer et reconstruire mon propre travail.',
      'Classify the 5,856 X-rays of the Kermany dataset, then audit and rebuild my own work.',
    ),
    role: t(
      'Projet mené seul : modèle, audit, reconstruction en package et documentation.',
      'Done on my own: model, audit, rebuild as a package and documentation.',
    ),
    actions: [
      {
        title: t('Baseline', 'Baseline'),
        text: t(
          'ResNet50 pré-entraîné sur ImageNet, gelé, avec une tête de classification : ROC AUC de 0,868 et rappel pneumonie de 0,95.',
          'An ImageNet-pretrained ResNet50, frozen, with a classification head: 0.868 ROC AUC and 0.95 pneumonia recall.',
        ),
      },
      {
        title: t('Audit de la baseline', 'Baseline audit'),
        text: t(
          'Quatre faiblesses identifiées : une validation de seulement 16 images, un déséquilibre de 1 pour 2,9, un prétraitement ResNet50 mal appliqué et une phase de fine-tuning qui ne s’exécutait jamais.',
          'Four weaknesses found: a 16-image validation set, a 1:2.9 class imbalance, mismatched ResNet50 preprocessing, and a fine-tuning phase that never ran.',
        ),
      },
      {
        title: t('Reconstruction', 'Rebuild'),
        text: t(
          'Package Python en ligne de commande (train, evaluate, predict) : split de validation fixé par graine, pondération des classes, prétraitement propre à ResNet50, fine-tuning en deux phases.',
          'A command-line Python package (train, evaluate, predict): seeded validation split, class weights, ResNet50’s own preprocessing, two-phase fine-tuning.',
        ),
      },
      {
        title: t('Traçabilité', 'Traceability'),
        text: t(
          'Suivi de l’AUC, de la précision et du rappel, métriques et courbes sauvegardées, et une model card.',
          'AUC, precision and recall tracking, saved metrics and plots, and a model card.',
        ),
      },
    ],
    architecture: t(
      'Deux temps : un notebook de baseline sur Google Colab (GPU), puis un package Python en ligne de commande qui rend chaque étape reproductible, de l’entraînement à la prédiction.',
      'Two stages: a baseline notebook on Google Colab (GPU), then a command-line Python package that makes every step reproducible, from training to prediction.',
    ),
    flows: [
      {
        title: t('De la baseline au pipeline reproductible', 'From baseline to reproducible pipeline'),
        steps: [
          { title: t('Kermany', 'Kermany'), detail: t('5 856 radiographies', '5,856 X-rays') },
          { title: t('Baseline', 'Baseline'), detail: t('ResNet50 gelé', 'Frozen ResNet50') },
          { title: t('Audit', 'Audit'), detail: t('4 faiblesses', '4 weaknesses') },
          { title: t('Package CLI', 'CLI package'), detail: t('train · evaluate · predict', 'train · evaluate · predict') },
          { title: t('Model card', 'Model card'), detail: t('Métriques · courbes', 'Metrics · plots') },
        ],
      },
    ],
    metrics: [
      { value: t('0,868', '0.868'), label: t('ROC AUC de la baseline', 'baseline ROC AUC') },
      { value: t('0,95', '0.95'), label: t('rappel pneumonie (baseline)', 'pneumonia recall (baseline)') },
      { value: t('4', '4'), label: t('faiblesses trouvées et corrigées', 'weaknesses found and fixed') },
      { value: t('5 856', '5,856'), label: t('radiographies', 'X-ray images') },
    ],
    results: [
      t(
        'Baseline : ROC AUC de 0,868 et rappel pneumonie de 0,95 sur les 624 images de test.',
        'Baseline: 0.868 ROC AUC and 0.95 pneumonia recall on the 624 test images.',
      ),
      t(
        'Quatre biais de la baseline identifiés et corrigés dans la reconstruction.',
        'Four baseline flaws identified and fixed in the rebuild.',
      ),
      t(
        'Un pipeline reproductible en ligne de commande, documenté par une model card.',
        'A reproducible command-line pipeline, documented with a model card.',
      ),
    ],
    proves: t(
      'Que je sais critiquer mon propre modèle, corriger ce qui fausse les résultats et livrer un pipeline reproductible plutôt qu’un notebook isolé.',
      'That I can critique my own model, fix what skews the results, and ship a reproducible pipeline instead of a one-off notebook.',
    ),
    techStack: ['Python', 'TensorFlow', 'Keras', 'ResNet50', 'scikit-learn', 'NumPy', 'pandas', 'Matplotlib', 'Google Colab'],
    links: publicRepo('https://github.com/ELGHAD/XRay-Pneumonia-Classification'),
  },
  {
    id: 'emsi-association',
    status: 'verified',
    title: t('EMSI Association · vie étudiante', 'EMSI Association · student life'),
    group: 'web',
    tier: 'featured',
    categories: ['web-cms', 'full-stack'],
    setting: t('Projet académique · EMSI Rabat', 'Academic project · EMSI Rabat'),
    team: 'solo',
    state: t('Terminé', 'Completed'),
    summary: t(
      'Une application Laravel qui réunit les clubs, les adhésions, les événements et les actualités de l’EMSI Rabat, avec un espace étudiant et un espace administrateur.',
      'A Laravel application that brings together the clubs, memberships, events and news of EMSI Rabat, with a student space and an admin space.',
    ),
    context: t(
      'La vie associative de l’école passait par des groupes de messagerie et des affiches : difficile de savoir quels clubs existent, qui en fait partie et ce qui se prépare.',
      'Student life at the school ran on messaging groups and posters: hard to know which clubs exist, who belongs to them and what is coming up.',
    ),
    task: t(
      'Centraliser la vie étudiante sur une seule plateforme, avec un espace pour les étudiants et un autre pour les administrateurs.',
      'Bring student life onto one platform, with one space for students and another for administrators.',
    ),
    role: t(
      'Projet conçu et développé seul dans le cadre de ma formation à l’EMSI : modélisation UML, back-end Laravel, interfaces et administration.',
      'Designed and built on my own as part of my studies at EMSI: UML modelling, Laravel back end, interfaces and administration.',
    ),
    actions: [
      {
        title: t('Conception UML', 'UML design'),
        text: t(
          'Le système est modélisé en UML avec StarUML avant le développement.',
          'The system is modelled in UML with StarUML before development.',
        ),
      },
      {
        title: t('Rôles et authentification', 'Roles and authentication'),
        text: t(
          'Inscription et connexion avec Laravel Sanctum, permissions par rôle : étudiant ou administrateur.',
          'Registration and login with Laravel Sanctum, role-based permissions: student or administrator.',
        ),
      },
      {
        title: t('Clubs et adhésions', 'Clubs and memberships'),
        text: t(
          'Création et gestion des clubs, de leurs membres et des adhésions des étudiants.',
          'Creating and managing clubs, their members and student memberships.',
        ),
      },
      {
        title: t('Événements et actualités', 'Events and news'),
        text: t(
          'Publication d’événements avec inscriptions et suivi de la participation ; publication et lecture des actualités du campus.',
          'Publishing events with registrations and participation tracking; publishing and reading campus news.',
        ),
      },
      {
        title: t('Interface responsive', 'Responsive interface'),
        text: t(
          'Vues Blade, Tailwind CSS et JavaScript, assets compilés avec Vite ; un tableau de bord dédié à chaque rôle.',
          'Blade views, Tailwind CSS and JavaScript, assets built with Vite; a dedicated dashboard for each role.',
        ),
      },
    ],
    architecture: t(
      'Architecture MVC de Laravel : les routes mènent aux contrôleurs et middlewares, les modèles Eloquent persistent les données dans MySQL, les vues Blade rendent l’interface.',
      'Laravel’s MVC architecture: routes lead to controllers and middleware, Eloquent models persist data in MySQL, Blade views render the interface.',
    ),
    flows: [
      {
        title: t('Architecture MVC', 'MVC architecture'),
        steps: [
          { title: t('Navigateur', 'Browser') },
          { title: t('Routes Laravel', 'Laravel routes'), detail: t('Middlewares · Sanctum', 'Middleware · Sanctum') },
          { title: t('Contrôleurs', 'Controllers') },
          { title: t('Modèles Eloquent', 'Eloquent models') },
          { title: t('MySQL', 'MySQL') },
        ],
        support: [{ title: t('Vues Blade', 'Blade views'), detail: t('Tailwind CSS · JavaScript', 'Tailwind CSS · JavaScript') }],
      },
    ],
    metrics: [
      { value: t('2', '2'), label: t('rôles : étudiant et administrateur', 'roles: student and administrator') },
      { value: t('4', '4'), label: t('domaines : clubs, membres, événements, actualités', 'domains: clubs, members, events, news') },
      { value: t('1', '1'), label: t('plateforme au lieu des groupes et affiches', 'platform instead of groups and posters') },
    ],
    results: [
      t(
        'La vie associative de l’école réunie sur une seule plateforme.',
        'The school’s student life brought onto a single platform.',
      ),
      t(
        'Des espaces séparés par rôle, avec un back-office complet pour les administrateurs.',
        'Role-separated spaces, with a full back office for administrators.',
      ),
    ],
    proves: t(
      'Que je sais construire seul une application web complète : modélisation UML, rôles et permissions, back-office et interface responsive.',
      'That I can build a complete web application on my own: UML modelling, roles and permissions, back office and responsive interface.',
    ),
    techStack: ['PHP', 'Laravel', 'Eloquent', 'Blade', 'Tailwind CSS', 'JavaScript', 'Vite', 'MySQL', 'Sanctum', 'UML', 'MVC'],
    links: publicRepo('https://github.com/ELGHAD/Emsi_Association'),
  },
  {
    id: 'stock-management',
    status: 'verified',
    title: t('Stock Management · app mobile Flutter', 'Stock Management · Flutter mobile app'),
    group: 'apps',
    tier: 'standard',
    categories: ['mobile'],
    setting: t('Projet personnel · mobile', 'Personal project · mobile'),
    team: 'solo',
    summary: t(
      'Une application mobile qui fonctionne d’abord hors ligne, pour que les petits commerces sachent à tout moment ce qu’ils ont en stock, ce qui va manquer et ce qui s’est passé.',
      'An offline-first mobile app that lets small businesses know at any time what they have in stock, what is about to run out and what happened.',
    ),
    context: t(
      'Un client demande un article, le gérant se tourne vers l’étagère : il n’en reste plus. Le problème n’est pas technique, c’est un problème d’information : le stock existe, mais personne ne sait exactement ce qu’il contient ni quand réapprovisionner.',
      'A customer asks for an item, the manager turns to the shelf: none left. The problem is not technical, it is about information: the stock exists, but nobody knows exactly what it holds or when to restock.',
    ),
    task: t(
      'Construire un outil qui tienne dans la poche du gérant, fonctionne sans connexion et réponde à trois questions : qu’ai-je en stock et combien cela vaut-il ? qu’est-ce qui va manquer ? que s’est-il passé, quand et pourquoi ?',
      'Build a tool that fits in the manager’s pocket, works offline and answers three questions: what do I have and what is it worth? what is about to run out? what happened, when and why?',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Catalogue avec seuils d’alerte', 'Catalogue with alert thresholds'),
        text: t(
          'Chaque produit a un nom, une description, un prix, une quantité et son propre seuil d’alerte, et peut être rattaché à un fournisseur.',
          'Each product has a name, description, price, quantity and its own alert threshold, and can be linked to a supplier.',
        ),
      },
      {
        title: t('Mouvements traçables', 'Traceable movements'),
        text: t(
          'Chaque entrée (réception, réapprovisionnement) et chaque sortie (vente, perte, casse) est enregistrée avec sa quantité, sa date et son motif ; la quantité du produit se met à jour automatiquement.',
          'Every stock-in (delivery, restock) and stock-out (sale, loss, breakage) is recorded with its quantity, date and reason; product quantity updates automatically.',
        ),
      },
      {
        title: t('Tableau de bord', 'Dashboard'),
        text: t(
          'Nombre de produits, produits disponibles et en rupture, valeur totale du stock, graphique circulaire et liste des produits à réapprovisionner en priorité.',
          'Product count, in-stock and out-of-stock products, total stock value, a pie chart and the list of products to restock first.',
        ),
      },
      {
        title: t('Hors ligne d’abord', 'Offline first'),
        text: t(
          'Données locales avec Hive : l’application reste utilisable sans réseau. Le repository tente la source distante (Dio) puis bascule sur les données locales.',
          'Local data with Hive: the app stays usable without a network. The repository tries the remote source (Dio), then falls back to local data.',
        ),
      },
      {
        title: t('Clean Architecture', 'Clean Architecture'),
        text: t(
          'Cinq modules (auth, produits, fournisseurs, stock, tableau de bord), chacun en trois couches : data, domain, presentation. État géré avec BLoC, dépendances injectées avec get_it.',
          'Five modules (auth, products, suppliers, stock, dashboard), each in three layers: data, domain, presentation. State managed with BLoC, dependencies injected with get_it.',
        ),
      },
    ],
    architecture: t(
      'Clean Architecture organisée par fonctionnalité. La logique métier reste indépendante du framework, de l’API et de la base : chaque action suit le même chemin, de l’écran au repository, qui choisit entre source distante et source locale.',
      'Clean Architecture organised by feature. Business logic stays independent of the framework, the API and the database: every action follows the same path, from screen to repository, which picks the remote or local source.',
    ),
    flows: [
      {
        title: t('Le trajet d’une action', 'The path of an action'),
        steps: [
          { title: t('Écran', 'Screen'), detail: t('Material Design 3', 'Material Design 3') },
          { title: t('BLoC', 'BLoC'), detail: t('Événements · états', 'Events · states') },
          { title: t('Cas d’usage', 'Use case'), detail: t('Domaine', 'Domain') },
          { title: t('Repository', 'Repository'), detail: t('Distant puis local', 'Remote then local') },
          { title: t('Hive', 'Hive'), detail: t('Hors ligne', 'Offline') },
        ],
        support: [
          { title: t('Dio', 'Dio'), detail: t('API REST à venir', 'Future REST API') },
          { title: t('get_it', 'get_it'), detail: t('Injection de dépendances', 'Dependency injection') },
        ],
      },
    ],
    metrics: [
      { value: t('3', '3'), label: t('questions auxquelles l’app répond', 'questions the app answers') },
      { value: t('5', '5'), label: t('modules métier', 'business modules') },
      { value: t('3', '3'), label: t('couches par module', 'layers per module') },
      { value: t('0', '0'), label: t('connexion nécessaire pour l’utiliser', 'connection needed to use it') },
    ],
    results: [
      t(
        'Le gérant sait à tout moment ce qu’il a, ce que cela vaut et ce qui va manquer.',
        'The manager knows at any time what they have, what it is worth and what is about to run out.',
      ),
      t(
        'Chaque mouvement de stock est traçable : quantité, date et motif.',
        'Every stock movement is traceable: quantity, date and reason.',
      ),
      t(
        'Une couche réseau déjà prête pour une future synchronisation avec une API.',
        'A network layer already in place for a future API sync.',
      ),
    ],
    proves: t(
      'Que je structure une application mobile avec la même rigueur qu’un backend : couches nettes, état prévisible, données disponibles sans réseau.',
      'That I structure a mobile app with the same discipline as a backend: clean layers, predictable state, data available without a network.',
    ),
    techStack: ['Flutter', 'Dart', 'flutter_bloc', 'get_it', 'Dio', 'Hive', 'fl_chart', 'Material Design 3', 'Clean Architecture'],
    links: publicRepo('https://github.com/ELGHAD/stock-Management'),
  },
  {
    id: 'restaurant-management',
    status: 'verified',
    title: t('Restaurant Management · ASP.NET Core', 'Restaurant Management · ASP.NET Core'),
    group: 'web',
    tier: 'standard',
    categories: ['backend', 'full-stack'],
    setting: t('Projet personnel · .NET', 'Personal project · .NET'),
    team: 'solo',
    summary: t(
      'Un back-office web pour le quotidien d’un restaurant : plats, ingrédients, employés, réservations, commandes et ventes, réunis dans une seule application ASP.NET Core.',
      'A web back office for a restaurant’s daily operations: dishes, ingredients, staff, reservations, orders and sales, in one ASP.NET Core application.',
    ),
    context: t(
      'Un restaurant jongle chaque jour avec ses recettes, ses ingrédients, ses réservations, ses commandes et ses ventes. Quand ces informations vivent à des endroits différents, les erreurs de calcul et d’oubli s’accumulent.',
      'A restaurant juggles recipes, ingredients, reservations, orders and sales every day. When this information lives in different places, calculation errors and omissions pile up.',
    ),
    task: t(
      'Centraliser les opérations du restaurant dans une application web sécurisée, avec un modèle relationnel qui fait les calculs à la place des humains.',
      'Bring the restaurant’s operations into one secured web application, with a relational model that does the maths instead of people.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Six domaines métier', 'Six business domains'),
        text: t(
          'Écrans CRUD complets pour les plats, les ingrédients, les employés, les réservations, les commandes et les ventes.',
          'Full CRUD screens for dishes, ingredients, staff, reservations, orders and sales.',
        ),
      },
      {
        title: t('Recettes modélisées', 'Modelled recipes'),
        text: t(
          'Relation plusieurs-à-plusieurs plats ↔ ingrédients, avec une entité de jonction qui stocke la quantité nécessaire pour chaque recette.',
          'Many-to-many dishes ↔ ingredients relation, with a junction entity that stores the quantity each recipe needs.',
        ),
      },
      {
        title: t('Calculs en base', 'Computed in the database'),
        text: t(
          'Totaux de ligne et montants de vente calculés directement par SQL Server (colonnes calculées) : un seul endroit fait foi.',
          'Line totals and sale amounts computed directly by SQL Server (computed columns): a single source of truth.',
        ),
      },
      {
        title: t('Sécurité et évolution', 'Security and evolution'),
        text: t(
          'Comptes gérés par ASP.NET Core Identity ; schéma versionné avec les migrations Entity Framework Core.',
          'Accounts handled by ASP.NET Core Identity; schema versioned with Entity Framework Core migrations.',
        ),
      },
    ],
    architecture: t(
      'MVC ASP.NET Core : les contrôleurs traitent les requêtes, les modèles portent les entités et le contexte de données, les vues Razor rendent l’interface, Entity Framework Core relie le tout à SQL Server.',
      'ASP.NET Core MVC: controllers handle requests, models carry the entities and data context, Razor views render the interface, Entity Framework Core connects everything to SQL Server.',
    ),
    flows: [
      {
        title: t('Architecture MVC', 'MVC architecture'),
        steps: [
          { title: t('Navigateur', 'Browser') },
          { title: t('Contrôleurs', 'Controllers'), detail: t('ASP.NET Core MVC', 'ASP.NET Core MVC') },
          { title: t('Modèles', 'Models'), detail: t('Entités · contexte', 'Entities · context') },
          { title: t('EF Core 9', 'EF Core 9'), detail: t('Migrations', 'Migrations') },
          { title: t('SQL Server', 'SQL Server'), detail: t('Colonnes calculées', 'Computed columns') },
        ],
        support: [
          { title: t('Vues Razor', 'Razor views'), detail: t('Bootstrap · jQuery', 'Bootstrap · jQuery') },
          { title: t('Identity', 'Identity'), detail: t('Comptes', 'Accounts') },
        ],
      },
    ],
    metrics: [
      { value: t('6', '6'), label: t('domaines gérés dans une seule app', 'domains managed in one app') },
      { value: t('.NET 8', '.NET 8'), label: t('avec EF Core 9 et SQL Server', 'with EF Core 9 and SQL Server') },
    ],
    results: [
      t(
        'Les opérations du restaurant réunies dans une seule application sécurisée.',
        'The restaurant’s operations brought into one secured application.',
      ),
      t(
        'Des recettes et des montants que la base de données calcule et garde cohérents.',
        'Recipes and amounts that the database computes and keeps consistent.',
      ),
    ],
    proves: t(
      'La même rigueur de modélisation, transposée à C# et .NET : je passe d’un écosystème à l’autre sans repartir de zéro.',
      'The same modelling discipline, carried over to C# and .NET: I move between ecosystems without starting over.',
    ),
    techStack: ['C#', '.NET 8', 'ASP.NET Core MVC', 'Razor', 'EF Core 9', 'SQL Server', 'ASP.NET Core Identity', 'Bootstrap', 'jQuery'],
    links: publicRepo('https://github.com/ELGHAD/Restaurant_Management'),
  },
  {
    id: 'clothing-ecommerce',
    status: 'verified',
    title: t('Clothing E-commerce · Laravel 12', 'Clothing E-commerce · Laravel 12'),
    group: 'web',
    tier: 'standard',
    categories: ['web-cms', 'full-stack'],
    setting: t('Projet personnel', 'Personal project'),
    team: 'solo',
    state: t('Partiel · authentification à finaliser', 'Partial · authentication to finish'),
    summary: t(
      'Une boutique de vêtements en Laravel 12 : catalogue filtrable, panier, commande transactionnelle qui met à jour le stock, et historique des commandes.',
      'A Laravel 12 clothing store: filterable catalogue, cart, transactional checkout that updates inventory, and order history.',
    ),
    context: t(
      'Ce qui casse une boutique en ligne n’est pas la page produit : c’est la commande à moitié enregistrée, le stock qui ne suit pas, ou un client qui voit le panier d’un autre.',
      'What breaks an online store is not the product page: it is the half-saved order, inventory that falls out of sync, or a customer who sees someone else’s cart.',
    ),
    task: t(
      'Modéliser les parcours clés d’une boutique de vêtements, de la découverte du produit à la commande, en traitant d’abord les cas qui compromettent les données.',
      'Model the key journeys of a clothing store, from product discovery to checkout, tackling first the cases that put data at risk.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Découverte produit', 'Product discovery'),
        text: t(
          'Catalogue paginé avec filtres (catégorie, prix, taille, couleur), recherche texte, tri, produits associés et plusieurs images par produit.',
          'Paginated catalogue with filters (category, price, size, colour), text search, sorting, related products and several images per product.',
        ),
      },
      {
        title: t('Panier', 'Cart'),
        text: t('Panier en session, utilisable par les visiteurs.', 'Session-based cart that works for guests.'),
      },
      {
        title: t('Commande transactionnelle', 'Transactional checkout'),
        text: t(
          'Sous-total, taxes et livraison calculés, puis commande créée dans une transaction qui met aussi à jour le stock : pas de commande à moitié enregistrée.',
          'Subtotal, taxes and shipping computed, then the order is created in a transaction that also updates inventory: no half-saved orders.',
        ),
      },
      {
        title: t('Protection des données', 'Data protection'),
        text: t(
          'Validation, protection CSRF, contrôle du mass assignment et vérifications de propriété sur les commandes et les paniers.',
          'Validation, CSRF protection, mass-assignment control and ownership checks on orders and carts.',
        ),
      },
    ],
    architecture: t(
      'Laravel 12 en MVC : contrôleurs, modèles Eloquent sur SQLite, vues Blade stylées avec Tailwind CSS 4 et compilées avec Vite.',
      'Laravel 12 as MVC: controllers, Eloquent models on SQLite, Blade views styled with Tailwind CSS 4 and built with Vite.',
    ),
    flows: [
      {
        title: t('Le parcours d’achat', 'The purchase journey'),
        caption: t('La commande et le stock sont écrits ensemble, ou pas du tout.', 'The order and the inventory are written together, or not at all.'),
        steps: [
          { title: t('Catalogue', 'Catalogue'), detail: t('Filtres · recherche · tri', 'Filters · search · sort') },
          { title: t('Panier', 'Cart'), detail: t('Session', 'Session') },
          { title: t('Calcul', 'Totals'), detail: t('Sous-total · taxes · livraison', 'Subtotal · taxes · shipping') },
          { title: t('Transaction', 'Transaction'), detail: t('Commande + stock', 'Order + inventory') },
          { title: t('Historique', 'History'), detail: t('Commandes du client', 'Customer orders') },
        ],
      },
    ],
    metrics: [
      { value: t('4', '4'), label: t('filtres : catégorie, prix, taille, couleur', 'filters: category, price, size, colour') },
      { value: t('1', '1'), label: t('transaction pour la commande et le stock', 'transaction for order and inventory') },
    ],
    results: [
      t('Un parcours d’achat complet, du catalogue à l’historique.', 'A complete purchase journey, from catalogue to history.'),
      t('Des commandes atomiques et un stock cohérent.', 'Atomic orders and consistent inventory.'),
    ],
    proves: t(
      'Que je pense aux cas qui cassent un e-commerce : commande atomique, stock cohérent, données protégées.',
      'That I think about what breaks an online store: atomic orders, consistent stock, protected data.',
    ),
    nextSteps: t(
      'Encore à faire : finaliser l’authentification Breeze et l’espace d’administration, puis couvrir les calculs, le stock et les autorisations par des tests automatisés.',
      'Still to do: finish Breeze authentication and the admin area, then cover totals, inventory and authorization with automated tests.',
    ),
    techStack: ['PHP 8.2', 'Laravel 12', 'Eloquent', 'Blade', 'Tailwind CSS 4', 'Vite', 'SQLite'],
    links: publicRepo('https://github.com/ELGHAD/Clothing-ecommerce'),
  },
  {
    id: 'product-management-api',
    status: 'verified',
    title: t('Product Management API · Spring Boot', 'Product Management API · Spring Boot'),
    group: 'web',
    tier: 'standard',
    categories: ['backend'],
    setting: t('Projet personnel · API REST', 'Personal project · REST API'),
    team: 'solo',
    summary: t(
      'Une API REST Spring Boot 4 de gestion de produits, en couches controller, service, repository et modèle, avec des produits rattachés à leurs utilisateurs.',
      'A Spring Boot 4 REST API for product management, in controller, service, repository and model layers, with products linked to their users.',
    ),
    context: t(
      'Avant de construire des backends plus ambitieux, il faut maîtriser les fondamentaux : un contrat REST clair, des couches qui ne se mélangent pas et un modèle JPA bien mappé.',
      'Before building more ambitious backends, you need to master the fundamentals: a clear REST contract, layers that do not mix, and a well-mapped JPA model.',
    ),
    task: t(
      'Construire une API CRUD propre sur deux entités liées, produits et utilisateurs, avec Spring Boot, Spring Data JPA et MySQL.',
      'Build a clean CRUD API on two related entities, products and users, with Spring Boot, Spring Data JPA and MySQL.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('CRUD des produits', 'Product CRUD'),
        text: t(
          'Cinq endpoints : lister, lire, créer, modifier et supprimer, avec des réponses HTTP adaptées via ResponseEntity.',
          'Five endpoints: list, read, create, update and delete, with appropriate HTTP responses through ResponseEntity.',
        ),
      },
      {
        title: t('Produits par utilisateur', 'Products per user'),
        text: t(
          'Deux endpoints dédiés pour lister et créer les produits d’un utilisateur, via une relation ManyToOne.',
          'Two dedicated endpoints to list and create a user’s products, through a ManyToOne relation.',
        ),
      },
      {
        title: t('Modèle JPA', 'JPA model'),
        text: t(
          'Contraintes de colonnes (non nul, longueur), date de création posée par @PrePersist, et relation masquée à la sérialisation pour éviter les boucles JSON.',
          'Column constraints (not null, length), creation date set by @PrePersist, and the relation hidden from serialization to avoid JSON loops.',
        ),
      },
      {
        title: t('Couches séparées', 'Separate layers'),
        text: t(
          'Contrôleurs, services et repositories Spring Data JPA distincts pour les produits et les utilisateurs.',
          'Distinct controllers, services and Spring Data JPA repositories for products and users.',
        ),
      },
    ],
    architecture: t(
      'Architecture en couches : le contrôleur REST reçoit le JSON, le service porte la logique, le repository Spring Data JPA accède à MySQL via Hibernate.',
      'Layered architecture: the REST controller receives JSON, the service holds the logic, the Spring Data JPA repository reaches MySQL through Hibernate.',
    ),
    flows: [
      {
        title: t('Les couches de l’API', 'API layers'),
        steps: [
          { title: t('Client', 'Client'), detail: t('HTTP · JSON', 'HTTP · JSON') },
          { title: t('Controller', 'Controller'), detail: t('7 endpoints', '7 endpoints') },
          { title: t('Service', 'Service') },
          { title: t('Repository', 'Repository'), detail: t('Spring Data JPA', 'Spring Data JPA') },
          { title: t('MySQL', 'MySQL'), detail: t('Hibernate', 'Hibernate') },
        ],
      },
    ],
    metrics: [
      { value: t('7', '7'), label: t('endpoints REST', 'REST endpoints') },
      { value: t('2', '2'), label: t('entités liées : produit et utilisateur', 'related entities: product and user') },
      { value: t('4.0', '4.0'), label: t('version de Spring Boot', 'Spring Boot version') },
    ],
    results: [
      t('Une API CRUD complète sur les produits, plus des routes par utilisateur.', 'A complete product CRUD API, plus per-user routes.'),
      t('Un modèle JPA contraint, sans boucle de sérialisation.', 'A constrained JPA model, with no serialization loops.'),
    ],
    proves: t(
      'Les bases que j’applique à tous mes backends Java : couches nettes, contrat REST lisible, modèle JPA rigoureux.',
      'The basics I apply to every Java backend: clean layers, a readable REST contract, a rigorous JPA model.',
    ),
    techStack: ['Java 17', 'Spring Boot 4', 'Spring Web MVC', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Maven'],
    links: publicRepo('https://github.com/ELGHAD/Product-Management-API'),
  },
  {
    id: 'task-management-symfony',
    status: 'verified',
    title: t('Task Management System · Symfony', 'Task Management System · Symfony'),
    group: 'web',
    tier: 'standard',
    categories: ['backend'],
    setting: t('Projet personnel · modélisation de domaine', 'Personal project · domain modelling'),
    team: 'solo',
    state: t('Centré sur le modèle de domaine', 'Focused on the domain model'),
    summary: t(
      'Le modèle de domaine, en Symfony et Doctrine, d’une application où une équipe organise son travail : utilisateurs hiérarchisés, projets, tâches, notifications et valeurs métier typées.',
      'The Symfony and Doctrine domain model of an app where a team organises its work: a user hierarchy, projects, tasks, notifications and typed business values.',
    ),
    context: t(
      'Dans une application de gestion de tâches, presque tous les bugs viennent d’un modèle mal posé : des rôles en chaînes libres, des statuts incohérents, des relations floues.',
      'In a task management app, almost every bug comes from a poorly designed model: roles as free strings, inconsistent statuses, fuzzy relations.',
    ),
    task: t(
      'Poser d’abord un modèle de domaine solide, avant les écrans et les workflows.',
      'Lay down a solid domain model first, before screens and workflows.',
    ),
    role: t(
      'Projet personnel, distinct de l’application confidentielle réalisée pendant mon stage chez ALTEN en 2024, malgré un sujet proche.',
      'A personal project, separate from the confidential application I built during my 2024 ALTEN internship, despite a similar subject.',
    ),
    actions: [
      {
        title: t('Hiérarchie d’utilisateurs', 'User hierarchy'),
        text: t(
          'Une entité de base Utilisateur et trois sous-types (Admin, Manager, User), mappés avec l’héritage JOINED de Doctrine.',
          'A base Utilisateur entity and three subtypes (Admin, Manager, User), mapped with Doctrine’s JOINED inheritance.',
        ),
      },
      {
        title: t('Projets et tâches', 'Projects and tasks'),
        text: t(
          'Un projet a une description, une échéance, un statut et ses tâches ; une tâche a une échéance, un statut, une priorité, un projet et un utilisateur assigné.',
          'A project has a description, deadline, status and its tasks; a task has a deadline, status, priority, project and assigned user.',
        ),
      },
      {
        title: t('Valeurs métier typées', 'Typed business values'),
        text: t(
          'Quatre énumérations PHP natives : rôle, statut de projet, statut de tâche et priorité.',
          'Four native PHP enums: role, project status, task status and priority.',
        ),
      },
      {
        title: t('Notifications', 'Notifications'),
        text: t(
          'Une entité Notification liée à l’utilisateur, base des futurs workflows de notification.',
          'A Notification entity linked to the user, the foundation for future notification workflows.',
        ),
      },
    ],
    architecture: t(
      'Symfony 5.4 et Doctrine ORM : entités, énumérations, repositories et migrations versionnées. Les workflows applicatifs viendront ensuite sur ce modèle.',
      'Symfony 5.4 and Doctrine ORM: entities, enums, repositories and versioned migrations. Application workflows will come next on top of this model.',
    ),
    flows: [
      {
        title: t('Le modèle de domaine', 'The domain model'),
        steps: [
          { title: t('Utilisateur', 'User'), detail: t('Admin · Manager · User', 'Admin · Manager · User') },
          { title: t('Projet', 'Project'), detail: t('Statut · échéance', 'Status · deadline') },
          { title: t('Tâche', 'Task'), detail: t('Statut · priorité', 'Status · priority') },
          { title: t('Notification', 'Notification') },
        ],
        support: [
          { title: t('Enums PHP', 'PHP enums'), detail: t('Role · statuts · Priority', 'Role · statuses · Priority') },
          { title: t('Doctrine', 'Doctrine'), detail: t('JOINED · migrations', 'JOINED · migrations') },
        ],
      },
    ],
    metrics: [
      { value: t('7', '7'), label: t('entités Doctrine', 'Doctrine entities') },
      { value: t('4', '4'), label: t('énumérations PHP natives', 'native PHP enums') },
      { value: t('3', '3'), label: t('sous-types d’utilisateur (JOINED)', 'user subtypes (JOINED)') },
    ],
    results: [
      t('Un modèle de domaine complet et typé, prêt à recevoir les workflows.', 'A complete, typed domain model, ready for workflows.'),
      t('Un schéma versionné par les migrations Doctrine.', 'A schema versioned with Doctrine migrations.'),
    ],
    proves: t(
      'Que je commence par le modèle : héritage, relations et valeurs typées posés avant la première vue.',
      'That I start with the model: inheritance, relations and typed values set before the first view.',
    ),
    nextSteps: t(
      'Prochaines étapes : les contrôleurs, l’authentification et les workflows CRUD sur ce modèle.',
      'Next steps: controllers, authentication and CRUD workflows on top of this model.',
    ),
    techStack: ['PHP 8.1', 'Symfony 5.4', 'Doctrine ORM', 'Doctrine Migrations', 'MySQL', 'PHP enums', 'Twig'],
    links: publicRepo('https://github.com/ELGHAD/gestionnaire-tache'),
  },
  {
    id: 'little-lemon-django',
    status: 'verified',
    title: t('Little Lemon · Django', 'Little Lemon · Django'),
    group: 'web',
    tier: 'standard',
    categories: ['web-cms', 'full-stack'],
    setting: t('Projet personnel · Python', 'Personal project · Python'),
    team: 'solo',
    summary: t(
      'Le site d’un restaurant piloté par la base de données : menu et fiches plats générés depuis les modèles Django, gérés par l’équipe depuis un admin personnalisé.',
      'A database-driven restaurant website: menu and dish pages generated from Django models, managed by staff from a customised admin.',
    ),
    context: t(
      'Un menu écrit en dur dans le HTML oblige à toucher au code à chaque changement de plat ou de prix.',
      'A menu hardcoded in HTML means touching the code every time a dish or a price changes.',
    ),
    task: t(
      'Construire un site de restaurant où le menu vit dans la base de données et se gère sans développeur.',
      'Build a restaurant site where the menu lives in the database and is managed without a developer.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Menu piloté par les données', 'Data-driven menu'),
        text: t(
          'Plats récupérés via l’ORM Django, triés par ordre alphabétique, avec une page de détail pour chaque plat.',
          'Dishes fetched through the Django ORM, sorted alphabetically, with a detail page for each dish.',
        ),
      },
      {
        title: t('Images des plats', 'Dish images'),
        text: t(
          'Images stockées via ImageField, traitées avec Pillow et affichées dans le menu et les fiches.',
          'Images stored through ImageField, processed with Pillow and shown in the menu and dish pages.',
        ),
      },
      {
        title: t('Admin personnalisé', 'Customised admin'),
        text: t(
          'Colonnes affichées et recherche personnalisées : l’équipe ajoute, modifie et supprime des plats sans toucher au code.',
          'Custom displayed columns and search: staff add, edit and delete dishes without touching code.',
        ),
      },
      {
        title: t('Templates réutilisables', 'Reusable templates'),
        text: t(
          'Héritage de templates, vues basées sur des classes et CSS responsive sans framework lourd.',
          'Template inheritance, class-based views and responsive CSS without a heavy framework.',
        ),
      },
    ],
    architecture: t(
      'Architecture Model-View-Template de Django : le routage mène aux vues, qui lisent les modèles via l’ORM (SQLite) et rendent les templates.',
      'Django’s Model-View-Template architecture: routing leads to views, which read models through the ORM (SQLite) and render templates.',
    ),
    flows: [
      {
        title: t('Architecture MVT', 'MVT architecture'),
        steps: [
          { title: t('Navigateur', 'Browser') },
          { title: t('Routage', 'URL routing') },
          { title: t('Vues', 'Views'), detail: t('Basées sur des classes', 'Class-based') },
          { title: t('Modèles · ORM', 'Models · ORM') },
          { title: t('SQLite', 'SQLite') },
        ],
        support: [
          { title: t('Django Admin', 'Django Admin'), detail: t('Gestion du menu', 'Menu management') },
          { title: t('Templates', 'Templates'), detail: t('Héritage', 'Inheritance') },
        ],
      },
    ],
    metrics: [
      { value: t('0', '0'), label: t('ligne de code à changer pour modifier le menu', 'lines of code to change to edit the menu') },
      { value: t('5', '5'), label: t('Django, version majeure', 'Django, major version') },
    ],
    results: [
      t('Un menu géré entièrement depuis l’administration.', 'A menu managed entirely from the admin.'),
      t('Des pages cohérentes grâce à l’héritage de templates.', 'Consistent pages thanks to template inheritance.'),
    ],
    proves: t(
      'Que je sépare contenu et code dès la conception : l’équipe gère, le site suit.',
      'That I separate content from code from the start: staff manage, the site follows.',
    ),
    nextSteps: t(
      'La page de réservation est informative ; un vrai parcours de réservation serait l’étape suivante.',
      'The reservation page is informational; a real booking flow would be the next step.',
    ),
    techStack: ['Python', 'Django 5', 'Django ORM', 'SQLite', 'Pillow', 'HTML', 'CSS'],
    links: publicRepo('https://github.com/ELGHAD/Restaurant-django'),
  },
  {
    id: 'hand-gesture-recognition',
    status: 'verified',
    title: t('Reconnaissance de gestes de la main', 'Hand gesture recognition'),
    group: 'ai',
    tier: 'standard',
    categories: ['machine-learning'],
    setting: t('Projet personnel · vision par ordinateur', 'Personal project · computer vision'),
    team: 'solo',
    state: t('Entraîné sur données synthétiques', 'Trained on synthetic data'),
    summary: t(
      'Un pipeline de vision complet, des données jusqu’à la webcam : un CNN reconnaît trois gestes de la main en temps réel.',
      'A complete vision pipeline, from data to webcam: a CNN recognizes three hand gestures in real time.',
    ),
    context: t(
      'Commander une machine d’un geste demande deux choses très différentes : un modèle qui classe bien, et une application temps réel qui reste stable image après image.',
      'Controlling a machine with a gesture takes two very different things: a model that classifies well, and a real-time app that stays stable frame after frame.',
    ),
    task: t(
      'Construire les deux : le flux de développement du modèle, puis l’inférence en direct depuis la webcam.',
      'Build both: the model development workflow, then live inference from the webcam.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Données synthétiques', 'Synthetic data'),
        text: t(
          '1 200 images 28×28 en niveaux de gris générées par programme (cercle, rectangle, forme en V), avec variations de position, de taille et de bruit.',
          '1,200 programmatically generated 28×28 grayscale images (circle, rectangle, V shape), with variations in position, size and noise.',
        ),
      },
      {
        title: t('Prétraitement', 'Preprocessing'),
        text: t(
          'Niveaux de gris, CLAHE, flou gaussien et normalisation avec OpenCV.',
          'Grayscale, CLAHE, Gaussian blur and normalisation with OpenCV.',
        ),
      },
      {
        title: t('Entraînement et évaluation', 'Training and evaluation'),
        text: t(
          'CNN avec augmentation et callbacks, évalué en exactitude, précision, rappel, F1, AUC et matrice de confusion.',
          'A CNN with augmentation and callbacks, evaluated on accuracy, precision, recall, F1, AUC and a confusion matrix.',
        ),
      },
      {
        title: t('Inférence temps réel', 'Real-time inference'),
        text: t(
          'Détection de la main par segmentation HSV, extraction de la zone utile, prédiction puis lissage sur les 5 dernières images pour éviter les sauts de classe.',
          'HSV skin segmentation to find the hand, region extraction, prediction, then smoothing over the last five frames to avoid class flicker.',
        ),
      },
    ],
    architecture: t(
      'Deux flux reliés : des notebooks numérotés pour développer le modèle, et une application Python modulaire (détection, prétraitement, prédiction, affichage) lancée depuis app.py.',
      'Two connected workflows: numbered notebooks to develop the model, and a modular Python app (detection, preprocessing, prediction, display) launched from app.py.',
    ),
    flows: [
      {
        title: t('Inférence en temps réel', 'Real-time inference'),
        steps: [
          { title: t('Webcam', 'Webcam') },
          { title: t('Détection HSV', 'HSV detection'), detail: t('Peau · zone utile', 'Skin · region') },
          { title: t('Prétraitement', 'Preprocessing'), detail: t('CLAHE · flou', 'CLAHE · blur') },
          { title: t('CNN', 'CNN'), detail: t('3 classes', '3 classes') },
          { title: t('Lissage', 'Smoothing'), detail: t('5 dernières images', 'Last 5 frames') },
        ],
      },
    ],
    metrics: [
      { value: t('3', '3'), label: t('gestes : poing, main ouverte, signe V', 'gestures: fist, open palm, V sign') },
      { value: t('1 200', '1,200'), label: t('images générées', 'generated images') },
      { value: t('5', '5'), label: t('métriques, plus une matrice de confusion', 'metrics, plus a confusion matrix') },
      { value: t('5', '5'), label: t('images de lissage temporel', 'frames of temporal smoothing') },
    ],
    results: [
      t(
        'Une chaîne complète, de la génération des données à la prédiction en direct.',
        'A complete chain, from data generation to live prediction.',
      ),
      t('Des prédictions stabilisées image après image.', 'Predictions stabilized frame after frame.'),
    ],
    proves: t(
      'Que je sais assembler toute une chaîne de vision, et dire clairement où s’arrête ce qu’elle prouve.',
      'That I can assemble a full vision pipeline, and say clearly where its evidence stops.',
    ),
    nextSteps: t(
      'Limite assumée : le modèle est entraîné sur des formes synthétiques. La validation sur de vraies mains est la prochaine étape, puis la reconnaissance de gestes en mouvement.',
      'Stated limit: the model is trained on synthetic shapes. Validation on real hands is the next step, then dynamic gesture recognition.',
    ),
    techStack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN', 'NumPy', 'Jupyter'],
    links: publicRepo('https://github.com/ELGHAD/Hand-Gesture-Recognition'),
  },
  {
    id: 'chatbot-api',
    status: 'verified',
    title: t('Chatbot API · Spring Boot + OpenAI', 'Chatbot API · Spring Boot + OpenAI'),
    group: 'ai',
    tier: 'standard',
    categories: ['ai-rag', 'backend'],
    setting: t('Projet personnel · intégration LLM', 'Personal project · LLM integration'),
    team: 'solo',
    summary: t(
      'Une API REST Spring Boot qui relie GPT-4o-mini d’OpenAI à un backend Java, sans jamais exposer la clé d’API dans le navigateur.',
      'A Spring Boot REST API that connects OpenAI’s GPT-4o-mini to a Java backend, without ever exposing the API key in the browser.',
    ),
    context: t(
      'Appeler un LLM directement depuis le navigateur expose la clé d’API. Le bon endroit pour cette intégration, c’est le backend.',
      'Calling an LLM straight from the browser exposes the API key. The right place for that integration is the backend.',
    ),
    task: t(
      'Exposer un endpoint de chat propre en Java, qui relaie le message au modèle et renvoie une réponse structurée.',
      'Expose a clean chat endpoint in Java that relays the message to the model and returns a structured reply.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Endpoint de chat', 'Chat endpoint'),
        text: t(
          'POST /api/chat reçoit un message et renvoie la réponse générée en JSON structuré.',
          'POST /api/chat receives a message and returns the generated reply as structured JSON.',
        ),
      },
      {
        title: t('Intégration OpenAI', 'OpenAI integration'),
        text: t(
          'Le service appelle GPT-4o-mini via RestTemplate ; la clé reste côté serveur.',
          'The service calls GPT-4o-mini through RestTemplate; the key stays server-side.',
        ),
      },
      {
        title: t('Code en couches', 'Layered code'),
        text: t(
          'Contrôleur, service, DTO de requête et de réponse, et configuration séparés.',
          'Separate controller, service, request and response DTOs, and configuration.',
        ),
      },
      {
        title: t('Prêt pour un front-end', 'Front-end ready'),
        text: t(
          'Endpoint de santé et configuration CORS pour brancher une interface web.',
          'Health-check endpoint and CORS configuration to plug in a web interface.',
        ),
      },
    ],
    architecture: t(
      'Le contrôleur reçoit la requête, le service appelle l’API OpenAI puis construit le DTO de réponse renvoyé au client.',
      'The controller receives the request, the service calls the OpenAI API, then builds the response DTO returned to the client.',
    ),
    flows: [
      {
        title: t('Le trajet d’un message', 'The path of a message'),
        steps: [
          { title: t('Client', 'Client'), detail: t('POST /api/chat', 'POST /api/chat') },
          { title: t('ChatController', 'ChatController') },
          { title: t('ChatService', 'ChatService'), detail: t('RestTemplate', 'RestTemplate') },
          { title: t('OpenAI', 'OpenAI'), detail: t('GPT-4o-mini', 'GPT-4o-mini') },
          { title: t('ChatResponse', 'ChatResponse'), detail: t('DTO JSON', 'JSON DTO') },
        ],
      },
    ],
    metrics: [
      { value: t('0', '0'), label: t('clé d’API exposée au navigateur', 'API keys exposed to the browser') },
      { value: t('2', '2'), label: t('endpoints : chat et santé', 'endpoints: chat and health') },
    ],
    results: [
      t('Un LLM intégré proprement dans un backend Java.', 'An LLM cleanly integrated into a Java backend.'),
      t('Une API prête à servir n’importe quel front-end.', 'An API ready to serve any front end.'),
    ],
    proves: t(
      'Que j’intègre un LLM au bon endroit : côté serveur, derrière un contrat REST clair.',
      'That I integrate an LLM in the right place: server-side, behind a clear REST contract.',
    ),
    techStack: ['Java 17', 'Spring Boot 3.4', 'Spring Web', 'RestTemplate', 'Maven', 'OpenAI API', 'GPT-4o-mini'],
    links: publicRepo('https://github.com/ELGHAD/chatbot_Java'),
  },
  {
    id: 'react-ai-chatbot',
    status: 'verified',
    title: t('React AI Chatbot', 'React AI Chatbot'),
    group: 'ai',
    tier: 'standard',
    categories: ['ai-rag'],
    setting: t('Projet personnel · front-end IA', 'Personal project · AI front end'),
    team: 'solo',
    summary: t(
      'Un chatbot monopage en React et Vite branché sur l’API d’OpenAI, avec bulles de conversation, raccourcis clavier et thèmes clair et sombre.',
      'A single-page React and Vite chatbot powered by OpenAI’s API, with chat bubbles, keyboard shortcuts and light and dark themes.',
    ),
    context: t(
      'Une bonne interface de chat se juge aux détails : le défilement, les raccourcis, la remise à zéro, les thèmes.',
      'A good chat interface is judged on the details: scrolling, shortcuts, reset, themes.',
    ),
    task: t(
      'Construire une interface de conversation agréable autour d’un LLM, en se concentrant sur l’expérience utilisateur.',
      'Build a pleasant conversation interface around an LLM, focusing on user experience.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Conversation', 'Conversation'),
        text: t(
          'Bulles distinctes pour l’utilisateur et l’assistant, défilement automatique vers le dernier message, remise à zéro de la conversation.',
          'Distinct user and assistant bubbles, auto-scroll to the latest message, conversation reset.',
        ),
      },
      {
        title: t('Confort de saisie', 'Typing comfort'),
        text: t(
          'Entrée pour envoyer, Maj + Entrée pour aller à la ligne.',
          'Enter to send, Shift + Enter for a new line.',
        ),
      },
      {
        title: t('Thèmes et comportement', 'Themes and behaviour'),
        text: t(
          'Thèmes clair et sombre ; instructions système personnalisables selon l’usage.',
          'Light and dark themes; customisable system instructions per use case.',
        ),
      },
      {
        title: t('État React', 'React state'),
        text: t(
          'Messages, thème et chargement gérés avec les hooks React ; code vérifié par ESLint.',
          'Messages, theme and loading handled with React hooks; code checked with ESLint.',
        ),
      },
    ],
    architecture: t(
      'Application front-end seule : l’interface React gère la conversation et appelle l’API OpenAI. Pour une mise en ligne publique, les appels passeraient par un backend comme Chatbot API, qui garde la clé côté serveur.',
      'A front-end-only app: the React interface manages the conversation and calls the OpenAI API. For a public deployment, calls would go through a backend such as Chatbot API, which keeps the key server-side.',
    ),
    flows: [
      {
        title: t('Le trajet d’un message', 'The path of a message'),
        steps: [
          { title: t('Interface React', 'React interface') },
          { title: t('État', 'State'), detail: t('Hooks', 'Hooks') },
          { title: t('Client OpenAI', 'OpenAI client') },
          { title: t('Réponse', 'Reply'), detail: t('Bulle assistant', 'Assistant bubble') },
        ],
      },
    ],
    results: [
      t('Une interface de chat soignée, du raccourci clavier au thème.', 'A polished chat interface, from keyboard shortcut to theme.'),
    ],
    proves: t(
      'Que je soigne l’expérience utilisateur autour d’un LLM, et que je connais la limite de sécurité d’un appel direct depuis le navigateur.',
      'That I care about the user experience around an LLM, and know the security limit of calling it straight from the browser.',
    ),
    nextSteps: t(
      'Brancher l’interface sur Chatbot API pour en faire un projet full-stack où la clé reste côté serveur.',
      'Connect the interface to Chatbot API to make a full-stack project where the key stays server-side.',
    ),
    techStack: ['React', 'JavaScript', 'Vite', 'CSS', 'React Hooks', 'ESLint', 'OpenAI API'],
    links: publicRepo('https://github.com/ELGHAD/React-AI-chatbot'),
  },
  {
    id: 'scraping-db',
    status: 'verified',
    title: t('Scraping DB', 'Scraping DB'),
    group: 'ai',
    tier: 'standard',
    categories: ['data-tools'],
    setting: t('Projet personnel · collecte de données', 'Personal project · data collection'),
    team: 'solo',
    summary: t(
      'Un outil Node.js qui collecte des résultats de recherche via SerpApi, les stocke localement et les exporte en Excel, CSV et JSON.',
      'A Node.js tool that collects search results through SerpApi, stores them locally and exports them to Excel, CSV and JSON.',
    ),
    context: t(
      'Copier des résultats de recherche à la main dans un tableur est lent et source d’erreurs.',
      'Copying search results into a spreadsheet by hand is slow and error-prone.',
    ),
    task: t(
      'Automatiser la collecte et produire des jeux de données directement exploitables.',
      'Automate collection and produce directly usable datasets.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Collecte', 'Collection'),
        text: t('Résultats récupérés via l’API SerpApi.', 'Results retrieved through the SerpApi API.'),
      },
      {
        title: t('Stockage local', 'Local storage'),
        text: t('Données persistées par une couche base de données dédiée.', 'Data persisted through a dedicated database layer.'),
      },
      {
        title: t('Exports', 'Exports'),
        text: t('Jeux de données exportés en Excel, CSV et JSON.', 'Datasets exported to Excel, CSV and JSON.'),
      },
      {
        title: t('Deux façons de l’utiliser', 'Two ways to use it'),
        text: t(
          'En ligne de commande ou via une petite interface web ; modules séparés pour l’API, le stockage, les arguments et l’export.',
          'From the command line or a lightweight web interface; separate modules for the API, storage, arguments and export.',
        ),
      },
    ],
    flows: [
      {
        title: t('Le flux de données', 'The data flow'),
        steps: [
          { title: t('CLI ou web', 'CLI or web') },
          { title: t('SerpApi', 'SerpApi'), detail: t('serpapi.js', 'serpapi.js') },
          { title: t('Traitement', 'Processing') },
          { title: t('Stockage', 'Storage'), detail: t('db.js', 'db.js') },
          { title: t('Export', 'Export'), detail: t('XLSX · CSV · JSON', 'XLSX · CSV · JSON') },
        ],
      },
    ],
    metrics: [
      { value: t('3', '3'), label: t('formats d’export', 'export formats') },
      { value: t('2', '2'), label: t('modes : ligne de commande et web', 'modes: command line and web') },
      { value: t('4', '4'), label: t('modules séparés', 'separate modules') },
    ],
    results: [
      t('Une collecte automatisée, de la requête au fichier exploitable.', 'Automated collection, from query to usable file.'),
    ],
    proves: t(
      'Que je découpe même un petit outil en modules clairs, chacun avec une seule responsabilité.',
      'That I split even a small tool into clear modules, each with a single responsibility.',
    ),
    techStack: ['Node.js', 'JavaScript', 'SerpApi', 'Excel', 'CSV', 'JSON'],
    links: publicRepo('https://github.com/ELGHAD/scrapping-DB'),
  },
  {
    id: 'taskmanager-android',
    status: 'verified',
    title: t('TaskManager · app Android native', 'TaskManager · native Android app'),
    group: 'apps',
    tier: 'standard',
    categories: ['mobile'],
    setting: t('Projet personnel · Android', 'Personal project · Android'),
    team: 'solo',
    summary: t(
      'Une application Android native en Kotlin pour créer, modifier et suivre ses tâches au quotidien, avec stockage sur l’appareil et une architecture MVVM.',
      'A native Android app in Kotlin to create, edit and track daily tasks, with on-device storage and an MVVM architecture.',
    ),
    context: t(
      'Une application de tâches doit être simple à l’écran et rester fiable en coulisse : rotation de l’écran, données conservées, code facile à faire évoluer.',
      'A task app must be simple on screen and reliable underneath: screen rotation, data kept, code easy to evolve.',
    ),
    task: t(
      'Construire une app native propre, avec une séparation nette entre interface, logique et données.',
      'Build a clean native app, with a strict separation between interface, logic and data.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Gestion des tâches', 'Task management'),
        text: t(
          'Créer, modifier, supprimer ; titre, description, date facultative et statut en attente ou terminée.',
          'Create, edit, delete; title, description, optional date and pending or completed status.',
        ),
      },
      {
        title: t('Persistance locale', 'Local persistence'),
        text: t('Données stockées sur l’appareil avec Room, au-dessus de SQLite.', 'Data stored on the device with Room, on top of SQLite.'),
      },
      {
        title: t('MVVM et Repository', 'MVVM and Repository'),
        text: t(
          'Des ViewModels qui survivent aux changements de configuration ; un Repository qui centralise l’accès aux données.',
          'ViewModels that survive configuration changes; a Repository that centralises data access.',
        ),
      },
      {
        title: t('Interface', 'Interface'),
        text: t('Layouts XML et Material Design ; build en Gradle Kotlin DSL.', 'XML layouts and Material Design; build with Gradle Kotlin DSL.'),
      },
    ],
    architecture: t(
      'MVVM avec Repository : la vue observe le ViewModel, le ViewModel passe par le Repository, le Repository lit et écrit dans Room.',
      'MVVM with a Repository: the view observes the ViewModel, the ViewModel goes through the Repository, the Repository reads and writes Room.',
    ),
    flows: [
      {
        title: t('Architecture MVVM', 'MVVM architecture'),
        steps: [
          { title: t('Vue', 'View'), detail: t('XML · Material', 'XML · Material') },
          { title: t('ViewModel', 'ViewModel'), detail: t('Cycle de vie', 'Lifecycle-aware') },
          { title: t('Repository', 'Repository') },
          { title: t('Room', 'Room') },
          { title: t('SQLite', 'SQLite') },
        ],
      },
    ],
    metrics: [
      { value: t('4', '4'), label: t('couches : vue, ViewModel, Repository, Room', 'layers: view, ViewModel, Repository, Room') },
      { value: t('2', '2'), label: t('statuts : en attente, terminée', 'statuses: pending, completed') },
    ],
    results: [
      t('Une app native qui garde ses données sur l’appareil.', 'A native app that keeps its data on the device.'),
      t('Un code découpé, facile à faire évoluer.', 'Split code, easy to evolve.'),
    ],
    proves: t(
      'Que j’applique les patterns Android recommandés plutôt qu’un code tout-en-un dans l’activité.',
      'That I apply the recommended Android patterns instead of all-in-one activity code.',
    ),
    nextSteps: t('Rappels et notifications pas encore implémentés.', 'Reminders and notifications not implemented yet.'),
    techStack: ['Kotlin', 'Android Jetpack', 'ViewModel', 'Room', 'SQLite', 'MVVM', 'RecyclerView', 'Material Design', 'Gradle Kotlin DSL'],
    links: publicRepo('https://github.com/ELGHAD/TaskManager-App'),
  },
  {
    id: 'pharmacy-manager',
    status: 'verified',
    title: t('Pharmacy Manager · Java Swing', 'Pharmacy Manager · Java Swing'),
    group: 'apps',
    tier: 'standard',
    categories: ['desktop'],
    setting: t('Projet personnel · desktop', 'Personal project · desktop'),
    team: 'solo',
    summary: t(
      'Une application de bureau Java Swing qui aide une pharmacie à éviter les ruptures, suivre les dates d’expiration et automatiser la facturation.',
      'A Java Swing desktop application that helps a pharmacy avoid stockouts, track expiry dates and automate billing.',
    ),
    context: t(
      'Dans une pharmacie, une rupture ou un médicament périmé ne se découvrent souvent qu’au comptoir.',
      'In a pharmacy, a stockout or an expired medication is often only discovered at the counter.',
    ),
    task: t(
      'Donner au pharmacien une vue claire du stock, des alertes automatiques et une facturation rapide, avec des droits séparés par rôle.',
      'Give the pharmacist a clear view of stock, automatic alerts and fast billing, with permissions separated by role.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Connexion par rôle', 'Role-based login'),
        text: t(
          'Pharmacien et administrateur ont des écrans et des permissions différents.',
          'Pharmacist and administrator get different screens and permissions.',
        ),
      },
      {
        title: t('Médicaments', 'Medications'),
        text: t(
          'Ajout, modification, suppression, recherche et filtres par stock, prix ou date d’expiration.',
          'Add, edit, delete, search and filter by stock, price or expiry date.',
        ),
      },
      {
        title: t('Alertes', 'Alerts'),
        text: t('Alertes automatiques de stock bas et de produits expirés.', 'Automatic alerts for low stock and expired products.'),
      },
      {
        title: t('Facturation', 'Billing'),
        text: t(
          'Factures générées, imprimées et recherchées par date ou montant, avec l’historique des ventes.',
          'Invoices generated, printed and searched by date or amount, with full sales history.',
        ),
      },
      {
        title: t('Administration', 'Administration'),
        text: t(
          'Création, modification et suppression des comptes, attribution des rôles, suivi de l’activité.',
          'Create, edit and delete accounts, assign roles, follow user activity.',
        ),
      },
    ],
    architecture: t(
      'Application Swing organisée par rôle (connexion, administrateur, pharmacien), reliée à MySQL par JDBC et modélisée en UML : cas d’utilisation, classes et séquences.',
      'A Swing application organised by role (login, administrator, pharmacist), connected to MySQL through JDBC and modelled in UML: use case, class and sequence diagrams.',
    ),
    flows: [
      {
        title: t('Architecture', 'Architecture'),
        steps: [
          { title: t('Connexion', 'Login'), detail: t('Rôle', 'Role') },
          { title: t('Interfaces Swing', 'Swing interfaces'), detail: t('Pharmacien · admin', 'Pharmacist · admin') },
          { title: t('JDBC', 'JDBC') },
          { title: t('MySQL', 'MySQL') },
        ],
      },
    ],
    metrics: [
      { value: t('2', '2'), label: t('rôles : pharmacien et administrateur', 'roles: pharmacist and administrator') },
      { value: t('2', '2'), label: t('alertes automatiques : stock bas, expiration', 'automatic alerts: low stock, expiry') },
      { value: t('3', '3'), label: t('types de diagrammes UML', 'kinds of UML diagrams') },
    ],
    results: [
      t('Ruptures et péremptions signalées avant d’arriver au comptoir.', 'Stockouts and expiries flagged before they reach the counter.'),
      t('Une facturation et un historique des ventes consultables.', 'Searchable billing and sales history.'),
    ],
    proves: t(
      'Que je sais concevoir une application métier complète hors du web, de l’UML à la base de données.',
      'That I can design a complete business application outside the web, from UML to database.',
    ),
    techStack: ['Java', 'Swing', 'JDBC', 'MySQL', 'Maven', 'UML'],
    links: publicRepo('https://github.com/ELGHAD/Pharmacy-Manager'),
  },
  {
    id: 'tournament-manager',
    status: 'verified',
    title: t('Football Tournament Manager · C++20', 'Football Tournament Manager · C++20'),
    group: 'apps',
    tier: 'standard',
    categories: ['desktop'],
    setting: t('Projet personnel · C++', 'Personal project · C++'),
    team: 'solo',
    summary: t(
      'Une application console C++20 qui gère un tournoi de football, de l’inscription des équipes au classement final, avec des règles métier vérifiées.',
      'A C++20 console application that runs a football tournament, from team registration to final rankings, with enforced business rules.',
    ),
    context: t(
      'Un tournoi, c’est beaucoup de règles : capacité, effectifs minimum, phases, points, classements. En C++, il faut en plus gérer soi-même la mémoire.',
      'A tournament means many rules: capacity, minimum squads, phases, points, rankings. In C++, you also manage memory yourself.',
    ),
    task: t(
      'Modéliser un tournoi complet en objets, avec des règles vérifiées et un cycle de vie des objets maîtrisé.',
      'Model a full tournament as objects, with enforced rules and a controlled object lifecycle.',
    ),
    role: t('Projet conçu et développé seul.', 'Designed and built on my own.'),
    actions: [
      {
        title: t('Modèle objet', 'Object model'),
        text: t(
          'Cinq classes (Tournoi, Equipe, Arbitre, Terrain, Match), déclarations et implémentations séparées.',
          'Five classes (Tournoi, Equipe, Arbitre, Terrain, Match), with declarations and implementations kept separate.',
        ),
      },
      {
        title: t('Ressources du tournoi', 'Tournament resources'),
        text: t(
          'Inscription et recherche des équipes (identifiant, nom, ville, score, classement), des arbitres par code et des terrains (ville, propriétaire, capacité).',
          'Registering and searching teams (id, name, city, score, ranking), referees by code and venues (city, owner, capacity).',
        ),
      },
      {
        title: t('Matchs et phases', 'Matches and phases'),
        text: t(
          'Phases de groupes puis phases finales, scores enregistrés, points attribués et classement recalculé automatiquement.',
          'Group stages then knockout rounds, recorded scores, awarded points and automatically recalculated rankings.',
        ),
      },
      {
        title: t('Règles et mémoire', 'Rules and memory'),
        text: t(
          'Effectif minimum et prérequis vérifiés avant le coup d’envoi ; allocation et libération explicites de la mémoire des matchs.',
          'Minimum squad size and prerequisites checked before kickoff; explicit allocation and release of match memory.',
        ),
      },
    ],
    architecture: t(
      'La classe Tournoi coordonne tout : configuration, participants, matchs et classements, pilotés depuis un menu console. Build avec CMake.',
      'The Tournoi class coordinates everything: configuration, participants, matches and rankings, driven from a console menu. Built with CMake.',
    ),
    flows: [
      {
        title: t('Le déroulé d’un tournoi', 'How a tournament runs'),
        steps: [
          { title: t('Configuration', 'Setup'), detail: t('Nom · date · capacité', 'Name · date · capacity') },
          { title: t('Inscriptions', 'Registration'), detail: t('Équipes · arbitres · terrains', 'Teams · referees · venues') },
          { title: t('Phase de groupes', 'Group stage') },
          { title: t('Phases finales', 'Knockout rounds') },
          { title: t('Classement', 'Rankings'), detail: t('Recalcul automatique', 'Auto-recalculated') },
        ],
      },
    ],
    metrics: [
      { value: t('5', '5'), label: t('classes métier', 'domain classes') },
      { value: t('2', '2'), label: t('phases : groupes et finales', 'phases: groups and knockouts') },
      { value: t('C++20', 'C++20'), label: t('avec CMake et la STL', 'with CMake and the STL') },
    ],
    results: [
      t('Un tournoi complet géré de bout en bout en console.', 'A full tournament run start to finish from the console.'),
      t('Des règles métier vérifiées avant chaque étape.', 'Business rules checked before each step.'),
    ],
    proves: t(
      'Encapsulation, structures de données et cycle de vie des objets, sans ramasse-miettes pour rattraper les erreurs.',
      'Encapsulation, data structures and object lifecycles, with no garbage collector to catch mistakes.',
    ),
    techStack: ['C++20', 'CMake', 'STL', 'OOP'],
    links: publicRepo('https://github.com/ELGHAD/tournament_manager'),
  },
  {
    id: 'alarm-clock',
    status: 'verified',
    title: t('Alarm Clock', 'Alarm Clock'),
    group: 'foundations',
    tier: 'exercise',
    categories: ['desktop'],
    team: 'solo',
    summary: t(
      'Un réveil en ligne de commande en Java pur : planification, compte à rebours, son en boucle et snooze.',
      'A command-line alarm clock in pure Java: scheduling, countdown, looping audio and snooze.',
    ),
    features: [
      t('Planification avec ScheduledExecutorService et compte à rebours en direct.', 'Scheduling with ScheduledExecutorService and a live countdown.'),
      t('Son WAV en boucle via la Java Sound API, snooze de 5 minutes.', 'Looping WAV sound through the Java Sound API, 5-minute snooze.'),
      t('Bips système en secours si la lecture audio échoue.', 'Falls back to system beeps if audio playback fails.'),
    ],
    proves: t('Concurrence, calcul du temps et gestion des ressources audio.', 'Concurrency, time calculations and audio resource management.'),
    techStack: ['Java', 'java.util.concurrent', 'javax.sound.sampled'],
    links: publicRepo('https://github.com/ELGHAD/Alarm_Clock'),
  },
  {
    id: 'student-management-system',
    status: 'verified',
    title: t('Student Management System', 'Student Management System'),
    group: 'foundations',
    tier: 'exercise',
    categories: ['desktop'],
    team: 'solo',
    summary: t(
      'Une application console Java pour gérer des dossiers étudiants, avec persistance dans un fichier.',
      'A Java console application to manage student records, with file persistence.',
    ),
    features: [
      t('Ajout, consultation, modification, suppression, recherche par ID ou par nom.', 'Add, view, update, delete, search by ID or name.'),
      t('IDs uniques validés ; les dossiers survivent entre deux exécutions.', 'Unique IDs validated; records survive between runs.'),
    ],
    proves: t('POO, collections et entrées/sorties fichier.', 'OOP, collections and file I/O.'),
    techStack: ['Java', 'Collections', 'File I/O'],
    links: publicRepo('https://github.com/ELGHAD/Student_Management_System'),
  },
  {
    id: 'rbac-demo',
    status: 'verified',
    title: t('RBAC Demo (Login System)', 'RBAC Demo (Login System)'),
    group: 'foundations',
    tier: 'exercise',
    categories: ['backend'],
    team: 'solo',
    summary: t(
      'Le contrôle d’accès par rôle modélisé en Java : une classe User, une énumération Role (ADMIN, USER, GUEST) et des permissions évaluées par rôle.',
      'Role-based access control modelled in Java: a User class, a Role enum (ADMIN, USER, GUEST) and permissions evaluated per role.',
    ),
    proves: t('Le principe du RBAC, que l’on retrouve ensuite dans eBank et dans le copilote IA.', 'The RBAC principle that later reappears in eBank and the AI copilot.'),
    techStack: ['Java', 'Enums', 'OOP'],
    links: publicRepo('https://github.com/ELGHAD/Login_System'),
  },
  {
    id: 'order-management',
    status: 'verified',
    title: t('Order Management (OOP)', 'Order Management (OOP)'),
    group: 'foundations',
    tier: 'exercise',
    categories: ['backend'],
    team: 'solo',
    summary: t(
      'Le modèle console d’un système de commandes e-commerce en Java 17 : clients, commandes liées par composition, statuts et moyens de paiement en énumérations.',
      'A Java 17 console model of an e-commerce order system: customers, orders linked by composition, statuses and payment methods as enums.',
    ),
    proves: t('Encapsulation, composition et énumérations typées.', 'Encapsulation, composition and type-safe enums.'),
    techStack: ['Java 17', 'OOP'],
    links: publicRepo('https://github.com/ELGHAD/E-commerce_System'),
  },
  {
    id: 'music-player',
    status: 'verified',
    title: t('Music Player', 'Music Player'),
    group: 'foundations',
    tier: 'exercise',
    categories: ['desktop'],
    team: 'solo',
    summary: t(
      'Un lecteur WAV en ligne de commande, en Java, sans dépendance : lecture, arrêt, relecture et sortie au clavier.',
      'A command-line WAV player in Java, with no dependencies: play, stop, replay and quit from the keyboard.',
    ),
    proves: t('Cycle de vie d’une ressource audio géré explicitement.', 'An audio clip lifecycle managed explicitly.'),
    techStack: ['Java', 'javax.sound.sampled'],
    links: publicRepo('https://github.com/ELGHAD/Music_Player'),
  },
];

