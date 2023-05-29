import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const inputSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    message: z.string().optional(),
    projects: z.string().optional(),
  });

export async function POST(request: NextRequest) {
  const response = new Response(request.body);
  const params = await response.json();


  const { firstName, lastName, message, email, projects } = inputSchema.parse(params);

  console.log(firstName, lastName, email)

  return NextResponse.json({ success: true });
}