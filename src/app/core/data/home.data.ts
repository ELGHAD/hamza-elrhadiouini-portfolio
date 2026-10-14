import { certificationsCount } from './certifications.data';
import { EXPERIENCE } from './experience.data';
import { PROJECT_GROUPS, PROJECTS } from './projects.data';
import { Project } from '../models/project.model';
import {
  HomeCertification,
  HomeEducation,
  HomeExperience,
  HomeMetric,
  HomeProject,
  HomeService,
  HomeStackGroup,
} from '../models/home.model';

const e = (projectId: string, fr: string, en = fr) => ({ projectId, label: { fr, en } });

export const HOME_SERVICES: HomeService[] = [
  {
    id: 'backend',
    status: 'verified',
    title: { fr: 'Backend Java & Spring Boot', en: 'Java & Spring Boot backends' },
    description: {
      fr: 'Des API REST sécurisées (JWT, RBAC), en couches ou en microservices derrière une API Gateway, documentées avec OpenAPI.',
      en: 'Secured REST APIs (JWT, RBAC), layered or as microservices behind an API Gateway, documented with OpenAPI.',
    },
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud', 'OpenAPI'],
    evidence: [
      e('ai-copilot', 'Copilote IA · ALTEN', 'AI copilot · ALTEN'),
      e('ratitec', 'RATITEC'),
      e('ebank', 'eBank'),
    ],
  },
  {
    id: 'full-stack',
    status: 'verified',
    title: { fr: 'Applications full-stack', en: 'Full-stack applications' },
    description: {
      fr: 'Des interfaces Angular, React ou Next.js reliées à des API et à des bases de données adaptées au produit.',
      en: 'Angular, React or Next.js interfaces wired to APIs and data stores that fit the product.',
    },
    stack: ['Angular', 'React', 'Next.js', 'TypeScript'],
    evidence: [
      e('ai-copilot', 'Copilote IA (Angular)', 'AI copilot (Angular)'),
      e('ebank', 'eBank (React)'),
      e('sounds-of-morocco', 'Sounds of Morocco (Next.js)'),
    ],
  },
  {
    id: 'rag',
    status: 'verified',
    title: { fr: 'Copilotes IA et RAG', en: 'AI copilots and RAG' },
    description: {
      fr: 'Des réponses sourcées sur vos documents, filtrées selon les droits de chacun avant la génération, avec escalade vers le support humain.',
      en: 'Source-grounded answers over your documents, filtered by each user’s rights before generation, with escalation to human support.',
    },
    stack: ['FastAPI', 'LangChain', 'OpenAI', 'pgvector', 'SSE'],
    evidence: [
      e('ai-copilot', 'Copilote IA · PFE ALTEN', 'AI copilot · ALTEN final-year project'),
      e('chatbot-api', 'Chatbot API'),
    ],
  },
  {
    id: 'cms',
    status: 'verified',
    title: { fr: 'Plateformes administrables', en: 'Content-managed platforms' },
    description: {
      fr: 'Des sites en production que l’équipe met à jour seule, avec un CMS headless, des médias servis par CDN et une CI/CD.',
      en: 'Live sites the team updates on its own, with a headless CMS, CDN-served media and CI/CD.',
    },
    stack: ['Next.js', 'Strapi', 'Supabase', 'Cloudinary'],
    evidence: [
      e('sounds-of-morocco', 'Sounds of Morocco · en production, en binôme', 'Sounds of Morocco · live, in a pair'),
    ],
  },
  {
    id: 'delivery',
    status: 'verified',
    title: { fr: 'Conteneurisation et livraison', en: 'Containers and delivery' },
    description: {
      fr: 'Des environnements reproductibles avec Docker Compose, une CI/CD GitHub Actions et un déploiement cloud sur AWS (ECS Fargate, RDS, CloudFront).',
      en: 'Reproducible environments with Docker Compose, GitHub Actions CI/CD and cloud deployment on AWS (ECS Fargate, RDS, CloudFront).',
    },
    stack: ['Docker', 'GitHub Actions', 'AWS', 'Terraform', 'Nginx'],
    evidence: [
      e('ebank', 'eBank (AWS)'),
      e('ai-copilot', 'Copilote IA', 'AI copilot'),
      e('sounds-of-morocco', 'Sounds of Morocco'),
    ],
  },
  {
    id: 'vision',
    status: 'verified',
    title: { fr: 'IA appliquée & vision', en: 'Applied AI & vision' },
    description: {
      fr: 'Des modèles CNN et de transfer learning évalués honnêtement : test officiel, fuites de données repérées, pipeline reproductible.',
      en: 'CNN and transfer-learning models evaluated honestly: official test sets, data leakage caught, reproducible pipelines.',
    },
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    evidence: [
      e('traffic-sign-recognition', 'Panneaux routiers · 98,45 %', 'Traffic signs · 98.45%'),
      e('xray-pneumonia', 'Pneumonie · ResNet50', 'Pneumonia · ResNet50'),
    ],
  },
];

