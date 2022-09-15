import siteConfig from "../../content/site-config.json";

export const OrganizationJSONLDHead = ({
  url = siteConfig.siteUrl,
  logo = siteConfig.logo,
  description = siteConfig.siteDescription,
  companyName = siteConfig.company.name,
  companyStreet = siteConfig.company.street,
  companyCity = siteConfig.company.city,
  companyRegion = siteConfig.company.region,
  companyPostalCode = siteConfig.company.postalCode,
  companyCountry = siteConfig.company.country,
  twitterLink = siteConfig.social.twitter,
  linkedinLink = siteConfig.social.linkedin,
  githubLink = siteConfig.social.github,
  youtubeLink = siteConfig.social.youtube,
  instagramLink = siteConfig.social.instagram,
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "http://schema.org/",
        "@type": "Organization",
        name: companyName,
        description,
        logo,
        url,
        address: {
          "@type": "PostalAddress",
          streetAddress: companyStreet,
          addressLocality: companyCity,
          addressRegion: companyRegion,
          postalCode: companyPostalCode,
          addressCountry: companyCountry,
        },
        sameAs: [
          twitterLink,
          linkedinLink,
          githubLink,
          youtubeLink,
          instagramLink,
        ],
      }),
    }}
  />
);
