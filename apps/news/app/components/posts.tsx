"use client"
import { useEffect, useState, useRef } from "react";
import PostItem, { Post } from "./post-item";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Posts({posts}: {posts:Post[]}) {

  const [open, setOpen] = useState(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [parent] = useAutoAnimate(/* optional config */)

  const get = () => {
    fetch('/api/post', {method: 'POST', body: JSON.stringify({url: inputRef?.current?.value })})
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
      <div>
        <input ref={inputRef} placeholder="ovdje" type="text"  />
        <button onClick={()=> get()}>Button</button>
      </div>
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