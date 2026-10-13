# TopicMapGym — Astro Reorganization Spec

## 1. Concept & Vision

**TopicMapGym** is an interactive exercise guide that helps users browse gym movements by muscle group with clear visual demonstrations — diagrams first, then real video. The modernized version transforms this from a flat-file, table-based SPA into a content-driven Astro site with structured data, island architecture for interactivity, and a scalable media pipeline.

**Personality:** Clean, motivating, accessible. Like a knowledgeable trainer who shows instead of tells.

---

## 2. Design Language

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary | `#1E40AF` | Buttons, active states, links |
| Secondary | `#3B82F6` | Hover states, accents |
| Accent | `#10B981` | Success, progress, highlights |
| Background | `#0F172A` | Page background (dark mode) |
| Surface | `#1E293B` | Cards, panels |
| Surface Light | `#334155` | Borders, dividers |
| Text Primary | `#F8FAFC` | Headings, primary text |
| Text Secondary | `#94A3B8` | Captions, metadata |
| Danger | `#EF4444` | Warnings, stop indicators |

### Typography

| Role | Font | Weights |
|------|------|---------|
| Headings | Inter | 600, 700 |
| Body | Inter | 400, 500 |
| Mono/Technical | JetBrains Mono | 400 |

### Spatial System

- Base unit: `4px`
- Spacing scale: `4, 8, 12, 16, 24, 32, 48, 64, 96px`
- Border radius: `4px` (buttons), `8px` (cards), `12px` (modals)
- Container max-width: `1280px`

### Motion Philosophy

- Micro-interactions: `150ms ease-out` for hovers/toggles
- Page transitions: `200ms ease-in-out`
- Media transitions: `300ms ease` for image/video switches
- Loading states: Skeleton shimmer at `1.5s` infinite

### Visual Assets

- **Icons:** Lucide Icons (consistent stroke-width: 2)
- **Exercise diagrams:** Original `.png` files converted to WebP with AVIF fallback
- **Videos:** MP4 with lazy loading and poster frames
- **Backgrounds:** Rotating WebP/AVIF, served from `/assets/backgrounds/`

---

## 3. Information Architecture

### 3.1 Workout Categories

| ID | Category | Description | Color Accent |
|----|----------|-------------|--------------|
| 1 | Glutes | Hip-dominant posterior chain | `#F472B6` (pink) |
| 2 | Legs | Quad, hamstring, calf work | `#A78BFA` (purple) |
| 3 | Chest | Pectoral pressing & flyes | `#F87171` (red) |
| 4 | Back | Lats, rhomboids, traps | `#60A5FA` (blue) |
| 5 | Shoulders | Deltas, rotator cuff | `#34D399` (emerald) |
| 6 | Arms | Biceps, triceps, forearms | `#FBBF24` (amber) |
| 7 | Core | Abs, obliques, lower back | `#FB923C` (orange) |
| 8 | Cardio | HIIT, endurance, plyo | `#2DD4BF` (teal) |

### 3.2 Exercise Schema (Content Collection)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const exercises = defineCollection({
  type: 'data', // or 'content' for markdown
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['glutes', 'legs', 'chest', 'back', 'shoulders', 'arms', 'core', 'cardio']),
    aliases: z.array(z.string()).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    equipment: z.array(z.string()),
    muscles: z.array(z.string()), // primary + secondary
    instructions: z.array(z.string()),
    tips: z.array(z.string()).optional(),
    safety: z.array(z.string()).optional(),
    media: z.object({
      thumbnail: z.string(),
      diagrams: z.array(z.string()),
      videos: z.array(z.string()),
    }),
    gridPosition: z.object({ row: z.number(), col: z.number() }).optional(),
  }),
});

