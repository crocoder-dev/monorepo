import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { z } from 'zod';

const inputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string().optional(),
  projects: z.string().optional(),
  uploadThingLink: z.string().optional(),
});

const createContactObject = ({name, email, content, projects, uploadThingLink}: {name: string, email: string, content: string, projects: string, uploadThingLink: string}) => ({
  parent: {
    database_id: process.env.NOTION_DATABASE_ID,
  },
  properties: {
    title: {
      rich_text: [
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
      url: projects,
    },
    uploadThingLink: {
      url: uploadThingLink,
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
  const response = new Response(request.body);
  const params = await response.json();


  const { firstName, lastName, message, email, projects, uploadThingLink } = inputSchema.parse(params);

  const notionResponse = await notion.pages.create(createContactObject({name: `${firstName} ${lastName}`, email, uploadThingLink, projects, content: message}));

  return NextResponse.json({ success: true });
}