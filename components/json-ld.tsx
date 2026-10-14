export function SchoolJsonLd({
  name,
  url,
  description,
  email,
  telephone,
  streetAddress,
}: {
  name: string;
  url: string;
  description: string;
  email: string;
  telephone: string;
  streetAddress: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name,
    url,
    description,
    email,
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress,
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