/**
 * Selected work on the home page, in display order. Content comes from projects.data.ts.
 * Five items: the spotlight spans two columns, so the three-column grid fills exactly.
 */
const HOME_PROJECT_IDS = ['ai-copilot', 'ebank', 'sounds-of-morocco', 'ratitec', 'traffic-sign-recognition'];

const toHomeProject = (project: Project): HomeProject => {
  const group = PROJECT_GROUPS.find((item) => item.id === project.group);
  const metrics = project.metrics?.slice(0, project.tier === 'spotlight' ? 2 : 1) ?? [];
  const join = (locale: 'fr' | 'en') =>
    metrics.map((metric) => `${metric.value[locale]} ${metric.label[locale]}`).join(' · ');
  return {
    id: project.id,
    status: project.status,
    title: project.title,
    category:
      project.group === 'professional'
        ? {
            fr: `Mission professionnelle · ${project.period?.fr ?? ''}`,
            en: `Professional work · ${project.period?.en ?? ''}`,
          }
        : (group?.title ?? { fr: '', en: '' }),
    description: project.summary,
    stack: project.techStack.slice(0, 5),
    result: metrics.length ? { fr: join('fr'), en: join('en') } : project.links.live ? project.state : undefined,
    liveUrl: project.links.live,
    repoUrl: project.links.repoPublic && project.links.linkApproved ? project.links.repo : undefined,
    confidential: project.confidential,
    featured: project.id === HOME_PROJECT_IDS[0],
  };
};

export const HOME_PROJECTS: HomeProject[] = HOME_PROJECT_IDS.map((id) =>
  PROJECTS.find((project) => project.id === id && project.status === 'verified'),
)
  .filter((project): project is Project => !!project)
  .map(toHomeProject);

export const HOME_EXPERIENCES: HomeExperience[] = [
  {
    id: 'sounds-of-morocco',
    status: 'verified',
    role: {
      fr: 'Développement Full-Stack freelance · en binôme',
      en: 'Freelance full-stack development · with a teammate',
    },
    organization: { fr: 'Sounds of Morocco', en: 'Sounds of Morocco' },
    period: { fr: 'Oct. 2025 → présent', en: 'Oct 2025 → present' },
    start: '2025-10',
    location: { fr: 'À distance', en: 'Remote' },
    project: { fr: 'Plateforme du label en production', en: 'Live music-label platform' },
  },
  {
    id: 'alten-rabat',
    status: 'verified',
    role: {
      fr: 'Stage de fin d’études · Full-Stack & IA',
      en: 'Final-year internship · Full-Stack & AI',
    },
    organization: { fr: 'ALTEN Delivery Center Maroc', en: 'ALTEN Delivery Center Maroc' },
    period: { fr: 'Mars → sept. 2026', en: 'Mar → Sep 2026' },
    start: '2026-03',
    end: '2026-09',
    location: { fr: 'Rabat, Maroc', en: 'Rabat, Morocco' },
    project: { fr: 'AI Copilot interne', en: 'Internal AI Copilot' },
  },
  {
    id: 'ratitec',
    status: 'verified',
    role: { fr: 'Stage Java / Spring Boot', en: 'Java / Spring Boot internship' },
    organization: { fr: 'RATITEC ENR', en: 'RATITEC ENR' },
    period: { fr: 'Juil. → août 2025', en: 'Jul → Aug 2025' },
    start: '2025-07',
    end: '2025-08',
    location: { fr: 'Mohammedia, Maroc', en: 'Mohammedia, Morocco' },
    project: { fr: 'Gestion de projets énergétiques', en: 'Energy-project management platform' },
  },
  {
    id: 'alten-fes',
    status: 'verified',
    role: { fr: 'Stage développement web', en: 'Web development internship' },
    organization: { fr: 'ALTEN', en: 'ALTEN' },
    period: { fr: 'Août → sept. 2024', en: 'Aug → Sep 2024' },
    start: '2024-08',
    end: '2024-09',
    location: { fr: 'Fès, Maroc', en: 'Fes, Morocco' },
    project: { fr: 'Application MVC de gestion de tâches', en: 'MVC task-management application' },
  },
];

