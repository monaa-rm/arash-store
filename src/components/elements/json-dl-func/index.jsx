
export default function JsonDl({ data, jsondlkey }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      key={jsondlkey}
    />
  );
}
