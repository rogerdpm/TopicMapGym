# Plan: CI/CD Pipeline

**Objective:** Configure GitHub Actions workflow for automated build and deployment to GitHub Pages.

## Steps

### 7.1 Create GitHub Actions Workflow
- [ ] Create .github/workflows/deploy.yml
- [ ] Configure trigger on push to main branch
- [ ] Add workflow_dispatch for manual triggers
- [ ] Set permissions for pages: write

### 7.2 Configure Build Job
- [ ] Use ubuntu-latest runner
- [ ] Add actions/checkout@v4 step
- [ ] Add actions/setup-node@v4 with Node 20
- [ ] Configure npm cache
- [ ] Add npm ci step
- [ ] Add npx astro install step
- [ ] Add npm run build step
- [ ] Add env NODE_VERSION: '20'
- [ ] Add actions/upload-pages-artifact@v3 step

### 7.3 Configure Deploy Job
- [ ] Add needs: build dependency
- [ ] Use ubuntu-latest runner
- [ ] Add environment configuration (github-pages)
- [ ] Add actions/deploy-pages@v4 step
- [ ] Capture deployment URL

### 7.4 Configure Concurrency
- [ ] Add concurrency group: pages
- [ ] Set cancel-in-progress: false

### 7.5 Update astro.config.mjs
- [ ] Verify site URL is set correctly
- [ ] Verify output is 'static'
- [ ] Verify build assets path

### 7.6 Test Pipeline Locally
- [ ] Run npm run build
- [ ] Verify dist/ folder contains all assets
- [ ] Preview with npm run preview

### 7.7 GitHub Repository Settings
- [ ] Enable GitHub Pages
- [ ] Set source to GitHub Actions
- [ ] Verify no branch-based deployment configured

## Verification
- [ ] Push to main triggers workflow
- [ ] Build job completes successfully
- [ ] Deploy job completes successfully
- [ ] Site accessible at https://<username>.github.io/<repo>/
- [ ] Manual workflow dispatch works
