# The ScholarGuard — Website Spec

**Date:** 2026-05-25
**Status:** Locked, ready to implement
**Goal:** Marketing site for The ScholarGuard, parity with the content-system spec funnel architecture (Section 4.1). Pure static frontend deployable to Cloudflare Pages / Vercel / GitHub Pages.

---

## 1. Constraints

| Constraint | Decision |
|---|---|
| Tech stack | React (per user request) → Vite + React 18 + JSX |
| Deploy target | Static files only — no Node server at runtime |
| SEO | Pre-rendered HTML per route (not pure SPA) |
| Cost | $0/mo hosting (Cloudflare Pages free) + $12/yr domain |
| Maintenance | Single operator, plain `.jsx` components, no CMS |
| Language | English only |
| Legal | Match guardrails in `docs/superpowers/specs/2026-05-20-appeal-lab-content-system-design.md` §1: no lawyer claims, no guaranteed-outcome language, no ghostwriting service publicly listed |

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Build tool | Vite 5 | Fast dev, modern ESM, smallest config |
| Framework | React 18 (JSX, not TS) | Per user; JS keeps W1 ship velocity |
| Styling | Tailwind CSS v3 | Utility-first, zero-runtime, dead-simple |
| Routing | react-router-dom v6 | Standard SPA routing |
| SEO meta | react-helmet-async | Per-route `<title>`, `<meta>`, OG, JSON-LD |
| Animation | framer-motion | Restrained scroll/hover reveals only |
| Pre-render | vite-plugin-prerender (puppeteer) | Each route emits real HTML for crawlers |
| Fonts | Fraunces (display) + DM Sans (body) | Distinctive, free, Google-hostable |

Avoided: Next.js (overkill, user said pure frontend), TypeScript (W1 ship velocity), Astro (user specified React stack), Inter font (generic).

## 3. Aesthetic Direction — "Editorial Academic"

**Reference vibe:** literary journal × Stripe-era restraint × academic publication.

| Element | Decision |
|---|---|
| Color: background | Warm cream `#FAF7F1` |
| Color: text primary | Deep ink navy `#0F1B2D` |
| Color: accent gold | Muted brass `#B8884C` |
| Color: secondary | Forest green `#1F3A2E` (link hover, badges) |
| Color: muted | Stone `#6B7280` for secondary copy |
| Typography: display | Fraunces (variable; SOFT 50, WONK 0) for headlines |
| Typography: body | DM Sans 400/500/600 |
| Type scale | Modular 1.250 (major third) — 14/16/20/25/31/39/49/61 |
| Spacing | Tailwind defaults; generous (py-24/py-32 sections) |
| Photography | None (faceless brand). Use typographic and number/data treatments instead. |
| Motion | Stagger-reveal on page load, subtle hover underlines, no bouncing |
| Distinctive elements | Drop-cap on hero, large display numerals for stats, hand-drawn-feel underlines on links, paper-grain SVG overlay at 3% opacity, custom serif quote marks |

## 4. Site Map

| Route | Purpose | Primary CTA |
|---|---|---|
| `/` | Hero + lead-magnet capture + trust pillars + recent case studies + FAQ | "Get the AI Detection Defense Kit (free)" |
| `/case-studies` | Anonymized case archive (initially "library opening soon" placeholder) | "Get notified when first case drops" |
| `/resources` | Free lead magnets (LM-A AI Detection Kit, LM-B Letter Templates) | Email capture per magnet |
| `/services` | 3-tier paid offers: L1 $99 / L2 $300 / L3 (DM only) | "DM for fit assessment" |
| `/about` | Faceless brand mission + legal scope clarification | "Read our case studies" |
| `/contact` | DM channels (X, IG) + 24h response promise. NO Cal.com (deferred to M6) | DM links |

## 5. Per-Page Content Skeleton

### / (Home)

