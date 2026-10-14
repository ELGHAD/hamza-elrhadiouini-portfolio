/**
 * docs/portfolio/certifications.ts — Référence des certificats de Hamza El Rhadiouini.
 * À migrer en Phase 4 vers src/app/core/data/certifications.data.ts (+ types dans core/models/certification.model.ts).
 *
 * Règles d'affichage (voir PORTFOLIO_PROMPT.md) :
 *  - `featured` = mis en avant sur l'accueil ; le reste est regroupé par `group` dans /certifications.
 *  - Les entrées avec `parentId` sont des sous-certificats : à afficher repliés sous leur parent.
 *  - `verifyUrl` est utilisé tel quel (ne jamais modifier ni deviner un lien).
 *  - Toute entrée avec `todo` ne doit PAS s'afficher en production tant que le champ n'est pas résolu.
 *  - Pas d'année affichée (choix de Hamza). Pas de niveaux.
 *  - IBM GenAI : cours individuels, aucune spécialisation IBM n'est obtenue — ne jamais écrire "spécialisation IBM".
 */

export type CertKind = 'official' | 'specialization' | 'professional-certificate' | 'course';

export type CertGroupId =
  | 'oracle' | 'java-spring' | 'meta-backend' | 'meta-frontend' | 'ai-ml'
  | 'web' | 'cloud-devops-data' | 'software-engineering' | 'other';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  kind: CertKind;
  group: CertGroupId;
  parentId?: string;
  verifyUrl?: string;
  courseUrl?: string;
  featured?: boolean;
  note?: string;
  todo?: string;
}

export const certGroups: { id: CertGroupId; fr: string; en: string }[] = [
  {
    "id": "oracle",
    "fr": "Certifications Oracle",
    "en": "Oracle certifications"
  },
  {
    "id": "java-spring",
    "fr": "Java & Spring Boot",
    "en": "Java & Spring Boot"
  },
  {
    "id": "meta-backend",
    "fr": "Meta Back-End Developer",
    "en": "Meta Back-End Developer"
  },
  {
    "id": "meta-frontend",
    "fr": "Meta Front-End Developer",
    "en": "Meta Front-End Developer"
  },
  {
    "id": "ai-ml",
    "fr": "IA générative & Machine Learning",
    "en": "Generative AI & Machine Learning"
  },
  {
    "id": "web",
    "fr": "Web & JavaScript",
    "en": "Web & JavaScript"
  },
  {
    "id": "cloud-devops-data",
    "fr": "Cloud, DevOps, bases de données & systèmes",
    "en": "Cloud, DevOps, databases & systems"
  },
  {
    "id": "software-engineering",
    "fr": "Génie logiciel & programmation",
    "en": "Software engineering & programming"
  },
  {
    "id": "other",
    "fr": "Autres domaines",
    "en": "Other fields"
  }
];


/** Étiquettes honnêtes affichées sur chaque carte. */
export const certKindLabels: Record<CertKind, { fr: string; en: string }> = {
  'official': { fr: 'Certification officielle', en: 'Official certification' },
  'specialization': { fr: 'Spécialisation Coursera', en: 'Coursera specialization' },
  'professional-certificate': { fr: 'Certificat professionnel Coursera', en: 'Coursera professional certificate' },
  'course': { fr: 'Certificat Coursera', en: 'Coursera certificate' },
};

