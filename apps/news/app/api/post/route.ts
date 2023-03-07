import { extract } from '@extractus/article-extractor'
import { NextRequest, NextResponse } from 'next/server';
import { summarize } from '../../helpers/openai';

export async function GET(request: Request) {
  const input = 'https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html';
  const options = {descriptionLengthThreshold: 1000, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 1500};

  const article = await extract(input, options);

  return NextResponse.json({article});
}

export async function POST(request: NextRequest) {
  const response = new Response(request.body);
  const { url } = await response.json();

  const options = {descriptionLengthThreshold: 1000, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 1500};

  const article = await extract(url, options);

  const escapeRegExp = (string: string) => {
    return string.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
  }

  const openAiData = await summarize(escapeRegExp(article.content as string), 3);

  const data = {
    author: article.author,
    publishedAt: new Date(article.published as string).getTime(),
    url: article.url,
    title: article.title,
    img: article.image,
    category: openAiData.category,
    organization: article.source,
    summary: openAiData.summary
  }

  return NextResponse.json({data});
}