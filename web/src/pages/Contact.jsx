import SEO from '../components/SEO.jsx';
import Section, { Eyebrow } from '../components/Section.jsx';
import Card from '../components/Card.jsx';
import { SITE } from '../lib/routes.js';

const channels = [
  {
    name: 'X (Twitter)',
    handle: `@${SITE.handles.x}`,
    url: `https://x.com/${SITE.handles.x}`,
    why: 'Fastest. Public reply window plus DM. Best for time-sensitive cases under a 5-day deadline.',
  },
  {
    name: 'Instagram',
    handle: `@${SITE.handles.instagram}`,
    url: `https://instagram.com/${SITE.handles.instagram}`,
    why: 'Same operator, same case library. DM us if you found us via the carousels.',
  },
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="DM @thescholarguard on X or Instagram. We respond within 24 hours on weekdays. The five questions to send in your first message."
        path="/contact"
      />

      <Section>
        <div className="max-w-4xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-balance mb-10">
            DM us. We reply within 24 hours on weekdays.
          </h1>
          <p className="text-lg text-ink-soft leading-relaxed max-w-prose-wide">
            We do not run a public phone line or a booking calendar yet. The
            fastest way to reach us is a DM on X or Instagram. Both go to the
            same inbox.
          </p>
        </div>
      </Section>

      <Section tone="soft" bordered>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {channels.map((c) => (
            <Card key={c.name} className="flex flex-col h-full">
              <h2 className="font-display text-3xl tracking-tighter mb-3">
                {c.name}
              </h2>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass-deep link-underline mb-5 inline-block"
              >
                {c.handle}
              </a>
              <p className="text-ink-soft leading-relaxed mt-2">{c.why}</p>
              <div className="mt-auto pt-8">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-ink/30 text-sm hover:bg-ink hover:text-cream transition-colors"
                >
                  Open DM →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <Eyebrow>What to send in your first DM</Eyebrow>
          <h2 className="text-balance mb-8">
            Five things make our reply useful instead of generic.
          </h2>
          <p className="text-ink-soft leading-relaxed mb-12 max-w-prose-wide">
            You don't have to send all five. But each one makes the difference
            between us saying "tell us more" and us actually pointing at the
            pattern in our case library that matches your situation.
          </p>

          <ol className="space-y-8 mb-16">
            {[
              {
                q: 'Country and university type.',
                a: 'No names. "R1 public flagship in the US" or "Russell Group postgrad in the UK" is plenty.',
              },
              {
                q: 'The allegation or issue.',
                a: 'AI flag? Plagiarism? Failing grade? Extenuating circumstances? One sentence is fine.',
              },
              {
                q: 'Stage you\'re at.',
                a: 'Just received the letter? Hearing scheduled? Already submitted an appeal? The stage shapes everything.',
              },
              {
                q: 'Deadline.',
                a: 'If you have one. If you don\'t, say "no deadline yet."',
              },
              {
                q: 'Evidence you\'ve been shown.',
                a: 'Turnitin similarity score, faculty report, GPTZero output, a single quoted paragraph — anything they\'ve told you the case rests on.',
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-6 items-start">
                <span className="display-numeral text-4xl flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-2xl tracking-tighter mb-2">
                    {item.q}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{item.a}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="bg-cream-soft p-8 border-l-2 border-brass">
            <p className="text-sm text-ink-soft leading-relaxed italic">
              Note: we do not write or accept work that crosses academic
              integrity lines. If your message asks us to write or substantially
              author an essay, paper, or assignment, we'll decline and won't
              respond further.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
