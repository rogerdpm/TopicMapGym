# TopicMapGym - Agent Context

## Project Overview

**TopicMapGym** is an exercise visualization web app built with Astro 4.x, Preact islands, and Tailwind CSS. It displays exercise demonstrations organized by muscle groups (arms, back, cardio, chest, core, glutes, legs, shoulders).

## Repository

- **Original**: `SharpenTheSoulJJ/TopicMapGym`
- **Fork**: `rogerdpm/TopicMapGym`
- **Default branch**: `main`
- **Feature branch**: `feat/reorganize` (current HEAD, contains full Astro migration)

## Tech Stack

- **Framework**: Astro 4.x with `@astrojs/preact` integration
- **Interactive components**: Preact (islands architecture)
- **Styling**: Tailwind CSS 3.x with custom theme
- **Content**: Type-safe JSON content collections in `src/content/exercises/{category}/`
- **Search**: Fuse.js (client-side fuzzy search)
- **Build**: `npm run build` | Dev: `npm run dev`
- **Preview**: `npm run preview`

## Project Structure

```
TopicMapGym/
├── src/
│   ├── components/          # Astro + Preact components
│   │   ├── BackgroundRotator.tsx  # Hero background rotation (Preact)
│   │   ├── CategoryCard.astro    # Category thumbnail card
│   │   ├── ExerciseCard.astro    # Exercise grid card
│   │   ├── Favorites.tsx         # Favorites system (Preact)
│   │   ├── FilterBar.tsx        # Difficulty/equipment filters (Preact)
│   │   ├── MediaViewer.tsx       # Image/video gallery (Preact)
│   │   ├── SearchBar.tsx         # Search component (Preact)
│   │   └── ui/                   # Base UI components
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   └── exercises/           # Exercise data by category
│   │       ├── arms/
│   │       ├── back/
│   │       ├── cardio/
│   │       ├── chest/
│   │       ├── core/
│   │       ├── glutes/
│   │       ├── legs/
│   │       └── shoulders/
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout
│   ├── lib/
│   │   ├── categories.ts         # Category metadata & helpers
│   │   └── exercises.ts          # Exercise data loading
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── 404.astro
│   │   └── [category]/
│   │       ├── index.astro       # Category page with exercise grid
│   │       └── [exercise].astro  # Exercise detail page
│   └── styles/
│       └── global.css            # Tailwind + custom styles
├── public/
│   ├── assets/exercises/         # Exercise media (images/videos)
│   │   └── {category}/{exercise}/
│   └── favicon.svg
├── docs/                         # Planning documentation
│   ├── README.md
│   ├── spec/SPEC.md
│   └── specs/plan/               # Implementation plans
├── .github/workflows/deploy.yml  # CI/CD (GitHub Actions)
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Content Schema

Exercise JSON files in `src/content/exercises/{category}/` follow this schema:

```typescript
{
  id: string;           // e.g., "arms/bicep-curls"
  name: string;         // Display name
  difficulty: "beginner" | "intermediate" | "advanced";
  equipment: string[];   // e.g., ["dumbbells", "barbell"]
  thumbnail: string;     // Path to thumbnail image
  media: {
    images: string[];    // Paths to images
    videos: string[];    // Paths to videos
  };
  diagrams?: string[];   // Optional instructional diagrams
}
```

## Key Components

### SearchBar.tsx (Preact)
- Homepage: Shows dropdown with global search results
- Category pages: Filters exercise grid locally
- Uses Fuse.js for fuzzy matching
- Matches against exercise slugs

### FilterBar.tsx (Preact)
- Filters exercises by `difficulty` and `equipment`
- Reads `data-difficulty` and `data-equipment` attributes from DOM
- Uses `useEffect` to apply filters when state changes

### ExerciseCard.astro
- Displays in exercise grids
- Has `data-difficulty` and `data-equipment` attributes for filtering
- Border color matches category theme color

### MediaViewer.tsx (Preact)
- Handles image gallery and video playback
- Manages media navigation and state

## Media Files

- **Location**: `public/assets/exercises/{category}/{exercise}/`
- **Paths in JSON**: Start with `/assets/exercises/...` (served from `public/`)
- **Original location**: `images_X/folder_R_C/` (migrated)
- **Migration script**: `tools/migrate-media.ts`

## Category Colors (Tailwind)

| Category   | Color         |
|------------|---------------|
| arms       | amber-500     |
| back       | blue-500      |
| cardio     | red-500       |
| chest      | orange-500    |
| core       | yellow-500    |
| glutes     | pink-500      |
| legs       | green-500     |
| shoulders  | purple-500    |

## Common Commands

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build for production
npm run preview    # Preview production build
npm run astro -- add @astrojs/preact  # Add integration
```

## Git Workflow

- Branch: `feat/reorganize` (contains Astro migration)
- Commits should follow conventional commit format
- Push to `origin/feat/reorganize` after testing

## Known Issues / Notes

- Media push to GitHub fails with HTTP 500 due to large file size (2.67 GiB)
- GitHub auth: `wecollab8` and `rogerdpm` accounts configured; `rogerdpm` is active
- Original flat-file SPA structure was migrated to Astro (2024-10-13)

## Background Rotator

- 4 rotating background images for homepage hero
- Uses `art/` folder as source
- Copies to `dist/` on build
- Images: `1.webp`, `2.webp`, etc.
