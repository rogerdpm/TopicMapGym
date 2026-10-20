# TopicMapGym Documentation

## Overview

This directory contains the specification and implementation plans for the TopicMapGym project reorganization using Astro.

## Contents

### [SPEC.md](./spec/SPEC.md)
The comprehensive specification document covering:
- Design language and color palette
- Typography and spatial system
- Information architecture
- Page structure and layouts
- Feature specifications
- Technical architecture decisions

### [Plan](./specs/plan/)
Detailed implementation plans broken into executable phases:

| Plan | Description |
|------|-------------|
| [01-project-scaffold.md](./specs/plan/01-project-scaffold.md) | Initialize Astro project with dependencies and configuration |
| [02-content-schema.md](./specs/plan/02-content-schema.md) | Define exercise content schema and create data files |
| [03-ui-components.md](./specs/plan/03-ui-components.md) | Build reusable UI components (Button, Card, Badge, etc.) |
| [04-pages.md](./specs/plan/04-pages.md) | Create homepage, category, and exercise detail pages |
| [05-islands.md](./specs/plan/05-islands.md) | Build interactive Preact islands (MediaViewer, Search, etc.) |
| [06-media-migration.md](./specs/plan/06-media-migration.md) | Reorganize existing media into structured assets |
| [07-ci-cd.md](./specs/plan/07-ci-cd.md) | Configure GitHub Actions for CI/CD deployment |
| [08-testing-polish.md](./specs/plan/08-testing-polish.md) | Accessibility, performance, and final polish |

## Quick Start

To follow these plans:

1. Review [SPEC.md](./spec/SPEC.md) to understand the design decisions
2. Start with [Plan 01](./specs/plan/01-project-scaffold.md) and work sequentially
3. Each plan contains specific steps and verification checkpoints

## Status

- [x] SPEC.md created
- [x] All 8 implementation plans created
- [ ] Implementation not yet started
