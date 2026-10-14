#!/usr/bin/env npx tsx
/**
 * Upload media assets to Cloudflare R2
 * 
 * Prerequisites:
 * 1. Create R2 bucket at dash.cloudflare.com
 * 2. Get API credentials from My Profile → API Tokens
 * 3. Copy .env.example to .env and fill in values
 * 
 * Usage:
 *   npm run upload:r2
 * 
 * Or directly:
 *   npx tsx tools/upload-to-r2.ts
 */

import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { readdir, stat, readFile } from 'fs/promises';
import { join, relative } from 'path';
import 'dotenv/config';

// Validate environment
const bucketUrl = process.env.R2_BUCKET_URL;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!bucketUrl || !accessKeyId || !secretAccessKey) {
  console.error('❌ Missing R2 credentials. Please set in .env:');
  console.error('   R2_BUCKET_URL, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY');
  process.exit(1);
}

// Extract endpoint from bucket URL
const endpoint = bucketUrl.replace('https://', '').replace('http://', '');

// Create R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${endpoint}`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const MEDIA_DIR = join(process.cwd(), 'public', 'assets', 'exercises');

async function uploadFile(filePath: string, key: string): Promise<void> {
  const fileBuffer = await readFile(filePath);
  
  await r2.send(new PutObjectCommand({
    Bucket: endpoint.split('.')[0], // Bucket name is first part of URL
    Key: key,
    Body: fileBuffer,
    ContentType: getMimeType(filePath),
  }));
}

function getMimeType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'mov': 'video/quicktime',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

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

async function uploadMedia(): Promise<void> {
  console.log('🚀 Starting R2 upload...\n');
  console.log(`📁 Source: ${MEDIA_DIR}`);
  console.log(`🪣 Bucket: ${bucketUrl}\n`);

  // Get all files
  const files = await getAllFiles(MEDIA_DIR);
  console.log(`📦 Found ${files.length} files to upload\n`);

  let uploaded = 0;
  let failed = 0;

  for (const filePath of files) {
    const relativePath = relative(MEDIA_DIR, filePath);
    const key = `assets/exercises/${relativePath}`;
    
    try {
      await uploadFile(filePath, key);
      uploaded++;
      process.stdout.write(`✓ Uploaded: ${relativePath} (${uploaded}/${files.length})\r`);
    } catch (error) {
      failed++;
      console.error(`\n❌ Failed: ${relativePath}`);
      console.error(`   ${error}`);
    }
  }

  console.log(`\n\n✅ Upload complete!`);
  console.log(`   Uploaded: ${uploaded}`);
  console.log(`   Failed: ${failed}`);
  console.log(`\n🌐 Media URL: ${bucketUrl}/assets/exercises/`);
  console.log(`\n📝 Add this to your .env:`);
  console.log(`   PUBLIC_MEDIA_CDN_URL=${bucketUrl}`);
}

uploadMedia().catch(console.error);
