import Link from "next/link";

export default function PostItem({post}: {post:Post}) {
  
  return (
    <ul role="list" className="divide-y divide-gray-200">
      <li
        key={post.id}
        className="relative bg-white py-4 px-4 hover:bg-gray-50 border-b-2 border-blue-200 transition-all duration-200"
      >
        <div className="flex justify-between space-x-3">
          <div className="w-full flex-1">
            <Link href={{
                  pathname: `/articles/${post.id}`,
                }} className="block focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="truncate text-2xl font-bold text-sky-800">{post.title}</p>
              <p className="truncate text-lg text-gray-500">AUTOMATION | TODAY</p>
            </Link>
          </div>
        </div>
      </li>
    </ul>
  );
}

export type Post = {
    id: number,
    title: string,
    category: string,
    date: string,
    content: string
}
