import Link from "next/link";
import PostItem from "../../components/post-item";

export default async function PostFull({params}: any) {
  const { slug } = params;

  const request = await fetch(`https://jsonplaceholder.typicode.com/posts/`);
  const posts = await request.json();
  return (
    <div className="flex justify-center">
      <div className="flex-center w-full px-4 max-w-5xl font-sans">
        {
          (posts as any[]).map((post) => {
            if (post.id == slug) {
              return (
                <div key={post.id} id={post.id} className="px-4">
                  <Link href={'/'} className="block text-2xl my-4 font-bold text-sky-800">{post.title}</Link>
                  <img className="m-0 w-full" src="https://miro.medium.com/max/1000/1*KDMx1YspSrBcFJG-NDZgDg.png" alt="" />
                  <div className="pb-4 text-gray-500 flex justify-between"><span>AUTOMATION | TODAY</span><span>color filter?</span></div>
                  <p className="py-4">{post.body}</p>
                </div>
              )
            }
            return <PostItem key={post.id} post={post}></PostItem>
          })
        }
      </div>
    </div>
  );
}
