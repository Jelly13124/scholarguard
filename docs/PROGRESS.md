# The ScholarGuard — Progress & TODO

**Last updated:** 2026-05-26
**Owner:** 1-person team (China-based, faceless)
**Phase:** W1 of Phase 1 (Months 1-3 build inventory)

---

## TL;DR

| Track | Status |
|---|---|
| **Brand identity** | ✅ Locked: The ScholarGuard, faceless |
| **Spec** | ✅ Locked: [content-system-design](superpowers/specs/2026-05-20-appeal-lab-content-system-design.md) |
| **Python / Buffer pipeline** | ✅ Code complete, awaiting first case material |
| **Marketing website** | ✅ Built + committed + pushed to GH; ⏳ awaiting Cloudflare Pages deploy |
| **Deployment** | 🟡 In progress — GH repo up, Cloudflare Pages setup pending |
| **Domain** | 🔴 Blocked — `thescholarguard.com` not purchased |
| **Operational accounts** | 🟡 Mostly done; X rename + Buffer TZ pending |
| **Case library** | ⏳ Awaiting first raw case drops |
| **First post published** | ⏳ Blocked on Buffer TZ + X rename + case library |

---

## Key URLs / Refs

| Resource | URL / Path |
|---|---|
| GitHub repo | https://github.com/Jelly13124/scholarguard |
| Web spec | [web/SPEC.md](../web/SPEC.md) |
| Web plan | [web/PLAN.md](../web/PLAN.md) |
| Master spec | [docs/superpowers/specs/2026-05-20-appeal-lab-content-system-design.md](superpowers/specs/2026-05-20-appeal-lab-content-system-design.md) |
| Case anonymization template | [cases/CASE-TEMPLATE.md](../cases/CASE-TEMPLATE.md) |
| Case inbox workflow | [cases/CASE-INBOX-WORKFLOW.md](../cases/CASE-INBOX-WORKFLOW.md) |
| Local dev preview | http://localhost:5173 (when dev server up) |
| Local prod preview | http://localhost:4173 (after `npm run build && npm run preview`) |
| X handle | **@thescholarguard** ✅ (renamed 2026-05-26; Buffer reconnect still pending) |
| IG handle | @thescholarguard ✅ |
| Buffer org id | `6a0d4b9e08a819e41eacefc1` |
| Buffer X channel id | `6a0d5d7d090476fb993c740f` |
| Buffer IG channel id | `6a0d5dad090476fb993c752b` |

---

## ✅ Done

### Strategy & Spec
- Master content-system design spec (6 sections, ~550 lines)
- W1 implementation plan (16 tasks)
- Brand iterations resolved → **The ScholarGuard** locked
- 6 content pillars defined with Phase 1 weighting (P1 AI Detection at 35%)
- C-S-O content formula
- 50/50 appeal/tutoring track split

### Python / Buffer Pipeline (scripts/, tests/)
- Python 3.13 venv + dependencies
- `BufferConfig` — env-driven config loader (3 tests, TDD)
- `BufferClient` — `create_post` + `delete_post` with corrected Buffer GraphQL schema (PostActionPayload UNION, channelId scalar, mode enum)
- `BufferClient.create_thread` — X threads via `metadata.twitter.thread` (LIST of ThreadedPostInput)
- 6 integration tests against live Buffer API in draft mode
- `.env.example` template (V4 Kit single-token format)
- `cases/CASE-TEMPLATE.md` anonymization template
- `cases/CASE-INBOX-WORKFLOW.md` workflow documentation

### Marketing Site (web/)
- Vite + React 18 + Tailwind v3 scaffold
- Design tokens: cream / ink / brass / forest + Fraunces (display) + DM Sans (body) + paper grain
- Editorial Academic aesthetic
- 6 pages built: Home, Case Studies, Resources, Services, About, Contact (+ 404)
- 9 shared components: Layout, Header, Footer, SEO, CTAButton, Section, Card, FAQ, EmailCapture
- Mobile responsive (hamburger nav at <768px)
- Subtle animations (framer-motion, no bouncing)
- Legal guardrails baked into copy (3 places: no lawyer / no guaranteed / no ghostwriting)
- SEO: react-helmet-async per-route + sitemap.xml + robots.txt + JSON-LD (Organization + FAQPage + Service)
- Real per-route prerendering via Edge headless `--dump-dom` (zero puppeteer dependency)
- OG default image rendered: 1200×630 typographic, brass `|` separator
- `_redirects` for SPA fallback (Cloudflare Pages / Netlify)
- `npm run build` clean (411 modules, JS 337KB / gzip 108KB, CSS 21KB / gzip 5KB)

