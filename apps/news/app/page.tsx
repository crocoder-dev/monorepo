import Posts from "./components/posts";
import { connect } from '@planetscale/database';
import { env } from '../env/server.mjs';
import { Post } from './components/post-item';

const dbconfig = {
  url: env.DATABASE_URL
}

export default async function Home() {

  const connection = await connect(dbconfig);
  const queryResult = await connection.execute('SELECT * FROM Post');

  const posts = queryResult.rows as Post[];

  return (
    <Posts posts={posts} />
  )
}