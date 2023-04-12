export default function Head() {
  return (
    <>
      <title>Tech Leadership Roundup</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Tech Leadership Roundup brings you tech news tailored for CTOs, VPs of engineering and Tech Leads." />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const query = window.matchMedia("(prefers-color-scheme: dark)");
          const theme = localStorage.getItem("theme");
          if (theme === "dark" || (!theme && query.matches)) {
            document.documentElement.classList.add("dark");
          }
        `
        }}
        />
    </>
  )
}
