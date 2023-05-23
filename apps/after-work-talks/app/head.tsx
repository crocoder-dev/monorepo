export default function Head() {
  return (
    <>
      <title>After Work Talks</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="After Work Talks" />
      <link rel="icon" href="/favicon.ico" />
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
