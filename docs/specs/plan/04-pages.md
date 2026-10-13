# Plan: Pages

**Objective:** Build all page components (homepage, category listing, exercise detail).

## Steps

### 4.1 Create Homepage
- [ ] Create src/pages/index.astro
- [ ] Add Layout wrapper with title "Home"
- [ ] Add BackgroundRotator island (client:load)
- [ ] Create hero section with:
  - Site title with colored text
  - Tagline
  - CTA button
- [ ] Create category grid section with:
  - Section heading
  - Responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
  - All 8 CategoryCards
- [ ] Create "How It Works" features section
- [ ] Create footer with contact info

### 4.2 Create Category Page
- [ ] Create src/pages/[category]/index.astro
- [ ] Implement getStaticPaths for all 8 categories
- [ ] Create page header with:
  - Back to home link
  - Category name with color
  - Category icon
  - Category description
- [ ] Create search and filter section:
  - SearchBar island (client:load)
  - FilterBar island (client:load)
- [ ] Create exercise grid:
  - Responsive grid (1/2/3 columns)
  - ExerciseCards with category color
  - Exercise count
- [ ] Create empty state for no results
- [ ] Add 404 redirect for invalid categories

### 4.3 Create Exercise Detail Page
- [ ] Create src/pages/[category]/[exercise].astro
- [ ] Implement getStaticPaths for all exercises
- [ ] Create page header with back link
- [ ] Create two-column layout (sticky media on desktop)
- [ ] Add MediaViewer island (client:visible)
- [ ] Create details panel with:
  - Exercise name heading
  - Category badge
  - Difficulty badge
  - Equipment section with badges
  - Primary muscles section with success badges
  - Secondary muscles section with default badges
  - Numbered instructions list
  - Tips section with bullet points
  - Safety section with warning styling
- [ ] Add redirect for invalid exercises

### 4.4 Create Category Utility Library
- [ ] Create src/lib/categories.ts
- [ ] Define Category interface with id, name, description, color, icon
- [ ] Export categories array with all 8 categories
- [ ] Export getCategoryById function
- [ ] Export getCategoryColor function

## Verification
- [ ] Homepage loads with all sections visible
- [ ] Category pages generate correct static paths
- [ ] Exercise pages generate correct static paths
- [ ] Navigation links work correctly
- [ ] 404 handling works for invalid routes
