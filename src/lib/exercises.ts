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

export function buildMediaUrl(
  category: string,
  exerciseId: string,
  filename: string
): string {
  return `/assets/exercises/${category}/${exerciseId}/${filename}`;
}
