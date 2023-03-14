"use client"

import { useState } from "react";
import PostItem, { Post } from "./post-item";

export default function Posts({posts}: {posts:Post[]}) {
  const [open, setOpen] = useState(null);

  return (
    <div className="flex justify-center items-center flex-col">
      <ul className="flex-center w-full px-4 max-w-5xl">
        {
          posts.map((post) => {
            return <PostItem key={post.id} post={post} open={open} setOpen={setOpen}></PostItem>
          })
        }
      </ul>
    </div>
  )
}