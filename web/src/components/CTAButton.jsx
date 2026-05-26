import { Link } from 'react-router-dom';

const baseStyles =
  'inline-flex items-center gap-2 px-7 py-4 text-sm tracking-wide font-medium transition-all duration-300 group';

const variants = {
  primary:
    'bg-ink text-cream hover:bg-brass-deep border border-ink hover:border-brass-deep',
  secondary:
    'border border-ink/30 text-ink hover:bg-ink hover:text-cream',
  ghost:
    'text-ink hover:text-brass-deep link-underline-grow px-0 py-2 border-0',
};

export default function CTAButton({
  to,
  href,
  variant = 'primary',
  children,
  className = '',
  external = false,
  ...props
}) {
  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12 H19 M13 6 L19 12 L13 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (href || external) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={classes} {...props}>
      {content}
    </Link>
  );
}
