import { extract } from '@extractus/article-extractor'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { env } from '../../../env/server.mjs';
import { getDB } from '@crocoder-dev/db';
import { posts } from '@crocoder-dev/db/schema';

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
  const prompt = `Please summarize the text below in ${num_paragraphs} paragraphs and max text length of each paragraph is 500 characters, return the text :\n\n Text: "${text}" 
  Example: "Working with computers has been a part of our lives for more than 150 years, but the interfaces have been limited by the capabilities of the machine. Voice-driven interfaces, such as Alexa, have been a big step forward, but the connection established with visual and non-verbal cues is still missing. Soul Machines believes that their Digital People can fill this void by combining CGI with autonomous animation and a Digital Brain.

  Soul Machines starts by scanning a real person and annotating every muscle contraction in their face before feeding it to a machine learning model. This produces a tremendous amount of data, but it is integral to the normalization process. The Digital Brain is what brings this all to life, allowing Digital People to observe subtle nuances and react in emotive ways in real-time.
  `;

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

async function generateInsight(text: string) {
  const prompt = `Pretend you are a group of CTOs, VPs of engienering and software architects and create an opinion of this article. Please don't refer yourself as a group of people.\n\n Article: "${text}"`;

  const response = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    temperature: 0,
    n: 1,
    max_tokens: 800,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  });

  const parsedResponse = OpenAIApiResponse.parse(response);

  const insight = parsedResponse.data.choices[0]?.text?.trim();

  return insight;
}

async function generateEmoji(text: string) {
  const prompt = `Generate one emoji based on given title of text:\n\n Text: "${text}"`;

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

  const insight = parsedResponse.data.choices[0]?.text?.trim();

  return insight;
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
  return string.replace(/<(?:("[^"]*")|('[^']*')|([^'">]+))*>/g, '');
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

  const summary = await summarize(escapeRegExp(content), 2);

  if(!summary) {
    throw new Error('Summary couldn\'t be open-aied.');
  }

  const insight = await generateInsight(escapeRegExp(content));

  if(!insight) {
    throw new Error('Insight couldn\'t be open-aied.');
  }

  const emoji = await generateEmoji(escapeRegExp(title));

  if(!emoji) {
    throw new Error('Emoji couldn\'t be open-aied.');
  }

  const category = await categorise(summary);

  const publishedAt = published ? new Date(published) : new Date();

  const db = await getDB();

  await db.insert(posts).values({
    title,
    summary,
    insight,
    url
  });

  return NextResponse.json({ success: true });
}