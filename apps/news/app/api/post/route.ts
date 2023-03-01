import { extract } from '@extractus/article-extractor'

export async function GET(request: Request) {
  console.log(request.body);
  const input = 'https://www.cnbc.com/2022/09/21/what-another-major-rate-hike-by-the-federal-reserve-means-to-you.html';
  const options = {descriptionLengthThreshold: 1000, wordsPerMinute: 150, contentLengthThreshold: 200, descriptionTruncateLen: 1500};

  const article = await extract(input, options);

  return Response.json(article)
}