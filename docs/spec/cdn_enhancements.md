# CDN Enhancements - TopicMapGym

## Status: In Progress - Cloudflare R2 Setup

## Goal
Separate code repository from media files (~682 MB) by hosting media on a free CDN.

---

## Chosen Option: Cloudflare R2

### Why R2
- **Free tier**: 10 GB storage included
- **No egress fees**: Unlike AWS S3, Cloudflare doesn't charge for data transfer
- **S3-compatible**: Works with AWS SDK and existing tools
- **Global CDN**: Fast delivery via Cloudflare's network
- **File size**: Up to 5 GB per file

### Setup Completed
- [x] Installed AWS SDK (`@aws-sdk/client-s3`, `@aws-sdk/lib-storage`)
- [x] Created `.env.example` with R2 configuration template
- [x] Updated `exercises.ts` to prepend CDN URL from `PUBLIC_MEDIA_CDN_URL`
- [x] Created upload script at `tools/upload-to-r2.ts`
- [x] Added `npm run upload:r2` script

### Pending: R2 Bucket Creation
User needs to:
1. Create R2 bucket at dash.cloudflare.com
2. Get API credentials
3. Add credentials to `.env`
4. Run `npm run upload:r2`

---

## Implementation Details

### Environment Variables

Create `.env` from `.env.example`:
```bash
R2_BUCKET_URL=https://your-account.r2.dev
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
PUBLIC_MEDIA_CDN_URL=https://your-account.r2.dev
```

### Upload Command

```bash
npm run upload:r2
```

This will:
1. Scan `public/assets/exercises/` for all media files
2. Upload each file to R2 with path `assets/exercises/{category}/{file}`
3. Print the CDN URL to use

### Development vs Production

- **Local dev**: `PUBLIC_MEDIA_CDN_URL` is empty, uses local `/assets/exercises/`
- **Production**: Set `PUBLIC_MEDIA_CDN_URL` to your R2 bucket URL

### Code Changes

| File | Change |
|------|--------|
| `src/lib/exercises.ts` | `buildMediaUrl()` prepends CDN URL when `PUBLIC_MEDIA_CDN_URL` is set |
| `tools/upload-to-r2.ts` | New script to upload media to R2 |

---

## Files Created/Modified

| File | Status |
|------|--------|
| `.env.example` | ✅ Created |
| `src/lib/exercises.ts` | ✅ Modified |
| `tools/upload-to-r2.ts` | ✅ Created |
| `package.json` | ✅ Added `upload:r2` script |

---

## Notes

- R2 free tier: 10 GB storage, no egress charges
- Upload script uses AWS S3 SDK (R2 is S3-compatible)
- Local media files are kept for development without CDN
- After upload, update `.env` with actual `PUBLIC_MEDIA_CDN_URL`
