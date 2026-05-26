import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import EmailCapture from '../components/EmailCapture.jsx';
import Card, { CardTag } from '../components/Card.jsx';

const jurisdictions = ['🇺🇸 US', '🇬🇧 UK'];
const pillars = [
  'P1 · Misconduct & AI defense',
  'P2 · Failing grades / EC',
  'P3 · Study strategy',
  'P4 · Writing process',
  'P5 · Exam prep',
  'P6 · Process & templates',
];

const placeholderCards = [
  {
    flag: '🇺🇸',
    pillar: 'P1',
    title: 'AI flag — what to argue when Turnitin says 47%',
    week: 'W1',
  },
  {
    flag: '🇬🇧',
    pillar: 'P2',
    title: 'EC application after a missed deadline',
    week: 'W1',
  },
  {
    flag: '🇺🇸',
    pillar: 'P4',
    title: 'Grammarly Premium and the polished-prose trap',
    week: 'W2',
  },
  {
    flag: '🇺🇸🇬🇧',
    pillar: 'P3',
    title: 'Study journal as evidence — a documentation system',
    week: 'W2',
  },
  {
    flag: '🇬🇧',
    pillar: 'P1',
    title: 'Faculty hearing prep — the 4 questions to expect',
    week: 'W3',
  },
  {
    flag: '🇺🇸',
    pillar: 'P5',
    title: 'Recovery from a single failed midterm',
    week: 'W3',
  },
];

export default function CaseStudies() {
  return (
    <>
      <SEO
        title="Case studies"
        description="Anonymized case breakdowns from US and UK academic appeals. Real letter structures, evidence stages, and outcome data."
        path="/case-studies"
      />

      <Section>
        <div className="max-w-4xl">
          <Eyebrow>Case archive</Eyebrow>
          <h1 className="text-balance mb-10">
            Anonymized breakdowns from real US and UK academic appeals.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            Every case in this archive has been stripped of identifying details
            — no school name, no course code, no dates, no professor name. What
            remains is the pattern: the allegation, the evidence stage, the
            move set that worked or did not, and the outcome.
          </p>
        </div>
      </Section>

      <Section tone="soft" bordered>
        {/* Filters (disabled at launch) */}
        <div className="flex flex-col gap-6 mb-16">
          <div>
            <p className="text-xs uppercase tracking-wider text-brass-deep mb-3">
              Filter by jurisdiction
            </p>
            <div className="flex flex-wrap gap-3">
              {jurisdictions.map((j) => (
                <button
                  key={j}
                  disabled
                  className="pill-tag opacity-50 cursor-not-allowed"
                >
                  {j}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-brass-deep mb-3">
              Filter by pillar
            </p>
            <div className="flex flex-wrap gap-3">
              {pillars.map((p) => (
                <button
                  key={p}
                  disabled
                  className="pill-tag opacity-50 cursor-not-allowed"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-stone italic">
            Filters activate once the archive opens.
          </p>
        </div>

        {/* Empty state with planned cards */}
        <div className="border-l-2 border-brass pl-8 mb-16">
          <h2 className="text-2xl mb-3">The archive opens this month.</h2>
          <p className="text-ink-soft max-w-prose-wide leading-relaxed">
            We're holding cases back from publication until each one has passed
            our anonymization review. The breakdowns below ship in the order
            shown, starting Week of the launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderCards.map((c, i) => (
            <Card key={i} className="opacity-70">
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl">{c.flag}</span>
                <CardTag>{c.week}</CardTag>
              </div>
              <p className="text-xs uppercase tracking-wider text-brass-deep mb-3">
                Pillar {c.pillar}
              </p>
              <h3 className="font-display text-xl tracking-tighter leading-snug">
                {c.title}
              </h3>
              <p className="mt-5 text-xs text-stone italic">In anonymization queue</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Eyebrow>Notify me</Eyebrow>
          <h2 className="mb-8 text-balance">
            Get a one-line summary when each case publishes.
          </h2>
          <EmailCapture
            label="Case alert email list"
            buttonText="Subscribe"
          />
        </div>
      </Section>
    </>
  );
}
