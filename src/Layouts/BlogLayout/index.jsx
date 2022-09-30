import { MDXProvider } from "@mdx-js/react";
import Typography from "../../components/Typography";
import PageLayout from "../PageLayout";
import Header from "../../components/Blog/Content/Header";
import Body from "../../components/Blog/Content/Body";
import About from "../../components/Blog/Content/About";
import authors from "../../content/authors/authors.json";
import RecommendedPosts from "../../components/Blog/Content/RecommendedPosts";


const styles = {};

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

export default function BlogLayout({ meta, children, recommendedPosts = [] }) {
  const author = authors.find((author) => author.id === meta.author);

  return (
    <MDXProvider components={components}>
      <PageLayout stickyFooter>
        <article className={styles.blog}>
          <Header
            author={author}
            image={meta.image}
            title={meta.title}
            lastUpdatedAt={meta.updatedAt}
          />
          <Body>{children}</Body>
          <About author={author} />
          <RecommendedPosts posts={recommendedPosts} />
        </article>
      </PageLayout>
    </MDXProvider>
  );
}
