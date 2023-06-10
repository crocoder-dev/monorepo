'use client';

import { ChangeEvent, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '../api/uploadthing/core';
import '@uploadthing/react/styles.css';
import { setData } from './actions';

export default function Devs() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadThingLink, setUploadThingLink] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUploadThingLink(value);
  };
  
  return (
    // <div className="flex min-h-screen w-full items-center justify-center bg-slate-700 text-black">
    <div className="bg-gradient-radial flex min-h-screen w-full items-start justify-center from-blue-900 to-slate-900 text-white sm:items-center">
      <form
        className="mt-0 flex h-fit w-[500px] flex-col gap-4 rounded-none bg-slate-900 py-4 px-6 opacity-80 shadow-2xl sm:mt-4 sm:rounded-xl"
        action={setData}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name*:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            className="w-full rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email*:</label>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            className="rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="projects">Link to projects you are most proud of:</label>
          <textarea
            id="projects"
            name="projects"
            placeholder="Project links"
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cv">Upload your CV:</label>
          <input
            type="text"
            id="uploadThingUrl"
            name="uploadThingUrl"
            value={uploadThingLink}
            onChange={handleChange}
            className="hidden"
          />
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res) {
                setUploadThingLink(res[0].fileUrl)
                setFileUploaded(true);
                alert('Upload Completed');
                console.log(res)
              }
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className="text-center">{fileUploaded ? 'File uploaded' : 'No file uploaded'}</div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message for reader:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-fit rounded-full !bg-indigo-700 px-6 py-2 font-bold shadow-xl transition-all hover:!bg-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
