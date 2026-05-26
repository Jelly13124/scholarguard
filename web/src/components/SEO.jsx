import { Helmet } from 'react-helmet-async';
import { SITE } from '../lib/routes.js';

export default function SEO({
  title,
  description,
  path = '/',
  ogImage,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} — ${SITE.name}`
    : `${SITE.name} — US & UK academic case breakdowns`;
  const desc = description || SITE.description;
  const url = `${SITE.baseUrl}${path}`;
  const image = ogImage || `${SITE.baseUrl}/og-default.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${SITE.handles.x}`} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
