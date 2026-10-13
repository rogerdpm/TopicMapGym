# CDN Enhancements - TopicMapGym

## Status: Parked - Pending Dev Alignment

## Goal
Separate code repository from media files (~2.67 GB) by hosting media on a free CDN.

---

## Chosen Option: Surge.sh

### Why Surge
- **Free tier**: Unlimited storage and bandwidth
- **CLI-based**: Simple deployment workflow
- **Global CDN**: Fast delivery worldwide
- **No file size limits**: Works with large video files

### Why Parked
- Need to align with other devs on CDN strategy
- May need custom domain configuration
- May evaluate Cloudflare R2 as alternative

---

## Implementation Plan (When Ready)

### Phase 1: Media Migration

1. **Upload media to Surge**
   ```bash
   # Install surge
   npm install -g surge
   
   # Deploy media assets
   cd public/assets/exercises
   surge . exercises-media.surge.sh
   
   # Or with custom domain
   surge . media.topicmapgym.com
   ```

2. **Update exercise JSON files**
   - Change `thumbnail` paths from `/assets/exercises/...` to CDN URL
   - Change `media.images` paths to CDN URLs
   - Change `media.videos` paths to CDN URLs

   Example JSON transformation:
   ```json
   // Before
   "thumbnail": "/assets/exercises/arms/bicep-curls/thumb.jpg"
   
   // After
   "thumbnail": "https://exercises-media.surge.sh/arms/bicep-curls/thumb.jpg"
   ```

### Phase 2: Environment-Based URLs

1. **Add environment variable for media base URL**
   ```bash
   # .env
   PUBLIC_MEDIA_BASE_URL=https://exercises-media.surge.sh
   ```

2. **Update content loading to use environment variable**
   - Modify exercise loading logic to prepend CDN URL

### Phase 3: Development Workflow

1. **Local development**: Use local media files
2. **Production build**: Use CDN URLs
3. **Optional**: Add build script to validate CDN URLs

---

## Alternative Considered

### Cloudflare R2
- **Pros**: S3-compatible, no egress fees, 10GB free tier
- **Cons**: Requires R2 setup, Cloudflare account, more complex
- **When to use**: If Surge proves unreliable or needs better SLA

---

## Files to Modify

| File | Change |
|------|--------|
| `src/content/exercises/*/` | Update media paths to CDN URLs |
| `src/lib/exercises.ts` | Add CDN URL prepending logic |
| `.env` | Add `PUBLIC_MEDIA_BASE_URL` |
| Build scripts | Optional CDN validation |

---

## Notes

- Surge.sh does not provide SLA guarantees (community project)
- For production with high traffic, consider upgrading to paid tier or R2
- Surge supports custom domains with SSL
- Keep local media for development/testing
