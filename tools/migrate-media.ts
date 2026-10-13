#!/usr/bin/env npx tsx
/**
 * Media Migration Script
 *
 * Reorganizes existing media from flat folder structure to structured asset paths.
 *
 * Original:
 *   images_1/folder_0_0/1.png
 *   images_1/folder_0_0/4.mp4
 *
 * New:
 *   src/assets/exercises/glutes/reverse-hack-squat/thumbnail.webp
 *   src/assets/exercises/glutes/reverse-hack-squat/diagram-1.webp
 *   src/assets/exercises/glutes/reverse-hack-squat/video-1.mp4
 *
 * Usage:
 *   npm run migrate:media
 */

import { copyFileSync, mkdirSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Category mapping: tab number -> category id
const CATEGORY_MAP: Record<number, string> = {
  1: 'glutes',
  2: 'legs',
  3: 'chest',
  4: 'back',
  5: 'shoulders',
  6: 'arms',
  7: 'core',
  8: 'cardio',
};

// Grid position mapping from folder name
const POSITION_MAP: Record<string, { row: number; col: number }> = {
  'folder_0_0': { row: 0, col: 0 },
  'folder_0_2': { row: 0, col: 2 },
  'folder_0_4': { row: 0, col: 4 },
  'folder_1_0': { row: 1, col: 0 },
  'folder_1_2': { row: 1, col: 2 },
  'folder_1_4': { row: 1, col: 4 },
  'folder_2_0': { row: 2, col: 0 },
  'folder_2_2': { row: 2, col: 2 },
  'folder_2_4': { row: 2, col: 4 },
  'folder_3_0': { row: 3, col: 0 },
  'folder_3_2': { row: 3, col: 2 },
  'folder_3_4': { row: 3, col: 4 },
  'folder_4_0': { row: 4, col: 0 },
  'folder_4_2': { row: 4, col: 2 },
  'folder_4_4': { row: 4, col: 4 },
};

// Exercise name mapping per category
const EXERCISE_MAP: Record<string, Record<string, string>> = {
  glutes: {
    'folder_0_0': 'reverse-hack-squat',
    'folder_0_2': 'good-mornings',
    'folder_0_4': 'donkey-kicks',
    'folder_1_0': 'bulgarian-split-squats',
    'folder_1_2': 'hip-thrust',
    'folder_1_4': 'single-leg-glute-extensions-back',
    'folder_2_0': 'step-ups',
    'folder_2_2': 'single-angle-leg-press',
    'folder_2_4': 'single-leg-glute-extensions-side',
    'folder_3_2': 'rdls',
    'folder_3_4': 'reverse-leg-extensions',
    'folder_4_0': 'side-lunge',
    'folder_4_2': 'hip-abductions',
    'folder_4_4': 'back-extension',
  },
  legs: {
    'folder_0_0': 'squats',
    'folder_0_2': 'leg-press',
    'folder_0_4': 'lunges',
    'folder_2_0': 'calf-raises',
    'folder_2_2': 'lying-leg-curls',
    'folder_2_4': 'hack-squats',
    'folder_4_2': 'leg-extensions',
  },
  chest: {
    'folder_0_0': 'flat-bench-press',
    'folder_0_2': 'incline-dumbell-press',
    'folder_0_4': 'close-grip-bench-press',
    'folder_2_0': 'decline-bench-press',
    'folder_2_2': 'front-raises',
    'folder_2_4': 'flys',
    'folder_4_0': 'peck-deck-fly',
    'folder_4_4': 'cross-over-chest-cables',
  },
  back: {
    'folder_0_0': 'back-press',
    'folder_0_2': 'one-arm-dumbbell-rows',
    'folder_0_4': 'reverse-fly',
    'folder_1_2': 'dead-lifts',
    'folder_2_0': 'lat-pulldowns',
    'folder_2_2': 'rear-lat-pulldowns',
    'folder_2_4': 'seated-row',
    'folder_3_0': 'lat-pullup',
    'folder_4_0': 'close-grip-lat-pulldown',
    'folder_4_2': 'straight-arm-lat-pulldown',
    'folder_4_4': 'face-pull',
  },
  // Add mappings for remaining categories...
};

function getExtension(filename: string): string {
  return extname(filename).toLowerCase();
}

function isVideo(filename: string): boolean {
  return ['.mp4', '.webm', '.mov'].includes(getExtension(filename));
}

function getMediaType(filename: string): 'thumbnail' | 'diagram' | 'video' {
  const ext = getExtension(filename);
  if (isVideo(filename)) return 'video';

  const name = basename(filename, ext).toLowerCase();
  if (name === '1') return 'thumbnail';
  return 'diagram';
}

async function migrateMedia() {
  console.log('Starting media migration...\n');

  const srcDir = join(ROOT, 'images_1'); // Start with glutes as example
  const destDir = join(ROOT, 'src', 'assets', 'exercises');

  let totalCopied = 0;

  for (const [tabNum, categoryId] of Object.entries(CATEGORY_MAP)) {
    const categoryDir = join(ROOT, `images_${tabNum}`);
    if (!existsSync(categoryDir)) {
      console.log(`Skipping ${categoryDir} (doesn't exist)`);
      continue;
    }

    const exerciseMap = EXERCISE_MAP[categoryId] || {};

    for (const folderName of readdirSync(categoryDir)) {
      const folderPath = join(categoryDir, folderName);
      if (!folderName.startsWith('folder_') || !existsSync(folderPath)) continue;

      const exerciseId = exerciseMap[folderName];
      if (!exerciseId) {
        console.log(`No exercise mapping for ${folderName} in ${categoryId}, skipping`);
        continue;
      }

      const exerciseDir = join(destDir, categoryId, exerciseId);
      mkdirSync(exerciseDir, { recursive: true });

      const files = readdirSync(folderPath).filter(f => !f.startsWith('.'));

      let diagramCount = 0;
      let videoCount = 0;

      for (const file of files) {
        const srcPath = join(folderPath, file);
        const mediaType = getMediaType(file);
        const ext = getExtension(file);

        let destFilename: string;

        if (mediaType === 'thumbnail') {
          destFilename = `thumbnail.webp`;
        } else if (mediaType === 'diagram') {
          diagramCount++;
          destFilename = `diagram-${diagramCount}.webp`;
        } else {
          videoCount++;
          destFilename = `video-${videoCount}.mp4`;
        }

        const destPath = join(exerciseDir, destFilename);

        // For now, just copy (in production, would convert to WebP)
        copyFileSync(srcPath, destPath);
        totalCopied++;
        console.log(`  ${categoryId}/${exerciseId}/${destFilename}`);
      }
    }
  }

  console.log(`\nMigration complete! ${totalCopied} files copied.`);
  console.log('\nNote: In production, run image optimization after migration:');
  console.log('  npx astro assets optimize');
}

migrateMedia().catch(console.error);
