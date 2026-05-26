import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../lib/routes.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = ROUTES.filter((r) => r.nav);

  return (
    <header className="relative z-20 border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <div className="container-prose flex items-center justify-between h-20">
        <Link
          to="/"
          className="font-display text-xl tracking-tighter text-ink hover:text-brass-deep transition-colors"
          aria-label="The ScholarGuard home"
          onClick={() => setOpen(false)}
        >
          <span className="font-medium" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 30, 'WONK' 0" }}>
            The
          </span>{' '}
          <span className="italic" style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50, 'WONK' 1" }}>
            ScholarGuard
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive
                    ? 'text-ink link-underline'
                    : 'text-ink-soft hover:text-ink link-underline-grow'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 18 L18 6 M6 6 L18 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7 H20" strokeLinecap="round" />
                <path d="M4 17 H20" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden border-t border-ink/10 bg-cream">
          <div className="container-prose py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-display ${
                    isActive ? 'text-brass-deep' : 'text-ink-soft'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
