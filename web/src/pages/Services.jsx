import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import CTAButton from '../components/CTAButton.jsx';

const tiers = [
  {
    code: 'L1',
    name: 'Letter Review',
    price: '$99',
    cadence: 'Async · 48-hour turnaround',
    summary:
      "We review the appeal letter or personal statement you've drafted, with line-by-line annotations and revision suggestions.",
    includes: [
      'Line-by-line annotations on your draft',
      'Suggested rewrites for weak passages',
      "What's missing — citations, structure, framing",
      'One round of follow-up questions',
    ],
    fitFor: 'You have already written a draft and want a second set of eyes before you submit.',
    cta: 'DM us to start',
    ctaHref: 'https://x.com/thescholarguard',
  },
  {
    code: 'L2',
    name: 'Strategy Consultation',
    price: '$300',
    cadence: '60-min Zoom · 1 week async follow-up',
    summary:
      'A full case analysis on Zoom: we go through your situation end-to-end, recommend a structure, and outline the letter.',
    includes: [
      '60-minute one-on-one Zoom session',
      'Full case analysis: jurisdiction, evidence stage, fit',
      'Letter outline you can take and draft yourself',
      'One week of async follow-up by email or DM',
    ],
    fitFor: "You're not sure how to even begin, or you want to talk through the strategy before writing.",
    cta: 'DM us to schedule',
    ctaHref: 'https://x.com/thescholarguard',
    highlighted: true,
  },
  {
    code: 'L3',
    name: 'Full Appeal Support',
    price: 'From $1,000',
    cadence: 'Multi-touch · 2-4 weeks',
    summary:
      'End-to-end: full letter drafting, hearing preparation, follow-up correspondence. We only take cases we think we can help with.',
    includes: [
      'Full appeal letter drafting',
      'Hearing or interview preparation',
      'Follow-up correspondence with the institution',
      'Available by DM consultation only',
    ],
    fitFor: 'The stakes are high and you want a research team alongside you throughout the process.',
    cta: 'DM for fit assessment',
    ctaHref: 'https://x.com/thescholarguard',
  },
];

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Academic appeal analysis and consultation',
  provider: {
    '@type': 'Organization',
    name: 'The ScholarGuard',
  },
  offers: tiers.map((t) => ({
    '@type': 'Offer',
    name: t.name,
    description: t.summary,
    price: t.price.replace(/[^\d]/g, ''),
    priceCurrency: 'USD',
  })),
};

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Three ways we can help with your US or UK academic appeal: $99 letter review, $300 strategy consultation, or full appeal support."
        path="/services"
        jsonLd={servicesJsonLd}
      />

      <Section>
        <div className="max-w-4xl">
          <Eyebrow>How we can help</Eyebrow>
          <h1 className="text-balance mb-10">
            Three tiers. Pick the level of support that matches your situation.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            We start every engagement with a few questions to make sure we're
            the right fit. If your situation falls outside our scope — or if we
            don't think we can meaningfully help — we'll tell you and refer you
            elsewhere.
          </p>
        </div>
      </Section>

      <Section tone="soft" bordered>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.code}
              className={`flex flex-col h-full ${
                tier.highlighted
                  ? 'border-brass-deep border-2 lg:-translate-y-4'
                  : ''
              }`}
            >
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-xs uppercase tracking-wider text-brass-deep">
                  {tier.code}
                </p>
                {tier.highlighted && (
                  <span className="text-xs uppercase tracking-wider text-brass-deep">
                    Most common
                  </span>
                )}
              </div>
              <h2 className="font-display text-3xl tracking-tighter mb-3">
                {tier.name}
              </h2>
              <p className="display-numeral text-5xl mb-2">{tier.price}</p>
              <p className="text-xs text-stone uppercase tracking-wider mb-6">
                {tier.cadence}
              </p>
              <p className="text-ink-soft leading-relaxed mb-8">{tier.summary}</p>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-brass-deep mb-4">
                  Includes
                </p>
                <ul className="space-y-3">
                  {tier.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                      <span className="text-brass mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 pb-6 border-b border-ink/10">
                <p className="text-xs uppercase tracking-wider text-brass-deep mb-3">
                  Fit for
                </p>
                <p className="text-sm text-ink-soft italic leading-relaxed">
                  {tier.fitFor}
                </p>
              </div>

              <div className="mt-auto">
                <CTAButton
                  href={tier.ctaHref}
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  external
                  className="w-full justify-center"
                >
                  {tier.cta}
                </CTAButton>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* DISCLAIMER */}
      <Section>
        <div className="max-w-4xl">
          <Eyebrow>What we are and are not</Eyebrow>
          <h2 className="mb-10 text-balance">
            Two things to know before you reach out.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-l-2 border-brass pl-6">
              <h3 className="mb-4">We do not provide legal advice.</h3>
              <p className="text-ink-soft leading-relaxed">
                We analyze patterns from real anonymized academic appeal cases.
                That is not legal advice and we are not a law firm. For legal
                questions about your specific situation, please consult licensed
                counsel in your jurisdiction.
              </p>
            </div>

            <div className="border-l-2 border-stone pl-6">
              <h3 className="mb-4">We do not write coursework.</h3>
              <p className="text-ink-soft leading-relaxed">
                We do not write essays, papers, dissertations, or any academic
                coursework on a student's behalf. Our scope is appeal letters,
                tutoring, and study structure. If you need someone to do your
                academic work, we are not the right fit.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-4xl">
          <Eyebrow className="text-brass">Not sure which tier?</Eyebrow>
          <h2 className="text-cream mb-8 text-balance">
            DM us with five things and we'll tell you where to start.
          </h2>
          <ol className="space-y-4 text-cream/80 mb-10 max-w-2xl">
            <li className="flex gap-4">
              <span className="display-numeral text-2xl">1</span>
              <span>Country and university type (no names needed)</span>
            </li>
            <li className="flex gap-4">
              <span className="display-numeral text-2xl">2</span>
              <span>The allegation or issue you're facing</span>
            </li>
            <li className="flex gap-4">
              <span className="display-numeral text-2xl">3</span>
              <span>Stage — formal hearing? letter response? appeal?</span>
            </li>
            <li className="flex gap-4">
              <span className="display-numeral text-2xl">4</span>
              <span>Deadline</span>
            </li>
            <li className="flex gap-4">
              <span className="display-numeral text-2xl">5</span>
              <span>Any evidence you've already been shown</span>
            </li>
          </ol>
          <p className="text-cream/60 mb-10 text-sm">
            We'll reply within 24 hours on weekdays with whether and how we can
            help.
          </p>
          <CTAButton
            href="https://x.com/thescholarguard"
            external
            variant="primary"
            className="bg-cream text-ink hover:bg-brass border-cream hover:border-brass"
          >
            DM @thescholarguard on X
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