1. **Hero** — h1 + sub + 2 CTAs (primary: AI Detection Kit; secondary: see case studies)
2. **Three trust pillars** — 50+ cases analyzed / Real letter structures / Outcome data not promises
3. **Recent case studies** — 3-card grid (placeholder cards "Coming soon" until library opens)
4. **What we do / what we don't** — Two-column: ✓ Tutoring & appeal | ✗ Not legal advice, no guaranteed outcomes
5. **FAQ accordion** — 4 questions from spec §4.1 homepage skeleton
6. **Footer CTA** — "Talk to us about your case"

### /case-studies

1. **Header** — "Anonymized case breakdowns from real US & UK academic appeals"
2. **Filter chips** — Country (US / UK) × Pillar (P1-P6). All disabled at launch.
3. **Cards grid** — Empty state: "First cases publish Week of [date]. Subscribe for the alert."
4. **Inline email capture**

### /resources

1. **Header** — "Free guides built from cases we've analyzed"
2. **LM-A card** — "AI Detection Defense Kit" — short blurb, CTA "Coming soon, email me when ready" (form)
3. **LM-B card** — "Appeal Letter Template Pack" — same
4. **Process explainer** — "How we anonymize cases before they reach you"

### /services

1. **Header** — "3 ways we can help"
2. **L1 card** — "Letter Review" $99, async 48h
3. **L2 card** — "Strategy Consultation" $300, 60-min Zoom
4. **L3 card** — "Full Appeal Support" $1,000+, by DM only ("we only take cases we can win — DM to discuss fit")
5. **Disclaimer block** — "We analyze patterns from real cases. We are not lawyers. Always consult licensed counsel for legal questions."
6. **No ghostwriting** — Explicit: "We do not write papers, essays, or coursework on your behalf. If that's what you need, we are not the right fit."

### /about

1. **Mission** — Why we exist, what we believe about academic appeals
2. **Faceless explanation** — Why no individual name/face (research team, anonymity protects clients)
3. **What we are not** — Lawyer, individual influencer, teacher
4. **Parent brand** — Link to xueyouxingtu.com (Chinese sister brand) for transparency

### /contact

1. **Three channels** — X DM / IG DM / Email
2. **Response promise** — 24h on weekdays
3. **DM template** — Show the 5 case-fit questions so people can pre-answer

## 6. SEO Architecture

| Element | Implementation |
|---|---|
| Per-route `<title>` + `<meta description>` | react-helmet-async with one `<SEO>` component per page |
| Open Graph + Twitter Card | Default OG image at `/og-default.png`; per-page override possible |
| JSON-LD | `Organization` schema on every page; `FAQPage` on `/`; `Service` on `/services` |
| Static HTML | `vite-plugin-prerender-spa` emits `dist/<route>/index.html` for every route in router |
| sitemap.xml | Generated at build via small Node script reading the routes array |
| robots.txt | Allows all, references sitemap |
| canonical URLs | Per-page `<link rel="canonical">` |
| Semantic HTML | `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>` — no `<div>` soup |
| Performance | Tailwind purge, Vite code-split, no large client libs beyond framer-motion (~30KB gzip) |

## 7. Out of Scope (W1)

- Real case studies content (waiting on user to drop cases into `cases/_inbox/`)
- Lead-magnet PDFs (W2-3 deliverable per Section 5.2 of master spec)
- Email signup → Kit API integration (use mailto: placeholder; integrate when Kit Forms are ready)
- Cal.com booking embed (user deferred to M6)
- i18n (English only by spec)
- Blog
- Search

## 8. Acceptance Criteria

- [ ] `npm run dev` opens at `localhost:5173` and all 6 routes render
- [ ] `npm run build` succeeds and emits `dist/<route>/index.html` for every route (pre-rendered)
- [ ] View-source on any built page shows the page's headline text in HTML (not just `<div id="root">`)
- [ ] Lighthouse SEO ≥ 95 on built pages served via `npm run preview`
- [ ] No console errors in browser
- [ ] All copy compliant with §1 legal guardrails (no "lawyer", no "guaranteed", no "we write your paper")
- [ ] All 6 pages mobile-responsive at 375px width
