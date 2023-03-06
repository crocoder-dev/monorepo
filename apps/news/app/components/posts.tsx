"use client"
import { useState, useRef } from "react";
import PostItem, { Post } from "./post-item";
import { useAutoAnimate } from '@formkit/auto-animate/react';

import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { summarize } from "../helpers/openai";

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

        const escapeRegExp = (string: string) => {
          return string.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
        }
        const extractedText = escapeRegExp(result.article.content)
        console.log('This is the extracted text from html: \n' + extractedText)

        summarize(escapeRegExp(result.article.content), 30).then(res => console.log('This is summarized text in 30 sentences: \n', res.choices[0]?.text));
      },
      (error) => {
        console.error(error);
      }
    )
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex gap-2">
        <input ref={inputRef} placeholder="Unesite url" type="text"  />
        <button onClick={()=> get()}>Generate</button>
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