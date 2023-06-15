import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { z } from 'zod';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/nodejs';

const inputSchema = z.object({
  name: z.string(),
  email: z.string(),
  message: z.string(),
  projects: z.string(),
  uploadThingLink: z.string(),
});

const createContactObject = ({name, email, content, projects, uploadThingLink}: {name: string, email: string, content: string, projects: string, uploadThingLink: string}) => ({
  parent: {
    type: 'database_id',
    database_id: process.env.NOTION_DATABASE_ID!,
  },
  properties: {
    title: {
      title: [
        {
          text: {
            content: name,
          },
        },
      ],
    },
    email: {
      email,
    },
    projects: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: projects,
          },
        },
      ],
    },
    uploadThingLink: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: uploadThingLink,
          },
        },
      ],
    },
  },
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content,
            },
          },
        ],
      },
    }
  ],
});

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function POST(request: NextRequest) {
  const headersList = headers();
  if( headersList.get('Authorization') !== process.env.NOTION_DATABASE_ID) {
    return NextResponse.json({ success: false });
  }

  console.log('route')

  const ip = headersList.get("x-real-ip") ?? '127.0.0.1';

  console.log('ip', ip)

  const ratelimit = new Ratelimit({
    limiter: Ratelimit.fixedWindow(1, '300 s'),
    redis: Redis.fromEnv(),
  });

  const ratelimitResponse = await ratelimit.limit(ip);

  console.log(ratelimitResponse.success)

  if (!ratelimitResponse.success) {
    return NextResponse.json(
      { error: `Too many requests, please try again in 5 minutes` },
      { status: 429 }
    );
  }
  
  const response = new Response(request.body);
  const params = await response.json();

  const { name, message, email, projects, uploadThingLink } = inputSchema.parse(params);

  const notionObject = createContactObject({
    name,
    email,
    content: message,
    projects,
    uploadThingLink,
  });

  await notion.pages.create(notionObject as any);

  return NextResponse.json({ success: true });
}