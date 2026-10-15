import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import LegalPage from '../src/LegalPage';

const root = '<div id="root"></div>';
const pages = [
  { file: 'index.html', element: createElement(App) },
  { file: 'politica-de-privacidade/index.html', element: createElement(LegalPage, { kind: 'privacy' }) },
  { file: 'termos-de-uso/index.html', element: createElement(LegalPage, { kind: 'terms' }) },
];

for (const page of pages) {
  const outputFile = path.resolve('dist', page.file);
  const html = fs.readFileSync(outputFile, 'utf8');
  const appHtml = renderToStaticMarkup(page.element);
  const resourceHintPattern = /<link rel="preload"[^>]*\/>/g;
  const resourceHints = appHtml.match(resourceHintPattern) ?? [];
  const pageHtml = appHtml.replace(resourceHintPattern, '');

  if (!html.includes(root)) {
    throw new Error(`Expected an empty #root element in ${page.file}.`);
  }

  const prerenderedHtml = html
    .replace('</head>', `${resourceHints.join('')}\n</head>`)
    .replace(root, `<div id="root">${pageHtml}</div>`);

  fs.writeFileSync(outputFile, prerenderedHtml);
  console.log(`Pre-rendered ${page.file}`);
}
