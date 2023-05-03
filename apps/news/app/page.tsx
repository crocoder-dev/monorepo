import Posts from "./components/posts";
import { getDB } from '@crocoder-dev/db';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { editions as databaseEditions } from '@crocoder-dev/db/schema';
import { eq, desc, lte, asc } from 'drizzle-orm/expressions';
import { sql } from 'drizzle-orm';

export const revalidate = 1800;

export const runtime = 'experimental-edge';

export default async function Home() {

  const db = getDB();

  const editions2 = await db.select().from(databaseEditions)

  console.log(editions2)

  const lastEdition = db.select().from(databaseEditions).where(lte(databaseEditions.date, new Date())).orderBy(desc(databaseEditions.date)).limit(1).as('lastEdition');
  
  const editionWithPosts = await db.select({title: sql<string>`lastEdition.title`, slug: sql<string>`lastEdition.slug`, description: sql<string>`lastEdition.description`, abstract: sql<string>`lastEdition.abstract`, createdAt: sql<Date>`lastEdition.created_at`, updatedAt: sql<Date>`lastEdition.updated_at`, date: sql<Date>`lastEdition.date`, post: databasePosts}).from(lastEdition).innerJoin(databasePosts, eq(lastEdition.id, databasePosts.editionId)).orderBy(asc(databasePosts.order));

  if(editionWithPosts.length === 0) {
    return null;
  }

  const posts = editionWithPosts.map(e => e.post);

  const {title, date, abstract, description, slug, updatedAt, createdAt} = editionWithPosts[0]!;

  return (
    <Posts posts={posts} edition={{title, date: new Date(date), abstract, slug, description, updatedAt, createdAt}}/>
  )
}