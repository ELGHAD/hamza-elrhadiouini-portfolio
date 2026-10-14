import { ExperienceEntry } from '../models/experience.model';

/**
 * Stories reuse verified facts only (PORTFOLIO_CONTENT.md §3). No metric, client or
 * outcome may appear here unless it is confirmed there.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'sounds-of-morocco',
    status: 'verified',
    role: {
      fr: 'Développement Full-Stack freelance · en binôme',
      en: 'Freelance Full-Stack development · with a teammate',
    },
    company: 'Sounds of Morocco',
    location: { fr: 'À distance', en: 'Remote' },
    period: { fr: 'Oct. 2025 → présent', en: 'Oct 2025 → present' },
    start: '2025-10',
    type: { fr: 'Freelance', en: 'Freelance' },
    chapter: { fr: 'Un vrai client, un site en production', en: 'A real client, a live site' },
    story: {
      fr: 'En octobre 2025, en parallèle de ma dernière année, je commence une mission freelance en binôme pour Sounds of Morocco, un label musical. Nous construisons sa plateforme avec Next.js, Strapi et Supabase, puis la mettons en production sur soundsofmorocco.com. Depuis, le label publie ses sorties, ses actualités et son merch sans passer par un développeur, et nous continuons à faire évoluer le site.',
      en: 'In October 2025, alongside my final year, I start a freelance engagement with a teammate for Sounds of Morocco, a music label. We build its platform with Next.js, Strapi and Supabase, then take it live at soundsofmorocco.com. Since then, the label publishes its releases, news and merch without a developer, and we keep improving the site.',
    },
    responsibilities: [
      {
        fr: 'Architecture technique, frontend, CMS et base de données.',
        en: 'Technical architecture, frontend, CMS and database.',
      },
      {
        fr: 'Pipeline CI/CD avec GitHub Actions.',
        en: 'CI/CD pipeline with GitHub Actions.',
      },
      {
        fr: 'Maintenance évolutive en production : SEO, performances, mises à jour Strapi, nouvelles fonctionnalités.',
        en: 'Ongoing production maintenance: SEO, performance, Strapi updates, new features.',
      },
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Strapi 5', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    relatedProjectId: 'sounds-of-morocco',
  },
  {
    id: 'alten-rabat-ai-copilot',
    status: 'verified',
    role: {
      fr: 'Stage de fin d’études · Full-Stack & IA',
      en: 'Final-year internship · Full-Stack & AI',
    },
    company: 'ALTEN Delivery Center Maroc',
    location: { fr: 'Rabat, Maroc', en: 'Rabat, Morocco' },
    period: { fr: 'Mars → sept. 2026', en: 'Mar → Sep 2026' },
    start: '2026-03',
    end: '2026-09',
    type: { fr: 'Stage de fin d’études (PFE)', en: 'Final-year internship (PFE)' },
    chapter: {
      fr: 'Le projet de fin d’études : un copilote IA',
      en: 'The final-year project: an AI copilot',
    },
    story: {
      fr: 'Pour mon PFE, ALTEN Delivery Center Maroc me confie un problème concret : une documentation interne dispersée, longue à parcourir, et un passage peu fluide vers le support humain. En autonomie, je conçois un copilote qui répond en langage naturel à partir de ces documents, cite ses sources et ouvre un ticket de support quand il faut passer la main. De mars à septembre, 13 sprints Scrum mènent à un démonstrateur qualifié en staging interne.',
      en: 'For my final-year project, ALTEN Delivery Center Maroc gives me a concrete problem: scattered internal documentation, slow to search, and a clumsy hand-off to human support. Working independently, I design a copilot that answers in natural language from those documents, cites its sources and opens a support ticket when a person needs to step in. From March to September, 13 Scrum sprints lead to a demonstrator qualified in internal staging.',
    },
    responsibilities: [
      {
        fr: 'Architecture : API Gateway + 4 services Spring Boot (auth, user, document, chat) + service RAG FastAPI ; sécurité JWT, BCrypt et RBAC sur 3 rôles.',
        en: 'Architecture: API Gateway + 4 Spring Boot services (auth, user, document, chat) + a FastAPI RAG service; JWT, BCrypt and RBAC security across 3 roles.',
      },
      {
        fr: 'Pipeline RAG : extraction, découpage, embeddings, recherche sémantique MMR et réponses streamées en SSE avec citation des sources.',
        en: 'RAG pipeline: extraction, chunking, embeddings, MMR semantic retrieval and SSE-streamed answers with source citations.',
      },
      {
        fr: 'Application Angular : chat, back-office documents et utilisateurs, tickets avec formulaires par catégorie, pièces jointes et fil d’activité.',
        en: 'Angular application: chat, document and user back office, tickets with category-based forms, attachments and an activity feed.',
      },
      {
        fr: 'Évaluation manuelle : 98 % de réponses correctes sur 50 questions validées ; premier token en moins de 1,5 s.',
        en: 'Manual evaluation: 98% correct answers on 50 validated questions; first token in under 1.5 s.',
      },
    ],
    stack: ['Angular', 'Spring Boot', 'Spring Cloud Gateway', 'FastAPI', 'LangChain', 'OpenAI', 'pgvector', 'Docker Compose'],
    relatedProjectId: 'ai-copilot',
  },
  {
    id: 'ratitec-2025',
    status: 'verified',
    role: {
      fr: 'Stage Java / Spring Boot · développement backend',
      en: 'Java / Spring Boot internship · backend development',
    },
    company: 'RATITEC ENR',
    location: { fr: 'Mohammedia, Maroc', en: 'Mohammedia, Morocco' },
    period: { fr: 'Juil. → août 2025', en: 'Jul → Aug 2025' },
    start: '2025-07',
    end: '2025-08',
    type: { fr: 'Stage PFA · 4e année', en: 'Fourth-year internship (PFA)' },
    chapter: { fr: 'Le backend Java, en conditions réelles', en: 'Java backend, for real' },
    story: {
      fr: 'L’été suivant, je rejoins RATITEC ENR à Mohammedia, sur sa plateforme de gestion de projets énergétiques. En binôme, je développe le backend Spring Boot : plus de 12 API REST, utilisées pour suivre plus de 15 projets. Je prends en charge la logique de facturation et le module d’interventions terrain, avec des tests JUnit et Mockito.',
      en: 'The following summer, I join RATITEC ENR in Mohammedia to work on its energy-project management platform. With a teammate, I build the Spring Boot backend: more than 12 REST APIs, used to track more than 15 projects. I own the billing logic and the field-intervention module, tested with JUnit and Mockito.',
    },
    responsibilities: [
      {
        fr: 'Architecture en couches (Controller, Service, Repository, DTO) avec JPA/Hibernate et MySQL.',
        en: 'Layered architecture (controller, service, repository, DTO) with JPA/Hibernate and MySQL.',
      },
      {
        fr: 'Facturation : validation, génération, cycle de paiement et notifications.',
        en: 'Billing: validation, generation, payment cycle and notifications.',
      },
      {
        fr: 'Interventions terrain avec statuts et historique ; Scrum et Git au quotidien.',
        en: 'Field interventions with statuses and history; Scrum and Git day to day.',
      },
    ],
    stack: ['Java', 'Spring Boot', 'JPA / Hibernate', 'MySQL', 'JUnit', 'Mockito'],
    relatedProjectId: 'ratitec',
  },
  {
    id: 'alten-fes-2024',
    status: 'verified',
    role: {
      fr: 'Stage en développement web',
      en: 'Web development internship',
    },
    company: 'ALTEN',
    location: { fr: 'Fès, Maroc', en: 'Fes, Morocco' },
    period: { fr: 'Août → sept. 2024', en: 'Aug → Sep 2024' },
    start: '2024-08',
    end: '2024-09',
    type: { fr: 'Stage professionnel · 3e année', en: 'Third-year professional internship' },
    chapter: { fr: 'Premier stage, premier domaine modélisé', en: 'First internship, first domain model' },
    story: {
      fr: 'Août 2024 : premier stage en entreprise, chez ALTEN à Fès. On me confie la conception d’une application de gestion de tâches, que je mène en autonomie. Avant d’écrire la moindre vue, je modélise le domaine : entités, héritage JOINED, énumérations, dans une architecture MVC avec Symfony.',
      en: 'August 2024: my first internship, at ALTEN in Fes. I am asked to design a task-management application and work on it independently. Before writing a single view, I model the domain: entities, JOINED inheritance and enumerations, in an MVC architecture with Symfony.',
    },
    responsibilities: [
      {
        fr: 'Conception d’une application MVC avec Symfony, Doctrine, Twig et MySQL.',
        en: 'Designed an MVC application with Symfony, Doctrine, Twig and MySQL.',
      },
      {
        fr: 'Modélisation du domaine : entités, héritage JOINED, énumérations.',
        en: 'Domain modelling: entities, JOINED inheritance, enumerations.',
      },
    ],
    stack: ['PHP', 'Symfony', 'Doctrine', 'Twig', 'MySQL'],
    relatedProjectId: 'alten-task-manager-2024',
  },
];
