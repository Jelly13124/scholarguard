import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Section from '../components/Section.jsx';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" description="The page you're looking for doesn't exist." path="/404" />
      <Section>
        <div className="max-w-2xl py-24 text-center mx-auto">
          <p className="display-numeral text-7xl md:text-8xl mb-6">404</p>
          <h1 className="text-balance mb-6">
            We couldn't find that page.
          </h1>
          <p className="text-ink-soft mb-10 leading-relaxed">
            The link may be broken, the case may have moved, or the page might
            not exist yet. Try the homepage or browse the case archive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ink text-cream text-sm hover:bg-brass-deep transition-colors"
            >
              Back to home →
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-ink/30 text-ink text-sm hover:bg-ink hover:text-cream transition-colors"
            >
              Browse case studies →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
