# jamessvolos.com

Personal site of **James Svolos** — Principal Data Science Manager at Microsoft.
Writing, an interactive data **Lab**, and ways to connect. Live at
**[jamessvolos.com](https://jamessvolos.com)**.

## Stack
- Static HTML hosted on **GitHub Pages** (custom domain via `CNAME`)
- **Tailwind CSS** (CDN) + a little custom CSS in `assets/css/main.css`
- **Plotly** for charts; vanilla JS for interactions (no framework)
- Featured Writing pulls **live from Substack RSS** (via a CORS proxy) with a
  static fallback so content is never empty
- `.nojekyll` so files are served as-is

## Structure
```
index.html          Home — hero, impact band, "You Draw It", featured writing
about.html          Background + leadership philosophy
writing.html        Essays (dynamic from Substack, with fallback)
connect.html        LinkedIn · Substack · email
lab/index.html      Nine interactive data experiments
about/ , connect/   Redirects to the .html canonical pages
assets/css/main.css  Shared styles (hero gradient, card hover)
robots.txt          Crawl directives (search + AI crawlers) + sitemap ref
sitemap.xml         Page index for search engines
llms.txt            Short machine-readable summary (llmstxt.org format)
llms-full.txt       Full-text content dump for LLMs
CNAME               Custom domain
```

## The Lab
Interactive experiments, each with a one-line takeaway and a "behind the viz"
note: Forecasts-Lead vs. Metrics-Lag, Cherry-Picking Timeframes, a Prompt
Engineering Playground, Daylight vs. Mood, Meeting Load, PGA Putting, Mark
Broadie's Strokes Gained suite, and the Decoy Effect.

## Develop
Serve over HTTP (the Substack feed needs `http://`, not `file://`):
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
GitHub Pages serves the `main` branch — pushing to `main` publishes within ~1–2
minutes. There is no build step on `main`.

> An Eleventy + Tailwind build pipeline (single source of truth for the shared
> header/footer, compiled production CSS, and a GitHub Actions deploy) is staged
> on a feature branch; see that branch for activation steps.
