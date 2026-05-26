// Prerender SPA routes to real static HTML via Edge headless --dump-dom.
// Used to give crawlers and social-media link unfurlers per-route HTML
// with the correct <title>, <meta>, body content, and JSON-LD already in place.
//
// Flow:
//   1. `vite build` has already produced dist/index.html + assets.
//   2. We spawn `vite preview` (serves dist/ on a port).
//   3. For each route, we use msedge --headless --dump-dom to capture the
//      post-JS-execution DOM.
//   4. We save each as dist/<route>/index.html.
//   5. We kill the preview server.

import { spawn, execSync, execFileSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { setTimeout as wait } from 'timers/promises';
import http from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const TMP = resolve(ROOT, '.prerender-tmp');
const PORT = 4173;

const EDGE_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];
const EDGE = EDGE_PATHS.find(existsSync);
if (!EDGE) {
  console.error('Edge not found. Skipping prerender — SPA-only build will ship.');
  process.exit(0);
}

const ROUTES = [
  '/',
  '/case-studies',
  '/resources',
  '/services',
  '/about',
  '/contact',
];

function pollUp(url, maxMs = 15000) {
  return new Promise((resolveP, reject) => {
    const start = Date.now();
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          if (res.statusCode === 200) return resolveP();
          if (Date.now() - start > maxMs) return reject(new Error('preview never came up'));
          setTimeout(tick, 250);
        })
        .on('error', () => {
          if (Date.now() - start > maxMs) return reject(new Error('preview never came up'));
          setTimeout(tick, 250);
        });
    };
    tick();
  });
}

function dumpDom(routePath) {
  const url = `http://localhost:${PORT}${routePath}`;
  return execFileSync(
    EDGE,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--virtual-time-budget=5000',
      '--dump-dom',
      url,
    ],
    {
      encoding: 'utf8',
      maxBuffer: 50 * 1024 * 1024,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'ignore'],
    }
  );
}

function cleanHtml(html) {
  // react-helmet-async v2 APPENDS its meta tags (with data-rh="true") rather than
  // replacing the defaults from index.html. After dump-dom we get duplicates.
  // Dedupe: when a data-rh tag exists, remove the matching default (no data-rh).

  // Collect keys (name/property) that helmet has set.
  const rhKeys = new Set();
  const rhRegex = /<meta\s+(?:property|name)="([^"]+)"[^>]*\sdata-rh="true"/g;
  let m;
  while ((m = rhRegex.exec(html)) !== null) rhKeys.add(m[1]);

  // Also collect canonical (rel="canonical") if helmet set one.
  const hasRhCanonical = /<link[^>]+rel="canonical"[^>]*\sdata-rh="true"/.test(html);

  // Remove default meta tags (those WITHOUT data-rh) for any key helmet now owns.
  for (const key of rhKeys) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const defaultMetaRegex = new RegExp(
      `\\s*<meta\\s+(?:property|name)="${escapedKey}"(?![^>]*data-rh)[^>]*>`,
      'g'
    );
    html = html.replace(defaultMetaRegex, '');
  }

  if (hasRhCanonical) {
    html = html.replace(
      /\s*<link\s+rel="canonical"(?![^>]*data-rh)[^>]*>/g,
      ''
    );
  }

  // Strip the data-rh attribute itself for cleaner static output.
  html = html.replace(/\sdata-rh="true"/g, '');

  return html;
}

async function main() {
  // 1. Spawn vite preview
  console.log(`→ Starting vite preview on :${PORT}...`);
  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: ROOT,
    shell: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  try {
    await pollUp(`http://localhost:${PORT}/`);
    console.log('✓ preview up');

    // 2. For each route, dump DOM and save
    for (const route of ROUTES) {
      const html = await dumpDom(route);
      if (html.length < 1000 || !html.includes('ScholarGuard')) {
        throw new Error(`Prerender for ${route} produced suspiciously small/empty output (${html.length} bytes). Aborting.`);
      }
      const cleaned = cleanHtml(html);

      const outDir = route === '/' ? DIST : resolve(DIST, route.replace(/^\//, ''));
      mkdirSync(outDir, { recursive: true });
      const outFile = resolve(outDir, 'index.html');
      writeFileSync(outFile, cleaned, 'utf8');
      console.log(`✓ ${route.padEnd(20)} → ${outFile.replace(ROOT, '.')} (${(cleaned.length / 1024).toFixed(1)}kb)`);
    }

    console.log(`\n✓ Prerendered ${ROUTES.length} routes`);
  } finally {
    // 3. Kill preview
    try {
      preview.kill();
      // Also kill any leftover node on the port (Windows)
      try { execSync(`powershell -Command "Get-NetTCPConnection -LocalPort ${PORT} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`, { stdio: 'ignore' }); } catch {}
    } catch {}
    if (existsSync(TMP)) {
      try { execSync(`powershell -Command "Remove-Item -Recurse -Force '${TMP}' -ErrorAction SilentlyContinue"`, { stdio: 'ignore' }); } catch {}
    }
  }
}

main().catch((err) => {
  console.error('✗ Prerender failed:', err.message);
  console.error('  (SPA build at dist/index.html is still valid — just not prerendered)');
  process.exit(0); // Don't fail the overall build — degrade gracefully
});
