/**
 * Shared service catalog.
 *
 * This is the single source of truth for the services BORMM offers. It is kept
 * fully serializable (the `icon` field is a string key rather than a React
 * component) so it can be imported by both the client UI and the Node.js
 * back-end (route handlers) without pulling React into the server bundle.
 */

export type ServiceIconKey =
  | 'lightbulb'
  | 'rocket'
  | 'fileText'
  | 'penTool'
  | 'compass'
  | 'trendingUp';

export interface Service {
  id: number;
  /** URL/back-end friendly identifier. */
  slug: string;
  title: string;
  price: string;
  /** Numeric price in USD, used by the back-end for record keeping. */
  priceUsd: number;
  duration: string;
  icon: ServiceIconKey;
  popular?: boolean;
  description: string;
  outcome: string;
  listTitle: string;
  list: string[];
  disclaimer?: string;
  /** Call-to-action label shown on the service button. */
  cta: string;
}

export const services: Service[] = [
  {
    id: 1,
    slug: 'quick-clarity-call',
    title: 'Quick Clarity Call',
    price: '$15',
    priceUsd: 15,
    duration: '30 Minutes | Phone or Zoom',
    icon: 'lightbulb',
    description:
      'Need a fresh perspective or help thinking through your next step? This focused session provides quick guidance on career transitions, housing concerns, budgeting questions, job search strategies, or personal challenges.',
    outcome:
      "You'll leave with practical suggestions, resources, and a clearer path forward.",
    listTitle: 'Best For:',
    list: [
      'Quick questions',
      'Career advice',
      'Housing concerns',
      'Budgeting questions',
      'General life transitions',
    ],
    cta: 'Book Now',
  },
  {
    id: 2,
    slug: 'layoff-to-launch-strategy',
    title: 'Layoff to Launch Strategy',
    price: '$25',
    priceUsd: 25,
    duration: '45 Minutes | Phone or Zoom',
    icon: 'rocket',
    popular: true,
    description:
      'Life changes can feel overwhelming, but they can also create new opportunities. This personalized session is designed for individuals navigating layoffs, career changes, underemployment, or major life transitions.',
    outcome:
      "Together, we'll assess your current situation, identify immediate priorities, and create an actionable plan to help you regain momentum.",
    listTitle: "You'll Receive:",
    list: [
      'Situation assessment',
      'Personalized action plan',
      'Resource recommendations',
      'Follow-up session summary',
    ],
    cta: 'Select Session',
  },
  {
    id: 3,
    slug: 'resume-refresh',
    title: 'Resume Refresh',
    price: '$25',
    priceUsd: 25,
    duration: '45 Minutes | Phone or Zoom',
    icon: 'fileText',
    description:
      'Your resume is often your first impression. This session provides personalized feedback and recommendations to strengthen your resume and improve your job search strategy.',
    outcome:
      "We'll discuss formatting, accomplishments, keywords, and ways to better position your experience for today's job market.",
    listTitle: 'Includes:',
    list: [
      'Resume review',
      'Improvement recommendations',
      'LinkedIn profile suggestions',
      'Job search guidance',
    ],
    cta: 'Book Now',
  },
  {
    id: 4,
    slug: 'letter-and-correspondence-support',
    title: 'Letter & Correspondence Support',
    price: '$25',
    priceUsd: 25,
    duration: '45 Minutes | Phone or Zoom',
    icon: 'penTool',
    description:
      'Sometimes the right words make all the difference. Receive guidance on drafting professional correspondence related to employment matters, housing concerns, disputes, hardship requests, or appeals.',
    outcome:
      "We'll help you organize your thoughts and create a clear, professional message.",
    listTitle: 'Common Requests:',
    list: [
      'Professional letters',
      'Appeal letters',
      'Hardship requests',
      'Housing correspondence',
      'Follow-up communications',
    ],
    disclaimer:
      'This service provides guidance and drafting support only and does not constitute legal advice.',
    cta: 'Book Now',
  },
  {
    id: 5,
    slug: 'bormm-transition-blueprint',
    title: 'BORMM Transition Blueprint',
    price: '$50',
    priceUsd: 50,
    duration: '60 Minutes | Phone or Zoom',
    icon: 'compass',
    description:
      'A comprehensive strategy session for individuals ready to take control of their next chapter. This session is ideal for those experiencing major life changes and looking for a clear roadmap forward.',
    outcome:
      "Together, we'll review your career goals, housing situation, financial organization, and personal priorities to create a customized 30-day action plan.",
    listTitle: 'Includes:',
    list: [
      'Career review',
      'Housing review',
      'Financial organization discussion',
      'Goal-setting session',
      'Customized 30-day action plan',
    ],
    cta: 'Book Now',
  },
  {
    id: 6,
    slug: 'bormm-momentum-monthly',
    title: 'BORMM Momentum Monthly',
    price: '$99',
    priceUsd: 99,
    duration: 'Monthly Coaching Support',
    icon: 'trendingUp',
    description:
      "Change doesn't happen in a single conversation—it happens through consistent action. The Momentum Package provides ongoing support, accountability, and guidance as you work toward your goals.",
    outcome:
      "Whether you're rebuilding after a setback, pursuing a career transition, or creating a new plan, this package helps keep you moving forward.",
    listTitle: 'Includes:',
    list: [
      'Two 45-minute coaching sessions / month',
      'Priority scheduling',
      'Email support between sessions',
      'Monthly accountability check-in',
      'Resource recommendations',
    ],
    cta: 'Join Monthly',
  },
];

export function getServiceById(id: number): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
