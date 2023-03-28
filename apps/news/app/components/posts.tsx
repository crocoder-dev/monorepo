import PostItem from "./post-item";
import { Post } from '@crocoder-dev/db/schema';

export default function Posts({posts}: {posts: Post[]}) {

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col gap-2 w-full max-w-3xl px-8 pb-8 pt-4">
        <h1 className="text-3xl font-semibold text-gray-800">📰 <span>NASLOV NASLOV NASLOV NASLOV</span></h1>
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