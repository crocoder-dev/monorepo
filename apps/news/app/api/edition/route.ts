import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '../../../env/server.mjs';
import { getDB } from '@crocoder-dev/db';
import { editions } from '@crocoder-dev/db/schema';


export async function POST(request: NextRequest) {
  const response = new Response(request.body);
  const { id, title, date } = await response.json();

  const db = await getDB();

  await db.insert(editions).values({
    title,
    id,
    date: new Date(date)
  });

  return NextResponse.json({ success: true });
}