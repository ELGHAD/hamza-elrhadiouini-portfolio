import { SeoPage, SeoPageKey } from '../models/seo.model';

/**
 * Title and meta description of every page, in both languages.
 * Keep descriptions under ~160 characters: search engines cut longer ones.
 * Project pages build theirs from projects.data.ts (title + summary).
 */
export const SEO_PAGES: Record<SeoPageKey, SeoPage> = {
  home: {
    title: {
      fr: 'Hamza El Rhadiouini — Ingénieur logiciel Full-Stack & IA (Java, Spring Boot, RAG)',
      en: 'Hamza El Rhadiouini — Full-Stack & AI Software Engineer (Java, Spring Boot, RAG)',
    },
    description: {
      fr: 'Ingénieur d’État (EMSI, 2026), disponible immédiatement. Backends Java/Spring Boot, applications full-stack Angular/React et copilotes IA RAG.',
      en: 'State-certified engineer (EMSI, 2026), available immediately. Java/Spring Boot backends, Angular/React full-stack apps, and RAG-based AI copilots.',
    },
  },
  services: {
    title: {
      fr: 'Services — Backend Java, full-stack et copilotes IA | Hamza El Rhadiouini',
      en: 'Services — Java backends, full-stack apps and AI copilots | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Six services avec livrables, stack et preuves : Spring Boot et microservices, full-stack, RAG, sites administrables, Docker, vision par ordinateur.',
      en: 'Six services with deliverables, stack and proof: Spring Boot and microservices, full-stack, RAG, CMS-driven sites, Docker, computer vision.',
    },
  },
  projects: {
    title: {
      fr: 'Projets — IA, backend, full-stack et web | Hamza El Rhadiouini',
      en: 'Projects — AI, backend, full-stack and web | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Projets filtrables par catégorie et techno : copilote IA RAG, plateforme en production Sounds of Morocco, eBank, Job Hunter, vision par ordinateur.',
      en: 'Projects filterable by category and technology: RAG AI copilot, the live Sounds of Morocco platform, eBank, Job Hunter, computer vision.',
    },
  },
  experience: {
    title: {
      fr: 'Parcours — Expériences et formation | Hamza El Rhadiouini',
      en: 'Experience — Work history and education | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Stage de fin d’études chez ALTEN (copilote IA), freelance Sounds of Morocco, stage Spring Boot chez RATITEC, diplôme d’ingénieur d’État EMSI.',
      en: 'Final-year internship at ALTEN (AI copilot), Sounds of Morocco freelance work, Spring Boot internship at RATITEC, EMSI state engineering degree.',
    },
  },
  skills: {
    title: {
      fr: 'Compétences — Technologies utilisées en projet | Hamza El Rhadiouini',
      en: 'Skills — Technologies used in real projects | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Toutes mes technologies par catégorie, chacune reliée aux projets, expériences ou certificats où je l’ai utilisée.',
      en: 'Every technology I use, grouped by category, each linked to the projects, roles or certificates where I used it.',
    },
  },
  certifications: {
    title: {
      fr: 'Certifications — Oracle, Meta, IBM et Coursera | Hamza El Rhadiouini',
      en: 'Certifications — Oracle, Meta, IBM and Coursera | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Certifications Oracle (Java SE 17, Database 19c), certificats professionnels Meta et cours Coursera, avec liens de vérification.',
      en: 'Oracle certifications (Java SE 17, Database 19c), Meta professional certificates and Coursera courses, with verification links.',
    },
  },
  contact: {
    title: {
      fr: 'Contact — Parlons de votre projet | Hamza El Rhadiouini',
      en: 'Contact — Let’s talk about your project | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Disponible immédiatement. Écrivez-moi via le formulaire ou par e-mail, ou retrouvez-moi sur LinkedIn et GitHub.',
      en: 'Available immediately. Reach me through the form or by email, or find me on LinkedIn and GitHub.',
    },
  },
  'not-found': {
    title: {
      fr: 'Page introuvable | Hamza El Rhadiouini',
      en: 'Page not found | Hamza El Rhadiouini',
    },
    description: {
      fr: 'Cette page n’existe pas ou a été déplacée.',
      en: 'This page does not exist or has moved.',
    },
  },
};
