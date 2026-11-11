# Andrii Mieshkov — Portfolio

**Live:** [andriimieshkov.github.io](https://andriimieshkov.github.io/)

Personal portfolio of Andrii Mieshkov, a Software Engineer based in Kraków. The site presents selected commercial work, experience and skills in English and Polish. One of the projects is a real HTML5 playable ad that you can play right on the page.

## What's inside

- **VIEN — Client Personal Account.** A full-stack health-program cabinet (Vue 3, Fastify, PostgreSQL, Redis), shown through a desktop / mobile screenshot gallery with a lightbox.
- **Card Duel.** An HTML5 playable ad (PixiJS) built at PlayToMax, embedded and playable in a phone frame.
- Experience, skills, education, languages, interests and contact details.

## How it's built

The site is a single-page app with no UI framework or CSS library. Layout, animation and components are hand-written.

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript (strict) |
| Build | Vite |
| Styling | Plain CSS with design tokens, fluid type (`clamp`), CSS Grid "bento" layout |
| i18n | Small typed context: every string is defined once per language in `src/data/content.ts`, and the compiler checks that EN and PL match |
| Hosting | GitHub Pages, deployed by GitHub Actions |

### Details worth a look

- **Performance**
  - Screenshots are served as responsive WebP (`srcset` / `sizes`) with intrinsic dimensions and tiny inline blur placeholders, so nothing shifts while loading.
  - First load on mobile is about 160 KB.
  - The 3.6 MB game build loads only when the visitor presses Play.
- **Embedded game lifecycle (`Playable.tsx`)**
  - The game runs in a same-origin iframe.
  - It pauses its render loop and audio when scrolled out of view.
  - On restart it releases its WebGL context, so contexts never pile up.
  - It falls back to Canvas rendering when WebGL is unavailable.
- **Smooth scrolling**
  - Scroll and pointer handlers are throttled with `requestAnimationFrame`.
  - Scroll handlers write only to the elements they need, never to root CSS variables.
  - Animations stick to `transform` and `opacity`.
- **Accessibility**
  - Semantic landmarks and headings, a skip link, visible focus states and labelled icon buttons.
  - The lightbox is a native `<dialog>` and works with the keyboard.
  - `prefers-reduced-motion` is respected.
- **Responsive layout:** tested from 320 px phones up to 1920 px desktops, with no horizontal overflow.
- **SEO:** meta and Open Graph tags plus JSON-LD `Person` structured data.

## Structure

```
src/
  data/content.ts         all text (EN / PL) and profile links
  components/             Hero, Work, Gallery, Playable, Experience, Skills, About, Contact…
  hooks/                  scroll-reveal, active-section tracking, cursor spotlight
  styles.css              design tokens and all styles
public/
  img/                    optimized WebP screenshots
  play/card-duel/         playable ad build
scripts/optimize_images.py   screenshot → responsive WebP + blur placeholder pipeline
.github/workflows/        build & deploy to GitHub Pages
```

## Contact

- Email: [andrii.mieshkov@gmail.com](mailto:andrii.mieshkov@gmail.com)
- LinkedIn: [linkedin.com/in/andrii-mieshkov](https://www.linkedin.com/in/andrii-mieshkov)

Card Duel is shown as an example of work done at PlayToMax. All other code in this repository is by Andrii Mieshkov.
