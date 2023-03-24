import { Post } from '@crocoder-dev/db/schema';

export default function PostItem({post}: {post:Post}) {
  
  const {
    id,
    title,
    summary,
    url,
    insight,
  } = post;

  return (
    <li className="flex justify-between space-x-3 relative">
      <div className="w-full flex-1">
        <div className="block focus:outline-none scroll-mt-16 px-4 py-4">
          <h1 className="text-2xl font-bold text-sky-800"><span className="underline underline-offset-8">{title}</span></h1>
        </div>
        <div className="px-4">
          <span className="font-bold">📰 TL;DR: </span>
          {summary.split('\n\n').map((summary, i)=> {
            return <p key={id + '-' + i} className="py-4 flex flex-col gap-4 text-justify">{summary}</p>
          })}
          {insight ? <p className="py-4 flex flex-col gap-4 text-justify"><span className="font-bold">💡 Insight: </span>{insight}</p> : null}
          <span className="px-1.5 py-0.5 bg-blue-300 rounded">&#10145;</span>&nbsp;<a target="_blank" rel="noopener noreferrer" className="inline-block mb-2 text-sky-500 underline underline-offset-4 hover:text-sky-300" href={url}>You can read the full article here...</a>
        </div>
      </div>
    </li>
  );
}
