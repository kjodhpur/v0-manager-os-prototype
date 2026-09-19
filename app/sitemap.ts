import type { MetadataRoute } from 'next';
import { SITE, SITEMAP_ROUTES } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITEMAP_ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
