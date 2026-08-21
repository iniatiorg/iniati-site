import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const read = (file) => fs.readFileSync(path.join(dist, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'site.webmanifest']) {
  assert(fs.existsSync(path.join(dist, file)), `Missing dist/${file}`);
}

const html = read('index.html');
for (const markup of [
  '<html lang="pt-BR"',
  '<link rel="canonical" href="https://www.iniati.org.br/"',
  '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"',
  '<meta property="og:url" content="https://www.iniati.org.br/"',
  '<meta property="og:image" content="https://www.iniati.org.br/og.png"',
  '<meta name="twitter:card" content="summary_large_image"',
  '<main>',
  '<h1>',
]) {
  assert(html.includes(markup), `Missing SEO markup: ${markup}`);
}

const schema = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
assert(schema, 'Missing JSON-LD schema');
const graph = JSON.parse(schema[1])['@graph'];
assert(Array.isArray(graph), 'JSON-LD must include an @graph');
for (const type of ['ResearchOrganization', 'WebSite', 'WebPage']) {
  assert(graph.some((entry) => entry['@type'] === type), `Missing ${type} schema`);
}

assert(
  read('robots.txt').includes('Sitemap: https://www.iniati.org.br/sitemap.xml'),
  'robots.txt must declare the sitemap',
);
assert(
  read('sitemap.xml').includes('<loc>https://www.iniati.org.br/</loc>'),
  'sitemap.xml must contain the canonical home URL',
);
assert(read('llms.txt').includes('https://www.iniati.org.br/'), 'llms.txt must contain the canonical URL');

console.log('Validated static SEO assets and structured data');
