import Posts from "./components/posts";

export default async function Home() {
  // const request = await fetch('https://jsonplaceholder.typicode.com/posts');
  // const posts = await request.json();

  return (
    <Posts posts={[]} />
  )
}