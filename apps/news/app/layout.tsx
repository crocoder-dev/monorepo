import '../styles/globals.css';
import Nav from './components/nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-sans dark:bg-slate-800">
        <Nav />
        <div className="pt-12">{children}</div>
        <script async defer src="/sa/latest.js"></script>
        <noscript>
          <img src="/sa/noscript.gif" alt="" />
        </noscript>
      </body>
    </html>
  );
}
