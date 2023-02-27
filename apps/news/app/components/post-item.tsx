import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PostItem({post, setOpen, open}: {post:Post, setOpen: any, open: any}) {
  return (
    <li className="flex justify-between space-x-3 relative bg-white py-4 px-4 hover:bg-gray-50 border-b-2 border-blue-200">
      <div className="w-full flex-1">
        <div className="block focus:outline-none scroll-mt-16 cursor-pointer" onClick={() => (open === post.id ? setOpen(null) : setOpen(post.id))}>
          <h1 className="truncate text-2xl font-bold text-sky-800">{post.title}</h1>
          <p className="truncate text-lg text-gray-500">AUTOMATION | TODAY</p>
        </div>
        <div className={`transition-all ease-in-out duration-200 ${open === post.id ? 'visible max-h-screen' : 'invisible max-h-0'}`}>
          <img className="m-0 pt-3 w-full" src="https://miro.medium.com/max/1000/1*KDMx1YspSrBcFJG-NDZgDg.png" alt="" />
          <p className="py-4">{post.body}</p>
        </div>
      </div>
    </li>
  );
}

export type Post = {
    id: number,
    title: string,
    category: string,
    date: string,
    content: string,
    body: string
}
