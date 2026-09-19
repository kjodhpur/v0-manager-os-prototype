/**
 * Single source of truth for site-wide navigation, routes and brand metadata.
 * Every header, footer and sitemap entry derives from here so links can never
 * drift out of sync with the routes that actually exist.
 */

export const SITE = {
  name: 'HeartMetrics',
  domain: 'heartmetrics.dev',
  url: 'https://heartmetrics.dev',
  tagline: 'Make work more human with ethical AI.',
  description:
    'Privacy-first workplace wellbeing analytics. HeartMetrics surfaces workload, recognition and growth patterns from work-system signals so managers can act before people burn out.',
  contactEmail: 'vsnavale@asu.edu',
} as const;

/** Every route that exists in the app. Used to validate links and build the sitemap. */
export const ROUTES = {
  home: '/',
  product: '/product',
  howWeCalculate: '/how-we-calculate',
  pricing: '/#pricing',
  security: '/security',
  faq: '/faq',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  demo: '/demo',
  signin: '/signin',
  qr: '/qr',
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** Exact match only — prevents `/` matching every route. */
  exact?: boolean;
};

/**
 * Primary navigation. Pricing points at `/#pricing` rather than a bare `#pricing`
 * so it resolves from every page, not just the homepage.
 */
export const PRIMARY_NAV: NavLink[] = [
  { label: 'Product', href: ROUTES.product },
  { label: 'How it Works', href: ROUTES.howWeCalculate },
  { label: 'Pricing', href: ROUTES.pricing },
  { label: 'Security', href: ROUTES.security },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: ROUTES.product },
      { label: 'How it Works', href: ROUTES.howWeCalculate },
      { label: 'Pricing', href: ROUTES.pricing },
      { label: 'Live Demo', href: ROUTES.demo },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: ROUTES.about },
      { label: 'Contact', href: ROUTES.contact },
      { label: 'FAQ', href: ROUTES.faq },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Security', href: ROUTES.security },
      { label: 'Privacy Policy', href: ROUTES.privacy },
      { label: 'Terms of Service', href: ROUTES.terms },
    ],
  },
];

/** CTA copy is centralised so the same action never gets two different labels. */
export const CTA = {
  demo: 'Try Live Demo',
  demoShort: 'Try Demo',
  signin: 'Sign in',
  contact: 'Connect with Us',
} as const;

/** Routes included in the generated sitemap, with relative crawl priority. */
export const SITEMAP_ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/product', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/how-we-calculate', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/demo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
];