export const collections = { exercises };
```

### 3.3 Content Structure

```
src/
├── content/
│   ├── config.ts                    # Collection schemas
│   └── exercises/
│       ├── glutes/
│       │   ├── reverse-hack-squat.json
│       │   ├── good-mornings.json
│       │   ├── donkey-kicks.json
│       │   └── ...
│       ├── legs/
│       │   ├── squats.json
│       │   └── ...
│       └── ...
├── components/
│   ├── ExerciseGrid.tsx             # Astro component (server-rendered grid)
│   ├── ExerciseCard.astro            # Individual exercise card
│   ├── MediaViewer.tsx               # React/Preact island for image cycling
│   ├── VideoPlayer.tsx               # React/Preact island for video playback
│   ├── CategoryTabs.tsx              # React/Preact island for tab state
│   ├── SearchBar.tsx                 # React/Preact island for search
│   ├── Favorites.tsx                 # React/Preact island for localStorage favorites
│   └── ui/
│       ├── Button.astro
│       ├── Card.astro
│       ├── Badge.astro
│       └── Skeleton.astro
├── layouts/
│   └── Layout.astro                  # Base HTML layout with head
├── pages/
│   ├── index.astro                   # Homepage with category grid
│   ├── [category]/
│   │   ├── index.astro               # Category listing (e.g., /legs)
│   │   └── [exercise].astro          # Exercise detail (e.g., /legs/squats)
│   └── api/
│       └── exercises.json.ts         # Optional: API endpoint for dynamic data
├── styles/
│   ├── global.css                    # CSS variables, resets, base styles
│   └── components/                   # Component-scoped styles
├── lib/
│   ├── exercises.ts                  # Helper: fetch/filter exercises
│   ├── media.ts                      # Helper: media URL builders, versioned
│   └── grid.ts                      # Helper: map category→grid positions
└── assets/
    ├── backgrounds/
    │   ├── 1.webp
    │   └── 2.webp
    └── icons/
```

### 3.4 Existing Media Migration

Original path | New path
---|---
`images_1/folder_0_0/1.png` | `src/assets/exercises/glutes/reverse-hack-squat/thumbnail.webp`
`images_1/folder_0_0/2.png` | `src/assets/exercises/glutes/reverse-hack-squat/diagram-1.webp`
`images_1/folder_0_0/4.mp4` | `src/assets/exercises/glutes/reverse-hack-squat/video-1.mp4`

**Naming convention:** `{category}/{exercise-id}/{type}-{index}.{ext}`
- `type`: `thumbnail`, `diagram`, `video`
- `index`: 1-based for diagrams, sequential for videos

**Migration script:** `tools/migrate-media.ts` — batch rename and organize existing media into new structure.

---

## 4. Page Structure

### 4.1 Homepage (`/`)

**Visual:** Full-bleed hero with rotating background, category cards in responsive grid.

**Sections:**
1. **Hero** — Site title, tagline, CTA "Browse by Category"
2. **Category Grid** — 8 cards (one per muscle group), each with:
   - Category icon (SVG)
   - Category name
   - Exercise count badge
   - Color accent border
3. **Featured Exercises** — 3 random exercises (optional for v1)
4. **Footer** — Contact email, copyright

**Responsive:** 1 col (mobile) → 2 col (tablet) → 4 col (desktop)

### 4.2 Category Page (`/[category]`)

**Visual:** Filterable grid of exercise cards, sticky category tabs.

**Sections:**
1. **Header** — Category name, description, back link
2. **Filter Bar** — Difficulty filter, equipment filter, search input
3. **Exercise Grid** — Responsive grid of `ExerciseCard` components
4. **Empty State** — "No exercises match your filters"

**URLs:** `/glutes`, `/legs`, `/chest`, `/back`, `/shoulders`, `/arms`, `/core`, `/cardio`

### 4.3 Exercise Detail Page (`/[category]/[exercise]`)

**Visual:** Two-column layout on desktop (media left, details right), stacked on mobile.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  ← Back to Chest    Flat Bench Press        │
├─────────────────────┬───────────────────────┤
│                     │  Flat Bench Press     │
│   [Diagram/Video]   │  ▾ Chest · Beginner  │
│                     │                       │
│   ○ ○ ●             │  Equipment:          │
│                     │  Barbell, Bench       │
│                     │                       │
│   ◀ [1/5] ▶         │  Primary Muscles:    │
│                     │  Pectoralis Major     │
├─────────────────────┴───────────────────────┤
│  Instructions                                │
│  1. Lie flat on bench...                    │
│  2. Grip the bar...                         │
├─────────────────────────────────────────────┤
│  Tips                                        │
│  • Keep shoulders retracted...              │
├─────────────────────────────────────────────┤
│  ⚠ Safety                                   │
│  • Don't bounce the bar...                  │
└─────────────────────────────────────────────┘
```

**Media Viewer (Island):**
- Cycles through diagrams (thumbnail → diagram-1 → diagram-2...)
- Then videos (if available)
- Dot indicators for position
- Swipe support on mobile
- Keyboard navigation (←/→)

---

## 5. Features & Interactions

### 5.1 Category Navigation

