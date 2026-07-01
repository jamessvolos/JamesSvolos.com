// Static build: expand @include directives in src/ pages into flat HTML at the
// repo root, stamping the site.css content hash automatically. GitHub Pages
// serves the generated root files directly (deploy-from-branch is unchanged).
import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';

const PAGES = [
  'index.html',
  'writing.html',
  'about.html',
  'connect.html',
  'spot-the-lie.html',
  'lab/index.html',
  '404.html',
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

for (const page of PAGES) {
  const out = expand(readFileSync('src/' + page, 'utf8'));
  writeFileSync(page, out);
  console.log('built ' + page);
}
console.log('css hash: ' + cssHash);
