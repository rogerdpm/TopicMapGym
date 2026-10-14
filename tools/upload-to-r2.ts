#!/usr/bin/env npx tsx
/**
 * Upload media assets to Cloudflare R2 using wrangler
 * 
 * Prerequisites:
 * 1. Logged in to Cloudflare: wrangler login
 * 2. R2 bucket exists with public dev URL enabled
 * 
 * Usage:
 *   npm run upload:r2
 */

import { execSync } from 'child_process';
import { readdir } from 'fs/promises';
import { join, relative } from 'path';
import 'dotenv/config';

const BUCKET_NAME = 'topicmapgym-media';
const MEDIA_DIR = join(process.cwd(), 'public', 'assets', 'exercises');
const CDN_URL = process.env.PUBLIC_MEDIA_CDN_URL || 'https://pub-c9ec96bb08a540d08b55038a85a5795a.r2.dev';

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function uploadWithWrangler(filePath: string, key: string): void {
  const cmd = `wrangler r2 object put "${BUCKET_NAME}/${key}" --file="${filePath}" --remote`;
  execSync(cmd, { stdio: 'pipe' });
}

async function uploadMedia(): Promise<void> {
  console.log('🚀 Starting R2 upload via wrangler...\n');
  console.log(`📁 Source: ${MEDIA_DIR}`);
  console.log(`🪣 Bucket: ${BUCKET_NAME}\n`);

  const files = await getAllFiles(MEDIA_DIR);
  console.log(`📦 Found ${files.length} files to upload\n`);

  let uploaded = 0;
  let failed = 0;

  for (const filePath of files) {
    const relativeToExercises = relative(MEDIA_DIR, filePath);
    
    try {
      uploadWithWrangler(filePath, relativeToExercises);
      uploaded++;
      process.stdout.write(`✓ ${relativeToExercises} (${uploaded}/${files.length})\r`);
    } catch (error: any) {
      failed++;
      console.error(`\n❌ Failed: ${relativeToExercises}`);
    }
  }

  console.log(`\n\n✅ Upload complete!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n🌐 Media URL: ${CDN_URL}/`);
}

uploadMedia().catch(console.error);
