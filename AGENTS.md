# INIATI Site — Agent Guide

## Architecture

- This is a static institutional site built with React 19, TypeScript, Vite and Bootstrap 5.
- `index.html` owns document-level metadata, analytics, JSON-LD and the application root.
- `src/App.tsx` is the sole page composition root. Keep its sections semantic, with one descriptive `h1` and a logical heading hierarchy.
- `src/main.tsx` hydrates the pre-rendered page in production and renders normally during development. Do not replace hydration with client-only rendering.
- `scripts/prerender.tsx` writes the rendered React page into `dist/index.html` after Vite builds it. Any browser-only code in components must guard `window`, `document`, `localStorage` and similar globals so pre-rendering remains safe.
- `public/` contains files copied verbatim to `dist/`, including `CNAME`, `robots.txt`, `sitemap.xml`, `llms.txt`, the web manifest and public images.
- `dist/` is generated output. Never edit or commit it manually.

## SEO is mandatory

Treat SEO metadata as part of every content or page change. Before modifying public copy, sections, images, URLs or the build, review and update the applicable SEO assets:

- Keep one canonical, absolute HTTPS URL (`https://www.iniati.org.br/`) per public page.
- Keep `title`, description, robots directives, Open Graph and Twitter metadata precise, consistent with visible content and in Brazilian Portuguese.
- Open Graph and Twitter images must use absolute HTTPS URLs, meaningful `alt` text and correct dimensions/type metadata when known.
- Maintain valid JSON-LD in `index.html`. It must reflect only verified, visible institutional information; never invent addresses, telephone numbers, legal identifiers, social profiles, awards, clients or performance claims.
- Preserve the `ResearchOrganization`, `WebSite` and `WebPage` entities and extend structured data only with truthful schema.org properties that are relevant to the page.
- Include every canonical, indexable public URL in `public/sitemap.xml` with an absolute URL. Keep `public/robots.txt` permissive for public pages and point it to the sitemap.
- Keep `public/llms.txt` concise, factual and aligned with visible site content, canonical URLs and named projects.
- Use descriptive image `alt` text. Decorative images must be intentionally hidden from assistive technology.
- Do not add keywords meta tags, fake reviews, fabricated FAQ schema, hidden text, doorway pages or other SEO spam.

## Validation

- Install dependencies with `npm ci`.
- Run `npm run validate` before handoff. It runs linting, the static build, pre-rendering and SEO asset/schema checks.
- The GitHub Pages workflow runs this validation before publishing. Keep it intact when changing the build.
