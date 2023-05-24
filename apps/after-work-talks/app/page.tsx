export default function Home() {
  const discordUrl = 'https://discord.gg/QTqArvv756';

  return (
    <div className="w-screen h-screen font-fira flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:bg-slate-700">
      <div className="flex items-center justify-center w-96 h-96 rounded-3xl bg-blue-300 shadow-xl dark:bg-slate-800">
        <a
          target="_blank"
          href={discordUrl}
          rel="noopener noreferrer"
          title={discordUrl}
          className="px-6 py-4 bg-indigo-700 dark:bg-indigo-500 shadow-xl transition-all rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-400 inline-block cursor-pointer font-bold text-white"
        >
          Join our discord
        </a>
      </div>
    </div>
  );
}
