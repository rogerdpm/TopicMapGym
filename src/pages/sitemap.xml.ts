import type { APIRoute } from 'astro';
import { categories, getCategoryById } from '../lib/categories';
import { getExercisesByCategory } from '../lib/exercises';

const siteUrl = 'https://jjloubser.github.io/topicmapgym/';

export const GET: APIRoute = async () => {
  const urls: string[] = [siteUrl];

  // Add category pages
  for (const category of categories) {
    urls.push(`${siteUrl}${category.id}/`);
    const exercises = await getExercisesByCategory(category.id);
    for (const exercise of exercises) {
      const slug = exercise.id.split('/').pop();
      urls.push(`${siteUrl}${category.id}/${slug}/`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === siteUrl ? '1.0' : url.endsWith('/') ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
