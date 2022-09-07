/*
<script type="application/ld+json">{
"@context": "http://schema.org",
"@type": "Blog",
"name": "Blog name",
"url": "https://example.com",
"description": "Same as meta description",
"sameAs": [
"https://facebook.com/BlogPage",
"https://plus.google/BlogPage"
],
"publisher": {
"@type": "Organization",
"name": "Blog Name"
}
}</script>*/

import siteConfig from "../../content/site-config.json";

export const BlogJSONLDHead = ({
  blogName = "CroCoder Blog",
  url = siteConfig.siteUrl,
  companyName = siteConfig.company.name,
  twitterLink = siteConfig.social.twitter,
  linkedinLink = siteConfig.social.linkedin,
  githubLink = siteConfig.social.github,
  youtubeLink = siteConfig.social.youtube,
  instagramLink = siteConfig.social.instagram,
  description,
}) => (
  <head>
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Blog",
        name: blogName,
        url: url,
        description: description,
        sameAs: [
          twitterLink,
          linkedinLink,
          githubLink,
          youtubeLink,
          instagramLink,
        ],
        publisher: {
          "@type": "Organization",
          name: companyName,
        },
      })}
    </script>
  </head>
);
