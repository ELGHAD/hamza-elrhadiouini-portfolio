import { Testimonial } from '../models/testimonial.model';

/*
 * Testimonials stay hidden until at least one entry is `verified` AND `publicationAuthorized`.
 * Copy the author's text word for word. Template for a new entry:
 *
 * {
 *   id: 'sounds-of-morocco-client',
 *   status: 'verified',
 *   publicationAuthorized: true,
 *   quote: { text: '<texte exact>', lang: 'fr' },
 *   translation: '<traduction relue, optionnelle>',
 *   author: '<Prénom Nom>',
 *   role: { fr: '<rôle>', en: '<role>' },
 *   organization: '<organisation>',
 *   context: { fr: 'Client · freelance', en: 'Client · freelance work' },
 * },
 */
export const TESTIMONIALS: Testimonial[] = [];

