import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://thescholarguard.com';

// Mirror src/lib/routes.js (keep in sync if routes change)
const ROUTES = [
  { path: '/',              priority: '1.0', changefreq: 'weekly'  },
  { path: '/case-studies',  priority: '0.9', changefreq: 'weekly'  },
  { path: '/resources',     priority: '0.8', changefreq: 'monthly' },
  { path: '/services',      priority: '0.8', changefreq: 'monthly' },
  { path: '/about',         priority: '0.5', changefreq: 'yearly'  },
  { path: '/contact',       priority: '0.5', changefreq: 'yearly'  },
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');
console.log(`✓ Wrote ${ROUTES.length} URLs to ${outPath}`);
