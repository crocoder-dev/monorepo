"use client"

export default function PostItem({post, setOpen, open}: {post:Post, setOpen: any, open: any}) {
  const date = new Date(post?.publishedAt)
  return (
    <li className="flex justify-between space-x-3 relative bg-white hover:bg-gray-50 border-b-2 border-blue-200">
      <div className="w-full flex-1">
        <div onClick={() => (open === post.id ? setOpen(null) : setOpen(post?.id))} className="block focus:outline-none scroll-mt-16 px-4 py-4 cursor-pointer">
          <h1 className="text-2xl font-bold text-sky-800 select-none">{post?.title}</h1>
          <p className="text-lg text-gray-500 select-none">{post?.category} | {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</p>
        </div>
        <div className={`px-4 transition-all ease-in-out duration-200 ${open === post?.id ? 'visible max-h-[75em]' : 'invisible max-h-0'}`}>
          {post.img ? <div className="flex justify-center m-0 pt-3 w-full"><img className="max-h-500px" src={post?.img} alt="post image" /></div> : ''}
          {post.author ? <div>`Author: ${post?.author}`</div> : ''}
          {post.summary.split('\n\n').map(summary=> {
            return <p className="py-4 flex flex-col gap-4">{summary}</p>
          })}
          <a className="inline-block mb-2 text-sky-300 hover:text-sky-500" href={post?.url}>{post?.url}</a>
        </div>
      </div>
    </li>
  );
}

export type Post = {
    id: number,
    title: string,
    author: string
    category: string,
    publishedAt: string,
    summary: string,
    img: string,
    url: string
}
