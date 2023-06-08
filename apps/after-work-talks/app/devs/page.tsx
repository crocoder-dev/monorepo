'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import "@uploadthing/react/styles.css";

export default function Devs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projects: '',
    uploadThingLink: ''
  });

  const [fileUploaded, setFileUploaded] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/notion-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NOTION_DATABASE_ID!
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Poslano :)');
    } else {
        alert('Nesto ne valja :(');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    // <div className="flex min-h-screen w-full items-center justify-center bg-slate-700 text-black">
    <div className="flex min-h-screen w-full items-center justify-center shadow-2xl bg-gradient-radial from-blue-900 to-slate-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex h-fit w-[500px] flex-col gap-4 rounded-xl bg-slate-900 py-4 px-6 opacity-80"
        action=""
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name*:</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="rounded-lg border-2 w-full border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email*:</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="projects">Link to projects you are most proud of:</label>
          <textarea
            id="projects"
            placeholder="Project links"
            value={formData.projects}
            onChange={handleChange}
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cv">Upload your CV:</label>
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {

              if (res) {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  uploadThingLink: res[0].fileUrl,
                }));
                setFileUploaded(true)
              }
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          <div className='text-center'>{fileUploaded ? 'File uploaded' : 'No file uploaded'}</div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message for reader:</label>
          <textarea
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-slate-800 py-2 px-4 focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <button className='px-6 py-2 w-fit bg-indigo-700 shadow-xl transition-all rounded-full hover:bg-indigo-600 font-bold' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