| Action | Result |
|--------|--------|
| Click category card | Navigate to `/[category]` |
| Hover category card | Lift effect, accent border glow |
| Keyboard focus | Visible focus ring, same as hover |

### 5.2 Exercise Grid

| Action | Result |
|--------|--------|
| Click exercise card | Navigate to `/[category]/[exercise]` |
| Hover card | Subtle lift (translateY -2px), shadow increase |
| Filter change | Instant filter, smooth grid reflow |
| No results | Empty state with reset filters CTA |

### 5.3 Media Viewer (Island)

| Action | Result |
|--------|--------|
| Click media | Advance to next (diagram → diagram → video) |
| Click back button | Return to previous item |
| Click dot indicator | Jump to that specific media |
| Swipe left/right | Advance/retreat media |
| Keyboard ←/→ | Same as swipe |
| Keyboard Escape | Close detail view (if modal) |

**Loading behavior:**
- Show skeleton shimmer while media loads
- "Loading Technique..." message during fetch
- Prefetch next media item on idle

### 5.4 Search

| Action | Result |
|--------|--------|
| Type query | Fuzzy search across name, aliases, muscles |
| Debounce | 200ms after last keystroke |
| Results | Live-filtered exercise grid |
| Clear | Reset to full grid |

**Fuzzy matching:** Fuse.js with threshold `0.3`

### 5.5 Favorites (Island)

| Action | Result |
|--------|--------|
| Click heart icon | Toggle favorite, persist to localStorage |
| Visit favorites filter | Show only favorited exercises |

**Data shape in localStorage:**
```json
{
  "topicmapgym-favorites": ["reverse-hack-squat", "squats", ...]
}
```

### 5.6 Background Rotation

- 20-second interval (preserved from original)
- Preload first, lazy-load subsequent
- Crossfade transition `300ms ease`

---

## 6. Component Inventory

### 6.1 CategoryCard

**States:**
- Default: Surface background, category accent border-left
- Hover: Lift effect, accent glow
- Focus: Visible focus ring
- Active: Slight scale down (press effect)

### 6.2 ExerciseCard

**States:**
- Default: Surface background, thumbnail image, name, difficulty badge
- Hover: Lift effect, shadow increase
- Focus: Visible focus ring
- Loading: Skeleton shimmer for image

**Variants:**
- Grid view (default): Square-ish aspect ratio
- List view (if search results): Horizontal layout

### 6.3 MediaViewer (Island)

**States:**
- Loading: Skeleton shimmer, loading message
- Diagram: Image displayed, dot indicators
- Video: Video player with controls, poster frame
- Error: "Media unavailable" placeholder

### 6.4 DifficultyBadge

| Difficulty | Color |
|------------|-------|
| Beginner | `#10B981` (green) |
| Intermediate | `#FBBF24` (amber) |
| Advanced | `#EF4444` (red) |

### 6.5 SearchBar

**States:**
- Default: Placeholder "Search exercises..."
- Focused: Border accent color
- With query: Clear button visible
- No results: Red border pulse

---

## 7. Technical Architecture

### 7.1 Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Astro 4.x | Static-first, island architecture, content collections |
| Interactivity | Preact | Lightweight React alternative for islands |
| Styling | Tailwind CSS 3.x | Utility-first, consistent design system |
| Content | Astro Content Collections | Type-safe, schema-validated exercise data |
| Search | Fuse.js | Client-side fuzzy search, no backend needed |
| Video | Native `<video>` + custom controls | No heavy player library |
| Icons | Lucide (inline SVG) | Tree-shakeable, consistent |
| Build | Astro + Vite | Default, fast HMR |
| Deployment | Static (Netlify/Vercel/GitHub Pages) | Zero server, CDN-backed |

### 7.2 Island Architecture

| Component | Directive | Reason |
|-----------|-----------|--------|
| CategoryTabs | `client:load` | Needed immediately for navigation |
| MediaViewer | `client:visible` | Defer until scrolled into view |
| SearchBar | `client:load` | Search should be instant |
| Favorites | `client:load` | Persist state from localStorage |
| VideoPlayer | `client:visible` | Heavy, defer until needed |

### 7.3 Performance Budget

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Bundle (JS) | < 50KB gzipped (initial) |
| TTI | < 3.5s on 3G |

**Strategies:**
- Static HTML for above-fold content
- Island hydration only where needed
- Image optimization via Astro's `<Image>` component (WebP/AVIF)
- Font subsetting (Inter only Latin)
- Preload critical assets

### 7.4 Data Flow

