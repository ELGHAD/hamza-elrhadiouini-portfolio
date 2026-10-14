import { BilingualText } from '../models/content.model';
import { Skill, SkillCategory } from '../models/skill.model';

/**
 * Every skill names where it was used: a project from projects.data.ts, an experience or a
 * certificate. A technology with no such source stays out.
 */
export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'languages', title: { fr: 'Langages', en: 'Languages' } },
  { id: 'backend-api', title: { fr: 'Backend & API', en: 'Backend & APIs' } },
  { id: 'frontend-mobile', title: { fr: 'Frontend & mobile', en: 'Frontend & mobile' } },
  { id: 'ai-data', title: { fr: 'IA & données', en: 'AI & data' } },
  { id: 'databases-cms', title: { fr: 'Bases de données & stockage', en: 'Databases & storage' } },
  { id: 'devops-tools', title: { fr: 'Cloud & DevOps', en: 'Cloud & DevOps' } },
  { id: 'security', title: { fr: 'Sécurité', en: 'Security' } },
  { id: 'testing', title: { fr: 'Tests & qualité', en: 'Testing & quality' } },
  {
    id: 'architecture-methods',
    title: { fr: 'Architecture & conception', en: 'Architecture & design' },
  },
  { id: 'methods-tools', title: { fr: 'Méthodes & outils', en: 'Methods & tools' } },
];

/**
 * `usedIn` is either one string (proper names only, identical in both languages)
 * or `{ fr, en }` when it contains words that need translating.
 */
const skill = (
  id: string,
  name: string | BilingualText,
  category: Skill['category'],
  usedIn: string | BilingualText,
  trainingOnly = false,
): Skill => {
  const where = typeof usedIn === 'string' ? { fr: usedIn, en: usedIn } : usedIn;
  return {
    id,
    name: typeof name === 'string' ? name : name.fr,
    ...(typeof name === 'string' ? {} : { localizedName: name }),
    category,
    status: 'verified',
    evidence: [
      {
        fr: trainingOnly ? `Formation : ${where.fr}` : `Utilisée dans : ${where.fr}`,
        en: trainingOnly ? `Coursework: ${where.en}` : `Used in: ${where.en}`,
      },
    ],
    ...(trainingOnly ? { trainingOnly: true } : {}),
  };
};

const BOARD_INFINITY_MICROSERVICES = 'Board Infinity · Mastering Advanced Spring Boot: Microservices & System Design';

