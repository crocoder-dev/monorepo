import PostItem from "../../components/post-item";
import { Post } from '@crocoder-dev/db/schema';
import { getDB } from "@crocoder-dev/db";
import { editions as databaseEditions } from '@crocoder-dev/db/schema';
import { posts as databasePosts } from '@crocoder-dev/db/schema';
import { eq } from 'drizzle-orm/expressions';

export default async function Posts(context: any) {
  const  { id } = context.params;
  const db = getDB();

  const posts = await db.select().from(databasePosts).where(eq(databasePosts.editionId, id));

  const edition = await db.select().from(databaseEditions).where(eq(databaseEditions.id, id));

  console.log(edition)

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col gap-2 w-full max-w-3xl px-8 pb-8 pt-4">
        <h1 className="text-3xl font-semibold text-gray-800">📰 <span>{edition[0]?.title}</span></h1>
        <h2 className="text-xl  text-slate-400">PODNASLOV PODNASLOV PODNASLOV PODNASLOV PODNASLOV PODNASLOV</h2>
      </div>
      <ul className="flex-center w-full px-4 max-w-3xl">
        {
          posts.map((post) => {
            return <PostItem key={post.id} post={post}></PostItem>
          })
        }
      </ul>
    </div>
  )
}