# Phase 2 — Eleventy + Tailwind build pipeline (staging)

This branch adds a build pipeline that removes the per-page duplication of the
shared header/footer and compiles Tailwind to a small static stylesheet
(~15 KB) instead of loading the multi-MB Tailwind CDN at runtime.

## How it works
- `generate.js` reads the existing page HTML (index.html, about.html,
  writing.html, connect.html, lab/index.html) and produces Eleventy templates
  in `src/` that share one layout (`src/_includes/base.njk`) plus `nav.njk`
  and `footer.njk` partials. Each page's `<head>` and body are preserved
  verbatim; only the Tailwind CDN tag is dropped.
- Eleventy renders `src/` to `_site/`, passing through favicon, CNAME,
  robots.txt, sitemap.xml, llms*.txt, and assets.
- Tailwind compiles `src/styles/app.css` (scanning the templates) to
  `_site/assets/css/app.css`.

Generated `src/*.njk` and `_site/` are git-ignored; the build regenerates them.

## Run locally
    npm install
    npm run build                      # -> _site/
    python3 -m http.server -d _site 8000

## Activate in production (one-time, owner only)
1. Merge this branch into `main`.
2. GitHub → repo Settings → Pages → Build and deployment → **Source: GitHub Actions**.
   (Required; this setting cannot be changed via API.)
3. The workflow (`.github/workflows/deploy.yml`) then builds and deploys on
   every push to `main`.

Until step 2 is done, Pages keeps serving the existing flat HTML from `main`,
so nothing breaks during the transition.

## Notes
- Tailwind scans `src/**/*.njk`; class names inside inline `<script>` strings
  are included because Tailwind scans file text. Classes built by string
  concatenation in JS would need safelisting in `tailwind.config.js`.
- Verified locally with Eleventy 3.1.6 + Tailwind 3.4: all pages build and
  render, nav active-state works, and body styling + Tailwind utilities apply
  from the compiled CSS with no CDN.
