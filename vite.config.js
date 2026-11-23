import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { education } from './src/data/experience.js';
import { profile, seo } from './src/data/profile.js';

const DEFAULT_SITE_URL = 'https://kaviyarasan.vercel.app';

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** schema.org Person, built from the same data the page shows. */
function personJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}${profile.photo.src}`,
    jobTitle: profile.currentTitle,
    description: seo.description,
    email: `mailto:${profile.email}`,
    worksFor: { '@type': 'Organization', name: profile.currentCompany },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education[0].institution },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressRegion: profile.location.region,
      addressCountry: 'IN',
    },
    sameAs: [profile.links.github.href, profile.links.linkedin.href],
  };
}

/**
 * Everything that depends on the public site URL comes from one place:
 * the %PLACEHOLDER% values in index.html, robots.txt and sitemap.xml.
 */
function seoFiles(siteUrl) {
  const values = {
    SITE_URL: siteUrl,
    SEO_TITLE: escapeHtml(seo.title),
    SEO_DESCRIPTION: escapeHtml(seo.description),
    SEO_KEYWORDS: escapeHtml(seo.keywords.join(', ')),
    SEO_IMAGE_ALT: escapeHtml(seo.shareImageAlt),
    PERSON_NAME: escapeHtml(profile.name),
    RESUME_HREF: profile.resume.href,
    // "<" is escaped so the JSON can never close its own <script> tag.
    PERSON_JSON_LD: JSON.stringify(personJsonLd(siteUrl)).replace(/</g, '\\u003c'),
  };

  const files = {
    '/robots.txt': {
      type: 'text/plain; charset=utf-8',
      body: `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
    },
    '/sitemap.xml': {
      type: 'application/xml; charset=utf-8',
      body: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
    },
  };

  return {
    name: 'seo-files',
    transformIndexHtml: {
      // Before Vite reads the links, so it sees finished URLs.
      order: 'pre',
      handler: (html) => html.replace(/%([A-Z_]+)%/g, (match, key) => values[key] ?? match),
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = files[req.url?.split('?')[0]];
        if (!file) return next();
        res.setHeader('Content-Type', file.type);
        res.end(file.body);
      });
    },
    generateBundle() {
      for (const [path, file] of Object.entries(files)) {
        this.emitFile({ type: 'asset', fileName: path.slice(1), source: file.body });
      }
    },
  };
}

/**
 * The page is drawn by JavaScript, so without help the browser only discovers
 * the fonts after the text is already on screen in a fallback font, and the
 * hero visibly reflows when they arrive. Preloading the three Latin files from
 * the HTML fetches them alongside the script instead. Build only.
 */
function preloadFonts() {
  return {
    name: 'preload-fonts',
    transformIndexHtml: {
      order: 'post',
      handler: (html, { bundle }) =>
        Object.keys(bundle ?? {})
          .filter((fileName) => /-latin-wght-normal-[\w-]+\.woff2$/.test(fileName))
          .map((fileName) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${fileName}`,
              crossorigin: '',
            },
            injectTo: 'head',
          })),
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl), preloadFonts()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  };
});