export const SKILLS: Skill[] = [
  // ── Languages ─────────────────────────────────────────────────────────────────
  skill('java', 'Java', 'languages', {
    fr: 'Copilote IA (ALTEN), RATITEC, eBank, Pharmacy Manager et certification Oracle Java SE 17',
    en: 'AI copilot (ALTEN), RATITEC, eBank, Pharmacy Manager and the Oracle Java SE 17 certification',
  }),
  skill('python', 'Python', 'languages', {
    fr: 'Service RAG du copilote IA, Job Hunter, projets de vision et Little Lemon',
    en: 'AI copilot RAG service, Job Hunter, vision projects and Little Lemon',
  }),
  skill('typescript', 'TypeScript', 'languages', {
    fr: 'Copilote IA (Angular) et Sounds of Morocco (Next.js)',
    en: 'AI copilot (Angular) and Sounds of Morocco (Next.js)',
  }),
  skill('javascript', 'JavaScript', 'languages', {
    fr: 'eBank (React), Scraping DB (Node.js), Job Hunter et EMSI Association',
    en: 'eBank (React), Scraping DB (Node.js), Job Hunter and EMSI Association',
  }),
  skill('php', 'PHP', 'languages', {
    fr: 'EMSI Association, Clothing E-commerce et projets Symfony',
    en: 'EMSI Association, Clothing E-commerce and Symfony projects',
  }),
  skill('csharp', 'C#', 'languages', 'Restaurant Management (.NET 8)'),
  skill('kotlin', 'Kotlin', 'languages', 'TaskManager (Android)'),
  skill('dart', 'Dart', 'languages', 'Stock Management (Flutter)'),
  skill('cpp', 'C++', 'languages', {
    fr: 'Football Tournament Manager (C++20)',
    en: 'Football Tournament Manager (C++20)',
  }),
  skill('sql', 'SQL', 'languages', {
    fr: 'PostgreSQL, MySQL, SQL Server et SQLite dans la plupart des projets',
    en: 'PostgreSQL, MySQL, SQL Server and SQLite across most projects',
  }),
  skill('plsql', 'PL/SQL', 'languages', {
    fr: 'EMSI · bases de données Oracle (cycle ingénieur)',
    en: 'EMSI · Oracle databases (engineering cycle)',
  }, true),
  skill('tsql', 'T-SQL', 'languages', {
    fr: 'Restaurant Management · colonnes calculées SQL Server',
    en: 'Restaurant Management · SQL Server computed columns',
  }),
  skill('html-css', 'HTML / CSS', 'languages', {
    fr: 'Projets web et certificat Meta « HTML and CSS in depth »',
    en: 'Web projects and the Meta “HTML and CSS in depth” certificate',
  }),
  skill('bash', 'Bash', 'languages', 'Johns Hopkins · The Unix Workbench', true),
  skill('c', 'C', 'languages', 'UC Irvine · The Arduino Platform and C Programming', true),

  // ── Backend & APIs ────────────────────────────────────────────────────────────
  skill('spring-boot', 'Spring Boot', 'backend-api', {
    fr: 'Copilote IA, RATITEC, eBank, Product Management API et Chatbot API',
    en: 'AI copilot, RATITEC, eBank, Product Management API and Chatbot API',
  }),
  skill('spring-mvc', 'Spring MVC', 'backend-api', {
    fr: 'API REST Spring et cours LearnQuest « Spring MVC, Spring Boot and Rest Controllers »',
    en: 'Spring REST APIs and the LearnQuest “Spring MVC, Spring Boot and Rest Controllers” course',
  }),
  skill('spring-data-jpa', 'Spring Data JPA', 'backend-api', {
    fr: 'eBank, RATITEC et Product Management API',
    en: 'eBank, RATITEC and Product Management API',
  }),
  skill('hibernate', 'Hibernate', 'backend-api', {
    fr: 'eBank, RATITEC et Product Management API',
    en: 'eBank, RATITEC and Product Management API',
  }),
  skill('spring-cloud-gateway', 'Spring Cloud Gateway', 'backend-api', {
    fr: 'Copilote IA · API Gateway devant quatre services Spring Boot',
    en: 'AI copilot · API Gateway in front of four Spring Boot services',
  }),
  skill(
    'spring-cloud',
    'Spring Cloud (Eureka, OpenFeign, Config)',
    'backend-api',
    BOARD_INFINITY_MICROSERVICES,
    true,
  ),
  skill('resilience4j', 'Resilience4j', 'backend-api', BOARD_INFINITY_MICROSERVICES, true),
  skill('fastapi', 'FastAPI', 'backend-api', {
    fr: 'Service RAG du copilote IA',
    en: 'AI copilot RAG service',
  }),
  skill('flask', 'Flask', 'backend-api', 'Job Hunter'),
  skill('django', 'Django', 'backend-api', {
    fr: 'Little Lemon et cours Meta « Django Web Framework »',
    en: 'Little Lemon and the Meta “Django Web Framework” course',
  }),
  skill('laravel', 'Laravel', 'backend-api', {
    fr: 'EMSI Association et Clothing E-commerce',
    en: 'EMSI Association and Clothing E-commerce',
  }),
  skill('symfony', 'Symfony', 'backend-api', {
    fr: 'Stage ALTEN 2024 et Task Management System',
    en: 'ALTEN 2024 internship and Task Management System',
  }),
  skill('aspnet-mvc', 'ASP.NET Core MVC', 'backend-api', 'Restaurant Management'),
  skill('nodejs', 'Node.js', 'backend-api', 'Scraping DB'),
  skill('ef-core', 'Entity Framework Core', 'backend-api', 'Restaurant Management'),
  skill('doctrine', 'Doctrine ORM', 'backend-api', {
    fr: 'Stage ALTEN 2024 et Task Management System',
    en: 'ALTEN 2024 internship and Task Management System',
  }),
  skill('rest', { fr: 'API REST', en: 'REST APIs' }, 'backend-api', {
    fr: 'Copilote IA, RATITEC, eBank, Job Hunter et Chatbot API',
    en: 'AI copilot, RATITEC, eBank, Job Hunter and Chatbot API',
  }),
  skill('openapi', 'OpenAPI / Swagger', 'backend-api', {
    fr: 'Documentation des API du copilote IA',
    en: 'AI copilot API documentation',
  }),
  skill('bean-validation', 'Bean Validation', 'backend-api', {
    fr: 'Validation des requêtes d’eBank',
    en: 'eBank request validation',
  }),
  skill('kafka', 'Apache Kafka', 'backend-api', {
    fr: 'EMSI · cycle ingénieur (systèmes distribués)',
    en: 'EMSI · engineering cycle (distributed systems)',
  }, true),
  skill('graphql', 'GraphQL', 'backend-api', {
    fr: 'EMSI · cycle ingénieur',
    en: 'EMSI · engineering cycle',
  }, true),
  skill('sse', 'SSE (streaming)', 'backend-api', {
    fr: 'Réponses streamées du copilote IA',
    en: 'AI copilot streamed answers',
  }),

  // ── Frontend & mobile ─────────────────────────────────────────────────────────
  skill('angular', 'Angular', 'frontend-mobile', {
    fr: 'Copilote IA : chat, back-office, tickets',
    en: 'AI copilot: chat, back office, tickets',
  }),
  skill('react', 'React', 'frontend-mobile', {
    fr: 'eBank, React AI Chatbot et cours Meta « Advanced React »',
    en: 'eBank, React AI Chatbot and the Meta “Advanced React” course',
  }),
  skill('nextjs', 'Next.js', 'frontend-mobile', 'Sounds of Morocco'),
  skill('react-router', 'React Router', 'frontend-mobile', 'eBank'),
  skill('tailwind', 'Tailwind CSS', 'frontend-mobile', {
    fr: 'Sounds of Morocco, EMSI Association et Clothing E-commerce',
    en: 'Sounds of Morocco, EMSI Association and Clothing E-commerce',
  }),
  skill('bootstrap', 'Bootstrap', 'frontend-mobile', 'Restaurant Management'),
  skill('blade', 'Blade', 'frontend-mobile', {
    fr: 'EMSI Association et Clothing E-commerce',
    en: 'EMSI Association and Clothing E-commerce',
  }),
  skill('twig', 'Twig', 'frontend-mobile', {
    fr: 'Stage ALTEN 2024 (Symfony)',
    en: 'ALTEN 2024 internship (Symfony)',
  }),
  skill('razor', 'Razor', 'frontend-mobile', 'Restaurant Management'),
  skill('vite', 'Vite', 'frontend-mobile', {
    fr: 'EMSI Association, Clothing E-commerce et React AI Chatbot',
    en: 'EMSI Association, Clothing E-commerce and React AI Chatbot',
  }),
  skill('flutter', 'Flutter', 'frontend-mobile', {
    fr: 'Stock Management · BLoC, Hive, fl_chart',
    en: 'Stock Management · BLoC, Hive, fl_chart',
  }),
  skill('android', 'Android Jetpack', 'frontend-mobile', {
    fr: 'TaskManager · ViewModel, Room',
    en: 'TaskManager · ViewModel, Room',
  }),
  skill('java-swing', 'Java Swing', 'frontend-mobile', 'Pharmacy Manager'),
  skill('material-design', 'Material Design', 'frontend-mobile', {
    fr: 'TaskManager (Android) et Stock Management (Material 3)',
    en: 'TaskManager (Android) and Stock Management (Material 3)',
  }),
  skill('react-native', 'React Native', 'frontend-mobile', 'Meta · React Native', true),
  skill(
    'ux-ui',
    { fr: 'Design UX/UI', en: 'UX/UI design' },
    'frontend-mobile',
    'Meta · Principles of UX/UI Design',
    true,
  ),

  // ── AI & data ─────────────────────────────────────────────────────────────────
  skill('rag', { fr: 'Architecture RAG', en: 'RAG architecture' }, 'ai-data', {
    fr: 'Copilote IA · recherche filtrée par rôle, génération sourcée',
    en: 'AI copilot · role-filtered retrieval, source-grounded generation',
  }),
  skill('langchain', 'LangChain', 'ai-data', {
    fr: 'Service RAG du copilote IA',
    en: 'AI copilot RAG service',
  }),
  skill('openai', 'OpenAI API', 'ai-data', {
    fr: 'Copilote IA, Chatbot API (GPT-4o-mini) et React AI Chatbot',
    en: 'AI copilot, Chatbot API (GPT-4o-mini) and React AI Chatbot',
  }),
  skill('embeddings', 'Embeddings', 'ai-data', {
    fr: 'Pipeline RAG du copilote IA',
    en: 'AI copilot RAG pipeline',
  }),
  skill(
    'semantic-search',
    { fr: 'Recherche sémantique (MMR)', en: 'Semantic search (MMR)' },
    'ai-data',
    { fr: 'Retrieval du copilote IA', en: 'AI copilot retrieval' },
  ),
  skill('document-parsing', 'PyMuPDF · python-docx', 'ai-data', {
    fr: 'Extraction des PDF et DOCX du copilote IA',
    en: 'AI copilot PDF and DOCX extraction',
  }),
  skill('tiktoken', 'tiktoken', 'ai-data', {
    fr: 'Découpage des documents du copilote IA',
    en: 'AI copilot document chunking',
  }),
  skill(
    'prompt-engineering',
    'Prompt engineering',
    'ai-data',
    'IBM · Generative AI: Prompt Engineering Basics',
    true,
  ),
  skill('tensorflow', 'TensorFlow', 'ai-data', {
    fr: 'Panneaux routiers, pneumonie et gestes de la main',
    en: 'Traffic signs, pneumonia and hand gestures',
  }),
  skill('keras', 'Keras', 'ai-data', {
    fr: 'Panneaux routiers, pneumonie et gestes de la main',
    en: 'Traffic signs, pneumonia and hand gestures',
  }),
  skill('cnn', 'CNN', 'ai-data', {
    fr: 'Panneaux routiers (98,45 %) et gestes de la main',
    en: 'Traffic signs (98.45%) and hand gestures',
  }),
  skill(
    'transfer-learning',
    { fr: 'Transfer learning (ResNet50)', en: 'Transfer learning (ResNet50)' },
    'ai-data',
    { fr: 'Détection de pneumonie', en: 'Pneumonia detection' },
  ),
  skill(
    'computer-vision',
    { fr: 'Vision par ordinateur', en: 'Computer vision' },
    'ai-data',
    {
      fr: 'Panneaux routiers, radiographies et gestes en temps réel',
      en: 'Traffic signs, X-rays and real-time gestures',
    },
  ),
  skill('opencv', 'OpenCV', 'ai-data', {
    fr: 'Reconnaissance de gestes en temps réel',
    en: 'Real-time gesture recognition',
  }),
  skill('scikit-learn', 'scikit-learn', 'ai-data', {
    fr: 'Panneaux routiers, pneumonie et cours IBM « Machine Learning with Python »',
    en: 'Traffic signs, pneumonia and the IBM “Machine Learning with Python” course',
  }),
  skill('pandas', 'pandas', 'ai-data', {
    fr: 'Job Hunter et projets de deep learning',
    en: 'Job Hunter and deep learning projects',
  }),
  skill('numpy', 'NumPy', 'ai-data', {
    fr: 'Projets de vision et de deep learning',
    en: 'Vision and deep learning projects',
  }),
  skill('matplotlib', 'Matplotlib', 'ai-data', {
    fr: 'Courbes d’entraînement et d’évaluation des modèles',
    en: 'Model training and evaluation plots',
  }),
  skill('jupyter', 'Jupyter', 'ai-data', {
    fr: 'Notebooks des projets de vision',
    en: 'Vision project notebooks',
  }),
  skill('openpyxl', 'openpyxl', 'ai-data', {
    fr: 'Export Excel de Job Hunter',
    en: 'Job Hunter Excel export',
  }),
  skill('serpapi', 'SerpApi', 'ai-data', {
    fr: 'Job Hunter et Scraping DB',
    en: 'Job Hunter and Scraping DB',
  }),

  // ── Databases & storage ───────────────────────────────────────────────────────
  skill('postgresql', 'PostgreSQL', 'databases-cms', {
    fr: 'Copilote IA, Sounds of Morocco et Job Hunter',
    en: 'AI copilot, Sounds of Morocco and Job Hunter',
  }),
  skill('pgvector', 'pgvector', 'databases-cms', {
    fr: 'Base vectorielle du copilote IA',
    en: 'AI copilot vector store',
  }),
  skill('mysql', 'MySQL', 'databases-cms', {
    fr: 'eBank, RATITEC, EMSI Association, Pharmacy Manager et Product Management API',
    en: 'eBank, RATITEC, EMSI Association, Pharmacy Manager and Product Management API',
  }),
  skill('oracle-db', 'Oracle Database', 'databases-cms', {
    fr: 'Certification officielle Oracle Database 19c Administration',
    en: 'Official Oracle Database 19c Administration certification',
  }),
  skill('sql-server', 'SQL Server', 'databases-cms', 'Restaurant Management'),
  skill('sqlite', 'SQLite', 'databases-cms', {
    fr: 'Clothing E-commerce, Little Lemon et TaskManager (Room)',
    en: 'Clothing E-commerce, Little Lemon and TaskManager (Room)',
  }),
  skill('supabase', 'Supabase', 'databases-cms', 'Sounds of Morocco'),
  skill('mongodb', 'MongoDB', 'databases-cms', {
    fr: 'EMSI · bases de données NoSQL (cycle ingénieur)',
    en: 'EMSI · NoSQL databases (engineering cycle)',
  }, true),
  skill('redis', 'Redis', 'databases-cms', `${BOARD_INFINITY_MICROSERVICES} (caching)`, true),
  skill('hive', 'Hive', 'databases-cms', {
    fr: 'Stockage hors ligne de Stock Management',
    en: 'Stock Management offline storage',
  }),
  skill('strapi', 'Strapi', 'databases-cms', {
    fr: 'CMS headless de Sounds of Morocco',
    en: 'Sounds of Morocco headless CMS',
  }),
  skill('cloudinary', 'Cloudinary', 'databases-cms', {
    fr: 'Médias servis par CDN pour Sounds of Morocco',
    en: 'CDN-served media for Sounds of Morocco',
  }),
  skill(
    'migrations',
    { fr: 'Migrations de schéma', en: 'Schema migrations' },
    'databases-cms',
    { fr: 'eBank, Restaurant Management (EF Core) et Doctrine', en: 'eBank, Restaurant Management (EF Core) and Doctrine' },
  ),

  // ── Cloud & DevOps ────────────────────────────────────────────────────────────
  skill('aws', 'AWS', 'devops-tools', {
    fr: 'Déploiement d’eBank et cours Board Infinity « Deploying & Scaling Spring Boot Applications on AWS »',
    en: 'eBank deployment and the Board Infinity “Deploying & Scaling Spring Boot Applications on AWS” course',
  }),
  skill('ecs-fargate', 'AWS ECS Fargate', 'devops-tools', {
    fr: 'API Spring Boot d’eBank',
    en: 'eBank Spring Boot API',
  }),
  skill('rds', 'Amazon RDS', 'devops-tools', { fr: 'MySQL managé d’eBank', en: 'eBank managed MySQL' }),
  skill('s3-cloudfront', 'S3 · CloudFront', 'devops-tools', {
    fr: 'Front-end React d’eBank',
    en: 'eBank React front end',
  }),
  skill('cloudwatch', 'CloudWatch', 'devops-tools', {
    fr: 'Logs et alertes d’eBank',
    en: 'eBank logs and alerts',
  }),
  skill('terraform', 'Terraform / CloudFormation', 'devops-tools', {
    fr: 'Infrastructure as Code d’eBank',
    en: 'eBank Infrastructure as Code',
  }),
  skill('docker', 'Docker', 'devops-tools', {
    fr: 'Copilote IA, eBank et cours Packt « Spring Cloud Microservices & Deployment with Docker »',
    en: 'AI copilot, eBank and the Packt “Spring Cloud Microservices & Deployment with Docker” course',
  }),
  skill('docker-compose', 'Docker Compose', 'devops-tools', {
    fr: 'Copilote IA et eBank',
    en: 'AI copilot and eBank',
  }),
  skill('nginx', 'Nginx', 'devops-tools', {
    fr: 'Reverse proxy d’eBank',
    en: 'eBank reverse proxy',
  }),
  skill('github-actions', 'GitHub Actions', 'devops-tools', {
    fr: 'CI/CD d’eBank et de Sounds of Morocco',
    en: 'eBank and Sounds of Morocco CI/CD',
  }),
  skill('ci-cd', 'CI/CD', 'devops-tools', {
    fr: 'eBank (tests, builds, déploiement) et Sounds of Morocco',
    en: 'eBank (tests, builds, deployment) and Sounds of Morocco',
  }),
  skill('vercel-railway', 'Vercel · Railway', 'devops-tools', {
    fr: 'Hébergement de Sounds of Morocco',
    en: 'Sounds of Morocco hosting',
  }),
  skill(
    'kubernetes-openshift',
    'Kubernetes / OpenShift',
    'devops-tools',
    'IBM · Introduction to Containers w/ Docker, Kubernetes & OpenShift',
    true,
  ),
  skill('prometheus-grafana', 'Prometheus · Grafana', 'devops-tools', BOARD_INFINITY_MICROSERVICES, true),
  skill('azure', 'Azure', 'devops-tools', 'Whizlabs · Virtual Networks in Azure', true),

  // ── Security ──────────────────────────────────────────────────────────────────
  skill('spring-security', 'Spring Security', 'security', {
    fr: 'eBank et copilote IA',
    en: 'eBank and AI copilot',
  }),
  skill('jwt', 'JWT', 'security', {
    fr: 'Copilote IA et eBank',
    en: 'AI copilot and eBank',
  }),
  skill('bcrypt', 'BCrypt', 'security', {
    fr: 'Mots de passe du copilote IA et d’eBank',
    en: 'AI copilot and eBank passwords',
  }),
  skill('rbac', 'RBAC', 'security', {
    fr: 'Copilote IA (3 rôles), eBank (4 rôles), EMSI Association et Pharmacy Manager',
    en: 'AI copilot (3 roles), eBank (4 roles), EMSI Association and Pharmacy Manager',
  }),
  skill(
    'tenant-isolation',
    { fr: 'Isolation multi-tenant', en: 'Multi-tenant isolation' },
    'security',
    { fr: 'eBank · données isolées par organisation', en: 'eBank · data isolated per organization' },
  ),
  skill('oidc', 'GitHub OIDC', 'security', {
    fr: 'Identifiants AWS éphémères dans la CI d’eBank',
    en: 'Short-lived AWS credentials in eBank CI',
  }),
  skill('secrets-manager', 'AWS Secrets Manager · IAM', 'security', {
    fr: 'Secrets et moindre privilège d’eBank',
    en: 'eBank secrets and least privilege',
  }),
  skill('sanctum', 'Laravel Sanctum', 'security', 'EMSI Association'),
  skill('aspnet-identity', 'ASP.NET Core Identity', 'security', 'Restaurant Management'),
  skill('csrf', { fr: 'Protection CSRF', en: 'CSRF protection' }, 'security', 'Clothing E-commerce'),

  // ── Testing & quality ─────────────────────────────────────────────────────────
  skill('junit', 'JUnit 5', 'testing', {
    fr: 'eBank et backend RATITEC',
    en: 'eBank and the RATITEC backend',
  }),
  skill('mockito', 'Mockito', 'testing', {
    fr: 'eBank et backend RATITEC',
    en: 'eBank and the RATITEC backend',
  }),
  skill('mockmvc', 'MockMvc', 'testing', { fr: 'Tests d’API d’eBank', en: 'eBank API tests' }),
  skill('testcontainers', 'Testcontainers', 'testing', {
    fr: 'Tests d’intégration base de données d’eBank',
    en: 'eBank database integration tests',
  }),
  skill('vitest', 'Vitest · React Testing Library', 'testing', {
    fr: 'Tests front-end d’eBank',
    en: 'eBank front-end tests',
  }),
  skill('playwright', 'Playwright', 'testing', {
    fr: 'Tests end-to-end d’eBank',
    en: 'eBank end-to-end tests',
  }),
  skill('postman', 'Postman', 'testing', {
    fr: 'Validation des API du copilote IA',
    en: 'AI copilot API validation',
  }),
  skill('eslint', 'ESLint', 'testing', 'React AI Chatbot'),

  // ── Architecture & design ─────────────────────────────────────────────────────
  skill('microservices', { fr: 'Microservices', en: 'Microservices' }, 'architecture-methods', {
    fr: 'Copilote IA · API Gateway + 4 services Spring Boot + service RAG',
    en: 'AI copilot · API Gateway + 4 Spring Boot services + RAG service',
  }),
  skill('api-gateway', 'API Gateway pattern', 'architecture-methods', {
    fr: 'Copilote IA · Spring Cloud Gateway',
    en: 'AI copilot · Spring Cloud Gateway',
  }),
  skill('modular-monolith', { fr: 'Monolithe modulaire', en: 'Modular monolith' }, 'architecture-methods', 'eBank'),
  skill('layered', { fr: 'Architecture en couches', en: 'Layered architecture' }, 'architecture-methods', {
    fr: 'RATITEC, eBank, Product Management API et Chatbot API',
    en: 'RATITEC, eBank, Product Management API and Chatbot API',
  }),
  skill('clean-architecture', 'Clean Architecture', 'architecture-methods', 'Stock Management'),
  skill('mvc', 'MVC', 'architecture-methods', {
    fr: 'Stage ALTEN 2024, EMSI Association, Restaurant Management et Little Lemon (MVT)',
    en: 'ALTEN 2024 internship, EMSI Association, Restaurant Management and Little Lemon (MVT)',
  }),
  skill('mvvm', 'MVVM', 'architecture-methods', 'TaskManager (Android)'),
  skill('repository-pattern', 'Repository pattern', 'architecture-methods', {
    fr: 'Spring Data JPA, TaskManager et Stock Management',
    en: 'Spring Data JPA, TaskManager and Stock Management',
  }),
  skill('dto', 'DTO', 'architecture-methods', {
    fr: 'RATITEC, eBank et Chatbot API',
    en: 'RATITEC, eBank and Chatbot API',
  }),
  skill(
    'transactions',
    { fr: 'Transactions & concurrence', en: 'Transactions & concurrency' },
    'architecture-methods',
    {
      fr: 'Moteur de virement d’eBank et commande transactionnelle de Clothing E-commerce',
      en: 'eBank transfer engine and Clothing E-commerce transactional checkout',
    },
  ),
  skill('idempotency', { fr: 'Idempotence', en: 'Idempotency' }, 'architecture-methods', {
    fr: 'Virements d’eBank protégés contre les doubles requêtes',
    en: 'eBank transfers protected against duplicate requests',
  }),
  skill('offline-first', 'Offline-first', 'architecture-methods', 'Stock Management'),
  skill(
    'event-driven',
    { fr: 'Architecture événementielle · messaging asynchrone', en: 'Event-driven architecture · async messaging' },
    'architecture-methods',
    {
      fr: 'EMSI · cycle ingénieur (systèmes distribués)',
      en: 'EMSI · engineering cycle (distributed systems)',
    },
    true,
  ),
  skill('solid', 'SOLID', 'architecture-methods', {
    fr: 'Principes suivis dans eBank',
    en: 'Principles followed in eBank',
  }),
  skill('iac', 'Infrastructure as Code', 'architecture-methods', {
    fr: 'Infrastructure AWS d’eBank',
    en: 'eBank AWS infrastructure',
  }),

  // ── Methods & tools ───────────────────────────────────────────────────────────
  skill('scrum-agile', 'Scrum / Agile', 'methods-tools', {
    fr: '13 sprints sur le copilote IA et sprints chez RATITEC',
    en: '13 sprints on the AI copilot and sprints at RATITEC',
  }),
  skill('jira', 'Jira', 'methods-tools', {
    fr: 'Suivi Agile du copilote IA',
    en: 'AI copilot Agile tracking',
  }),
  skill('git', 'Git', 'methods-tools', {
    fr: 'Tous les projets, dont RATITEC et le copilote IA',
    en: 'Every project, including RATITEC and the AI copilot',
  }),
  skill('github', 'GitHub', 'methods-tools', {
    fr: 'Dépôts publics et workflows des projets',
    en: 'Public repositories and project workflows',
  }),
  skill('uml', 'UML', 'methods-tools', {
    fr: 'EMSI Association (StarUML) et Pharmacy Manager',
    en: 'EMSI Association (StarUML) and Pharmacy Manager',
  }),
  skill('maven', 'Maven', 'methods-tools', {
    fr: 'Projets Java Spring Boot et Pharmacy Manager',
    en: 'Java Spring Boot projects and Pharmacy Manager',
  }),
  skill('gradle', 'Gradle', 'methods-tools', 'TaskManager (Kotlin DSL)'),
  skill('cmake', 'CMake', 'methods-tools', 'Football Tournament Manager'),
];
