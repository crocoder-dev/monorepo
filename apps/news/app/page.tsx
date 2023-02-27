"use client"
import { useEffect, useState } from "react";
import PostItem from "./components/post-item";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(null);

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(
        (result) => {
          setPosts(result);
        },
        (error) => {
        }
      )
  }, [])

  return (
    <div className="flex justify-center">
      <ul ref={parent} className="flex-center w-full px-4 max-w-5xl">
        {
          (posts as any[]).map(post => {
            return <PostItem key={post.id} post={post} open={open} setOpen={setOpen}></PostItem>
          })
        }
      </ul>
    </div>
  )
}