import { extract } from '@extractus/article-extractor'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { summarize } from '../../helpers/openai';

const escapeRegExp = (string: string) => {
  return string.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
}

const articleSchema = z.object({
  content: z.string(),
  url: z.string(),
  title: z.string(),
  published: z.string(),
  author: z.string(),
  image: z.string(),
  source: z.string(),
});

const openAiDataSchema = z.object({
  summary: z.string(),
  category: z.string(),
});

export async function GET(request: Request) {
  const input = 'https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html';
  const options = {descriptionLengthThreshold: 1000, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 1500};

  const article = await extract(input, options);

  return NextResponse.json({article});
}

export async function POST(request: NextRequest) {
  const response = new Response(request.body);
  const { url } = await response.json();

  const options = {descriptionLengthThreshold: 100, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 150};

  const article = await extract(url, options);

  const parsed = articleSchema.safeParse(article);

  if (!parsed.success) {
    throw new Error();
  }

  const openAiData = await summarize(escapeRegExp(parsed.data.content), 3);

  const openAiDataParsed = openAiDataSchema.safeParse(openAiData);

  if (!openAiDataParsed.success) {
    throw new Error();
  }

  const data = {
    author: parsed.data.author,
    publishedAt: new Date(parsed.data.published).getTime(),
    url: parsed.data.url,
    title: parsed.data.title,
    img: parsed.data.image,
    category: openAiDataParsed.data.category,
    organization: parsed.data.source,
    summary: openAiDataParsed.data.summary.split('\n\n')
  }

  return NextResponse.json({data});
}