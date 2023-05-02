import PostItem from "./post-item";
import { Edition, Post } from '@crocoder-dev/db/schema';
import Head from 'next/head'
import EditionJSONLDHead from "./JSONLD/EditionJSONLDHead";

export default function Posts({posts, edition}: {posts: Post[], edition: Pick<Edition, "title" | "date" | "abstract" | "description" | "slug">}) {

  const {title, date} = edition;

  const dateFormated = new Intl.DateTimeFormat('en-GB', { weekday: 'long',month: 'long', day: 'numeric'}).format(date);

  return (
    <div className="flex justify-center items-center flex-col">
      <Head>
        <EditionJSONLDHead edition={edition} />
      </Head>
      <div className="flex flex-col gap-2 w-full max-w-3xl px-8 pb-8 pt-4">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">📰 <span>Tech Leadership Roundup - {dateFormated}</span></h1>
        <div className="text-xl text-slate-400 dark:text-slate-400">Tech news tailored for CTOs, VPs of engineering and Tech Leads</div>
      </div>
      <main className="flex-center w-full px-4 max-w-3xl">
        {
          posts.map((post) => {
            return <PostItem key={post.id} post={post}></PostItem>
          })
        }
      </main>
    </div>
  )
}