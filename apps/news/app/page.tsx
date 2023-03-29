import Posts from "./components/posts";
import { getDB } from '@crocoder-dev/db';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { editions as databaseEditions } from '@crocoder-dev/db/schema';

export default async function Home() {

  const db = getDB();

  const posts = await db.select().from(databasePosts);

  const editions = await db.select().from(databaseEditions);

  return (
    <Posts posts={posts} />
  )
}