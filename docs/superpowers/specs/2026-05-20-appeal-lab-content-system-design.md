# ScholarGuard Path — Content System Design Spec

**Date:** 2026-05-20
**Status:** Design locked, pending Week 1 implementation plan
**Owner:** 1-person team (China-based, faceless operator)
**Time budget:** 3-5 h/week steady state (W1-2 ramp: ~7 h/week)
**Money budget:** $0-30/month

---

## Executive Summary

ScholarGuard Path is a faceless brand publishing anonymized US/UK academic appeal case breakdowns on X and Instagram, with a 3-tier paid service ladder fed by a free lead magnet → email nurture funnel. The system is designed to consume real client cases (the operator's moat), produce 10 posts/week across two platforms via a 50-min-per-case dual-format workflow, and convert via low-friction email + DM channels to $99-$1000+ paid offers.

**Hard constraints driving every decision:**
- No face / no voice (faceless brand)
- One operator, 3-5 h/week steady state
- $0-30/mo total cost
- China-based, English-fluent in writing
- Ghostwriting line never goes public — DM-only, kept legally separate from appeal/tutoring
- No "guaranteed wins," no fake reviews, no lawyer/ex-official AI personas

**Three months to first revenue. Twelve months to $1-2k/mo target.**

---

## Section 1: Brand Positioning

### Identity

| Field | Value |
|---|---|
| Brand | ScholarGuard Path |
| Tagline | "We break down real US & UK academic cases — appeals, study, and what actually works." |
| Voice | Faceless tool-brand. "We" / "the lab." No personal IP. No individual author. |
| Position | Case-analysis research team. **Not** a lawyer, **not** an individual influencer, **not** a teacher. |
| Target audience | Native English-speaking US and UK university students (undergrad + grad) |
| Out of scope | Overseas Chinese students in Western universities (that market uses Xiaohongshu — handled separately) |

### Visual System

- **Primary colors:** Deep blue + cream/off-white + accent yellow
- **Type:** Playfair or Lora serif for headlines; Inter sans-serif for body
- **Domain:** scholarguardpath.com (to be purchased)
- **Handles:** @scholarguardpath on X (rename from @RuizheYuan15453), @scholarguardpath on IG (rename from @appeal_lab)

### Legal Guardrails (absolute, non-negotiable)

1. Never imply legal advice. Always note: "We analyze patterns from real cases. Always consult licensed counsel for legal questions."
2. Never promise outcomes. Use "outcome data" language, not "guaranteed."
3. No fake testimonials, photoshopped reviews, or invented personas. (FTC $51k/violation; UK CMA equivalent.)
4. No public listing of ghostwriting service. DM/word-of-mouth only.
5. No AI-generated faces or fabricated credentials.
6. Disclose nothing identifying about real clients. Anonymization is mandatory: scrub school name, dates, course, demographic details before any case becomes content.

---

## Section 2: Content Pillars

### Six Pillars + Front-loaded Mix (Appeal + Tutoring Tracks, ~50/50)

| # | Pillar | Track | Steady % | Phase 1 % (Months 1-3) |
|---|---|---|---:|---:|
| P1 | Academic Misconduct + **AI Detection Defense** ⭐ | Appeal | 25% | **35%** (trend-riding) |
| P2 | Failing Grades / Academic Standing / EC (UK) | Appeal | 15% | 10% |
| P3 | Study Strategy & Time Management | Tutoring | 20% | 18% |
| P4 | Essay & Writing Process (legitimate help, **NOT** ghostwriting) | Tutoring | 20% | 17% |
| P5 | Exam Prep & Subject Recovery | Tutoring | 15% | 15% |
| P6 | Process & Templates (lead-magnet pillar — covers both tracks) | Cross | 5% | 5% |

**Track totals (steady state):** Appeal 40% (P1+P2) / Tutoring 55% (P3+P4+P5) / Cross 5% (P6). The slight tutoring tilt is intentional: tutoring content is less polarizing → more shareable → grows top-of-funnel faster.

**Phase 1 emphasis (Months 1-3):** P1 absorbs the AI Detection wave (formerly its own pillar) at 35% for trend-riding launch. We have 20+ real AI-flag cases in the library — enough to sustain ~5 P1 posts/week × 12 weeks without recycling.

**⚠ Provisional weights — refine after first 4 weeks of metrics. The 50/50 split is the strategic intent; pillar specifics may shift based on which performs.**

### Content Formula: C-S-O

**Every post follows Case → Structure → Outcome.**

```
[🇺🇸 or 🇬🇧 or 🇺🇸🇬🇧] [Pillar] - [Hook line, ≤120 chars]

CASE:
- Student: [generic, e.g. "STEM major at R1 university"]
- Allegation: [what they were accused of]
- Evidence stage: [Turnitin / GPTZero / faculty report / etc]

STRUCTURE (what worked):
- [Move 1]
- [Move 2]
- [Move 3]

OUTCOME:
- [Result, anonymized timeline]
- [Generalizable lesson]

CTA: [Lead magnet / Book a call / Follow]
```

### Format Priority

1. Anonymous Case Breakdown (IG carousel + X thread) — primary
2. Letter Snippet + Annotation (single image) — secondary
3. Stat/Data Visualization (gemini-infographic skill) — secondary
4. Mistake to Avoid (thread or carousel) — secondary

### Jurisdiction Labeling Rules

- 🇺🇸 / 🇬🇧 / 🇺🇸🇬🇧 emoji: **mandatory** in hook line and IG carousel cover slide
- `#USAcademicAppeal` / `#UKAcademicAppeal` hashtag: **mandatory on X** (algorithm discovery), **optional on IG** (IG hashtag weight has declined)
- "US student" / "UK student" in body copy: natural, not forced

### Publishing Cadence (per Section 3 ramp)

- W1-2: 6 posts/week (3 X + 3 IG)
- W3-4: 8 posts/week (4 X + 4 IG)
- W5+: 10 posts/week (5 X + 5 IG)

---

## Section 3: Platform Strategy

### 3.1 Dual-Format Workflow (50 min per case)

**One case → one C-S-O master draft → two platform formats.** Edit the master once, both formats update.

| Step | Time | Output |
|---|---|---|
| 1. Case selection + anonymization | 10 min | Case card (violation type / evidence stage / structure / outcome / jurisdiction) |
| 2. C-S-O master draft | 15 min | 4-6 bullets covering Case, Structure, Outcome |
| 3a. X thread | 10 min | 1 hook tweet + 5-7 follow-ups + 1 CTA, each ≤280 chars |
| 3b. IG carousel | 15 min | 8-9 slides, Canva template text-swap |
| 4. Buffer scheduling via API | 5 min | Both platforms |

**Critical: Step 2 is the atomic unit. Steps 3a/3b derive from it. Never write the two formats independently from scratch.**

### 3.2 Posting Time Windows (channel TZ = America/New_York)

**Target audience activity:**
- US East students: 12pm-2pm ET + 8pm-11pm ET
- UK students: 10am-12pm GMT + 7pm-10pm GMT
- Dual-jurisdiction sweet spot: **9am ET = 2pm GMT** (catches UK afternoon + US morning)

**Ramped schedule:**

| Week | Posts/wk | X slots (ET) | IG slots (ET) |
|---|---|---|---|
| W1-2 | 6 | Mon 9am / Wed 8pm / Fri 12pm | Tue 9am / Thu 8pm / Sat 12pm |
| W3-4 | 8 | + Sun 2pm (UK 7pm GMT) | + Sun 10am |
| W5+ | 10 | + Tue 12pm | + Wed 8pm |

**Why X and IG stagger same-case posts by 24h:** avoids "same content, same minute" deduplication on either platform's algorithm; lets us measure engagement on each platform independently.

### 3.3 Engagement Strategy (30 min/week budget)

**Split: 15 min Tuesday + 15 min Friday.**

| Comment type | Response | Template core |
|---|---|---|
| "Did this actually work?" | Public reply + DM invite | "Yes, ~70% of similar cases succeed with this structure. DM for case-fit questions." |
| Specific case shared | Reply within 24h, move to DM | "Sounds like a [type] case. DM us — we'll send 5 questions to assess fit." |
| Lawyer / scope challenge | Acknowledge limits politely | "We analyze patterns from real cases, not legal advice. Always consult licensed counsel for legal questions." |
| Ghostwriting probe (red flag) | Decline, redirect | "We focus on appeal & tutoring — happy to help if that fits." |
| Generic thanks / praise | 1 emoji + 1 short thanks | (no expansion) |

**DM templates:**

**Template A — New lead, vague inquiry → send case-fit questions**
```
Hey — thanks for reaching out. To see if we can help, could you share:
1. Country & university type (no names needed)
2. Allegation or issue
3. Stage (formal hearing? letter response? appeal?)
4. Deadline
5. Evidence you've been shown

We'll reply within 24h with whether/how we can help.
```

**Template B — Specific case described → direction + paid offer**
```
Thanks for the detail. This looks like a [type] case. The structure that
works here is usually:
- [Move 1 from case library]
- [Move 2]

If you want a full letter review ($99) or 1-on-1 consultation ($300),
reply "letter" or "call" and we'll send the link.
```

**Template C — Ghostwriting request (red line) → decline + redirect**
```
We don't write papers — that crosses academic integrity lines and we'd
be the wrong fit. But if you need help understanding feedback, structuring
revisions, or appealing a low grade, we do tutoring & appeal work.
Want me to share more?
```

### 3.4 Scheduling Infrastructure: Buffer Free + GraphQL API

**Decision: keep Buffer Free, automate via GraphQL API.**

Buffer GraphQL endpoint: `https://api.buffer.com/graphql`
Auth: `Authorization: Bearer <access_token>` (stored in `.env`, gitignored)
Available mutations: `createPost`, `editPost`, `deletePost`, `createIdea`

**Connected channels (verified via API):**
- X: `id=6a0d5d7d090476fb993c740f`, handle pending rename to @scholarguardpath
- IG: `id=6a0d5dad090476fb993c752b`, handle @scholarguardpath, type=business (allows direct publishing)

**Buffer Free limit:** 10 scheduled posts/channel. Workaround: weekly Sunday batch refill (5 posts/channel/week = within limit at all times).

**Channel timezone:** must be set to America/New_York in Buffer dashboard (API does not expose timezone mutation). One-time manual config step.

---

## Section 4: Funnel Architecture

### 4.1 Website (scholarguardpath.com)

**Stack:** Astro static site → Cloudflare Pages (free tier).

```
scholarguardpath.com/
├── /                  Homepage (hero + email capture + recent cases grid)
├── /case-studies      Anonymized case archive (manual weekly copy of top 1-2 posts)
├── /templates         Lead-magnet landing pages (email gate)
├── /services          3-tier paid offers
└── /book              Cal.com embed for L2 30-min strategy call
```

**Homepage copy skeleton:**

```
[Hero]
"We break down real US & UK academic cases —
 appeals, study, and what actually works."

[Primary CTA] Get the AI Detection Defense Kit (free) →

[Three trust pillars]
🇺🇸🇬🇧 We've analyzed 50+ cases across US and UK universities
📄 Real letter structures (anonymized)
📊 Outcome data — not promises

[Recent case studies grid: 6 cards from /case-studies]

[Secondary CTA] Browse all case breakdowns →

[FAQ]
- Are you lawyers? No — we analyze patterns from real cases.
  For legal questions, consult licensed counsel.
- Where are you based? We're a research team analyzing US & UK
  academic appeal patterns.
- What's your success rate? See /case-studies for outcome data.

[Footer CTA] Book a 30-min appeal strategy call →
```

### 4.2 Lead Magnets

**LM-A: AI Detection Defense Kit** (primary, P2 pillar)

- Format: 12-15 page PDF
- Contents:
  1. Known false-positive patterns in Turnitin / GPTZero / Copyleaks
  2. Three real AI-flag cases, anonymized breakdown
  3. Response letter template (fillable)
  4. "5 questions to ask your professor" checklist
- Trigger: P2 posts CTA + homepage CTA
- Build tool: Canva PDF template (editable)

**LM-B: Appeal Letter Template Pack** (secondary, P1/P3/P4 pillars)

- Format: 8-10 page PDF + 3 .docx templates
- Contents:
  1. US misconduct appeal letter structure
  2. UK extenuating circumstances application structure
  3. Failing-grade / academic-standing appeal path
- Trigger: P1/P3/P4 posts CTA
- Build tool: Canva PDF + Google Docs templates

### 4.3 Email Nurture (ConvertKit Free)

**5 emails over 2 weeks after lead-magnet download.**

| Day | Subject | Content | CTA |
|---|---|---|---|
| 0 | Your AI Detection Kit (delivered) | PDF link + faceless brand intro | Follow X / IG |
| 2 | The single biggest mistake in AI defense letters | One real case error + correct approach | Read /case-studies |
| 5 | "But Turnitin said 89% AI..." — what that number actually means | Data demystification | Follow / DM |
| 9 | The 4-stage US academic misconduct process (and what to do at each) | Process diagram + timeline | See /services |
| 14 | Want us to review your letter? — $99 letter review | Soft-pitch L1 offer | /services or /book |

**Tone rules:** no urgency hacks, no fake scarcity, no "limited spots." Last email softly introduces the $99 letter review — low-friction first paid offer.

### 4.4 Pricing Ladder

| Tier | Price | Delivery | Description | Source |
|---|---|---|---|---|
| **L1 — Letter Review** | $99 | Async, 48h | Operator reviews user-drafted appeal letter / personal statement with line-by-line annotations and revision suggestions | Email Day 14 + DM CTA |
| **L2 — Strategy Consultation** | $300 | 60-min Zoom + 1 week async follow-up | 1-on-1 case analysis, structure recommendations, letter outline | Homepage /book + L1 upsell |
| **L3 — Full Appeal Support** | $1,000+ | 2-4 weeks, multi-touch | Full appeal letter drafting, hearing prep, follow-up correspondence | DM only, L2 upsell |

**Payment:** Stripe Payment Links (2.9% + $0.30/transaction, no monthly fee).
**Scheduling:** Cal.com Free (connects to Google Calendar).
**Delivery:** Google Docs share + Zoom.

**Product description guardrail:** L3 explicitly excludes academic coursework — phrase as "We draft appeal correspondence — not academic coursework." Keeps the ghostwriting line legally and operationally separate.

### 4.5 Funnel Diagram

```
[X / IG posts with CTA]
        ↓
[/templates page — email gate]
        ↓
[ConvertKit 5-email nurture / 2 weeks]
        ↓
        ├──→ [L1 $99 letter review] ──┐
        ↓                              ↓
[/book — 30-min discovery call]        │
        ↓                              ↓
[L2 $300 consultation] ←───────────────┘
        ↓
[L3 $1000+ full appeal support]
```

---

## Section 5: Tool Stack & Launch Phasing

### 5.1 Final Tool Stack

| Category | Tool | Monthly Cost | Upgrade Trigger |
|---|---|---|---|
| Content generation | Claude Code + social-media-skills + humanizer | $0 | — |
| Scheduling | Buffer Free + GraphQL API | $0 | Multi-org / analytics need (likely never) |
| Design | Canva Free | $0 | Month 3+ heavy carousel volume → Canva Pro $15/mo |
| Image generation | gemini-infographic / gemini-carousel via Gemini API | $0 (free tier) | Exceed free quota → ~$5/mo |
| Email | ConvertKit Free | $0 (within 1k subs) | Cross 1k subs → Creator $15/mo |
| Booking | Cal.com Free | $0 | — |
| Payments | Stripe Payment Links | 2.9% + $0.30/transaction | — |
| Website | Cloudflare Pages + Astro static | $0 | — |
| Domain | scholarguardpath.com via Namecheap/Cloudflare Registrar | $1/mo (~$12/year) | — |
| Content calendar | `.md` files in project repo, Claude Code-maintained | $0 | If visual calendar becomes essential → Notion Free |

**Steady-state monthly cost: $1-5** (domain + occasional Gemini overage) + Stripe % on revenue.

### 5.2 Three-Phase Launch Plan

#### 🟢 Phase 1 — Months 1-3: Build inventory + AI Detection wave

**Targets:**
- Posts: 6/wk → 8/wk → 10/wk (ramped per Section 3)
- Total output: ~100 posts, ~30 cases consumed
- Followers: 200-500 per platform (400-1k combined)
- Email subs: 50-200
- **Revenue: $0** (no paid offer until Month 4)
- Time: 5-7 h/wk (Week 1 setup may hit 10h)

**Milestones:**

| Week | Tasks |
|---|---|
| **W1** | X rename @scholarguardpath + Buffer reconnect; Buffer TZ → America/New_York; register ConvertKit, Cal.com; buy domain; run voice-builder for ScholarGuard Path voice doc; prep 10 anonymized cases |
| **W2** | Deploy v0.1 homepage (hero + email capture only); Canva template set for X thread + IG carousel; first case dual-output produced; 6 posts published |
| **W3-4** | Ramp to 8 posts/wk; LM-A "AI Detection Defense Kit" PDF completed; /templates page live |
| **M2** | 10 posts/wk steady state; /case-studies page live (weekly manual archive of top 1-2 posts); review top 3 posts to lock templates |
| **M3** | LM-B "Letter Template Pack" completed; 5-email nurture sequence written and live; prep M4 paid-offer launch |

#### 🟡 Phase 2 — Months 4-6: First revenue + iterate

**Targets:**
- Posts: 10/wk steady
- Followers: 1k+ per platform (2k+ combined)
- Email subs: 300-500
- **First revenue:** 1-3 L1 sales in Month 4; ~$300-500/mo by Month 6
- Time: drops to **4-5 h/wk** (templates locked, library grown)

**Milestones:**

| Month | Tasks |
|---|---|
| **M4** | /services page live; L1 $99 letter review available; Stripe Payment Link connected; first batch of nurture-complete leads receives offer email |
| **M5** | Review M1-4 metrics: top-converting pillar, top hook formats, email open rates, top DM templates → adjust content mix |
| **M6** | L2 $300 strategy consultation live; Cal.com 30-min discovery call funnel connected; first L2 expected |

#### 🔵 Phase 3 — Months 6-12: Stabilize + scale decisions

**Targets:**
- Followers: 5k+ per platform (10k+ combined)
- Email subs: **1k+** (triggers ConvertKit upgrade)
- Monthly customers: ~5 L1 + ~2 L2 + occasional L3
- **Revenue: $1k-2k/mo by Month 12**
- Time: 4-5 h/wk, or 2-3 h/wk if VA hired

**Milestones:**

| Month | Tasks |
|---|---|
| **M7-8** | ConvertKit upgrade to Creator $15/mo; L3 selectively offered via DM only; second-platform expansion review |
| **M9-10** | Decision point: (A) second-platform extension (Reddit / Quora / Substack), or (B) hire VA $200-400/mo for scheduling + tier-1 DM responses |
| **M11-12** | Annual review; paid-ad pilot decision ($50/platform test); weekly newsletter digest decision |

### 5.3 KPI Tracking (Minimum Viable)

**Weekly 15-min review (.md file in repo):**

```
Week of YYYY-MM-DD

Posts:
  X: 5 posted (target 5)
  IG: 5 posted (target 5)

Top performer:
  Post URL: ___
  Impressions: ___
  Engagement: ___

Funnel:
  Email signups: ___
  DMs received: ___
  Bookings: ___

Revenue: $___
```

**Monthly 30-min review:**
- Pillar weighting vs actual engagement share (data-driven adjustment)
- Top 5 posts: shared hook / format / jurisdiction patterns
- Bottom 5 posts: patterns to avoid

### 5.4 Investment Decision Tree

```
Trigger?
├─ Hours > 5/wk sustained 4 weeks → Hire VA $200-400/mo (Month 9+)
├─ Revenue > $1k/mo sustained 3 months → Paid ads pilot $50-100/mo (Month 9+)
├─ ConvertKit subs > 1k → Upgrade to Creator $15/mo (auto, Month 7+)
├─ Canva blocking productivity (>20 min/post for design) → Canva Pro $15/mo + brand kit build
└─ None of the above → Maintain $1-5/mo minimal stack
```

### 5.5 Kill Conditions / Pivot Triggers

**Month 3 check:**
- Combined followers < 200 → angle issue, not execution. Rethink pillar mix or take more polarizing AI-detection stances.
- Email subs < 30 → lead-magnet weak or CTA too soft. Rebuild landing copy + add stronger CTA hook.

**Month 6 check:**
- Email subs > 500 but no paid sales → funnel leak. Audit email sequence + L1 pricing + DM templates + product page clarity.
- Followers 1k+ but email subs < 100 → CTA not converting, or audience-magnet mismatch.

**Month 9 check:**
- Revenue < $300/mo → major strategy review. Consider (A) abandoning weaker platform, (B) niche-cut pivot (e.g. UK-EC only).
- Revenue $500-1500/mo stable → scale working layer (VA + ads + second platform).

**Month 12 decision:**
- Revenue < $500/mo → continue / pivot / shutdown evaluation.
- Revenue $1-3k/mo → healthy path, scale.
- Revenue $3k+/mo → full-time consideration window.

### 5.6 Steady-State Weekly Workflow (Operator ↔ Claude)

**Operator → Claude (every Sunday):**
- 5 case IDs or descriptions for the upcoming week
- Previous week's top + bottom posts (URLs)

**Claude → Operator (every Sunday):**
- 5 cases' X thread + IG carousel copy (humanizer-processed)
- 5 IG carousel image sets (gemini-infographic / gemini-carousel)
- Buffer queue populated via API (operator confirms time slots)
- Data-driven recommendations based on previous week's metrics

**Operator's weekly time budget:**
- Case selection + brief: 20 min
- Copy review + sign-off: 60 min
- Image review + feedback: 30 min
- Engagement (Tue + Fri 15 min each): 30 min
- KPI review: 15 min
- **Total: ~2.5-3 h/week steady state**

---

## Pre-Launch Checklist (Operator Actions, Week 1)

- [ ] Rename X handle: @RuizheYuan15453 → @scholarguardpath (https://twitter.com/settings/screen_name)
- [ ] Buffer dashboard: disconnect + reconnect X channel after rename to refresh cached handle
- [ ] Buffer dashboard: change both channel timezones to America/New_York
- [ ] Buffer access token in `.env` (already done, but rotate after this session for safety)
- [ ] Get Google AI Studio key for Gemini API (https://aistudio.google.com/apikey) → add to `.env` as `GEMINI_API_KEY` (needed for gemini-carousel / gemini-infographic image generation)
- [ ] Register ConvertKit Free account
- [ ] Register Cal.com Free account, connect Google Calendar
- [ ] Purchase scholarguardpath.com (Namecheap or Cloudflare Registrar)
- [ ] Confirm IG @scholarguardpath is set to Business account type (already verified via API)
- [ ] Anonymize first 10 case files for content pipeline

---

## Appendix: Standards & Templates

### C-S-O Master Template (per case, copy this)

```
[🇺🇸/🇬🇧/🇺🇸🇬🇧] [Pillar number + name] - [Hook ≤120 chars]

CASE:
- Student: [generic descriptor — no names, no dates]
- Allegation: [violation type]
- Evidence stage: [what triggered the case]

STRUCTURE (what worked):
- [Move 1]
- [Move 2]
- [Move 3]

OUTCOME:
- [Anonymized result]
- [Generalizable lesson]

CTA: [LM-A | LM-B | /book | follow]
```

### File Naming Conventions

- Cases: `cases/CASE-{YYYYMMDD}-{pillar}-{jurisdiction}.md`
- Posts: `posts/{YYYYMMDD}-{platform}-{pillar}-{slug}.md`
- Lead magnets: `lead-magnets/LM-{A|B}-{slug}/`
- Weekly KPI: `kpi/week-{YYYY-MM-DD}.md`

### Anonymization Checklist (every case)

- [ ] No school name (use "R1 university", "Russell Group university", "Ivy League", etc.)
- [ ] No course code or course name
- [ ] No specific dates (use "Fall semester", "Spring term", relative timing)
- [ ] No demographic identifiers beyond what's pedagogically necessary
- [ ] No professor names or office references
- [ ] No quoted text from the case file longer than 1 sentence

---

## Open Questions / Deferred Decisions

1. **Sustained ghostwriting demand handling:** If DM inbound for ghostwriting becomes significant (>5/week), revisit whether to formalize a sister brand or maintain strict redirect. Decision deferred to Month 4 data review.
2. **TikTok:** Explicitly out of scope per current plan. Revisit only if Phase 3 metrics suggest the operator wants a video presence (which would require breaking the faceless constraint).
3. **Xiaohongshu / overseas Chinese student segment:** Out of scope for ScholarGuard Path. Handled in a separate plan if pursued.
4. **Affiliate / partnership channels:** Out of scope until Month 9+, revisit if revenue stabilizes above $1k/mo.

---

## Sign-off

Design locked 2026-05-20. Implementation plan to be generated via `superpowers:writing-plans` skill in the next session.
