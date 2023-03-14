export default function PostItem({post, setOpen, open}: {post:Post, setOpen: any, open: any}) {
  
  const {
    id,
    title,
    category,
    author,
    summary,
    img,
    url,
    publishedAt,
  } = post;

  const date = publishedAt ? new Date(publishedAt) : null;

  const [month, day, year] = [date ? date.getMonth() + 1 : null, date?.getDate(), date?.getFullYear()];

  const categoryDate = [`${category}`, `${month}/${day}/${year}`].filter(Boolean).join(' | ');

  return (
    <li className="flex justify-between space-x-3 relative bg-white hover:bg-gray-50 border-b-2 border-blue-200">
      <div className="w-full flex-1">
        <div onClick={() => (open === id ? setOpen(null) : setOpen(id))} className="block focus:outline-none scroll-mt-16 px-4 py-4 cursor-pointer">
          <h1 className="text-2xl font-bold text-sky-800 select-none">{title}</h1>
          <p className="text-lg text-gray-500 select-none">{categoryDate}</p>
        </div>
        <div className={`px-4 transition-all ease-in-out duration-200 ${open === id ? 'visible' : 'invisible'}`}>
          {img ? <div className="flex justify-center m-0 pt-3 w-full"><img className="max-h-500px" src={img} alt="post image" /></div> : null}
          {author ? <div>{`Author: ${author}`}</div> : null}
          {summary.split('\n\n').map(summary=> {
            return <p key={summary} className="py-4 flex flex-col gap-4">{summary}</p>
          })}
          <a className="inline-block mb-2 text-sky-300 hover:text-sky-500" href={url}>{url}</a>
        </div>
      </div>
    </li>
  );
}

export type Post = {
  id: number,
  title: string,
  author?: string
  category?: string,
  publishedAt?: string,
  summary: string,
  img?: string,
  url: string
}