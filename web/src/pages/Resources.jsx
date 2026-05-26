import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import Card, { CardTag } from '../components/Card.jsx';
import EmailCapture from '../components/EmailCapture.jsx';

const leadMagnets = [
  {
    code: 'LM-A',
    title: 'AI Detection Defense Kit',
    flag: '🇺🇸 🇬🇧',
    blurb:
      'A 12-page guide for students flagged by Turnitin, GPTZero, or Copyleaks. Includes three anonymized case walkthroughs, a fillable response letter template, and the five questions to ask your professor before responding.',
    contents: [
      'Known false-positive patterns in Turnitin, GPTZero, and Copyleaks',
      'Three anonymized AI-flag cases with their actual response letters',
      'Response letter template (Word + Google Docs, fillable)',
      'Pre-meeting checklist: 5 questions to ask your professor',
    ],
    status: 'Building. Ships Week 3.',
  },
  {
    code: 'LM-B',
    title: 'Appeal Letter Template Pack',
    flag: '🇺🇸 🇬🇧',
    blurb:
      'Three templates covering the most common appeal paths: US misconduct hearings, UK extenuating circumstances applications, and failing-grade or academic-standing appeals. Each comes with annotated examples showing what makes the letter land.',
    contents: [
      'US academic misconduct appeal structure (with annotated example)',
      'UK extenuating circumstances application structure',
      'Failing-grade / academic-standing appeal path',
      'Submission checklist per institution type',
    ],
    status: 'Building. Ships Month 3.',
  },
];

export default function Resources() {
  return (
    <>
      <SEO
        title="Free resources"
        description="Free downloadable guides for US and UK academic appeals: AI Detection Defense Kit, Appeal Letter Template Pack, and more from The ScholarGuard."
        path="/resources"
      />

      <Section>
        <div className="max-w-4xl">
          <Eyebrow>Free guides</Eyebrow>
          <h1 className="text-balance mb-10">
            Built from patterns in our case library. Free to download.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            Every guide is sourced from real anonymized cases we've worked on
            or analyzed. No fluff, no padding. If a section did not earn its
            place in an actual appeal, it does not appear in the kit.
          </p>
        </div>
      </Section>

      <Section tone="soft" bordered>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {leadMagnets.map((lm) => (
            <Card key={lm.code} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl">{lm.flag}</span>
                <CardTag>{lm.code}</CardTag>
              </div>
              <h2 className="font-display text-3xl tracking-tighter mb-5">
                {lm.title}
              </h2>
              <p className="text-ink-soft leading-relaxed mb-8">{lm.blurb}</p>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-brass-deep mb-4">
                  Inside
                </p>
                <ul className="space-y-3">
                  {lm.contents.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                      <span className="text-brass mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-6 border-t border-ink/10">
                <p className="text-xs text-stone italic mb-5">{lm.status}</p>
                <EmailCapture
                  label={`Get ${lm.code} when it drops`}
                  buttonText="Notify me"
                />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Eyebrow>How we build these</Eyebrow>
          <h2 className="text-balance mb-10">
            Every guide starts as a stack of real cases. Then the patterns get
            distilled.
          </h2>

          <div className="space-y-10">
            {[
              {
                n: '01',
                title: 'Pull cases from the library',
                body: 'For each guide, we pull every case in our archive that matches the topic. The AI Detection Kit pulled 20+ AI-flag cases.',
              },
              {
                n: '02',
                title: 'Find the repeating moves',
                body: 'We strip identifying details and look at what each successful response had in common. Patterns over anecdotes.',
              },
              {
                n: '03',
                title: 'Write only what survived the cut',
                body: 'If a section sounds smart but did not actually appear in winning responses, it does not go in the guide.',
              },
              {
                n: '04',
                title: 'Anonymize the example letters',
                body: 'Every example is scrubbed for school names, course codes, dates, demographic details, professor names. Patterns are kept. Identities are not.',
              },
            ].map((step, i) => (
              <div key={i} className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-2 md:col-span-1">
                  <p className="display-numeral text-3xl">{step.n}</p>
                </div>
                <div className="col-span-10 md:col-span-11">
                  <h3 className="font-display text-2xl tracking-tighter mb-3">
                    {step.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed max-w-prose-wide">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
