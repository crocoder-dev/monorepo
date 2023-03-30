import Posts from "./components/posts";
import { getDB } from '@crocoder-dev/db';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { editions as databaseEditions } from '@crocoder-dev/db/schema';
import { eq, or, desc } from 'drizzle-orm/expressions';

export default async function Home() {

  const db = getDB();
  // .orderBy(desc(databaseEditions.date)).limit(1)

  const editionWithPosts = await db.select({...databaseEditions, post: databasePosts}).from(databaseEditions).innerJoin(databasePosts, eq(databaseEditions.id, databasePosts.editionId)).where(eq(databaseEditions.id, databaseEditions.id));

  const editions = await db.select().from(databaseEditions);

  console.log(editionWithPosts)

  const newest = editions.reduce((prev, current) => {
    return (prev.date > current.date) ? prev : current
  })

  const posts = await db.select().from(databasePosts).where(eq(databasePosts.editionId, newest.id));;

  return (
    <Posts posts={posts} edition={newest}/>
  )
}