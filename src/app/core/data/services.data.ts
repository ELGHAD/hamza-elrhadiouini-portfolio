import { BilingualText } from '../models/content.model';
import {
  ServiceEcosystem,
  ServiceMilestone,
  ServiceOffer,
  ServiceProof,
  ServiceStep,
} from '../models/service.model';

const t = (fr: string, en: string): BilingualText => ({ fr, en });
const proof = (fr: string, en: string, path: string): ServiceProof => ({ label: t(fr, en), path });

/** Every proof links to a project page; claims match projects.data.ts. */
export const SERVICES: ServiceOffer[] = [
  {
    id: 'java-backend',
    status: 'verified',
    icon: 'server',
    title: t('Backend Java & microservices', 'Java backends & microservices'),
    summary: t(
      'Des API Spring Boot sécurisées et documentées, en couches ou en microservices derrière une API Gateway, avec des règles métier testées.',
      'Secured, documented Spring Boot APIs, layered or as microservices behind an API Gateway, with tested business rules.',
    ),
    deliverables: [
      t('API REST en couches : Controller, Service, Repository, DTO.', 'Layered REST APIs: controller, service, repository, DTO.'),
      t(
        'Sécurité JWT, BCrypt et RBAC, isolation multi-tenant si besoin.',
        'JWT, BCrypt and RBAC security, multi-tenant isolation when needed.',
      ),
      t(
        'Transactions cohérentes, idempotence, tests JUnit et Testcontainers.',
        'Consistent transactions, idempotency, JUnit and Testcontainers tests.',
      ),
      t('Contrats OpenAPI et collections Postman.', 'OpenAPI contracts and Postman collections.'),
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Spring Cloud Gateway', 'JPA', 'MySQL', 'PostgreSQL'],
    proofs: [
      proof('Copilote IA · ALTEN', 'AI copilot · ALTEN', '/projects/ai-copilot'),
      proof('eBank · SaaS multi-tenant', 'eBank · multi-tenant SaaS', '/projects/ebank'),
      proof('RATITEC · 12+ API REST', 'RATITEC · 12+ REST APIs', '/projects/ratitec'),
      proof('Product Management API', 'Product Management API', '/projects/product-management-api'),
    ],
  },
  {
    id: 'full-stack',
    status: 'verified',
    icon: 'layout',
    title: t('Applications web full-stack', 'Full-stack web applications'),
    summary: t(
      'De l’interface à la base de données, dans l’écosystème de votre équipe : Angular, React, Next.js, Laravel, Django ou ASP.NET Core.',
      'From interface to database, in your team’s ecosystem: Angular, React, Next.js, Laravel, Django or ASP.NET Core.',
    ),
    deliverables: [
      t('Interfaces responsives pensées pour chaque rôle.', 'Responsive interfaces designed for each role.'),
      t('Back-office, authentification et permissions.', 'Back office, authentication and permissions.'),
      t('Modèle relationnel, migrations et intégration API.', 'Relational model, migrations and API integration.'),
    ],
    stack: ['Angular', 'React', 'Next.js', 'TypeScript', 'Laravel', 'Django', 'ASP.NET Core'],
    proofs: [
      proof('Copilote IA (Angular)', 'AI copilot (Angular)', '/projects/ai-copilot'),
      proof('eBank (React)', 'eBank (React)', '/projects/ebank'),
      proof('EMSI Association (Laravel)', 'EMSI Association (Laravel)', '/projects/emsi-association'),
      proof('Restaurant Management (.NET)', 'Restaurant Management (.NET)', '/projects/restaurant-management'),
    ],
  },
  {
    id: 'rag-copilots',
    status: 'verified',
    icon: 'sparkles',
    title: t('Copilotes IA & RAG', 'AI copilots & RAG'),
    summary: t(
      'Un assistant qui répond à partir de vos documents, cite ses sources, respecte les droits de chacun et passe la main à un humain quand il le faut.',
      'An assistant that answers from your documents, cites its sources, respects who may read what and hands over to a person when needed.',
    ),
    deliverables: [
      t('Extraction, découpage et indexation des PDF et DOCX.', 'PDF and DOCX extraction, chunking and indexing.'),
      t(
        'Recherche filtrée par rôle avant la génération, réponses sourcées.',
        'Role-filtered retrieval before generation, source-grounded answers.',
      ),
      t('Streaming SSE et escalade vers un ticket de support.', 'SSE streaming and escalation to a support ticket.'),
      t('Évaluation de la qualité des réponses.', 'Answer quality evaluation.'),
    ],
    stack: ['FastAPI', 'LangChain', 'OpenAI', 'pgvector', 'Embeddings', 'SSE'],
    proofs: [
      proof('Copilote IA · 98 % de réponses correctes', 'AI copilot · 98% correct answers', '/projects/ai-copilot'),
      proof('Chatbot API · Spring Boot + OpenAI', 'Chatbot API · Spring Boot + OpenAI', '/projects/chatbot-api'),
    ],
  },
  {
    id: 'computer-vision',
    status: 'verified',
    icon: 'eye',
    title: t('IA appliquée & vision', 'Applied AI & vision'),
    summary: t(
      'Des modèles de deep learning évalués honnêtement : jeu de test officiel, fuites de données repérées, pipeline reproductible.',
      'Deep learning models evaluated honestly: official test sets, data leakage caught, reproducible pipelines.',
    ),
    deliverables: [
      t('Prétraitement et augmentation adaptés au domaine.', 'Domain-aware preprocessing and augmentation.'),
      t('CNN et transfer learning (ResNet50).', 'CNNs and transfer learning (ResNet50).'),
      t('Métriques complètes, model card, inférence temps réel.', 'Full metrics, model card, real-time inference.'),
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'scikit-learn'],
    proofs: [
      proof('Panneaux routiers · 98,45 %', 'Traffic signs · 98.45%', '/projects/traffic-sign-recognition'),
      proof('Pneumonie · ResNet50', 'Pneumonia · ResNet50', '/projects/xray-pneumonia'),
      proof('Gestes en temps réel', 'Real-time gestures', '/projects/hand-gesture-recognition'),
    ],
  },
  {
    id: 'content-platforms',
    status: 'verified',
    icon: 'edit',
    title: t('Plateformes administrables', 'Content-managed platforms'),
    summary: t(
      'Des sites en production que votre équipe met à jour seule, avec un CMS headless, des médias rapides et une maintenance suivie.',
      'Live sites your team updates on its own, with a headless CMS, fast media and ongoing maintenance.',
    ),
    deliverables: [
      t('Front-end éditorial performant.', 'A fast editorial front end.'),
      t('CMS pour publier sans développeur.', 'A CMS to publish without a developer.'),
      t('SEO, performances et évolutions en production.', 'SEO, performance and live improvements.'),
    ],
    stack: ['Next.js', 'Strapi', 'Supabase', 'Cloudinary', 'Django'],
    proofs: [
      proof('Sounds of Morocco · en production', 'Sounds of Morocco · live', '/projects/sounds-of-morocco'),
      proof('Little Lemon · Django Admin', 'Little Lemon · Django Admin', '/projects/little-lemon-django'),
    ],
  },
  {
    id: 'mobile',
    status: 'verified',
    icon: 'phone',
    title: t('Applications mobiles', 'Mobile applications'),
    summary: t(
      'Des apps Android et Flutter structurées comme un backend : couches nettes, état prévisible, données disponibles hors ligne.',
      'Android and Flutter apps structured like a backend: clean layers, predictable state, data available offline.',
    ),
    deliverables: [
      t('Clean Architecture ou MVVM.', 'Clean Architecture or MVVM.'),
      t('Stockage local et synchronisation prête pour une API.', 'Local storage and API-ready sync.'),
      t('Interfaces Material Design et tableaux de bord.', 'Material Design interfaces and dashboards.'),
    ],
    stack: ['Flutter', 'Dart', 'Kotlin', 'BLoC', 'Room', 'Hive'],
    proofs: [
      proof('Stock Management · Flutter', 'Stock Management · Flutter', '/projects/stock-management'),
      proof('TaskManager · Kotlin', 'TaskManager · Kotlin', '/projects/taskmanager-android'),
    ],
  },
  {
    id: 'cloud-delivery',
    status: 'verified',
    icon: 'cloud',
    title: t('Cloud, conteneurs & CI/CD', 'Cloud, containers & CI/CD'),
    summary: t(
      'Des environnements qui démarrent d’une commande et des déploiements automatisés, jusqu’à AWS.',
      'Environments that start with one command and automated deployments, all the way to AWS.',
    ),
    deliverables: [
      t('Docker et Docker Compose, reverse proxy Nginx.', 'Docker and Docker Compose, Nginx reverse proxy.'),
      t('Pipelines GitHub Actions : tests, builds, déploiement.', 'GitHub Actions pipelines: tests, builds, deployment.'),
      t(
        'AWS : ECS Fargate, RDS, S3 + CloudFront, Infrastructure as Code.',
        'AWS: ECS Fargate, RDS, S3 + CloudFront, Infrastructure as Code.',
      ),
    ],
    stack: ['Docker', 'GitHub Actions', 'AWS', 'Terraform', 'Nginx', 'Vercel'],
    proofs: [
      proof('eBank · déploiement AWS', 'eBank · AWS deployment', '/projects/ebank'),
      proof('Copilote IA · Docker Compose', 'AI copilot · Docker Compose', '/projects/ai-copilot'),
      proof('Sounds of Morocco · CI/CD', 'Sounds of Morocco · CI/CD', '/projects/sounds-of-morocco'),
    ],
  },
  {
    id: 'automation',
    status: 'verified',
    icon: 'workflow',
    title: t('Automatisation & outils data', 'Automation & data tools'),
    summary: t(
      'Des outils qui remplacent une tâche répétitive : collecte de données, classement explicable, historique et exports prêts à partager.',
      'Tools that replace a repetitive chore: data collection, explainable ranking, history and ready-to-share exports.',
    ),
    deliverables: [
      t('Collecte via API et déduplication.', 'API-based collection and deduplication.'),
      t('Score et règles de classement transparents.', 'Transparent scoring and ranking rules.'),
      t('Exports Excel, CSV et JSON, API REST.', 'Excel, CSV and JSON exports, REST API.'),
    ],
    stack: ['Python', 'Flask', 'Node.js', 'PostgreSQL', 'SerpApi'],
    proofs: [
      proof('Job Hunter Morocco', 'Job Hunter Morocco', '/projects/job-hunter'),
      proof('Scraping DB', 'Scraping DB', '/projects/scraping-db'),
    ],
  },
];

/**
 * Language ecosystems I have shipped in, described by what I build with each one
 * (no per-language project counts: a count of one reads as a weakness, not as range).
 */
export const SERVICE_ECOSYSTEMS: ServiceEcosystem[] = [
  {
    id: 'java',
    name: 'Java',
    focus: t('Backends & microservices', 'Backends & microservices'),
    frameworks: ['Spring Boot', 'Spring Cloud', 'JPA'],
  },
  {
    id: 'python',
    name: 'Python',
    focus: t('IA, données & API', 'AI, data & APIs'),
    frameworks: ['FastAPI', 'Django', 'TensorFlow'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    focus: t('Web & full-stack', 'Web & full-stack'),
    frameworks: ['Angular', 'React', 'Next.js'],
  },
  {
    id: 'php',
    name: 'PHP',
    focus: t('Applications web MVC', 'MVC web applications'),
    frameworks: ['Laravel', 'Symfony'],
  },
  {
    id: 'dotnet',
    name: 'C# / .NET',
    focus: t('Applications d’entreprise', 'Business applications'),
    frameworks: ['ASP.NET Core', 'EF Core'],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    focus: t('Android & multiplateforme', 'Android & cross-platform'),
    frameworks: ['Flutter', 'Kotlin', 'Jetpack'],
  },
  {
    id: 'systems',
    name: 'C / C++',
    focus: t('Algorithmique & performance', 'Algorithms & performance'),
    frameworks: ['C++20', 'STL', 'CMake'],
  },
];

/** A new ecosystem at each step: dates and places come from the experience and projects data. */
export const SERVICE_MILESTONES: ServiceMilestone[] = [
  {
    year: t('2024', '2024'),
    title: t('Symfony & modélisation', 'Symfony & domain modelling'),
    detail: t('Premier stage, chez ALTEN à Fès', 'First internship, at ALTEN in Fes'),
    path: '/projects/alten-task-manager-2024',
  },
  {
    year: t('2025', '2025'),
    title: t('Spring Boot en entreprise', 'Spring Boot in a company'),
    detail: t('Backend chez RATITEC, en binôme', 'Backend at RATITEC, in a pair'),
    path: '/projects/ratitec',
  },
  {
    year: t('2025', '2025'),
    title: t('Next.js en production', 'Next.js in production'),
    detail: t('Sounds of Morocco, en freelance', 'Sounds of Morocco, freelance'),
    path: '/projects/sounds-of-morocco',
  },
  {
    year: t('2026', '2026'),
    title: t('RAG & microservices', 'RAG & microservices'),
    detail: t('Copilote IA, PFE chez ALTEN', 'AI copilot, final-year project at ALTEN'),
    path: '/projects/ai-copilot',
  },
  {
    year: t('Aujourd’hui', 'Today'),
    title: t('SaaS & cloud AWS', 'SaaS & AWS cloud'),
    detail: t('eBank, multi-tenant et déployé sur AWS', 'eBank, multi-tenant and deployed on AWS'),
    path: '/projects/ebank',
  },
];

export const SERVICE_STEPS: ServiceStep[] = [
  {
    title: t('Comprendre le métier', 'Understand the business'),
    text: t(
      'Avant le code : qui utilise l’outil, quelles règles comptent, ce qui ne doit jamais casser.',
      'Before code: who uses the tool, which rules matter, what must never break.',
    ),
  },
  {
    title: t('Modéliser d’abord', 'Model first'),
    text: t(
      'Un modèle de données et une architecture posés avant les écrans.',
      'A data model and an architecture set before the screens.',
    ),
  },
  {
    title: t('Construire et tester', 'Build and test'),
    text: t(
      'Des invariants métier vérifiés par des tests, des chiffres mesurés, jamais arrondis.',
      'Business invariants checked by tests, figures measured, never rounded up.',
    ),
  },
  {
    title: t('Livrer et faire vivre', 'Ship and maintain'),
    text: t(
      'Conteneurs, CI/CD, mise en production, puis maintenance et évolutions.',
      'Containers, CI/CD, going live, then maintenance and improvements.',
    ),
  },
];
