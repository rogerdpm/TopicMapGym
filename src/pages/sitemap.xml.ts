import type { APIRoute } from 'astro';
import { categories } from '../lib/categories';
import { getExercisesByCategory } from '../lib/exercises';

const siteUrl = 'https://rogerdpm.github.io/TopicMapGym/';
const today = new Date().toISOString().split('T')[0];

export const GET: APIRoute = async () => {
  const urls: Array<{ loc: string; priority: number; changefreq: string }> = [];

  // Homepage
  urls.push({ loc: siteUrl, priority: 1.0, changefreq: 'daily' });

  // Category and exercise pages
  for (const category of categories) {
    urls.push({ loc: `${siteUrl}${category.id}/`, priority: 0.9, changefreq: 'weekly' });
    const exercises = await getExercisesByCategory(category.id);
    for (const exercise of exercises) {
      const slug = exercise.id.split('/').pop();
      urls.push({ loc: `${siteUrl}${category.id}/${slug}/`, priority: 0.7, changefreq: 'monthly' });
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
