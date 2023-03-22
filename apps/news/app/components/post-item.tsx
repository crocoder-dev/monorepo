export default function PostItem({post}: {post:Post}) {
  
  const {
    id,
    title,
    // category,
    // author,
    summary,
    // img,
    url,
    publishedAt,
    insight,
    emoji
  } = post;


  // const date = publishedAt ? new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric', year: 'numeric'}).format(new Date(publishedAt)) : null;

  // const categoryDate = [`${category?.toUpperCase()}`, `${date}`].filter(Boolean).join(' | ');

  return (
    <li className="flex justify-between space-x-3 relative">
      <div className="w-full flex-1">
        <div className="block focus:outline-none scroll-mt-16 px-4 py-4">
          <h1 className="text-2xl font-bold text-sky-800">{emoji} <span className="underline underline-offset-8">{title}</span></h1>
          {/* <p className="text-lg text-gray-500 select-none">{categoryDate}</p> */}
        </div>
        <div className="px-4">
          {/* {img ? <div className="flex justify-center m-0 pt-3 w-full"><img className="max-h-[500px]" src={img} alt="post image" /></div> : null} */}
          {/* {author ? <div>{`Author: ${author}`}</div> : null} */}
          <span className="font-bold">TL;DR: </span>
          {summary.split('\n\n').map((summary, i)=> {
            return <p key={id + '-' + i} className="py-4 flex flex-col gap-4 text-justify">{summary}</p>
          })}
          {insight ? <p className="py-4 flex flex-col gap-4 text-justify"><span className="font-bold">Insight: </span>{insight}</p> : null}
          <span className="px-1.5 py-0.5 bg-blue-300 rounded">&#10145;</span>&nbsp;<a target="_blank" rel="noopener noreferrer" className="inline-block mb-2 text-sky-500 underline underline-offset-4 hover:text-sky-300" href={url}>You can read the full article here...</a>
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
  insight?: string,
  emoji?: string,
  img?: string,
  url: string
}