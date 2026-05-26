# The ScholarGuard Website — Implementation Plan

**Plan for:** [SPEC.md](./SPEC.md)
**Created:** 2026-05-25
**Time budget:** 3 hours single-session build

---

## Phase 0 — Prereqs (0.1h)

- [ ] Verify Node.js LTS installed (`node -v` ≥ 20)
- [ ] `cd web/` clean

## Phase 1 — Scaffolding (0.3h)

1. `npm create vite@latest . -- --template react` in `web/`
2. `npm install`
3. Add deps: `npm i -D tailwindcss postcss autoprefixer @tailwindcss/typography`
4. Add deps: `npm i react-router-dom react-helmet-async framer-motion`
5. `npx tailwindcss init -p` → configure `tailwind.config.js` content paths
6. Wire `index.css` with `@tailwind` directives + font imports
7. Smoke test: `npm run dev` opens default page

## Phase 2 — Design tokens & global layout (0.3h)

1. `tailwind.config.js` — add `theme.extend.colors` (cream/ink/brass/forest), `theme.extend.fontFamily` (display/sans), `theme.extend.fontSize` (modular scale)
2. `src/index.css` — base font-feature-settings, body bg/text, smooth fonts, custom underline styles
3. `src/components/Layout.jsx` — `<Header>` + `<Footer>` + `<Outlet>`
4. `src/components/Header.jsx` — logo (wordmark only), 5 nav items, mobile hamburger
5. `src/components/Footer.jsx` — quick links, legal disclaimer, parent-brand link
6. `src/components/SEO.jsx` — wraps `<Helmet>` with title/desc/og/twitter/canonical/JSON-LD slots
7. `src/main.jsx` — wrap `<App>` with `<HelmetProvider>` and `<BrowserRouter>`
8. `src/App.jsx` — `<Routes>` with all 6 pages

## Phase 3 — Build 6 pages (1.3h)

Order: Home → Services → About → Resources → Case Studies → Contact

For each page:
1. Page component in `src/pages/<Name>.jsx`
2. SEO component at top with unique title/description
3. Sections per SPEC §5 skeleton
4. Reuse shared components: `<Section>`, `<Card>`, `<CTAButton>`, `<Pillar>`, `<FAQ>`

Shared components to extract during Home build:
- `src/components/CTAButton.jsx` — primary + secondary variants
- `src/components/Section.jsx` — `<section>` with consistent padding
- `src/components/Card.jsx` — bordered/elevated card
- `src/components/FAQ.jsx` — accordion (use `<details>`/`<summary>` for SEO + zero-JS)
- `src/components/EmailCapture.jsx` — `<form>` placeholder (no API integration yet)

## Phase 4 — Polish & motion (0.3h)

1. Hero entry animation (stagger-reveal text)
2. Card hover lift
3. Link underline draw-in
4. SVG paper-grain overlay (3% opacity, fixed)
5. Smooth scroll behavior
6. Custom focus rings (a11y)

## Phase 5 — SEO infra (0.3h)

1. `public/robots.txt` — allow all + sitemap reference
2. `scripts/generate-sitemap.mjs` — emits `public/sitemap.xml` from a routes array
3. `vite.config.js` — wire prerender plugin (try `vite-plugin-prerender-spa` first; fall back to react-snap if it errors)
4. `index.html` — default `<meta>` tags + favicon + structured data baseline
5. Per-page JSON-LD wired through `<SEO>` component
6. `public/og-default.png` — 1200×630 typographic OG image (Tailwind-rendered, then screenshot, or static export)

## Phase 6 — Verify & ship (0.4h)

1. `npm run build` — must succeed without errors
2. `npm run preview` — confirm 6 routes load
3. View-source check: hero text present in HTML
4. Mobile responsive check (375px viewport)
5. Browser console check (zero errors)
6. Lighthouse SEO audit (target ≥ 95)
7. Add `.gitignore` for `node_modules/`, `dist/`
8. Take 2-3 screenshots for handoff
9. Git commit

## Risk register

| Risk | Mitigation |
|---|---|
| Pre-render plugin breaks with React 18 | Fallback to `react-snap` or hand-rolled puppeteer script. Worst case: ship SPA, document known SEO limitation. |
| Fraunces font heavy | Subset to display range only; preload critical weight |
| Tailwind v4 breaking changes | Pin v3 (`tailwindcss@^3`) explicitly |
| User wants different aesthetic on review | Tokens centralized in `tailwind.config.js` + `index.css` → swap is one-file change |

## Out-of-plan (will NOT do this session)

- Kit API form submission (placeholder forms only)
- Real case-study content (waiting on case material)
- Cal.com embed (deferred to M6 per user)
- Blog / dynamic content
- i18n
- Image generation for case-study cards
