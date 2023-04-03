import Posts from "../../components/posts";
import { getDB } from "@crocoder-dev/db";
import { editions } from '@crocoder-dev/db/schema';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { redirect } from "next/navigation";

export default async function Editions(context: any) {
  const  { id } = context.params;
  const db = getDB();

  const editionWithPosts = await db.select({ title: editions.title, date: editions.date, post: databasePosts}).from(editions).innerJoin(databasePosts, eq(editions.id, databasePosts.editionId)).where(eq(editions.id, id));
  
  if (editionWithPosts.length === 0) {
    redirect('/');
  }

  const posts = editionWithPosts.map(e => e.post);
  const {post: _, ...edition} = editionWithPosts[0]!;

  return (
    <Posts posts={posts} edition={edition}/>
  )
}