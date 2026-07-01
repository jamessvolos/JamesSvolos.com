# jamessvolos.com

Personal site for **James Svolos** — Principal Data Science Manager at Microsoft.
Static HTML served by **GitHub Pages** from the `main` branch root (custom domain
via `CNAME`, `.nojekyll` disables Jekyll processing).

## Structure

```
src/                Authoring source — edit HERE, not the root .html
  *.html            Page sources with @include directives for shared chrome
  lab/index.html
  partials/
    head-fav.html   Favicon + theme-color (shared by every page)
    head-assets.html  Font preloads + stylesheet link (auto-stamped cache hash)
    nav.html        Top navigation (active link set per page)
build.mjs           Expands src/ → flat HTML at the repo root
index.html          Home              ┐
about.html          About             │ generated from src/ — do not edit by hand
writing.html        Writing feed      │ (deploy-from-branch serves these directly)
lab/index.html      Lab (12 experiments) │
connect.html        Connect           ┘
assets/css/
  site.css          Compiled, minified Tailwind + components (the only stylesheet)
  tailwind.input.css  Source for the CSS build (@tailwind layers + @font-face + components)
assets/fonts/       Self-hosted Inter (woff2, weights 400/500/600)
assets/js/          Self-hosted Plotly cartesian bundle (lazy-loaded by the Lab)
favicon.svg         Site icon (SVG; modern browsers use this)
og-image.png        1200×630 social share card
robots.txt · sitemap.xml · llms.txt · llms-full.txt   Discoverability (search + LLMs)
```

## Build

Pages are authored in `src/` with `<!-- @include name -->` directives; `build.mjs`
inlines the shared partials (nav, favicon, font/stylesheet links) so the chrome has
a **single source of truth**, and stamps `site.css` with a content hash for
cache-busting automatically. CSS is a **precompiled Tailwind stylesheet** (no Play
CDN — smaller payload, no runtime class generation, no FOUC).

```bash
npm install        # first time only
npm run build      # build:css (Tailwind) + build:html (expand src/ → root)
# while editing styles:
npm run watch:css
```

Edit files in `src/`, then run `npm run build` and commit both the source and the
regenerated root files. `tailwind.config.js` scans all `*.html` (including class
names inside inline `<script>` strings). Page-specific CSS/JS stays inline per page.

`build:html` also **minifies** each page (whitespace + inline CSS/JS) and
**regenerates `sitemap.xml`** from the canonical page list — both deterministic, so
the CI build check stays green.

Fonts and Plotly are **self-hosted** (no third-party runtime dependencies); Inter
ships weights 300–700 (300 is preloaded for the hero); the Lab lazy-loads the Plotly
bundle only when an experiment nears the viewport. A strict **Content-Security-Policy**
(`default-src 'self'`, plus the writing-feed proxy origins in `connect-src`) is set via
`<meta>` in the shared head partial.

## Deploy

Commit to `main`; GitHub Pages publishes the root automatically (deploy-from-branch).
The `Build check` GitHub Action recompiles everything on push and fails if the
committed output is out of date — so the deployed files always match `src/`.
