import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';

const outputFile = path.resolve('dist', 'index.html');
const root = '<div id="root"></div>';
const html = fs.readFileSync(outputFile, 'utf8');
const appHtml = renderToStaticMarkup(createElement(App));
const resourceHintPattern = /<link rel="preload"[^>]*\/>/g;
const resourceHints = appHtml.match(resourceHintPattern) ?? [];
const pageHtml = appHtml.replace(resourceHintPattern, '');

if (!html.includes(root)) {
  throw new Error('Expected an empty #root element in the Vite output.');
}

const prerenderedHtml = html
  .replace('</head>', `${resourceHints.join('')}\n</head>`)
  .replace(root, `<div id="root">${pageHtml}</div>`);

fs.writeFileSync(outputFile, prerenderedHtml);
console.log('Pre-rendered the home page into dist/index.html');
