import Posts from "../components/posts";
import { getDB } from "@crocoder-dev/db";
import { editions } from '@crocoder-dev/db/schema';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { redirect } from "next/navigation";

export const revalidate = 1800;

export const runtime = 'experimental-edge';

export default async function Editions(context: { params: { slug: string } }) {
  const  { slug } = context.params;
  const db = getDB();

  const editionWithPosts = await db.select({ title: editions.title, date: editions.date, slug: editions.slug, description: editions.description, abstract: editions.abstract, updatedAt: editions.updatedAt, createdAt: editions.createdAt, post: databasePosts}).from(editions).innerJoin(databasePosts, eq(editions.id, databasePosts.editionId)).where(eq(editions.slug, slug));

  if (editionWithPosts.length === 0) {
    redirect('/');
  }

  const posts = editionWithPosts.map(e => e.post);
  const {post: _, ...edition} = editionWithPosts[0]!;

  return (
    <Posts posts={posts} edition={edition}/>
  )
}