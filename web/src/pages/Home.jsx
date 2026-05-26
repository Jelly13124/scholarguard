import { motion } from 'framer-motion';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import CTAButton from '../components/CTAButton.jsx';
import Card, { CardTag } from '../components/Card.jsx';
import FAQ from '../components/FAQ.jsx';
import EmailCapture from '../components/EmailCapture.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
  }),
};

const trustPillars = [
  {
    flag: '🇺🇸 🇬🇧',
    title: 'Cases across two jurisdictions',
    body: 'We analyze appeals from US R1 universities and UK Russell Group institutions. Different processes, similar patterns.',
  },
  {
    flag: '📄',
    title: 'Real letter structures',
    body: 'Every breakdown shows the actual move set that worked — not generic templates, not legal boilerplate.',
  },
  {
    flag: '📊',
    title: 'Outcome data, not promises',
    body: 'We publish what happened, including the cases that did not go the way the student wanted. Patterns over pitches.',
  },
];

const upcomingCases = [
  {
    flag: '🇺🇸',
    pillar: 'P1 · Misconduct',
    title: 'AI flag at 47% — what the appeal actually argued',
    blurb: 'STEM major, R1 public flagship. Turnitin flagged a midterm essay. The successful response did not attack the detector.',
    status: 'Drops Week 1',
  },
  {
    flag: '🇬🇧',
    pillar: 'P2 · Standing',
    title: 'Extenuating circumstances under a 5-day deadline',
    blurb: 'Russell Group postgrad. Mental health documentation submitted late. How the late submission was framed.',
    status: 'Drops Week 2',
  },
  {
    flag: '🇺🇸🇬🇧',
    pillar: 'P4 · Writing',
    title: 'The Grammarly trap — why polished writing gets flagged',
    blurb: 'Three students, three universities, same pattern. Heavy editor use → flagged for AI. What the letter explained instead.',
    status: 'Drops Week 3',
  },
];

const faqItems = [
  {
    q: 'Are you lawyers?',
    a: (
      <p>
        No. We are a research team that analyzes patterns from real anonymized
        academic appeal cases. For legal questions about your specific case,
        please consult licensed counsel in your jurisdiction.
      </p>
    ),
  },
  {
    q: 'Where are you based?',
    a: (
      <p>
        We are a faceless research team. Our work analyzes US and UK university
        appeal processes — that is where our case data comes from. We publish
        anonymously to protect every student in our case library.
      </p>
    ),
  },
  {
    q: 'What is your success rate?',
    a: (
      <p>
        We do not quote a single number. Outcomes depend on jurisdiction,
        violation type, evidence stage, and how early the student engages. Our{' '}
        <a href="/case-studies" className="link-underline text-brass-deep">
          case studies
        </a>{' '}
        publish outcome data per case, including the ones that did not succeed.
      </p>
    ),
  },
  {
    q: 'Do you write essays or coursework?',
    a: (
      <p>
        No. We do not write papers, essays, or coursework on a student's behalf.
        Our scope is appeal letters, tutoring, and study structure. If you are
        looking for someone to do your academic work, we are not the right fit.
      </p>
    ),
  },
];

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text:
        typeof item.a === 'string'
          ? item.a
          : 'See website for full answer.',
    },
  })),
};

