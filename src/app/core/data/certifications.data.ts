import { Certification } from '../models/certification.model';

export const CERTIFICATIONS: Certification[] = [
  // Featured
  { id: 'meta-backend-pro', name: 'Meta Back-End Developer Professional Certificate', issuer: 'Meta', year: 2025, tier: 'featured' },
  { id: 'meta-frontend-pro', name: 'Meta Front-End Developer Professional Certificate', issuer: 'Meta', year: 2025, tier: 'featured' },
  { id: 'ibm-ml-python', name: 'Machine Learning with Python', issuer: 'IBM', year: 2025, tier: 'featured' },
  { id: 'ibm-containers', name: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift', issuer: 'IBM', year: 2025, tier: 'featured' },
  { id: 'ibm-genai-intro', name: 'Generative AI: Introduction and Applications', issuer: 'IBM', year: 2026, tier: 'featured' },
  { id: 'ibm-genai-prompt', name: 'Generative AI: Prompt Engineering Basics', issuer: 'IBM', year: 2026, tier: 'featured' },
  { id: 'learnquest-spring-core', name: 'Spring – Ecosystem and Core', issuer: 'LearnQuest', year: 2026, tier: 'featured' },
  { id: 'learnquest-spring-mvc', name: 'Spring MVC, Spring Boot and REST Controllers', issuer: 'LearnQuest', year: 2026, tier: 'featured' },
  { id: 'packt-spring-cloud', name: 'Advanced Spring Cloud Microservices & Deployment with Docker', issuer: 'Packt', year: 2025, tier: 'featured' },
  { id: 'ibm-oop-java', name: 'Object Oriented Programming in Java', issuer: 'IBM', year: 2025, tier: 'featured' },
  { id: 'ibm-sw-eng-intro', name: 'Introduction to Software Engineering', issuer: 'IBM', year: 2025, tier: 'featured' },

  // Meta Back-End track sub-courses
  { id: 'meta-be-python', name: 'Programming in Python', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-be-apis', name: 'APIs', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-be-django', name: 'Django Web Framework', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-be-capstone', name: 'Back-End Developer Capstone', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-be-fullstack', name: 'The Full Stack', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-be-interview', name: 'Coding Interview Preparation', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },
  { id: 'meta-version-control', name: 'Version Control', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Back-End Developer' },

  // Meta Front-End track sub-courses
  { id: 'meta-fe-intro', name: 'Introduction to Front-End Development', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-fe-react-adv', name: 'Advanced React', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-fe-capstone', name: 'Front-End Developer Capstone', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-fe-htmlcss', name: 'HTML and CSS in Depth', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-fe-uxui', name: 'Principles of UX/UI Design', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-fe-react-basics', name: 'React Basics', issuer: 'Meta', year: 2024, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },
  { id: 'meta-version-control-fe', name: 'Version Control', issuer: 'Meta', year: 2025, tier: 'sub-course', parentTrack: 'Meta Front-End Developer' },

  // Additional coursework
  { id: 'ibm-java-beginners', name: 'Java Programming for Beginners', issuer: 'IBM', year: 2025, tier: 'additional' },
  { id: 'upenn-java-oop', name: 'Introduction to Java and Object-Oriented Programming', issuer: 'University of Pennsylvania', year: 2025, tier: 'additional' },
  { id: 'google-git-github', name: 'Introduction to Git and GitHub', issuer: 'Google', year: 2025, tier: 'additional' },
  { id: 'whizlabs-azure-vnet', name: 'Virtual Networks in Azure', issuer: 'Whizlabs', year: 2025, tier: 'additional' },
  { id: 'michigan-python-everybody', name: 'Programming for Everybody (Getting Started with Python)', issuer: 'University of Michigan', year: 2024, tier: 'additional' },
  { id: 'michigan-js-interactivity', name: 'Interactivity with JavaScript', issuer: 'University of Michigan', year: 2024, tier: 'additional' },
  { id: 'jhu-unix-workbench', name: 'The Unix Workbench', issuer: 'Johns Hopkins University', year: 2024, tier: 'additional' },
  { id: 'oracle-db-admin', name: 'Oracle Database 19c Administration', issuer: 'Oracle', year: 2023, tier: 'additional' },
  { id: 'cu-boulder-sql', name: 'The Structured Query Language (SQL)', issuer: 'University of Colorado Boulder', year: 2023, tier: 'additional' },
  { id: 'jhu-html-css-js', name: 'HTML, CSS, and Javascript for Web Developers', issuer: 'Johns Hopkins University', year: 2023, tier: 'additional' },
  { id: 'hkust-sw-design', name: 'Software Engineering: Software Design and Project Management', issuer: 'The Hong Kong University of Science and Technology', year: 2024, tier: 'additional' },
  { id: 'epfl-villes-africaines', name: 'Villes africaines: Environnement et enjeux de développement durable', issuer: 'EPFL', year: 2024, tier: 'additional' },
  { id: 'epfl-poo-cpp', name: 'Introduction à la programmation orientée objet (en C++)', issuer: 'EPFL', year: 2024, tier: 'additional' },
  { id: 'polytechnique-recherche-doc', name: 'La recherche documentaire', issuer: 'École Polytechnique', year: 2024, tier: 'additional' },
  { id: 'duke-impact-measurement', name: 'Impact Measurement & Management for the SDGs', issuer: 'Duke University', year: 2024, tier: 'additional' }
];