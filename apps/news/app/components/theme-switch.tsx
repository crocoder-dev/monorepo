'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <button className='text-splite-800 outline-0 dark:text-white text-2xl' onClick={changeTheme}>{theme === 'light' ? <FaMoon title='Switch to dark theme' /> : <FaSun title='Switch to light theme' />}</button>
    </>
  );
}