export default function Home() {
  return (
    <>
      <SEO
        title="US & UK academic case breakdowns"
        description="The ScholarGuard publishes anonymized US and UK academic appeal case breakdowns. Real letter structures, outcome data, study strategy."
        path="/"
        jsonLd={homeJsonLd}
      />

      {/* HERO */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        <div className="container-prose">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-xs uppercase tracking-wider text-brass-deep font-medium mb-8"
          >
            🇺🇸 🇬🇧 &nbsp; A research project on academic appeals
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95] max-w-5xl text-balance"
          >
            We break down{' '}
            <span
              className="italic text-brass-deep"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}
            >
              real
            </span>{' '}
            US and UK academic cases —
            <br className="hidden md:block" />
            appeals, study, and what actually works.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-10 max-w-2xl text-lg text-ink-soft leading-relaxed"
          >
            Anonymized case analysis from a growing library of US R1 and UK Russell
            Group academic appeals. We publish the move sets that worked, the
            patterns to avoid, and the outcome data — not promises.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-12 flex flex-col sm:flex-row gap-5"
          >
            <CTAButton to="/resources" variant="primary">
              Get the AI Detection Defense Kit
            </CTAButton>
            <CTAButton to="/case-studies" variant="secondary">
              Browse case studies
            </CTAButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-16 flex items-baseline gap-8 text-stone"
          >
            <p className="text-sm">
              <span className="display-numeral text-3xl mr-2">50+</span>
              cases analyzed
            </p>
            <p className="text-sm">
              <span className="display-numeral text-3xl mr-2">2</span>
              jurisdictions
            </p>
            <p className="text-sm">
              <span className="display-numeral text-3xl mr-2">$0</span>
              for the kit
            </p>
          </motion.div>
        </div>

        {/* Decorative side ornaments */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-0 w-64 h-px bg-gradient-to-l from-brass/40 to-transparent hidden lg:block"
        />
      </section>

      {/* TRUST PILLARS */}
      <Section tone="soft" bordered>
        <Eyebrow>What you'll find here</Eyebrow>
        <h2 className="text-balance max-w-4xl mb-16">
          A small archive, growing every week, of how academic appeals actually
          play out.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustPillars.map((pillar, i) => (
            <Card key={i}>
              <p className="text-3xl mb-6">{pillar.flag}</p>
              <h3 className="mb-4 font-display text-2xl tracking-tighter">
                {pillar.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES PREVIEW */}
      <Section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Eyebrow>Coming this month</Eyebrow>
            <h2 className="text-balance max-w-3xl">
              First cases drop weekly. Subscribe to know when each one publishes.
            </h2>
          </div>
          <CTAButton to="/case-studies" variant="ghost">
            See the full archive plan
          </CTAButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingCases.map((c, i) => (
            <Card key={i} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl">{c.flag}</span>
                <CardTag>{c.status}</CardTag>
              </div>
              <p className="text-xs uppercase tracking-wider text-brass-deep mb-3">
                {c.pillar}
              </p>
              <h3 className="font-display text-xl md:text-2xl tracking-tighter leading-snug mb-4">
                {c.title}
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">{c.blurb}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* WHAT WE DO / DON'T */}
      <Section tone="ink">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <Eyebrow className="text-brass">What we do</Eyebrow>
            <h2 className="text-cream mb-10">Tutoring, appeal analysis, letter structure.</h2>
            <ul className="space-y-5">
              {[
                'Anonymized case breakdowns published on X and Instagram',
                'Free guides built from patterns in our case library',
                'Async letter review at $99 — line-by-line annotations',
                '1-on-1 strategy consultation at $300 — full case analysis',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-cream/80">
                  <span className="text-brass mt-1">→</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow className="text-stone-light">What we don't</Eyebrow>
            <h2 className="text-cream/60 mb-10 font-display italic" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}>
              Three things we are not.
            </h2>
            <ul className="space-y-5">
              {[
                'We are not a law firm. We do not provide legal advice.',
                'We do not guarantee outcomes. We publish data, not promises.',
                'We do not write essays, papers, or coursework. Ever.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-cream/60">
                  <span className="text-stone-light mt-1">✕</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="max-w-3xl">
          <Eyebrow>Questions we get</Eyebrow>
          <h2 className="mb-16 text-balance">Before you reach out.</h2>
          <FAQ items={faqItems} />
        </div>
      </Section>

      {/* EMAIL CAPTURE FOOTER */}
      <Section tone="soft" bordered>
        <div className="max-w-3xl">
          <Eyebrow>Stay in the loop</Eyebrow>
          <h2 className="mb-8 text-balance">
            When a new case drops, get a one-line summary in your inbox.
          </h2>
          <p className="text-ink-soft mb-10 leading-relaxed max-w-prose-wide">
            No daily digest, no funnels, no nonsense. One short email per case,
            with the jurisdiction, the pattern, and a link to the full breakdown.
          </p>
          <EmailCapture
            label="Subscribe to case alerts"
            buttonText="Subscribe"
          />
        </div>
      </Section>
    </>
  );
}
