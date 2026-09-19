import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Product surfaces behind the marketing site carry no crawlable content.
      disallow: ['/app', '/signin', '/demo'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
