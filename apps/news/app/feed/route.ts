import { Feed } from 'feed';
import siteConfig from '../../content/site-config.json';
import { NextResponse } from 'next/server';

const { siteUrl } = siteConfig;

export async function GET(type: 'rss' | 'json' = 'rss') {
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
  
  switch (type) {
    case 'json':
      return new NextResponse(feed.json1(), { headers: { 'Content-Type': 'application/json' } });
    case 'rss':
    default:
      return new NextResponse(feed.rss2(), { headers: { 'Content-Type': 'application/xml' } });
  }
}
