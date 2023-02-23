import "../styles/globals.css";
import Main from "./components/main";
import Nav from "./components/nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-sans">
        <Nav></Nav>
        <Main>{children}</Main>
        {/* <div className="relative top-12">{children}</div> */}
      </body>
    </html>
  )
}
