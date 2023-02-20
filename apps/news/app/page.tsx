import PostItem from "./components/post-item";

export default async function Home() {
  const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await request.json();

  return (
    <div className="w-screen flex justify-center">
      <div className="flex-center w-full max-w-5xl">
        {
          (posts as any[] ).map(post => {
            return <PostItem key={post.id} post={post}></PostItem>
          })
        }
      </div>
    </div>
  )
}