import { extract } from '@extractus/article-extractor'
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { env } from '../../../env/server.mjs';
import { getDB } from '@crocoder-dev/db';
import { posts } from '@crocoder-dev/db/schema';

const api_key = env.OPEN_AI_SECRET_KEY;

const configuration = new Configuration({
    apiKey: api_key,
});

const openai = new OpenAIApi(configuration);

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


  const headers = new Headers({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
  });


  const article = await extract(url, options, { headers: headers as unknown as string[] });

  const {
    author,
    published,
    title,
    source,
    content
  } = articleSchema.parse(article);

  const messages = [
    {
      role: "user" as ChatCompletionRequestMessageRoleEnum,
      content: `Don't mention any external resources. Please summarize the article below in 2 paragraphs and max text length of each paragraph is 300 characters, return the text :\n\n Text: "${escapeRegExp(content)}"`,
    }
  ];

  const gpt35turboResponse = z.object({
    data: z.object({
      choices: z.object({
        message: z.object({
          content: z.string(),
        })
      }).array(),
    })
  });

  const summarizeResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });


  const summary = gpt35turboResponse.parse(summarizeResponse).data.choices[0]?.message.content

  if(!summary) {
    throw new Error('Summary couldn\'t be open-aied.');
  }

  console.log(summary);

  messages.push({
    role: "assistant" as ChatCompletionRequestMessageRoleEnum,
    content: summary,
  }, 
  {
    role: "user" as ChatCompletionRequestMessageRoleEnum,
    content: `Pretend you are a group of CTOs, VPs of engienering and software architects and create a brief opinion of this article. Please refer yourself as we. Please be kind if you don't agree with the article. Don't include any text except that opinion.`,
  });

  const insightResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    frequency_penalty: 0.5,
    presence_penalty: 0.5
  });

  const insight = gpt35turboResponse.parse(insightResponse).data.choices[0]?.message.content

  if(!insight) {
    throw new Error('Insight couldn\'t be open-aied.');
  }

  console.log(insight);

  messages.push({
    role: "assistant" as ChatCompletionRequestMessageRoleEnum,
    content: insight,
  },
  {
    role: "user" as ChatCompletionRequestMessageRoleEnum,
    content: `Generate single emojii that describes the article the best. Don't include any text except that one emojii`,
  });

  const emojiiResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
  });


  const emojii = gpt35turboResponse.parse(emojiiResponse).data.choices[0]?.message.content

  if(!emojii) {
    throw new Error('Emojii couldn\'t be open-aied.');
  }

  console.log(emojii);

  const publishedAt = published ? new Date(published) : new Date();

  const db = await getDB();

  await db.insert(posts).values({
    title: `${emojii} ${title}`,
    summary,
    insight,
    url,
    author,
    organization: source,
    publishedAt,
  });

  return NextResponse.json({ success: true });
}