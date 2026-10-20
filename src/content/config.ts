import { defineCollection, z } from 'astro:content';

const exercises = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    category: z.enum(['glutes', 'legs', 'chest', 'back', 'shoulders', 'arms', 'core', 'cardio']),
    aliases: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    equipment: z.array(z.string()),
    muscles: z.object({
      primary: z.array(z.string()),
      secondary: z.array(z.string()).optional(),
    }),
    instructions: z.array(z.string()),
    tips: z.array(z.string()).optional(),
    safety: z.array(z.string()).optional(),
    media: z.object({
      thumbnail: z.string(),
      diagrams: z.array(z.string()),
      videos: z.array(z.string()).optional(),
    }),
    gridPosition: z.object({
      row: z.number(),
      col: z.number(),
    }).optional(),
  }),
});

export const collections = { exercises };
