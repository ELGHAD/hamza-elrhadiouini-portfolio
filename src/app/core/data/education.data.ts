import { EducationEntry, EducationPhase, StoryMilestone } from '../models/education.model';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'emsi-engineering',
    status: 'verified',
    degree: {
      fr: 'Diplôme d’Ingénieur d’État en Informatique et Réseaux',
      en: 'State Engineering Degree in Computer Science and Networks',
    },
    institution: 'EMSI',
    location: { fr: 'Rabat, Maroc', en: 'Rabat, Morocco' },
    period: { fr: '2021 → 2026', en: '2021 → 2026' },
    specialization: { fr: 'Option MIAGE', en: 'MIAGE option' },
    highlight: true,
    startYear: 2021,
    endYear: 2026,
  },
  {
    id: 'bac-al-maarif',
    status: 'verified',
    degree: {
      fr: 'Baccalauréat Sciences Physiques (PC)',
      en: 'Baccalaureate in Physical Sciences (PC)',
    },
    institution: 'Al Maarif High School',
    location: { fr: 'Salé, Maroc', en: 'Sale, Morocco' },
    period: { fr: '2021', en: '2021' },
  },
];

/** First and last chapters of the experience-page story (verified facts only). */
export const STORY_MILESTONES: StoryMilestone[] = [
  {
    id: 'start-emsi',
    status: 'verified',
    position: 'start',
    period: { fr: '2021', en: '2021' },
    chapter: { fr: 'Le point de départ', en: 'Where it starts' },
    title: {
      fr: 'Baccalauréat, puis entrée à l’EMSI',
      en: 'Baccalaureate, then into EMSI',
    },
    meta: {
      fr: 'Al Maarif High School, Salé · EMSI, Rabat',
      en: 'Al Maarif High School, Sale · EMSI, Rabat',
    },
    story: {
      fr: '2021 : baccalauréat Sciences Physiques en poche, j’entre à l’EMSI à Rabat pour cinq ans de formation d’ingénieur en informatique et réseaux. La ligne verte qui descend à gauche, ce sont ces cinq années : tout ce qui suit s’est construit en parallèle.',
      en: '2021: with a baccalaureate in physical sciences, I join EMSI in Rabat for a five-year engineering degree in computer science and networks. The green line running down the left is those five years: everything below happened alongside them.',
    },
  },
  {
    id: 'graduation',
    status: 'verified',
    position: 'end',
    period: { fr: '2026', en: '2026' },
    chapter: { fr: 'Ingénieur d’État', en: 'State-certified engineer' },
    title: {
      fr: 'Diplôme d’Ingénieur d’État en Informatique et Réseaux · option MIAGE',
      en: 'State Engineering Degree in Computer Science and Networks · MIAGE option',
    },
    meta: { fr: 'EMSI · Rabat, Maroc', en: 'EMSI · Rabat, Morocco' },
    story: {
      fr: '2026 : je termine l’EMSI avec le diplôme d’Ingénieur d’État, option MIAGE. Pendant ces années, j’ai aussi développé EMSI Association, la plateforme de la vie associative de l’école.',
      en: '2026: I graduate from EMSI with the State Engineering Degree, MIAGE option. Along the way, I also built EMSI Association, the platform for the school’s student clubs.',
    },
    relatedProjectId: 'emsi-association',
  },
];

const item = (fr: string, en = fr) => ({ fr, en });

/**
 * EMSI curriculum as described by Hamza (2026-10-11). Dates are derived from the
 * semester split (10 semesters, 2021 → 2026); S10 is the final-year internship.
 * Only the option Hamza chose is detailed.
 */
