# Plan: Media Migration

**Objective:** Reorganize existing media files into the new structured asset path system.

## Steps

### 6.1 Analyze Existing Media Structure
- [ ] Document all images_X folders (1-8)
- [ ] Map folder naming conventions (folder_Row_Col)
- [ ] Identify file types (PNG diagrams, MP4 videos)
- [ ] Document file numbering conventions (1.png = thumbnail, 2+.png = diagrams, 4+.mp4 = videos)

### 6.2 Create Media Migration Script
- [ ] Create tools/migrate-media.ts
- [ ] Define category mapping (tab number → category id)
- [ ] Define position mapping (folder name → row/col)
- [ ] Define exercise name mapping per category
- [ ] Implement file copying logic:
  - Detect media type (thumbnail, diagram, video)
  - Generate new filename (thumbnail.webp, diagram-N.webp, video-N.mp4)
  - Copy files to new location
- [ ] Add console logging for progress
- [ ] Add error handling for missing files

### 6.3 Copy Background Images
- [ ] Copy 1.webp from assets/backgrounds/ to src/assets/backgrounds/1.webp
- [ ] Copy 2.webp from assets/backgrounds/ to src/assets/backgrounds/2.webp
- [ ] Verify WebP files exist in source location

### 6.4 Run Migration Script
- [ ] Execute npm run migrate:media
- [ ] Verify all exercise directories created
- [ ] Verify all media files copied with correct names
- [ ] Count total files migrated

### 6.5 Add Favicon
- [ ] Create public/favicon.svg
- [ ] Design simple dumbbell or muscle icon
- [ ] Match site color scheme

### 6.6 Update Image Paths in Content
- [ ] Update exercise JSON files to use new media paths
- [ ] Update MediaViewer to use buildMediaUrl helper
- [ ] Verify all image sources resolve correctly

### 6.7 Optimize Images (Optional)
- [ ] Install sharp for image optimization
- [ ] Convert remaining PNGs to WebP
- [ ] Generate AVIF variants for supported browsers
- [ ] Update image component to use picture element with AVIF/WebP/JPEG sources

## Verification
- [ ] All media files exist in src/assets/exercises/
- [ ] Background images serve correctly
- [ ] Exercise thumbnails display on category pages
- [ ] Media viewer loads all diagrams and videos
- [ ] No 404 errors for media assets
