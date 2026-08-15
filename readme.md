# TopicMapGym

An interactive exercise guide. Browse gym movements by muscle group and watch clear demonstrations — diagrams first, then real video.

## How to Use

1. **Pick a muscle group** from the top tabs: Glutes, Legs, Chest, Back, Shoulders, Arms, Stomach, Cardio.
2. **Click an exercise tile** to open its demonstration on the right.
3. **Keep clicking** the tile (or the image) to cycle through more views — diagrams first, then video demonstrations where available.
4. **Use the Back button** to step back through the demonstrations.

That's it — no login, no setup for viewers.

## Quick Start (Hosting Your Own Copy)

The site runs from a local web server so all images and videos load correctly.

1. Download or clone this repository.
2. Start a local server from the project folder — pick one:
   - **VS Code:** install the *Live Server* extension, then right-click [index.html](index.html) → *Open with Live Server*.
   - **Python:** run `python -m http.server` and open http://localhost:8000
   - **Node:** run `npx serve` and open the shown URL.
3. Open [index.html](index.html) through that server URL.

> Tip: Opening [index.html](index.html) directly from disk may not load media — always use a local server.

## Publishing Online (Optional)

This project is ready for **GitHub Pages**:

1. Push to the `main` branch.
2. In your repo: *Settings → Pages → Deploy from branch → `main`*.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

If updates don't show right away: wait for Pages to finish, then hard refresh with `Ctrl+Shift+R`.

## Adding or Updating Exercises

Media lives in numbered folders by muscle group and grid position:

```
images_<tab>/folder_<row>_<col>/
  1.png   2.png   3.png   ...   (diagrams / images)
  9.mp4   10.mp4  ...           (videos continue the numbering)
```

To update an exercise:

1. Drop new files into the correct `images_<tab>/folder_<row>_<col>/` folder.
2. Keep numbering continuous (`1.png`, `2.png`, …).
3. If the number of files changed, update `lastImage` and `lastVideo` in [script.js](script.js).

## Files at a Glance

| File | Purpose |
| --- | --- |
| [index.html](index.html) | Main page and tab layout |
| [script.js](script.js) | Exercise mapping and media navigation |
| [styles_laptop.css](styles_laptop.css) | Desktop styling (≥ 941px) |
| [styles_phone.css](styles_phone.css) | Mobile styling (≤ 940px) |
| `images_1` … `images_8` | Media assets, one set per muscle-group tab |

## Contact

Questions or suggestions? Open an issue, or email **jjloubser@symbioses.co.za**.