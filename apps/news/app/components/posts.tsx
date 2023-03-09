"use client"
import { useState, useRef } from "react";
import PostItem, { Post } from "./post-item";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function Posts({posts}: {posts:Post[]}) {

  const [open, setOpen] = useState(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [parent] = useAutoAnimate(/* optional config */)

  const [newPost, setPost] = useState<Post[]>([])

  const get = async () => {
    try {
      const response = await fetch('/api/post', {method: 'POST', body: JSON.stringify({url: inputRef?.current?.value })})
    
      if(!response.ok) {
        throw new Error();
      } 
  
      const data = await response.json();
      data.data.id = 1234;
      setPost([data.data])
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex gap-2">
        <input ref={inputRef} placeholder="Unesite url" type="text"  />
        <button onClick={get}>Generate</button>
      </div>
      <ul ref={parent} className="flex-center w-full px-4 max-w-5xl">
        {
          newPost.map((post) => {
            return <PostItem key={post.id} post={post} open={open} setOpen={setOpen}></PostItem>
          })
        }
      </ul>
    </div>
  )
}