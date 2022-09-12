import { MDXProvider } from "@mdx-js/react";
import Typography from "../../components/Typography";
import PageLayout from "../PageLayout";
import Header from "../../components/Blog/Content/Header";
import Body from "../../components/Blog/Content/Body";
import About from "../../components/Blog/Content/About";
import BlogPostingJSONLDHead from "../../components/JSONLD/BlogPostingJSONLDHead";
import authorsJSON from "../../content/authors/authors.json";
import { useRef } from "react";
import RecommendedPosts from "../../components/Blog/Content/RecommendedPosts";
import styles from "./index.module.scss";

const { authors } = authorsJSON;

const idText = (textContent) =>
  textContent.replace(/\W/g, " ").trim().replace(/ /g, "-").toLowerCase();

const components = {
  h1: (props) => (
    <Typography
      element="h1"
      id={idText(props.children)}
      fontFamily="rubik"
      {...props}
    />
  ),
  h2: (props) => (
    <Typography
      element="h2"
      id={idText(props.children)}
      fontFamily="rubik"
      {...props}
    />
  ),
  h3: (props) => (
    <Typography
      element="h3"
      id={idText(props.children)}
      fontFamily="rubik"
      {...props}
    />
  ),
  h4: (props) => (
    <Typography
      element="h4"
      id={idText(props.children)}
      fontFamily="rubik"
      {...props}
    />
  ),
  p: (props) => (
    <Typography element="p" color="$gray_11" fontFamily="rubik" {...props} />
  ),
  span: (props) => <Typography {...props} />,
  a: (props) => <a {...props}>{props.children}</a>,
};

const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

export default function BlogLayout({
  meta,
  children,
  recommendedPosts,
  pathname,
}) {
  const author = authors.find((author) => author.id === meta.author);
  const editor = authors.find((author) => author.id === meta.editor);

  const bodyRef = useRef(null);

  return (
    <MDXProvider components={components}>
      <PageLayout
        title={meta.title}
        slug={pathname}
        description={meta.description}
        stickyFooter
      >
        <BlogPostingJSONLDHead
          articleSlug={pathname}
          articleName={meta.title}
          articleHeadline={meta.title}
          articleBody={bodyRef?.current?.textContent}
          articleAbout={meta.description}
          articleAbstract={meta.abstract}
          articleImageUrl={meta.image.src}
          articleDateCreated={formatDate(meta.date)}
          articleDatePublished={formatDate(meta.date)}
          articleDateModified={formatDate(meta.updatedAt)}
          authorName={author.name}
          editorName={editor.name}
        />
        <article className={styles.blog}>
          <Header
            author={author}
            image={meta.image}
            title={meta.title}
            lastUpdatedAt={meta.updatedAt}
          />
          <Body bodyRef={bodyRef}>{children}</Body>
          <About author={author} />
          <RecommendedPosts posts={recommendedPosts} />
        </article>
      </PageLayout>
    </MDXProvider>
  );
}
