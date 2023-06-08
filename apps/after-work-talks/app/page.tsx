export default function Home() {
  const discordUrl = 'https://discord.gg/QTqArvv756';

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-radial from-blue-900 to-zinc-900">
      <div className="flex items-center justify-center w-96 h-96 rounded-3xl bg-slate-800 shadow-xl opacity-80">
        <a
          target="_blank"
          href={discordUrl}
          rel="noopener noreferrer"
          title={discordUrl}
          className="px-6 py-4 bg-indigo-700 shadow-xl transition-all rounded-full hover:bg-indigo-600 inline-block cursor-pointer font-bold text-white"
        >
          Join our discord
        </a>
      </div>
    </div>
  );
}
