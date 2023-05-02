import { Edition } from '@crocoder-dev/db/schema';
import siteConfig from '../../../content/site-config.json';

const formatDate = (date: Date) => {
  const d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return [year, month, day].join('-');
};

export default function EditionJSONLDHead({ edition }: {edition: Pick<Edition, "title" | "date" | "abstract" | "description" | "slug">}) {
  const {title, slug, description, date, abstract} = edition; 

  const dateFormated = new Intl.DateTimeFormat('en-GB', { weekday: 'long',month: 'long', day: 'numeric'}).format(date);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org/',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.siteUrl}${slug}`,
          },
          author: {
            '@type': 'Organization',
            name: siteConfig.company.name,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.company.name,
            logo: {
              '@type': 'ImageObject',
              url: siteConfig.logo,
            },
          },
          name: `${title} - ${dateFormated}`,
          description,
          abstract,
          dateCreated: formatDate(date),
          datePublished: formatDate(date),
          dateModified: formatDate(date),
        }),
      }}
    />
  );
}
