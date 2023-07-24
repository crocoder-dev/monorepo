import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { env } from '../../../env/server.mjs';
import { getDB } from '@crocoder-dev/db';
import { posts as databasePosts, editions } from '@crocoder-dev/db/schema';
import { z } from 'zod';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm/expressions';

const inputSchema = z.object({
  editionId: z.number(),
});

const api_key = env.OPEN_AI_SECRET_KEY;

const configuration = new Configuration({
  apiKey: api_key,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: NextRequest) {
  const headersList = headers();

  if (headersList.get('Authorization') !== process.env.API_KEY) {
    return NextResponse.json({ success: false });
  }

  const response = new Response(request.body);
  const params = await response.json();

  const { editionId } = inputSchema.parse(params);

  const db = getDB();

  const posts = await db.select().from(databasePosts).where(eq(databasePosts.editionId, editionId));

  const gpt35turboResponse = z.object({
    data: z.object({
      choices: z
        .object({
          message: z.object({
            content: z.string(),
          }),
        })
        .array(),
    }),
  });

  const postsText = posts.map((e, i) => {
    const { title, summary, insight } = e;

    return `Post ${i + 1}:\nTitle: ${title} \nSummary: ${summary} \nInsigth: ${insight}`;
  });

  const messages = [
    {
      role: 'user' as ChatCompletionRequestMessageRoleEnum,
      content: `Please create a single description of these posts: ${postsText.join('\n\n')}`,
    },
  ];

  const descriptionResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  const description =
    gpt35turboResponse.parse(descriptionResponse).data.choices[0]?.message.content;

  if (!description) {
    throw new Error("Description couldn't be open-aied.");
  }

  console.log('Desc:', description);

  messages.push(
    {
      role: 'assistant' as ChatCompletionRequestMessageRoleEnum,
      content: description,
    },
    {
      role: 'user' as ChatCompletionRequestMessageRoleEnum,
      content: `Please create one abstract of all posts in short summary or brief overview of the main points, ideas, or arguments presented in the posts`,
    },
  );

  const abstractResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  const abstract = gpt35turboResponse.parse(abstractResponse).data.choices[0]?.message.content;

  if (!abstract) {
    throw new Error("Abstract couldn't be open-aied.");
  }

  console.log('Abs:', abstract);

  await db.update(editions).set({ description, abstract }).where(eq(editions.id, editionId));

  return NextResponse.json({ success: true });
}