export const HOME_EDUCATION: HomeEducation = {
  status: 'verified',
  // Years only: the source of truth gives no months, so the timeline fades both ends.
  startYear: 2021,
  endYear: 2026,
  degree: {
    fr: 'Diplôme d’Ingénieur d’État en Informatique et Réseaux · option MIAGE',
    en: 'State Engineering Degree in Computer Science and Networks · MIAGE option',
  },
  school: { fr: 'EMSI Rabat', en: 'EMSI Rabat' },
  period: { fr: '2021 → 2026', en: '2021 → 2026' },
};

export const HOME_STACK: HomeStackGroup[] = [
  {
    id: 'backend',
    status: 'verified',
    title: { fr: 'Backend', en: 'Backend' },
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'FastAPI'],
  },
  {
    id: 'frontend',
    status: 'verified',
    title: { fr: 'Frontend', en: 'Frontend' },
    technologies: ['Angular', 'React', 'Next.js', 'TypeScript'],
  },
  {
    id: 'ai-data',
    status: 'verified',
    title: { fr: 'IA & données', en: 'AI & data' },
    technologies: ['RAG', 'LangChain', 'OpenAI', 'PostgreSQL', 'pgvector', 'TensorFlow'],
  },
  {
    id: 'delivery',
    status: 'verified',
    title: { fr: 'Livraison', en: 'Delivery' },
    technologies: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions'],
  },
];

export const HOME_CERTIFICATIONS: HomeCertification[] = [
  {
    id: 'oracle-ocp-java-17',
    status: 'verified',
    title: 'Java SE 17 Developer (1Z0-829)',
    issuer: 'Oracle',
    kind: { fr: 'Certification officielle', en: 'Official certification' },
  },
  {
    id: 'oracle-db-19c',
    status: 'verified',
    title: 'Oracle Database 19c Administration',
    issuer: 'Oracle',
    kind: { fr: 'Certification officielle', en: 'Official certification' },
  },
  {
    id: 'full-stack-java-spring',
    status: 'verified',
    title: 'Full-Stack Java Dev with Spring & Spring Boot',
    issuer: 'Honoris / Board Infinity',
    kind: { fr: 'Spécialisation Coursera', en: 'Coursera specialization' },
  },
  {
    id: 'meta-back-end-developer',
    status: 'verified',
    title: 'Meta Back-End Developer Professional Certificate',
    issuer: 'Meta',
    kind: { fr: 'Certificat professionnel Coursera', en: 'Coursera professional certificate' },
  },
  {
    id: 'meta-front-end-developer',
    status: 'verified',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    kind: { fr: 'Certificat professionnel Coursera', en: 'Coursera professional certificate' },
  },
];

/** Every value is counted from the data files, so the strip updates itself. */
export const HOME_METRICS: HomeMetric[] = [
  {
    id: 'projects',
    value: PROJECTS.filter((project) => project.status === 'verified').length,
    precision: 0,
    suffix: '',
    label: { fr: 'projets', en: 'projects' },
    detail: {
      fr: 'IA & RAG, backend, full-stack, web, mobile, machine learning',
      en: 'AI & RAG, backend, full-stack, web, mobile, machine learning',
    },
    path: 'projects',
    icon: 'projects',
  },
  {
    id: 'experience',
    value: EXPERIENCE.filter((experience) => experience.status === 'verified').length,
    precision: 0,
    suffix: '',
    label: { fr: 'expériences professionnelles', en: 'professional experiences' },
    detail: {
      fr: 'Stages chez ALTEN et RATITEC, freelance avec une plateforme en production',
      en: 'Internships at ALTEN and RATITEC, freelance work on a live platform',
    },
    path: 'experience',
    icon: 'experience',
  },
  {
    id: 'certifications',
    value: certificationsCount,
    precision: 0,
    suffix: '',
    label: { fr: 'certificats', en: 'certificates' },
    detail: {
      fr: 'Oracle (Java SE 17, Database 19c), Meta, IBM et Coursera',
      en: 'Oracle (Java SE 17, Database 19c), Meta, IBM and Coursera',
    },
    path: 'certifications',
    icon: 'certifications',
  },
];
