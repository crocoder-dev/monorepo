'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Upolad from '../components/upolad';

export default function Devs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    projects: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/notion-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    <div className="font-fira flex min-h-screen w-full items-center justify-center bg-slate-700 text-black">
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex h-fit max-w-[900px] flex-col gap-4 rounded-xl bg-slate-300 py-4 px-6"
        action=""
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">First name*:</label>
            <input
              id="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="rounded-lg border-2 border-slate-600 bg-transparent py-2 px-4 focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last name*:</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="rounded-lg border-2 border-slate-600 bg-transparent py-2 px-4 focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email*:</label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border-2 border-slate-600 bg-transparent py-2 px-4 focus:outline-none"
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
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-transparent py-2 px-4 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="cv">Upload your CV:</label>
          <Upolad />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="message">Message for reader:</label>
          <textarea
            id="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[200px] rounded-lg border-2 border-slate-600 bg-transparent py-2 px-4 focus:outline-none"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
