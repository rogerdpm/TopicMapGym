# TopicMapGym

TopicMapGym is an interactive exercise reference web app that organizes gym movements by training focus and muscle group.

Users can:
- switch between tabs such as Glutes, Legs, Chest, Back, Shoulders, Arms, Stomach, and Cardio
- click an exercise tile to cycle through demonstration images
- continue clicking to move from images to short video demonstrations (when available)
- use the Back button to navigate backward through the currently selected exercise media

The app is designed for fast browsing during workouts, coaching, or exercise planning.

## Project Structure

- [index.html](index.html): main application page and tab layout
- [script.js](script.js): table generation, exercise mapping, media navigation logic
- [styles_phone.css](styles_phone.css): mobile styling (`max-width: 940px`)
- [styles_laptop.css](styles_laptop.css): desktop/laptop styling (`min-width: 941px`)
- [images_1](images_1) to [images_8](images_8): media assets grouped by tab

## Media Organization

Exercise media is loaded dynamically from folder coordinates:

- folder pattern: `images_<tab>/folder_<row>_<col>/`
- image pattern: `1.png`, `2.png`, `3.png`, ...
- video pattern: continuing numeric sequence as `.mp4`

Example:

- `images_1/folder_0_0/1.png`
- `images_1/folder_0_0/2.png`
- `images_1/folder_0_0/9.mp4`

The maximum image/video count for each exercise tile is controlled in [script.js](script.js) through the `lastImage` and `lastVideo` mappings.

## Running Locally

Because this project uses many relative media paths, run it from a local web server (recommended) instead of opening HTML directly from disk.

Options:

- VS Code Live Server extension
- Python: `python -m http.server`
- Node tools such as `npx serve`

Then open [index.html](index.html) through the local server URL.

## Updating Content

To update an exercise:

1. Place new media files into the correct `images_<tab>/folder_<row>_<col>/` directory.
2. Ensure numbering is continuous (`1.png`, `2.png`, ...).
3. Update `lastImage[...]` and `lastVideo[...]` in [script.js](script.js) if media counts changed.

## Deployment

This repository is deployed via GitHub Pages from the `main` branch.

If changes do not appear immediately after push:

- wait for Pages deployment to complete
- hard refresh browser cache (`Ctrl+Shift+R`)
- bump asset query versions in [index.html](index.html) if needed

## Contact

For suggestions, corrections, or collaboration, open an issue in this repository.