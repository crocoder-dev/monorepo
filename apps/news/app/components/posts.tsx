"use client"
import { useEffect, useState } from "react";
import PostItem, { Post } from "./post-item";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Posts({posts}: {posts:Post[]}) {

  const [open, setOpen] = useState(null);

  const [parent] = useAutoAnimate(/* optional config */)

  const get = () => {
    fetch('http://localhost:3000/api/post')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
      (error) => {
        
      }
    )
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <button onClick={()=> get()}>Button</button>
      <ul ref={parent} className="flex-center w-full px-4 max-w-5xl">
        {
          (posts).map((post) => {
            return <PostItem key={post.id} post={post} open={open} setOpen={setOpen}></PostItem>
          })
        }
      </ul>
    </div>
  )
}