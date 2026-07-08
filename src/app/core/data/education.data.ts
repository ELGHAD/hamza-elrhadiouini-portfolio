import { EducationEntry } from '../models/education.model';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'emsi-engineering',
    degree: 'Engineering Degree — Computer Science & Networks',
    institution: 'École Marocaine des Sciences de l\'Ingénieur (EMSI)',
    location: 'Rabat, Morocco',
    period: '2023 — Present',
    specialization: 'MIAGE (Information Systems Management)',
    highlight: true
  },
  {
    id: 'emsi-prepa',
    degree: 'Integrated Preparatory Classes',
    institution: 'École Marocaine des Sciences de l\'Ingénieur (EMSI)',
    location: 'Rabat, Morocco',
    period: '2021 — 2023',
    highlight: false
  },
  {
    id: 'bac',
    degree: 'Baccalauréat — Physical Sciences & Chemistry',
    institution: 'Groupe Scolaire Al Mâarif',
    location: 'Salé, Morocco',
    period: '2020 — 2021',
    highlight: false
  }
];