

export default async function PostFull({params}: any) {
  const { slug } = params;

  const request = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const post = await request.json();
  
  return (
    <div className="flex w-screen justify-center">
      <div className="flex-center w-full max-w-5xl">
        <h1 className="text-2xl py-4 font-bold text-sky-800">{post.title}</h1>
        <img className="m-0" src="https://miro.medium.com/max/1000/1*KDMx1YspSrBcFJG-NDZgDg.png" alt="" />
        <p className="py-4">{post.body}</p>
      </div>
    </div>
  );
}
