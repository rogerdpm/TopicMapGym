# CDN Enhancements - TopicMapGym

## Status: ✅ Complete - Cloudflare R2 Configured

## Goal
Separate code repository from media files (~682 MB) by hosting media on a free CDN.

---

## Chosen Option: Cloudflare R2

### Why R2
- **Free tier**: 10 GB storage included
- **No egress fees**: Unlike AWS S3, Cloudflare doesn't charge for data transfer
- **Global CDN**: Fast delivery via Cloudflare's network
- **File size**: Up to 5 GB per file

### Setup Completed
- [x] R2 bucket created: `topicmapgym-media`
- [x] Public dev URL enabled: `https://pub-c9ec96bb08a540d08b55038a85a5795a.r2.dev`
- [x] Installed wrangler CLI
- [x] Created `.env` with CDN URL
- [x] Updated `exercises.ts` to prepend CDN URL from `PUBLIC_MEDIA_CDN_URL`
- [x] Created upload script at `tools/upload-to-r2.ts`
- [x] Uploaded 244 media files to R2

### CDN URL
```
https://pub-c9ec96bb08a540d08b55038a85a5795a.r2.dev
```

### Commands

```bash
# Upload media to R2
npm run upload:r2

# Build with CDN
npm run build
```

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
