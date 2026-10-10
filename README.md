# David Huynh Portfolio

**Live site: [davidhuynh01.github.io](https://davidhuynh01.github.io)**

A single-page portfolio with a quiet "dusk sky" anime look: twilight gradient hero, city skyline with power lines, film grain, and small Japanese section labels. Built with Vite, React, Tailwind CSS v4, and Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

Everything you'd want to change is in **`src/data.js`**: name, links, bio, projects, experience, awards, and skills.

- **Resume**: currently off. Once the paper is published, put `resume.pdf` in `public/` and set `profile.resumeUrl: '/resume.pdf'`.
- **Music**: put an audio file you have the rights to in `public/audio/` and set `music.src` (e.g. `'/audio/sunrise.mp3'`). The player stays hidden until then. It starts at 15% volume, only when a visitor presses play, and remembers their volume. The current track, "Sunrise of Youth" by Kuukiko, is CC BY 3.0, so keep the credit in `music.credit` (it's shown in the footer).
- **Photos (About)**: put images in `public/photos/` and set `src` in the `photos` list. Empty `src` shows a placeholder polaroid.
- **Degree / graduation**: `about.facts`.
- **Jobs / internships**: add objects to `experience` (newest first).
- **Awards**: add objects to `awards` (newest first). The section hides itself if the list is empty.
- **Screenshots**: put images in `public/projects/<slug>/` and list them in that project's `images` array. The first one is the cover. Projects with no images show a dusk-sky placeholder card instead.

Empty strings (`''`) hide that piece of UI, so nothing renders as a broken link.

## Theme

Colors are CSS variables at the top of `src/index.css` (`:root` = light "daytime", `.dark` = yozakura / night sakura). The hero sky colors live in `DAY` / `NIGHT` in `src/components/SkyBackground.jsx`.

`CloudShader.jsx` and `PhotoPile.jsx` are adapted from [Aceternity UI](https://ui.aceternity.com) components, used under the Aceternity License (fine for your own site; don't redistribute those files on their own). The site follows the visitor's OS preference until they use the toggle, and remembers that choice.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`. Check progress in the repo's **Actions** tab.
