// Static build: expand @include directives in src/ pages into flat HTML at the
// repo root, stamping the site.css content hash, minifying output, and emitting
// a fresh sitemap.xml. GitHub Pages serves the generated root files directly
// (deploy-from-branch is unchanged).
import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { minify } from 'html-minifier-terser';

const SITE = 'https://jamessvolos.com';

// page file -> sitemap loc/priority/changefreq (null loc = not in sitemap, e.g. 404)
const PAGES = [
  { file: 'index.html',        loc: '/',                   priority: '1.0', changefreq: 'weekly' },
  { file: 'writing.html',      loc: '/writing.html',       priority: '0.9', changefreq: 'weekly' },
  { file: 'about.html',        loc: '/about.html',         priority: '0.8', changefreq: 'monthly' },
  { file: 'connect.html',      loc: '/connect.html',       priority: '0.7', changefreq: 'monthly' },
  { file: 'spot-the-lie.html', loc: '/spot-the-lie.html',  priority: '0.8', changefreq: 'monthly' },
  { file: 'lab/index.html',    loc: '/lab/',               priority: '0.9', changefreq: 'weekly' },
  { file: '404.html',          loc: null },
];

// Git-compatible blob hash so the cache-bust token is a real content hash.
function gitBlobHash(buf) {
  return createHash('sha1').update('blob ' + buf.length + '\0').update(buf).digest('hex').slice(0, 8);
}

const cssHash = gitBlobHash(readFileSync('assets/css/site.css'));

const partialCache = {};
function partial(name) {
  if (!(name in partialCache)) {
    partialCache[name] = readFileSync('src/partials/' + name + '.html', 'utf8').replace(/\n$/, '');
  }
  return partialCache[name];
}

function navClasses(active) {
  const cls = (key) => (active === key ? 'text-[#cf6146] transition' : 'hover:text-[#cf6146] transition');
  return { clsHome: cls('home'), clsWriting: cls('writing'), clsLab: cls('lab'), clsAbout: cls('about'), clsConnect: cls('connect') };
}

function expand(html) {
  return html.replace(/<!-- @include (\S+)([^>]*?)-->/g, (_m, name, attrs) => {
    const params = { cssHash };
    attrs.replace(/(\w+)="([^"]*)"/g, (_a, k, v) => { params[k] = v; return ''; });
    if (name === 'nav') Object.assign(params, navClasses(params.active));
    return partial(name).replace(/\{\{(\w+)\}\}/g, (_t, k) => (k in params ? params[k] : ''));
  });
}

const minifyOpts = {
  collapseWhitespace: true,
  conservativeCollapse: false,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  keepClosingSlash: true,     // keep self-closing SVG tags valid
  html5: true,
  decodeEntities: false,      // don't touch entities inside inline scripts/JSON-LD
};

for (const page of PAGES) {
  const out = await minify(expand(readFileSync('src/' + page.file, 'utf8')), minifyOpts);
  writeFileSync(page.file, out);
  console.log('built ' + page.file);
}

// Auto-generate sitemap.xml from the canonical page list. No <lastmod> — it's
// kept deterministic (build-clock independent) so the CI build check stays green;
// changefreq/priority carry the crawl hints.
const urls = PAGES.filter((p) => p.loc).map((p) =>
  '  <url>\n' +
  '    <loc>' + SITE + p.loc + '</loc>\n' +
  '    <changefreq>' + p.changefreq + '</changefreq>\n' +
  '    <priority>' + p.priority + '</priority>\n' +
  '  </url>'
).join('\n');
writeFileSync('sitemap.xml',
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');

console.log('css hash: ' + cssHash + ' · sitemap: ' + PAGES.filter((p) => p.loc).length + ' urls');
