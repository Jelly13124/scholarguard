export default function FAQ({ items }) {
  return (
    <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
      {items.map((item, i) => (
        <details
          key={i}
          className="group py-6 cursor-pointer"
        >
          <summary className="flex items-start justify-between gap-6 list-none">
            <h3 className="font-display text-xl md:text-2xl tracking-tighter text-ink font-medium leading-snug pr-4">
              {item.q}
            </h3>
            <span className="flex-shrink-0 mt-2 text-brass-deep transition-transform duration-300 group-open:rotate-45">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5 V19 M5 12 H19" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <div className="mt-5 pr-12 text-ink-soft leading-relaxed max-w-prose-wide">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
