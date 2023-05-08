
export default function Share({slug = ''}: {slug: string}) {
  
  return <div className="flex gap-2">
    <a className="pointer" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//news.crocoder.dev/${slug}`} target="a_blank" rel="noopener noreferrer" title="Share to facebook"><img className="transition-all dark:invert dark:hover:contrast-50 hover:contrast-0" src="/media/facebook.svg" alt="facebook" /></a>
    <a className="pointer" href={`https://www.linkedin.com/shareArticle?mini=true&url=https%3A//news.crocoder.dev/${slug}`} target="a_blank" rel="noopener noreferrer" title="Share to linkedin"><img className="transition-all dark:invert dark:hover:contrast-50 hover:contrast-0" src="/media/linkedin.svg" alt="linkedin" /></a>
    <a className="pointer" href={`https://twitter.com/intent/tweet?text=https%3A//news.crocoder.dev/${slug}`} target="a_blank" rel="noopener noreferrer" title="Share to twitter"><img className="transition-all dark:invert dark:hover:contrast-50 hover:contrast-0" src="/media/twitter.svg" alt="twitter" /></a>
  </div>
}