# Plan: UI Components

**Objective:** Build all reusable UI components for the design system.

## Steps

### 3.1 Create Base Layout
- [ ] Create src/layouts/Layout.astro
- [ ] Add meta tags (charset, viewport, description, generator)
- [ ] Add Google Fonts preconnect and link (Inter, JetBrains Mono)
- [ ] Add favicon link
- [ ] Add Open Graph meta tags
- [ ] Import and apply global styles
- [ ] Create slot for page content

### 3.2 Create Global Styles
- [ ] Create src/styles/global.css
- [ ] Add Tailwind directives (@tailwind base, components, utilities)
- [ ] Define CSS custom properties for colors
- [ ] Add base styles for html and body
- [ ] Create shimmer animation for loading states
- [ ] Add utility classes (text-balance, bg-grid-pattern)

### 3.3 Create Button Component
- [ ] Create src/components/ui/Button.astro
- [ ] Support variants: primary, secondary, ghost
- [ ] Support sizes: sm, md, lg
- [ ] Add disabled state
- [ ] Add transition animations
- [ ] Use Tailwind classes for styling

### 3.4 Create Badge Component
- [ ] Create src/components/ui/Badge.astro
- [ ] Support variants: default, success, warning, danger
- [ ] Support category variants: glutes, legs, chest, back, shoulders, arms, core, cardio
- [ ] Support sizes: sm, md
- [ ] Add category-specific colors

### 3.5 Create Skeleton Component
- [ ] Create src/components/ui/Skeleton.astro
- [ ] Add shimmer animation
- [ ] Support custom width and height props
- [ ] Add rounded corners
- [ ] Use CSS variables for theming

### 3.6 Create CategoryCard Component
- [ ] Create src/components/CategoryCard.astro
- [ ] Display category icon, name, description
- [ ] Add category-specific color accent (border-left)
- [ ] Add hover lift effect
- [ ] Link to category page
- [ ] Add arrow indicator

### 3.7 Create ExerciseCard Component
- [ ] Create src/components/ExerciseCard.astro
- [ ] Display thumbnail image
- [ ] Display exercise name
- [ ] Display difficulty badge
- [ ] Display equipment badges (max 2)
- [ ] Add category color accent (border-top)
- [ ] Add hover scale effect on image
- [ ] Link to exercise detail page

### 3.8 Create Card Component
- [ ] Create src/components/ui/Card.astro
- [ ] Add background surface color
- [ ] Add rounded corners
- [ ] Add padding
- [ ] Create card-hover variant with lift effect

## Verification
- [ ] All components render without errors
- [ ] Components respond to hover states
- [ ] Components are accessible (ARIA labels, focus states)
- [ ] Components work with both light/dark theme via CSS variables