export const certifications: Certification[] = [
  {
    "id": "oracle-ocp-java-17",
    "title": "Oracle Certified Professional: Java SE 17 Developer (1Z0-829)",
    "issuer": "Oracle",
    "kind": "official",
    "group": "oracle",
    "featured": true,
    "todo": "TODO(hamza): ajouter le lien de vérification (Credly / Oracle)"
  },
  {
    "id": "oracle-db-19c",
    "title": "Oracle Database 19c Administration",
    "issuer": "Oracle",
    "kind": "official",
    "group": "oracle",
    "featured": true,
    "todo": "TODO(hamza): ajouter le lien de vérification (Credly / Oracle)"
  },
  {
    "id": "full-stack-java-spring",
    "title": "Full-Stack Java Dev with Spring & Spring Boot",
    "issuer": "Honoris / Board Infinity",
    "kind": "specialization",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/specialization/31W6UR017AM4",
    "courseUrl": "https://www.coursera.org/specializations/spring-and-spring-boot-development",
    "featured": true
  },
  {
    "id": "spring-boot-mvc-architecture",
    "title": "Building Applications with Spring Boot and MVC Architecture",
    "issuer": "Board Infinity",
    "kind": "course",
    "group": "java-spring",
    "parentId": "full-stack-java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/VHZ6NSUY7TTX"
  },
  {
    "id": "advanced-spring-boot-microservices",
    "title": "Mastering Advanced Spring Boot: Microservices & System Design",
    "issuer": "Board Infinity",
    "kind": "course",
    "group": "java-spring",
    "parentId": "full-stack-java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/LACO4R264HRP"
  },
  {
    "id": "spring-boot-aws",
    "title": "Deploying & Scaling Spring Boot Applications on AWS",
    "issuer": "Board Infinity",
    "kind": "course",
    "group": "java-spring",
    "parentId": "full-stack-java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/A7DHWJMJTRDA"
  },
  {
    "id": "spring-ecosystem-core",
    "title": "Spring - Ecosystem and Core",
    "issuer": "LearnQuest",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/UWQVA0YVWEYY"
  },
  {
    "id": "spring-mvc-rest",
    "title": "Spring MVC, Spring Boot and Rest Controllers",
    "issuer": "LearnQuest",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/XLE98R3YE2V2"
  },
  {
    "id": "spring-cloud-docker",
    "title": "Advanced Spring Cloud Microservices & Deployment with Docker",
    "issuer": "Packt",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/O10ZKCC0Q3EQ"
  },
  {
    "id": "java-oop-ibm",
    "title": "Object Oriented Programming in Java",
    "issuer": "IBM",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/6127NACUN1UH"
  },
  {
    "id": "java-beginners-ibm",
    "title": "Java Programming for Beginners",
    "issuer": "IBM",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/2ZK5LGW3TDN7"
  },
  {
    "id": "java-oop-upenn",
    "title": "Introduction to Java and Object-Oriented Programming",
    "issuer": "University of Pennsylvania",
    "kind": "course",
    "group": "java-spring",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/EOK0P937RSB9"
  },
  {
    "id": "meta-back-end-developer",
    "title": "Meta Back-End Developer Professional Certificate",
    "issuer": "Meta",
    "kind": "professional-certificate",
    "group": "meta-backend",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/professional-cert/K9G7WX3NF91A",
    "courseUrl": "https://www.coursera.org/specializations/meta-back-end-developer",
    "featured": true
  },
  {
    "id": "meta-be-intro",
    "title": "Introduction to Back-End Development",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/9OMBB80HVMJ9"
  },
  {
    "id": "meta-be-python",
    "title": "Programming in Python",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/PIORKURY0LGH"
  },
  {
    "id": "meta-be-version-control",
    "title": "Version Control",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/GJDEQJJICM2P"
  },
  {
    "id": "meta-be-databases",
    "title": "Introduction to Databases for Back-End Development",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/HZ5V6CXVJ9BJ"
  },
  {
    "id": "meta-be-django",
    "title": "Django Web Framework",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/16242CQ3EZH6"
  },
  {
    "id": "meta-be-apis",
    "title": "APIs",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/1534YP8KFRO0"
  },
  {
    "id": "meta-be-full-stack",
    "title": "The Full Stack",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/VQ9RM71I2AK6"
  },
  {
    "id": "meta-be-capstone",
    "title": "Back-End Developer Capstone",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/9VF9LSGRTRTF"
  },
  {
    "id": "meta-be-coding-interview",
    "title": "Coding Interview Preparation",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-backend",
    "parentId": "meta-back-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/OXFPUWS35NOK"
  },
  {
    "id": "meta-front-end-developer",
    "title": "Meta Front-End Developer Professional Certificate",
    "issuer": "Meta",
    "kind": "professional-certificate",
    "group": "meta-frontend",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/professional-cert/6KYZCTZLR4RJ",
    "courseUrl": "https://www.coursera.org/specializations/meta-front-end-developer",
    "featured": true,
    "note": "Hypothèse : les 7 cours Meta ci-dessous composent ce parcours ; React Native, Johns Hopkins et Michigan restent indépendants. À confirmer par Hamza."
  },
  {
    "id": "meta-fe-intro",
    "title": "Introduction to Front-End Development",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/YP4SZF3EQAPM"
  },
  {
    "id": "meta-fe-javascript",
    "title": "Programming with JavaScript",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/8Z2E6PHXEO8Z"
  },
  {
    "id": "meta-fe-html-css",
    "title": "HTML and CSS in depth",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/L9G1EXUAP5U9"
  },
  {
    "id": "meta-fe-react-basics",
    "title": "React Basics",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/LO7ICMVPH3IP"
  },
  {
    "id": "meta-fe-advanced-react",
    "title": "Advanced React",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/IYVJ0LVGTPNA"
  },
  {
    "id": "meta-fe-ux-ui",
    "title": "Principles of UX/UI Design",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/0QTL7ZGZC5C5"
  },
  {
    "id": "meta-fe-capstone",
    "title": "Front-End Developer Capstone",
    "issuer": "Meta",
    "kind": "course",
    "group": "meta-frontend",
    "parentId": "meta-front-end-developer",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/G46RMLXIRSGT"
  },
  {
    "id": "ibm-genai-career",
    "title": "Generative AI: Elevate your Software Development Career",
    "issuer": "IBM",
    "kind": "course",
    "group": "ai-ml",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/7H2KAM6K49G8"
  },
  {
    "id": "ibm-genai-prompt",
    "title": "Generative AI: Prompt Engineering Basics",
    "issuer": "IBM",
    "kind": "course",
    "group": "ai-ml",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/6Z0PXN8HQ352"
  },
  {
    "id": "ibm-genai-intro",
    "title": "Generative AI: Introduction and Applications",
    "issuer": "IBM",
    "kind": "course",
    "group": "ai-ml",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/M0W5XQO6NUN1"
  },
  {
    "id": "ibm-ml-python",
    "title": "Machine Learning with Python",
    "issuer": "IBM",
    "kind": "course",
    "group": "ai-ml",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/O7WERIBTJOXN"
  },
  {
    "id": "meta-react-native",
    "title": "React Native",
    "issuer": "Meta",
    "kind": "course",
    "group": "web",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/1ON7K1UZOPYQ"
  },
  {
    "id": "jhu-html-css-js",
    "title": "HTML, CSS, and Javascript for Web Developers",
    "issuer": "Johns Hopkins University",
    "kind": "course",
    "group": "web",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/D24YDJGSQHWK"
  },
  {
    "id": "umich-javascript",
    "title": "Interactivity with JavaScript",
    "issuer": "University of Michigan",
    "kind": "course",
    "group": "web",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/D9DHKX2Y4GZA"
  },
  {
    "id": "ibm-containers",
    "title": "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
    "issuer": "IBM",
    "kind": "course",
    "group": "cloud-devops-data",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/RQ224F388VVP"
  },
  {
    "id": "whizlabs-azure-vnet",
    "title": "Virtual Networks in Azure",
    "issuer": "Whizlabs",
    "kind": "course",
    "group": "cloud-devops-data",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/UPR48FAEUXFV"
  },
  {
    "id": "google-git-github",
    "title": "Introduction to Git and GitHub",
    "issuer": "Google",
    "kind": "course",
    "group": "cloud-devops-data",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/2JB2FS39JRTX"
  },
  {
    "id": "colorado-sql",
    "title": "The Structured Query Language (SQL)",
    "issuer": "University of Colorado Boulder",
    "kind": "course",
    "group": "cloud-devops-data",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/R2FSPBKMKK6B"
  },
  {
    "id": "jhu-unix",
    "title": "The Unix Workbench",
    "issuer": "Johns Hopkins University",
    "kind": "course",
    "group": "cloud-devops-data",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/B3N22QDPQLBY"
  },
  {
    "id": "ibm-intro-se",
    "title": "Introduction to Software Engineering",
    "issuer": "IBM",
    "kind": "course",
    "group": "software-engineering",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/NBTICUXX1OEG"
  },
  {
    "id": "hkust-se-design",
    "title": "Software Engineering: Software Design and Project Management",
    "issuer": "HKUST",
    "kind": "course",
    "group": "software-engineering",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/XKEXZD97RA49"
  },
  {
    "id": "umich-python",
    "title": "Programming for Everybody (Getting Started with Python)",
    "issuer": "University of Michigan",
    "kind": "course",
    "group": "software-engineering",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/HWMTLRDSLCVS"
  },
  {
    "id": "epfl-poo-cpp",
    "title": "Introduction à la programmation orientée objet (en C++)",
    "issuer": "EPFL",
    "kind": "course",
    "group": "software-engineering",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/3PT2MYUJY9LR"
  },
  {
    "id": "uci-arduino",
    "title": "The Arduino Platform and C Programming",
    "issuer": "UC Irvine",
    "kind": "course",
    "group": "software-engineering",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/93AXQBYSEBY8"
  },
  {
    "id": "epfl-villes-africaines",
    "title": "Villes africaines : Environnement et enjeux de développement durable",
    "issuer": "EPFL",
    "kind": "course",
    "group": "other",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/6RFA26SL9K5A"
  },
  {
    "id": "polytechnique-recherche-doc",
    "title": "La recherche documentaire",
    "issuer": "École Polytechnique",
    "kind": "course",
    "group": "other",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/7AR6JTY94UNU"
  },
  {
    "id": "duke-sdgs",
    "title": "Impact Measurement & Management for the SDGs",
    "issuer": "Duke University",
    "kind": "course",
    "group": "other",
    "verifyUrl": "https://www.coursera.org/account/accomplishments/records/L6XHF2VHNMYL"
  }
];


export const featuredCertifications = certifications.filter((c) => c.featured && !c.todo);
export const childrenOf = (id: string) => certifications.filter((c) => c.parentId === id);
export const topLevelByGroup = (group: CertGroupId) =>
  certifications.filter((c) => c.group === group && !c.parentId);
/** Compteur dérivé des données (jamais écrit en dur). */
export const certificationsCount = certifications.length;