### Git & GitHub
- 3 commits in this session (latest: `a8d1e57 feat(web,cases): OG default image + case-inbox workflow doc`)
- Remote `origin` configured → https://github.com/Jelly13124/scholarguard
- `master` branch pushed to remote ✅
- Git identity convention: inline `-c` flags (no global config)

### Auxiliary
- Gemini API key verified (50+ models available)
- Kit V4 API key verified (account "The scholarguard")
- IG renamed to @thescholarguard
- First P2 X thread drafted (AI Detection False Positives) — pushed to Buffer draft (stale, needs re-push after X rename)

---

## 🟡 In Progress (this session)

| # | Task | Next step |
|---|---|---|
| W1-#15 | X rename ✅ done 2026-05-26; **Buffer X channel reconnect pending** | Buffer dashboard → X channel → Settings → Connection → Disconnect → Reconnect (re-auths OAuth, picks up new handle) |
| W1-#16 | Buffer 2 channel TZ → America/New_York | User: change in Buffer dashboard, both channels |
| Deploy-1 | Cloudflare Pages setup | User: register/login Cloudflare → create Pages project from GH repo |
| Handoff-1 | Project handoff to Claude Desktop | ✅ `CLAUDE.md` + `docs/PROGRESS.md` committed and pushed |

---

## 🔴 Blocked on user action

### Domain
- [ ] Buy `thescholarguard.com` via Cloudflare Registrar (~$10/yr)
  - Blocks: custom domain on Pages, brand email, professional bio links

### Operational
- [x] ~~X handle rename @RuizheYuan15453 → @thescholarguard~~ ✅ done 2026-05-26
- [ ] Buffer X channel disconnect + reconnect (refresh OAuth cache to pick up new handle)
- [ ] Buffer dashboard: change X channel timezone to America/New_York
- [ ] Buffer dashboard: change IG channel timezone to America/New_York
  - Blocks: scheduled posts being published at intended ET times

### Hosting
- [ ] Cloudflare account (sign up with `ruizheyuan3487@gmail.com`)
- [ ] Cloudflare Pages: connect GitHub `Jelly13124/scholarguard` repo
- [ ] Cloudflare Pages: configure build (`cd web && npm install && npm run build` → `web/dist`)
- [ ] Get `*.pages.dev` URL → put in X / IG bios

### Brand email (after domain purchase)
- [ ] Cloudflare Email Routing: enable
- [ ] Route `hello@thescholarguard.com` → `ruizheyuan3487@gmail.com`
- [ ] Gmail "send-as" setup for the brand address

### Case material (blocks all content production)
- [ ] User drops 10 real cases to `cases/_inbox/`
- [ ] Per [CASE-INBOX-WORKFLOW.md](../cases/CASE-INBOX-WORKFLOW.md)

---

## ⏳ Pending (next 1-4 weeks per spec)

