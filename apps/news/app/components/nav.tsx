import Link from "next/link";

export default function Nav() {
  return (
    <div className="fixed flex justify-center w-full px-4 bg-blue-200 z-50">
      <nav className="flex justify-between items-center w-full max-w-screen-2xl">
        <Link className="inline-block py-3 text-2xl font-bold leading-none text-sky-800" href={'/'}>NEWS</Link>
        {/* <img className="w-8 h-8 text-sky-800 cursor-pointer" src="/media/nav-options.svg" alt="" /> */}
      </nav>
    </div>
  );
}
