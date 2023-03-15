import { extract } from '@extractus/article-extractor'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { connect } from '@planetscale/database';
import { env } from '../../../env/server.mjs';

const dbconfig = {
  url: env.DATABASE_URL
}

const api_key = env.OPEN_AI_SECRET_KEY;
const model_engine = 'text-davinci-003';

const configuration = new Configuration({
    apiKey: api_key,
});

const openai = new OpenAIApi(configuration);

const OpenAIApiResponse = z.object({
    data: z.object({
      choices: z.object({
        text: z.string().optional(),
      }).array(),
    })
});

async function summarize(text: string, num_paragraphs: number) {
  const prompt = `Please summarize the text below in ${num_paragraphs} paragraphs and max text length of each paragraph is 500 characters:\n\n Text: "${text}"`;

  const response = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    temperature: 0,
    n: 1,
    max_tokens: 1000,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  });

  const parsedResponse = OpenAIApiResponse.parse(response);

  const summary = parsedResponse.data.choices[0]?.text?.trim();

  return summary;
}

async function categorise(text: string) {
  const prompt = `What is the category of the text below, let the category be one word:\n\n Text: "${text}"`;

  const response = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    temperature: 0,
    n: 1,
    max_tokens: 15,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  });

  const parsedResponse = OpenAIApiResponse.parse(response);

  const category = parsedResponse.data.choices[0]?.text?.trim();

  return category;
}

const escapeRegExp = (string: string) => {
  return string.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
}

const articleSchema = z.object({
  content: z.string(),
  url: z.string(),
  title: z.string(),
  published: z.string().optional(),
  author: z.string().optional(),
  image: z.string().optional(),
  source: z.string().optional(),
});


export async function POST(request: NextRequest) {
  const response = new Response(request.body);
  const { url } = await response.json();

  const options = {descriptionLengthThreshold: 100, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 150};

  const article = await extract(url, options);

  const {
    author,
    published,
    title,
    image,
    source,
    content
  } = articleSchema.parse(article);

  const summary = await summarize(escapeRegExp(content), 3);

  if(!summary) {
    throw new Error('Summary couldn\'t be open-aied.');
  }

  const category = await categorise(summary);

  const publishedAt = published ? new Date(published) : new Date();

  const conn = connect(dbconfig);
  
  await conn.execute('INSERT INTO Post (updatedAt, publishedAt, category, title, img, summary, url, slug, author, organization) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    new Date(),
    publishedAt,
    category,
    title,
    image,
    summary,
    url,
    "",
    author,
    source,
  ]);

  return NextResponse.json({ success: true });
}