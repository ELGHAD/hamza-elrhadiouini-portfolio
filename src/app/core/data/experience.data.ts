import { ExperienceEntry } from '../models/experience.model';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'alten-rabat-ai-copilot',
    role: 'Software Engineer Intern — AI Systems',
    company: 'ALTEN',
    location: 'Rabat, Morocco',
    period: 'March 2026 — Present (6 months)',
    type: 'End-of-study internship (PFE)',
    responsibilities: [
      'Designing and building AI Copilot, a production-style RAG platform on a 5-service Spring Boot microservices architecture',
      'Building a dedicated Python FastAPI RAG service using LangChain, pgvector, and Azure OpenAI for document embedding and retrieval',
      'Implementing JWT-secured, role-based access control (Admin, Expert, Operational) across services',
      'Developing the Angular frontend, including real-time streaming chat, voice input, and an analytics dashboard',
      'Optimizing retrieval accuracy through French-optimized document chunking and MMR retrieval to reduce hallucinations'
    ],
    relatedProjectId: 'ai-copilot'
  },
  {
    id: 'ratitec-el-mohammadia',
    role: 'Backend Developer Intern',
    company: 'RATITEC',
    location: 'El Mohammadia, Morocco',
    period: '2025',
    type: 'End-of-study internship (PFA), 4th year',
    responsibilities: [
      'Designed and implemented a Spring Boot REST API backend for a renewable energy project management platform',
      'Built role-based access control (Admin, Project Manager, Technician) using Spring Security',
      'Modeled and persisted core business entities (projects, users, tasks) with Spring Data JPA and MySQL, following a clean layered architecture',
      'Collaborated with a frontend-focused teammate, supporting Angular integration'
    ],
    relatedProjectId: 'renewtrack'
  },
  {
    id: 'alten-fes-taskflow',
    role: 'Web Developer Intern',
    company: 'ALTEN',
    location: 'Fès, Morocco',
    period: '2024',
    type: 'Professional internship, 3rd year',
    responsibilities: [
      'Independently developed a full task-management web application under mentor guidance, working in iterative sprint-based development cycles',
      'Designed and implemented an MVC architecture using Symfony and MySQL',
      'Built a role-based authentication system distinguishing administrator and user permissions'
    ],
    relatedProjectId: 'taskflow'
  }
];