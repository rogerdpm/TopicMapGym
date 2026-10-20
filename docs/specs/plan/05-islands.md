# Plan: Island Components

**Objective:** Build all interactive Preact islands for client-side interactivity.

## Steps

### 5.1 Create BackgroundRotator Island
- [ ] Create src/components/BackgroundRotator.tsx
- [ ] Preload all background images on mount
- [ ] Implement 20-second rotation interval
- [ ] Add crossfade transition (300ms)
- [ ] Set initial background immediately
- [ ] Clean up interval on unmount
- [ ] Use fixed positioning with z-index -10

### 5.2 Create MediaViewer Island
- [ ] Create src/components/MediaViewer.tsx
- [ ] Accept media array prop (diagrams and videos)
- [ ] Add loading state with shimmer and message
- [ ] Implement image and video display based on current type
- [ ] Add navigation arrows (prev/next)
- [ ] Add dot indicators for media position
- [ ] Add keyboard navigation (ArrowLeft, ArrowRight)
- [ ] Implement click-to-advance behavior
- [ ] Add counter display (e.g., "1 / 5 • diagram")
- [ ] Handle empty media state

### 5.3 Create SearchBar Island
- [ ] Create src/components/SearchBar.tsx
- [ ] Accept exercises array prop
- [ ] Initialize Fuse.js with options (keys: name, aliases, muscles, equipment)
- [ ] Add debounced search (200ms)
- [ ] Create text input with search icon
- [ ] Create clear button (visible when query exists)
- [ ] Filter DOM elements in exercise grid on input
- [ ] Handle empty query to show all
- [ ] Style focus and default states

### 5.4 Create FilterBar Island
- [ ] Create src/components/FilterBar.tsx
- [ ] Accept exercises array prop
- [ ] Extract unique equipment options from exercises
- [ ] Create difficulty filter buttons (beginner, intermediate, advanced)
- [ ] Create equipment dropdown select
- [ ] Implement filter logic (AND between difficulty and equipment)
- [ ] Add reset button (visible when filters active)
- [ ] Expose resetFilters globally for empty state button
- [ ] Filter DOM elements in exercise grid

### 5.5 Create Favorites Island
- [ ] Create src/components/Favorites.tsx
- [ ] Accept exerciseId prop
- [ ] Read favorites from localStorage on mount
- [ ] Implement toggle favorite function
- [ ] Persist to localStorage on change
- [ ] Update heart icon (empty vs filled)
- [ ] Add appropriate ARIA attributes
- [ ] Handle SSR (mount check for localStorage)

### 5.6 Integrate Islands into Pages
- [ ] Add BackgroundRotator to Layout (client:load)
- [ ] Add MediaViewer to exercise detail page (client:visible)
- [ ] Add SearchBar to category page (client:load)
- [ ] Add FilterBar to category page (client:load)
- [ ] Add Favorites to exercise detail page (client:visible)

## Verification
- [ ] Background rotates every 20 seconds
- [ ] Media viewer advances on click and keyboard
- [ ] Search filters exercises in real-time
- [ ] Filters combine correctly (AND logic)
- [ ] Favorites persist across page reloads
- [ ] Islands hydrate correctly on interaction