export const EDUCATION_PHASES: EducationPhase[] = [
  {
    id: 'emsi-prepa',
    status: 'verified',
    semesters: 'S1 → S4',
    start: '2021-09',
    end: '2023-08',
    years: item('2021 → 2023'),
    railLabel: item('Prépa · S1–S4', 'Foundation · S1–S4'),
    card: true,
    chapter: item('Les fondations', 'The foundations'),
    title: item('Années préparatoires', 'Preparatory years'),
    story: item(
      'Les deux premières années posent les bases : mathématiques, physique, électronique et algorithmique, puis les premiers langages, les bases de données et les systèmes d’exploitation. Projets pratiques et mini-laboratoires font passer la théorie à la pratique.',
      'The first two years lay the groundwork: mathematics, physics, electronics and algorithms, then my first programming languages, databases and operating systems. Hands-on projects and mini-labs turn the theory into practice.',
    ),
    modules: [
      {
        title: item('Sciences fondamentales', 'Core sciences'),
        items: [
          item('Mathématiques', 'Mathematics'),
          item('Physique', 'Physics'),
          item('Électronique', 'Electronics'),
          item('Informatique', 'Computer science'),
        ],
      },
      {
        title: item('Technologies de base', 'Core technologies'),
        items: [
          item('Circuits électriques', 'Electrical circuits'),
          item('Automatisme', 'Automation'),
          item('Algorithmique', 'Algorithms'),
        ],
      },
      {
        title: item('Informatique', 'Computing'),
        items: [
          item('Langages de programmation', 'Programming languages'),
          item('Bases de données', 'Databases'),
          item('Systèmes d’exploitation', 'Operating systems'),
        ],
      },
      {
        title: item('Ouverture', 'Broader view'),
        items: [item('Initiation à l’IA', 'Introduction to AI'), item('Gestion d’entreprise', 'Business management')],
      },
      {
        title: item('Pratique', 'Practice'),
        items: [item('Projets pratiques', 'Hands-on projects'), item('Mini-laboratoires', 'Mini-labs')],
      },
      {
        title: item('Compétences transversales', 'Transferable skills'),
        items: [item('Communication'), item('Langues', 'Languages'), item('Soft skills')],
      },
    ],
  },
  {
    id: 'emsi-common-core',
    status: 'verified',
    semesters: 'S5 → S7',
    start: '2023-09',
    end: '2025-01',
    years: item('2023 → 2025'),
    railLabel: item('Cycle ingénieur · S5–S7', 'Engineering core · S5–S7'),
    card: true,
    chapter: item('Tout le spectre de l’informatique', 'The full range of computing'),
    title: item('Cycle ingénieur commun', 'Engineering core curriculum'),
    story: item(
      'Le cycle ingénieur ouvre tout le spectre : développement en C++, Python, Java, .NET, Angular et React, génie logiciel, systèmes et cloud, réseaux et sécurité, IA, bases de données et gestion de projet. C’est pendant ce cycle que je fais mon premier stage, chez ALTEN à Fès.',
      'The engineering core covers the full range: development in C++, Python, Java, .NET, Angular and React, software engineering, systems and cloud, networks and security, AI, databases and project management. During this cycle I do my first internship, at ALTEN in Fes.',
    ),
    modules: [
      {
        title: item('Développement & langages', 'Development & languages'),
        items: [item('C++'), item('Python'), item('Java'), item('.NET'), item('Angular'), item('React')],
      },
      {
        title: item('Ingénierie logicielle', 'Software engineering'),
        items: [
          item('Méthodes agiles', 'Agile methods'),
          item('DevOps'),
          item('Qualité logicielle', 'Software quality'),
          item('UML'),
        ],
      },
      {
        title: item('Systèmes & cloud', 'Systems & cloud'),
        items: [item('Unix'), item('Windows'), item('Virtualisation', 'Virtualization'), item('Cloud computing')],
      },
      {
        title: item('Réseaux & cybersécurité', 'Networks & cybersecurity'),
        items: [item('TCP/IP'), item('Protocoles', 'Protocols'), item('Sécurité', 'Security'), item('Forensic', 'Forensics')],
      },
      {
        title: item('Intelligence artificielle', 'Artificial intelligence'),
        items: [item('Machine learning'), item('Data science'), item('IA appliquée', 'Applied AI')],
      },
      {
        title: item('Bases de données', 'Databases'),
        items: [item('SQL'), item('NoSQL'), item('Oracle'), item('MS SQL Server')],
      },
      {
        title: item('Gestion de projet & IT', 'Project & IT management'),
        items: [item('PMP'), item('ITIL'), item('Outils de pilotage', 'Project-steering tools')],
      },
      {
        title: item('Soft & digital skills'),
        items: [
          item('Communication'),
          item('Entrepreneuriat', 'Entrepreneurship'),
          item('Employabilité', 'Employability'),
          item('Management de projet', 'Project management'),
        ],
      },
    ],
  },
  {
    id: 'emsi-specialization',
    status: 'verified',
    semesters: 'S8 → S9',
    start: '2025-02',
    end: '2026-02',
    years: item('2025 → 2026'),
    railLabel: item('Spécialisation · S8–S9', 'Specialization · S8–S9'),
    card: true,
    chapter: item('Mon option : MIAGE', 'My option: MIAGE'),
    title: item('Cycle ingénieur spécialisé', 'Specialized engineering cycle'),
    story: item(
      'Pour les deux derniers semestres de cours, je choisis l’option MIAGE, Méthodes Informatiques Appliquées à la Gestion des Entreprises. On y travaille l’architecture microservices et le DevOps, que je mets ensuite en œuvre dans mon PFE chez ALTEN, et les frameworks back-end que j’utilise au même moment chez RATITEC.',
      'For the last two semesters of coursework, I choose the MIAGE option (Computer Methods Applied to Business Management). It covers microservices architecture and DevOps, which I then put into practice in my final-year project at ALTEN, and the back-end frameworks I am using at RATITEC at the same time.',
    ),
    note: item(
      'Option choisie parmi trois : IA & Data Science, Cybersécurité & Réseaux, MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises).',
      'Chosen among three options: AI & Data Science, Cybersecurity & Networks, MIAGE (Computer Methods Applied to Business Management).',
    ),
    modules: [
      {
        title: item('Architecture & DevOps'),
        items: [
          item('DevOps'),
          item('Architecture microservices', 'Microservices architecture'),
          item('Systèmes distribués', 'Distributed systems'),
        ],
      },
      {
        title: item('Frameworks'),
        items: [
          item('JEE'),
          item('Front-end'),
          item('Back-end'),
          item('Développement multiplateforme', 'Cross-platform development'),
        ],
      },
      {
        title: item('Applications d’entreprise', 'Enterprise applications'),
        items: [
          item('ERP'),
          item('Sécurité applicative', 'Application security'),
          item('Intégration SI', 'IS integration'),
          item('IA pour les applications métier', 'AI for business applications'),
        ],
      },
      {
        title: item('Données', 'Data'),
        items: [item('Tuning de bases de données', 'Database tuning'), item('Big Data'), item('Data mining')],
      },
    ],
  },
  {
    id: 'emsi-final-project',
    status: 'verified',
    semesters: 'S10',
    start: '2026-03',
    end: '2026-09',
    years: item('2026'),
    railLabel: item('PFE · S10', 'Final project · S10'),
    // Told by the ALTEN AI Copilot chapter.
    card: false,
  },
];