```
┌─────────────────────────────────────────────────────┐
│  Build Time                                          │
│  content/exercises/* → Content Collection (type-safe)│
│  assets/* → Optimized & fingerprinted                │
└─────────────────────┬───────────────────────────────┘
                      ▼
┌─────────────────────────────────────────────────────┐
│  Request Time                                        │
│  URL → Astro routes → Static HTML + Island bundles   │
│  Island hydration → Interactive components            │
│  localStorage → Favorites persistence                │
└─────────────────────────────────────────────────────┘
```

### 7.5 Media Pipeline

**Build-time optimization:**
```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [
    tailwind(),
    image({
      service: {
        entrypoint: 'astro/assets/services/sharp',
      },
    }),
    preact(),
  ],
  image: {
    domains: ['images.unsplash.com'], // if external images needed
  },
});
```

**Image optimization:**
- `.png` → WebP at build time
- `.jpg` → WebP/AVIF at build time
- Responsive `srcset` for all images
- Lazy loading for below-fold images
- Priority loading for hero/thumbnail images

---

## 8. Migration Plan

### Phase 1: Scaffold & Foundation

1. Initialize Astro project with Preact + Tailwind
2. Set up content collection schema
3. Create base layout with navigation
4. Set up global styles (CSS variables from design language)
5. Configure Tailwind with custom theme

### Phase 2: Content Migration

6. Write migration script (`tools/migrate-media.ts`) to reorganize images
7. Create exercise JSON files for each existing exercise
8. Migrate all 80+ exercises with full metadata
9. Validate all media paths resolve correctly

### Phase 3: Pages & Components

10. Build `Layout.astro` with head, fonts, background rotation
11. Build homepage with category cards
12. Build category page with grid and filters
13. Build exercise detail page with media viewer
14. Build all UI components (Button, Card, Badge, Skeleton)

### Phase 4: Islands

15. Implement `MediaViewer.tsx` with image cycling
16. Implement `SearchBar.tsx` with Fuse.js fuzzy search
17. Implement `Favorites.tsx` with localStorage
18. Implement `CategoryTabs.tsx` for mobile navigation

### Phase 5: Polish

19. Add loading states and skeletons
20. Add error boundaries
21. Add keyboard navigation
22. Add responsive breakpoints testing
23. Optimize images and verify performance budget
24. Add favicon, manifest.json for PWA

### Phase 6: Deployment

25. Configure `netlify.toml` or `vercel.json`
26. Set up GitHub Actions for CI/CD
27. Deploy to staging
28. Verify all links, media, interactions
29. Deploy to production

---

## 9. File Naming Conventions

| Entity | Convention | Example |
|--------|------------|---------|
| Exercise ID | kebab-case | `reverse-hack-squat` |
| Category | lowercase | `glutes` |
| Media type | descriptive | `thumbnail`, `diagram`, `video` |
| Components | PascalCase | `ExerciseCard.astro` |
| Utilities | camelCase | `getExercises.ts` |
| Styles | lowercase | `global.css` |

---

## 10. Testing Strategy

| Type | Tool | Scope |
|------|------|-------|
| Unit | Vitest | Content schema validation, utility functions |
| Component | Playwright | Component rendering, interactions |
| E2E | Playwright | Full user flows (search → view → favorite) |
| Accessibility | axe-core | WCAG 2.1 AA compliance |
| Performance | Lighthouse CI | Budget targets |
| Visual | Percy/Chromatic | Regression detection |

**Critical user flows to test:**
1. Homepage → Category → Exercise → Media cycling
2. Search → Filter → View result
3. Favorite → Persist → Recall on reload
4. Mobile navigation → Responsive breakpoints

---

## 11. Future Enhancements (Out of Scope for v1)

- [ ] Workout plan builder (combine exercises into routines)
- [ ] User accounts + cloud sync for favorites
- [ ] Video streaming optimization (HLS/DASH)
- [ ] 3D model integration for anatomy visualization
- [ ] i18n (multi-language)
- [ ] CMS integration (Sanity, Contentful)
- [ ] Analytics dashboard
- [ ] PWA with offline support

---

## Appendix: Exercise Count by Category

| Category | Current Exercises |
|----------|-------------------|
| Glutes | 14 |
| Legs | 7 |
| Chest | 8 |
| Back | 11 |
| Shoulders | (to be documented) |
| Arms | (to be documented) |
| Core | (to be documented) |
| Cardio | (to be documented) |
| **Total** | **~80+** |
