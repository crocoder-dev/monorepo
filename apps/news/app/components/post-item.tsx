import { Post } from '@crocoder-dev/db/schema';
export default function PostItem({post}: {post: Pick<Post, "id" | "title" | "summary" | "url" | "insight">}) {
  
  const {
    id,
    title,
    summary,
    url,
    insight,
  } = post;
  
  return (
    <article className="flex justify-between space-x-3 relative border-b-sky-400 dark:border-b-sky-800 border-b-4 py-10 first:pt-0 last:border-b-0">
      <div className="w-full flex-1 dark:text-white">
        <div className="block scroll-mt-16 px-4 py-4">
          <h2 className="text-2xl font-semibold"><span className="underline underline-offset-7">{title}</span></h2>
        </div>
        <div className="px-4">
          {summary.split('\n\n').map((summary: string, i: number)=> {
            return <p key={id + '-' + i} className="py-4 text-justify">{i === 0 ? (<span>📰<span className="font-semibold underline">TL;DR -</span> </span>) : null}<span className='text-gray-800 dark:text-gray-100'>{summary}</span></p>
          })}
          {insight ? <p className="py-4 text-justify">💡<span className="font-semibold underline">Insight -</span> <span className='text-gray-800 dark:text-gray-100'>{insight}</span></p> : null}
          <span className="px-1.5 py-0.5">➡️</span>&nbsp;<a target="_blank" href={`${url}?ref=news.crocoder.dev`} rel="noopener noreferrer" title={url} className="inline-block mb-2 font-semibold text-sky-600 dark:text-sky-300 underline underline-offset-4 cursor-pointer hover:text-sky-300 dark:hover:text-sky-400">You can read the full article here...</a>
        </div>
      </div>
    </article>
  );
}
