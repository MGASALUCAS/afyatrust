// Server-rendered JSON-LD structured data. Invisible to users — exists purely
// for search engine understanding (rich results, knowledge panel, breadcrumbs).
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
