import { getCollection, type CollectionEntry } from 'astro:content';

export type Exercise = CollectionEntry<'exercises'>;

export function getExerciseSlug(exercise: Exercise): string {
  return exercise.id.split('/').pop() || exercise.id;
}

export async function getExercisesByCategory(category: string): Promise<Exercise[]> {
  const all = await getCollection('exercises');
  return all.filter(e => e.data.category === category);
}

export async function getExerciseById(category: string, id: string): Promise<Exercise | undefined> {
  const all = await getCollection('exercises');
  return all.find(e => e.data.category === category && getExerciseSlug(e) === id);
}

export async function getAllExercises(): Promise<Exercise[]> {
  return getCollection('exercises');
}

export async function searchExercises(query: string): Promise<Exercise[]> {
  const all = await getCollection('exercises');
  const lower = query.toLowerCase();

  return all.filter(e => {
    const data = e.data;
    return (
      data.name.toLowerCase().includes(lower) ||
      data.aliases?.some(a => a.toLowerCase().includes(lower)) ||
      data.muscles.primary.some(m => m.toLowerCase().includes(lower)) ||
      data.equipment.some(eq => eq.toLowerCase().includes(lower))
    );
  });
}

// CDN Base URL from environment (empty string for local development)
const CDN_BASE_URL = import.meta.env.PUBLIC_MEDIA_CDN_URL || '';

export function buildMediaUrl(
  category: string,
  exerciseId: string,
  filename: string
): string {
  const localPath = `/assets/exercises/${category}/${exerciseId}/${filename}`;
  return CDN_BASE_URL ? `${CDN_BASE_URL}${localPath}` : localPath;
}

export function getMediaBaseUrl(): string {
  return CDN_BASE_URL || '';
}
