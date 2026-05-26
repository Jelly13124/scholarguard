import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import { SITE } from '../lib/routes.js';

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="The ScholarGuard is a faceless research team analyzing US and UK academic appeal patterns. Why we publish anonymously, what we believe, what we are not."
        path="/about"
      />

      <Section>
        <div className="max-w-4xl">
          <Eyebrow>About</Eyebrow>
          <h1 className="text-balance mb-10">
            A faceless research team analyzing how academic appeals actually
            play out.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            The ScholarGuard publishes anonymized case breakdowns from US and
            UK university academic appeals — misconduct hearings, AI detection
            disputes, extenuating circumstances applications, and the
            day-to-day study patterns that prevent the next case from happening.
          </p>
        </div>
      </Section>

      <Section tone="soft" bordered>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Mission</Eyebrow>
            <h2 className="text-balance">
              Move information about appeals from private DMs into a public
              archive.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-ink-soft leading-relaxed max-w-prose-wide">
            <p>
              Most academic appeals get resolved in private. The student
              receives a letter, panics, asks one or two friends, drafts a
              response in isolation, sends it, and either succeeds or doesn't.
              The pattern repeats — and almost nothing is shared.
            </p>
            <p>
              That information asymmetry favors institutions. We think it does
              not have to. Every case we analyze contributes a small piece of
              shared knowledge: what worked, what didn't, what to expect at
              each stage, which moves are wasted effort.
            </p>
            <p>
              We publish the patterns. We do not publish the people.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <Eyebrow>Why faceless</Eyebrow>
            <h2 className="text-balance">
              The anonymity protects the case library more than it protects us.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-ink-soft leading-relaxed max-w-prose-wide">
            <p>
              No individual name. No author by-line. No founder story. The
              brand publishes as "we" because individual attribution would make
              it harder to anonymize cases credibly — small details that seem
              harmless on their own become identifiers when paired with a
              public author profile.
            </p>
            <p>
              The faceless choice also keeps the focus on the work. The case
              breakdown is the product. Who wrote it matters less than whether
              the pattern it identifies actually holds up across other cases.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="max-w-4xl">
          <Eyebrow className="text-brass">Three things we are not</Eyebrow>
          <h2 className="text-cream mb-12 text-balance">
            Important enough to say outright, on the page where you can find it.
          </h2>

          <div className="space-y-12">
            {[
              {
                no: 'Not a law firm.',
                body: 'We analyze patterns from real anonymized academic cases. That is not legal advice. We are not licensed to practice law in any jurisdiction. For legal questions about your case, consult licensed counsel.',
              },
              {
                no: 'Not an individual influencer.',
                body: 'There is no founder Instagram, no personal LinkedIn, no individual brand. The work is published collectively under one name. This is a research project, not a personality.',
              },
              {
                no: 'Not a ghostwriting service.',
                body: 'We do not write papers, essays, dissertations, or any coursework on a student\'s behalf. Our scope is appeal letters, tutoring, and study structure. If that\'s what you need, we are not the right fit.',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="md:w-1/3">
                  <h3 className="font-display text-3xl tracking-tighter italic text-brass" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}>
                    {item.no}
                  </h3>
                </div>
                <div className="md:w-2/3">
                  <p className="text-cream/70 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Eyebrow>Sister project</Eyebrow>
          <h2 className="text-balance mb-8">
            The ScholarGuard is the English-language project of{' '}
            <a
              href={SITE.parentBrand}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline-grow text-brass-deep italic"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}
            >
              xueyouxingtu.com
            </a>
            .
          </h2>
          <p className="text-ink-soft leading-relaxed max-w-prose-wide">
            The Chinese-language parent brand serves overseas Chinese students
            in Western universities — a different audience with different
            information needs. The ScholarGuard focuses exclusively on native
            English-speaking US and UK university students.
          </p>
        </div>
      </Section>
    </>
  );
}
