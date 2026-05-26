export default function Section({
  children,
  className = '',
  tone = 'cream',
  bordered = false,
  as: Tag = 'section',
}) {
  const tones = {
    cream: 'bg-transparent text-ink',
    soft: 'bg-cream-soft/50 text-ink',
    ink: 'bg-ink text-cream',
  };

  return (
    <Tag
      className={`relative ${tones[tone]} ${
        bordered ? 'border-t border-ink/10' : ''
      } py-20 md:py-28 ${className}`}
    >
      <div className="container-prose">{children}</div>
    </Tag>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p
      className={`text-xs uppercase tracking-wider text-brass-deep font-medium mb-5 ${className}`}
    >
      {children}
    </p>
  );
}