### W1 remaining
- [ ] Anonymize cases 001-003 (W1-#19)
- [ ] Anonymize cases 004-006 (W1-#20)
- [ ] Anonymize cases 007-010 (W1-#21)
- [ ] Voice doc via voice-builder skill (W1-#17)
- [ ] End-to-end smoke test: case → C-S-O → X thread + IG carousel → Buffer schedule (W1-#22)
- [ ] W1 completion + W2 readiness note (W1-#23)
- [ ] First post publish (P2 AI Detection thread, after X rename + reconnect)

### W2 (per spec §5.2)
- [ ] Deploy v0.1 homepage live (after Cloudflare Pages setup)
- [ ] Canva template set: X thread + IG carousel
- [ ] First case dual-output produced (X thread + IG carousel from one case)
- [ ] 6 posts published (3 X + 3 IG)

### W3-W4
- [ ] Ramp to 8 posts/week (4 X + 4 IG)
- [ ] **LM-A: AI Detection Defense Kit** PDF completed
- [ ] `/resources` page goes live with downloadable LM-A
- [ ] Kit V4 API integration in `EmailCapture.jsx` (replace placeholder form)

### M2 (Month 2)
- [ ] 10 posts/week steady state (5 X + 5 IG)
- [ ] `/case-studies` page populated with weekly archive
- [ ] Review top 3 posts → lock templates

### M3
- [ ] **LM-B: Letter Template Pack** completed
- [ ] 5-email nurture sequence written and live in Kit
- [ ] Prep M4 paid-offer launch

---

## ⏭ Deferred (intentionally not doing now)

| Item | Defer to | Reason |
|---|---|---|
| Cal.com booking integration | M6 | User explicitly delayed; using DM CTAs instead |
| Sister Chinese brand i18n | N/A | Out of scope (separate audience on Xiaohongshu) |
| TikTok presence | N/A | Out of scope per spec (breaks faceless constraint) |
| L1 $99 paid offer launch | M4 | Per spec phase 2 |
| L2 $300 strategy consult launch | M6 | Per spec phase 2 |
| L3 $1000+ full appeal support | M6+ | DM-only, M6+ per spec |
| ConvertKit Creator upgrade ($15/mo) | M7+ | Trigger: >1k subs |
| Canva Pro upgrade ($15/mo) | M3+ | Trigger: >20 min/post design time |
| VA hire ($200-400/mo) | M9+ | Trigger: >5h/wk sustained for 4 weeks |
| Paid ads pilot | M9+ | Trigger: >$1k/mo revenue sustained 3 mo |

---

## Known gaps & technical debt

| Gap | Severity | When |
|---|---|---|
| Email capture forms are placeholders (not wired to Kit) | Medium | W2-W3 when LM-A ready |
| First X thread Buffer draft (`6a0ff31a0134cff812e03264`) is stale (pre-rename) | Low | Delete + re-push after X reconnect |
| OG image flags shown as text bar `US \| UK` instead of 🇺🇸 🇬🇧 emojis (Edge headless lacks flag font) | Acceptable | Cosmetic choice; can revisit |
| Cloudflare Pages may fail prerender step (no Edge in build container) | Low | Falls back to SPA gracefully per `process.exit(0)` design |
| `og-default.png` is the OG image source; per-page OG variants not built | Future polish | After first cases published |
| `humanizer` skill not yet applied to any drafted copy | Low | Apply during W2 content workflow |

---

## Money spent / projected

| Item | Status | Cost |
|---|---|---|
| Buffer Free | ✅ Active | $0 |
| Kit Free (<1k subs) | ✅ Active | $0 |
| Gemini API (free tier) | ✅ Active | $0 |
| Domain `thescholarguard.com` | 🔴 To buy | ~$10/yr |
| Cloudflare Pages | ⏳ Setup pending | $0 |
| Cloudflare Email Routing | ⏳ After domain | $0 |
| **Total projected first 12 months** | — | **~$10-30** |

---

## Conversation breadcrumbs

- 4 brand renames before landing on "The ScholarGuard"
- Buffer GraphQL schema discovered via introspection (PostActionPayload UNION, DeletePostPayload UNION, ThreadedPostInput LIST)
- Aesthetic deviated from spec (Inter → DM Sans + Playfair → Fraunces) — validated by user "卧槽你这做的可以啊"
- Edge headless `--dump-dom` chosen over puppeteer for prerender (zero 150MB Chromium download)
- Git identity convention established: inline `-c user.email -c user.name` per commit; no global config

---

## Next pickup point

**Right now:** waiting on user to either:
1. Try X rename again at https://x.com/settings/screen_name
2. Change Buffer TZ for both channels
3. Sign up Cloudflare → create Pages project from GH repo

**When user comes back:** ask which they did, what blocked, then unblock with API verification or guidance.
