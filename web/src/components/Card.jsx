export default function Card({ children, className = '', as: Tag = 'article' }) {
  return (
    <Tag className={`card-frame p-8 md:p-10 ${className}`}>{children}</Tag>
  );
}

export function CardTag({ children }) {
  return <span className="pill-tag">{children}</span>;
}
