import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function PostItem({post, setOpen, open}: {post:Post, setOpen: any, open: any}) {
  return (
    <li className="flex justify-between space-x-3 relative bg-white hover:bg-gray-50 border-b-2 border-blue-200 cursor-pointer">
      <div className="w-full flex-1">
        <div onClick={() => (open === post.id ? setOpen(null) : setOpen(post.id))} className="block focus:outline-none scroll-mt-16 px-4 py-4">
          <h1 className="text-2xl font-bold text-sky-800 select-none">{post.title}</h1>
          <p className="text-lg text-gray-500 select-none">AUTOMATION | TODAY</p>
        </div>
        <div className={`px-4 transition-all ease-in-out duration-200 ${open === post.id ? 'visible max-h-screen' : 'invisible max-h-0'}`}>
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
