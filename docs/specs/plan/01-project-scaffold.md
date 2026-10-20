# Plan: Project Scaffold

**Objective:** Initialize the Astro project with all required dependencies and configuration files.

## Steps

### 1.1 Create package.json
- [ ] Define project name, version, description
- [ ] Add dependencies: astro, @astrojs/preact, @astrojs/tailwind, preact, tailwindcss, fuse.js
- [ ] Add devDependencies: typescript, @types/node, tsx, @astrojs/check
- [ ] Add scripts: dev, build, preview, astro, check, migrate:media

### 1.2 Create astro.config.mjs
- [ ] Import and configure preact integration
- [ ] Import and configure tailwind integration
- [ ] Set site URL for GitHub Pages
- [ ] Configure output to static
- [ ] Configure image optimization settings
- [ ] Configure Vite build options

### 1.3 Create tsconfig.json
- [ ] Extend astro/tsconfigs/strict
- [ ] Configure path aliases: @, @components, @layouts, @lib, @assets
- [ ] Set jsx to react-jsx
- [ ] Set jsxImportSource to preact

### 1.4 Create tailwind.config.mjs
- [ ] Define color palette (primary, secondary, accent, background, surface, text)
- [ ] Define category colors (glutes, legs, chest, back, shoulders, arms, core, cardio)
- [ ] Configure font family (Inter, JetBrains Mono)
- [ ] Add custom animations (shimmer, fade-in, slide-up)
- [ ] Configure content paths for Astro

### 1.5 Create src/env.d.ts
- [ ] Add Astro types reference
- [ ] Add reference for Astro client types

### 1.6 Create directory structure
- [ ] Create src/components/ui/
- [ ] Create src/components/
- [ ] Create src/layouts/
- [ ] Create src/pages/[category]/
- [ ] Create src/styles/
- [ ] Create src/lib/
- [ ] Create src/content/exercises/
- [ ] Create src/assets/backgrounds/
- [ ] Create tools/
- [ ] Create .github/workflows/

### 1.7 Install dependencies
- [ ] Run npm install
- [ ] Verify all packages installed correctly

## Verification
- [ ] npm run dev starts without errors
- [ ] npm run build completes successfully
- [ ] TypeScript compilation passes (npm run check)
