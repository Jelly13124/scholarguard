import { useState } from 'react';

export default function EmailCapture({
  label = 'Get the kit when it drops',
  buttonText = 'Notify me',
  placeholder = 'your@email.com',
  variant = 'light',
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(W2): wire to Kit V4 API. For now, mark UX as captured.
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  const isDark = variant === 'dark';

  if (submitted) {
    return (
      <div
        className={`p-6 border ${
          isDark ? 'border-cream/20 text-cream' : 'border-ink/15 text-ink'
        }`}
      >
        <p className="font-display text-xl tracking-tighter">Got it.</p>
        <p
          className={`mt-2 text-sm ${
            isDark ? 'text-cream/60' : 'text-ink-soft'
          }`}
        >
          We'll email <span className="font-medium">{email}</span> the moment
          this drops. Until then, follow us on X or IG for the working notes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <label
        className={`block text-xs uppercase tracking-wider mb-3 ${
          isDark ? 'text-cream/60' : 'text-brass-deep'
        }`}
      >
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          aria-label="Email address"
          className={`flex-1 px-5 py-4 text-base border bg-transparent focus:outline-none focus:border-brass-deep transition-colors ${
            isDark
              ? 'border-cream/30 text-cream placeholder:text-cream/40'
              : 'border-ink/30 text-ink placeholder:text-stone-light'
          }`}
        />
        <button
          type="submit"
          className={`px-7 py-4 text-sm tracking-wide font-medium transition-all ${
            isDark
              ? 'bg-cream text-ink hover:bg-brass'
              : 'bg-ink text-cream hover:bg-brass-deep'
          }`}
        >
          {buttonText} →
        </button>
      </div>
      <p
        className={`mt-3 text-xs ${
          isDark ? 'text-cream/40' : 'text-stone'
        }`}
      >
        No spam. Unsubscribe anytime. We use Kit (kit.com) — privacy policy on request.
      </p>
    </form>
  );
}
