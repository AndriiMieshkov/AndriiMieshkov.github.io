# Andrii Mieshkov — Portfolio

Personal portfolio site. React 19 + TypeScript + Vite, hand-written CSS, no UI framework.
Deployed to GitHub Pages by GitHub Actions.

## Features

- EN / PL language switch (auto-detected from the browser, `?lang=pl` also works)
- VIEN case study with a desktop/mobile screenshot gallery, swipe support and a lightbox
- **Card Duel**: the real HTML5 playable ad (PixiJS) embedded and playable in a phone frame. It loads on click, so its 3.5 MB never delays the page
- Responsive WebP images (`srcset`) with inline blur placeholders, lazy-loaded with no layout shift
- Responsive from 320 px phones to wide desktops; respects `prefers-reduced-motion`
- Downloadable CV, JSON-LD `Person` schema, Open Graph tags

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/
```

## Edit content

All text lives in `src/data/content.ts` (both `en` and `pl`). Contact links are in `profile` at the top of that file.

## Images

Raw screenshots are converted to WebP sets with:

```bash
npm run images -- <screenshots_dir> <game_poster.png>
```

This writes `public/img/*.webp` and `src/data/images.generated.json` (sizes + blur placeholders). It needs Python 3 and Pillow.

## Game build

`public/play/card-duel/` is a portfolio-specific `default` build of Card Duel, made from the last committed version of the game project with three changes:

- `src/App.js` imports `pixi.js-legacy`, so the game falls back to Canvas when WebGL is unavailable
- `googlePlayUrl` / `appStoreUrl` in `src/config.js` are empty
- `src/index.js` wraps `callSDK('download')`, so the CTA stays inside the ad instead of opening a store tab

Rebuild with `npm run build -- -p default` in the game project, then copy `dist/default/*` here.

## Deploy to GitHub Pages

1. Create a repo: either `AndriiMieshkov.github.io` (site at the root) or any name such as `portfolio` (site at `/portfolio/`). The build uses relative paths, so both work.
2. Push this folder to the `main` branch.
3. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Each push to `main` runs `.github/workflows/deploy.yml` and publishes the site.
