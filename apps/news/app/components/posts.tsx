import PostItem from "./post-item";
import { Post } from '@crocoder-dev/db/schema';

export default function Posts({posts}: {posts: Post[]}) {

  return (
    <div className="flex justify-center items-center flex-col">
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