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

  // const allowRequest = async (request: NextRequest) => {
  //   try {
  //     const ip = request.ip ?? '127.0.0.1';
  
  //     const ratelimit = new Ratelimit({
  //       limiter: Ratelimit.fixedWindow(1, '30 s'),
  //       /** Use fromEnv() to automatically load connection secrets from your environment
  //        * variables. For instance when using the Vercel integration.
  //        *
  //        * This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
  //        * your environment using `process.env`.
  //        */
  //       redis: Redis.fromEnv(),
  //     });
  
  //     const response = await ratelimit.limit(ip);
  //     return response;
  //   } catch (error) {
  //     throw {
  //       body: {
  //         message: error,
  //       },
  //     };
  //   }
  // };
  
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

  const notionResponse = await notion.pages.create(notionObject as any);

  return NextResponse.json({ success: true });
}