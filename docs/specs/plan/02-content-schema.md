# Plan: Content Schema & Data Migration

**Objective:** Define the exercise content schema and migrate existing exercise data into the new structure.

## Steps

### 2.1 Create Content Collection Schema
- [ ] Create src/content/config.ts
- [ ] Define exercise schema with fields:
  - id (string, kebab-case)
  - name (string)
  - category (enum: glutes, legs, chest, back, shoulders, arms, core, cardio)
  - aliases (optional array of strings)
  - difficulty (enum: beginner, intermediate, advanced)
  - equipment (array of strings)
  - muscles (object with primary and optional secondary arrays)
  - instructions (array of strings)
  - tips (optional array of strings)
  - safety (optional array of strings)
  - media (object with thumbnail, diagrams, videos)
  - gridPosition (optional object with row/col)

### 2.2 Create Exercise Data Files for Glutes
- [ ] Create src/content/exercises/glutes/reverse-hack-squat.json
- [ ] Create src/content/exercises/glutes/good-mornings.json
- [ ] Create src/content/exercises/glutes/donkey-kicks.json
- [ ] Create src/content/exercises/glutes/bulgarian-split-squats.json
- [ ] Create src/content/exercises/glutes/hip-thrust.json
- [ ] Create src/content/exercises/glutes/single-leg-glute-extensions-back.json
- [ ] Create src/content/exercises/glutes/step-ups.json
- [ ] Create src/content/exercises/glutes/single-angle-leg-press.json
- [ ] Create src/content/exercises/glutes/single-leg-glute-extensions-side.json
- [ ] Create src/content/exercises/glutes/rdls.json
- [ ] Create src/content/exercises/glutes/reverse-leg-extensions.json
- [ ] Create src/content/exercises/glutes/side-lunge.json
- [ ] Create src/content/exercises/glutes/hip-abductions.json
- [ ] Create src/content/exercises/glutes/back-extension.json

### 2.3 Create Exercise Data Files for Legs
- [ ] Create src/content/exercises/legs/squats.json
- [ ] Create src/content/exercises/legs/leg-press.json
- [ ] Create src/content/exercises/legs/lunges.json
- [ ] Create src/content/exercises/legs/calf-raises.json
- [ ] Create src/content/exercises/legs/lying-leg-curls.json
- [ ] Create src/content/exercises/legs/hack-squats.json
- [ ] Create src/content/exercises/legs/leg-extensions.json

### 2.4 Create Exercise Data Files for Chest
- [ ] Create src/content/exercises/chest/flat-bench-press.json
- [ ] Create src/content/exercises/chest/incline-dumbell-press.json
- [ ] Create src/content/exercises/chest/close-grip-bench-press.json
- [ ] Create src/content/exercises/chest/decline-bench-press.json
- [ ] Create src/content/exercises/chest/front-raises.json
- [ ] Create src/content/exercises/chest/flys.json
- [ ] Create src/content/exercises/chest/peck-deck-fly.json
- [ ] Create src/content/exercises/chest/cross-over-chest-cables.json

### 2.5 Create Exercise Data Files for Back
- [ ] Create src/content/exercises/back/back-press.json
- [ ] Create src/content/exercises/back/one-arm-dumbbell-rows.json
- [ ] Create src/content/exercises/back/reverse-fly.json
- [ ] Create src/content/exercises/back/dead-lifts.json
- [ ] Create src/content/exercises/back/lat-pulldowns.json
- [ ] Create src/content/exercises/back/rear-lat-pulldowns.json
- [ ] Create src/content/exercises/back/seated-row.json
- [ ] Create src/content/exercises/back/lat-pullup.json
- [ ] Create src/content/exercises/back/close-grip-lat-pulldown.json
- [ ] Create src/content/exercises/back/straight-arm-lat-pulldown.json
- [ ] Create src/content/exercises/back/face-pull.json

### 2.6 Create Exercise Data Files for Remaining Categories
- [ ] Create all exercise JSON files for shoulders
- [ ] Create all exercise JSON files for arms
- [ ] Create all exercise JSON files for core
- [ ] Create all exercise JSON files for cardio

### 2.7 Create Helper Library
- [ ] Create src/lib/exercises.ts with functions:
  - getExercisesByCategory(category)
  - getExerciseById(category, id)
  - getAllExercises()
  - searchExercises(query)
  - buildMediaUrl(category, exerciseId, filename)

## Verification
- [ ] All exercise JSON files pass schema validation
- [ ] getAllExercises() returns correct count (~80+)
- [ ] Exercise lookup by category and ID works correctly
