import { Link } from 'react-router-dom';
import { ROUTES, SITE } from '../lib/routes.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const navItems = ROUTES.filter((r) => r.nav);

  return (
    <footer className="relative z-10 mt-32 border-t border-ink/10 bg-ink text-cream">
      <div className="container-prose py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <p className="font-display text-3xl tracking-tighter text-cream">
              <span style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30, 'WONK' 0" }}>The</span>{' '}
              <span className="italic text-brass" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}>
                ScholarGuard
              </span>
            </p>
            <p className="mt-6 text-sm text-cream/60 max-w-md leading-relaxed">
              {SITE.description} A research team analyzing US and UK university academic appeal patterns.
            </p>
            <p className="mt-6 text-xs text-cream/40 tracking-wider uppercase">
              English face of{' '}
              <a
                href={SITE.parentBrand}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline-grow text-cream/60 hover:text-brass"
              >
                xueyouxingtu.com
              </a>
            </p>
          </div>

          {/* Site nav */}
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-wider text-cream/40 mb-5">Site</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-cream/70 hover:text-brass link-underline-grow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Channels */}
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-cream/40 mb-5">Follow / DM</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://x.com/${SITE.handles.x}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-brass link-underline-grow"
                >
                  X · @{SITE.handles.x}
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${SITE.handles.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/70 hover:text-brass link-underline-grow"
                >
                  Instagram · @{SITE.handles.instagram}
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-cream/70 hover:text-brass link-underline-grow">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-12 border-cream/10" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-xs text-cream/40 max-w-2xl leading-relaxed">
            We analyze patterns from real anonymized cases. We are not a law firm and we do not
            provide legal advice. Always consult licensed counsel for legal questions about your
            academic case.
          </p>
          <p className="text-xs text-cream/30 tracking-wider">
            © {year} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
