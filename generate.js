const fs = require('fs');
const pages = {
  'index.html':     { permalink: '/index.html',    active: 'home',    out: 'index' },
  'about.html':     { permalink: '/about.html',     active: 'about',   out: 'about' },
  'writing.html':   { permalink: '/writing.html',   active: 'writing', out: 'writing' },
  'connect.html':   { permalink: '/connect.html',   active: 'connect', out: 'connect' },
  'lab/index.html': { permalink: '/lab/index.html', active: 'lab',     out: 'lab' },
};
fs.mkdirSync('src', { recursive: true });
for (const [file, cfg] of Object.entries(pages)) {
  const html = fs.readFileSync(file, 'utf8');
  let head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)[1];
  head = head.replace(/\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/, '');
  let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
  body = body.replace(/<nav[\s\S]*?<\/nav>/, '').replace(/<footer[\s\S]*?<\/footer>/, '');
  const tmpl = `---\npermalink: ${cfg.permalink}\nactive: ${cfg.active}\n---\n`
    + `{% extends "base.njk" %}\n`
    + `{% block head %}{% raw %}${head}{% endraw %}{% endblock %}\n`
    + `{% block body %}{% raw %}${body}{% endraw %}{% endblock %}\n`;
  fs.writeFileSync(`src/${cfg.out}.njk`, tmpl);
}
console.log('generate.js: wrote ' + Object.keys(pages).length + ' templates');
