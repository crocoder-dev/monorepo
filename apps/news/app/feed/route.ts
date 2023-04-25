import { Feed } from 'feed';
import siteConfig from '../../content/site-config.json';
import { NextResponse } from 'next/server';
import { getDB } from '@crocoder-dev/db';
import { editions } from '@crocoder-dev/db/schema';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { eq } from 'drizzle-orm/expressions';

const { siteUrl } = siteConfig;

export async function GET(type: 'rss' | 'json' = 'rss') {
  const db = getDB();
  
  const allEditions = await db.select().from(editions);

  console.log(allEditions)


  const feed = new Feed({
    title: 'Tech Leadership Roundup',
    description: 'Tech news tailored for CTOs, VPs of engineering and Tech Leads.',
    id: `${siteUrl}`,
    link: `${siteUrl}`,
    language: 'en',
    image: `${siteUrl}/social.png`,
    favicon: `${siteUrl}/icons/favicon.ico`,
    copyright: 'Copyright © CroCoder, Inc. All rights reserved',
    generator: 'CroCoder feed',
    feedLinks: {
      json: `${siteUrl}/feed.json`,
      rss: `${siteUrl}/feed.xml`,
    },
    author: {
      name: 'CroCoder, Inc.',
      email: 'hello@crocoder.dev',
      link: 'crocoder.dev',
    },
  });

  allEditions.forEach((edition) => {
    const dateFormated = new Intl.DateTimeFormat('en-GB', { weekday: 'long',month: 'long', day: 'numeric'}).format(edition.date);

    feed.addItem({
      title: `Tech Leadership Roundup - ${dateFormated}`,
      id: `${siteUrl}${edition.slug}`,
      link: `${siteUrl}${edition.slug}`,
      description: `Tech news tailored for CTOs, VPs of engineering and Tech Leads`,
      author: [
        {
        name: 'CroCoder, Inc.',
        email: 'hello@crocoder.dev',
        link: 'crocoder.dev',
        }
      ],
      date: edition.date,
    });
  });
  
  switch (type) {
    case 'json':
      return new NextResponse(feed.json1(), { headers: { 'Content-Type': 'application/json' } });
    case 'rss':
    default:
      return new NextResponse(feed.rss2(), { headers: { 'Content-Type': 'application/xml' } });
  }
}
