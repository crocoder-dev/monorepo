import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@crocoder-dev/db';
import { editions } from '@crocoder-dev/db/schema';
import { z } from 'zod';
import { headers } from 'next/headers';

const inputSchema = z.object({
  title: z.string(),
  date: z.number(),
  slug: z.string(),
});

export async function POST(request: NextRequest) {
  const headersList = headers();
  if( headersList.get('Authorization') !== process.env.API_KEY) {
    return NextResponse.json({ success: false });
  }
  const response = new Response(request.body);
  const params = await response.json();


  const { title, date, slug } = inputSchema.parse(params);

  const db = getDB();

  await db.insert(editions).values({
    title,
    date: new Date(date),
    slug,
  });

  

  return NextResponse.json({ success: true });
}
