# jamessvolos.com

Personal site for **James Svolos** — Principal Data Science Manager at Microsoft.
Static HTML served by **GitHub Pages** from the `main` branch root (custom domain
via `CNAME`, `.nojekyll` disables Jekyll processing).

## Structure

```
index.html          Home
about.html          About — bio, timeline, philosophy
writing.html        Writing ("The Dispatch") — live Substack feed
lab/index.html      Lab — 12 interactive data experiments
connect.html        Connect — direct channels
assets/css/
  site.css          Compiled, minified Tailwind + components (the only stylesheet)
  tailwind.input.css  Source for the build (@tailwind layers + custom components)
favicon.svg         Site icon (SVG; modern browsers)
og-image.png        1200×630 social share card
robots.txt · sitemap.xml · llms.txt · llms-full.txt   Discoverability (search + LLMs)
```

## Styling / build

The site uses a **precompiled Tailwind stylesheet** (`assets/css/site.css`) rather
than the Tailwind Play CDN — smaller payload, no runtime class generation, no FOUC.

When you change markup/classes, regenerate the CSS:

```bash
npm install        # first time only (installs tailwindcss)
npm run build:css  # rebuilds assets/css/site.css from the HTML it scans
# or, while editing:
npm run watch:css
```

`tailwind.config.js` scans all `*.html` (including class names inside inline
`<script>` strings), so dynamically-rendered cards keep their styles. Page-specific
CSS (mastheads, canvases, skeletons) stays in each page's inline `<style>`.

Fonts load via `<link>` (Google Fonts, Inter). Font Awesome is CDN-loaded.
The Lab loads Plotly at the end of `<body>` so it doesn't block first paint.

## Deploy

Commit to `main`; GitHub Pages publishes the root automatically. No CI build runs
on deploy — `site.css` is built locally and committed.
