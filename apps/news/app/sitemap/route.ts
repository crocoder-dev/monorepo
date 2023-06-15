import { NextResponse } from 'next/server';
import siteConfig from '../../content/site-config.json';
import { SitemapStream, streamToPromise } from 'sitemap';
import { editions } from '@crocoder-dev/db/schema';
import { getDB } from '@crocoder-dev/db';
import { Readable } from 'stream';

export async function GET() {
    const db = getDB();
  
    const allEditions = await db.select().from(editions);

    const links = allEditions.map(e => {
        return {
            url: `${siteConfig.siteUrl}${e.slug}`,
            changefreq: 'monthly',
            priority: 1.0,
            lastmod: e.updatedAt
        }
    })

    const stream = new SitemapStream({
        hostname: siteConfig.siteUrl,
        lastmodDateOnly: true
    });

    const promise = await streamToPromise(Readable.from(links).pipe(stream));

    return new NextResponse(promise.toString(), { headers: { 'Content-Type': 'application/xml' } });
}