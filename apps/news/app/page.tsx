import Posts from "./components/posts";
import { getDB } from '@crocoder-dev/db';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { editions as databaseEditions } from '@crocoder-dev/db/schema';
import { eq, desc } from 'drizzle-orm/expressions';
import { sql } from 'drizzle-orm';

export default async function Home() {

  const db = getDB();

  const lastEdition = db.select().from(databaseEditions).orderBy(desc(databaseEditions.date)).limit(1).as('lastEdition');
  const editionWithPosts = await db.select({title: sql<string>`lastEdition.title`, date: sql<Date>`lastEdition.date`, post: databasePosts}).from(lastEdition).innerJoin(databasePosts, eq(lastEdition.id, databasePosts.editionId));

  if(editionWithPosts.length === 0) {
    return null;
  }

  const posts = editionWithPosts.map(e => e.post);

  const {title, date} = editionWithPosts[0]!;

  return (
    <Posts posts={posts} edition={{title, date: new Date(date)}}/>
  )
}