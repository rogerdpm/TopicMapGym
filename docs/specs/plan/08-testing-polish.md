# Plan: Testing & Polish

**Objective:** Ensure quality, accessibility, and performance meet targets.

## Steps

### 8.1 Accessibility Audit
- [ ] Add skip-to-content link
- [ ] Verify all images have alt text
- [ ] Verify all buttons have accessible names
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Add ARIA labels where needed
- [ ] Test keyboard navigation
- [ ] Test with screen reader

### 8.2 Responsive Design Testing
- [ ] Test mobile layout (375px width)
- [ ] Test tablet layout (768px width)
- [ ] Test desktop layout (1280px width)
- [ ] Test large desktop (1920px width)
- [ ] Verify navigation works on all sizes
- [ ] Verify grid columns adapt correctly

### 8.3 Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Verify LCP < 2.5s
- [ ] Verify FID < 100ms
- [ ] Verify CLS < 0.1
- [ ] Enable text compression (GitHub Pages)
- [ ] Verify JavaScript bundle < 50KB gzipped
- [ ] Add preload hints for critical assets
- [ ] Add lazy loading for below-fold images

### 8.4 Error Handling
- [ ] Add error boundaries to islands
- [ ] Handle media load failures gracefully
- [ ] Handle 404 routes with proper page
- [ ] Handle network failures with retry logic

### 8.5 SEO
- [ ] Verify meta tags on all pages
- [ ] Add canonical URLs
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Add structured data for exercises

### 8.6 Cross-Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Verify WebP images work

### 8.7 Final Build Verification
- [ ] Run npm run build
- [ ] Verify no TypeScript errors
- [ ] Verify no console errors
- [ ] Verify all pages render correctly
- [ ] Verify all links work
- [ ] Deploy to staging
- [ ] Verify production build

## Verification
- [ ] Lighthouse score > 90 on all metrics
- [ ] All accessibility checks pass
- [ ] Works on all target browsers
- [ ] No console errors in production
- [ ] All functionality works as specified
