/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Typography from '../../components/Typography';
import Code from '../../components/Code';
import BlogLink from '../../components/Blog/BlogLink';
import BlogHr from '../../components/Blog/BlogHr';
import BlogUl from '../../components/Blog/BlogUl';
import DefaultLayout from '../DefaultLayout';
import Header from '../../components/Blog/Content/Header';
import Body from '../../components/Blog/Content/Body';
import About from '../../components/Blog/Content/About';
import authors from '../../content/authors/authors.json';
import RecommendedPosts from '../../components/Blog/Content/RecommendedPosts';

const idText = (textContent) => textContent.replace(/\W/g, ' ').trim().replace(/ /g, '-').toLowerCase();

const commonHeadingStyles = {
  lineHeight: '1.25',
  marginBottom: '16px',
  marginTop: '24px',
  scrollMarginTop: '100px',
};

const components = {
  h1: (props) => (
    <Typography
      element="h1"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{ ...commonHeadingStyles, borderBottom: '1px solid', paddingBottom: '0.3em' }}
      {...props}
    />
  ),
  h2: (props) => (
    <Typography
      element="h2"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{
        ...commonHeadingStyles,
        borderBottom: '1px solid',
        paddingBottom: '0.3em',
        scrollMarginTop: '100px',
        marginTop: '64px',
      }}
      {...props}
    />
  ),
  h3: (props) => (
    <Typography
      element="h3"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{ ...commonHeadingStyles, marginTop: '64px' }}
      {...props}
    />
  ),
  h4: (props) => (
    <Typography
      element="h4"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{ ...commonHeadingStyles }}
      {...props}
    />
  ),
  h5: (props) => (
    <Typography
      element="h5"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{ ...commonHeadingStyles }}
      {...props}
    />
  ),
  h6: (props) => (
    <Typography
      element="h6"
      id={idText(props.children)}
      color="gray_2"
      fontWeight={600}
      fontFamily="rubik"
      style={{ ...commonHeadingStyles }}
      {...props}
    />
  ),
  p: (props) => (
    <Typography
      element="p"
      color="gray_11"
      fontFamily="rubik"
      style={{ lineHeight: '28px', marginTop: '0', marginBottom: '28px' }}
      {...props}
    />
  ),
  span: (props) => <Typography {...props} />,
  a: (props) => <BlogLink {...props} />,
  ul: (props) => <BlogUl {...props} />,
  hr: () => <BlogHr />,
  pre: (props) => <Code {...props} />,
  blockquote: (props) => <Typography element="blockquote" {...props} />,
};

const BlogLayout = ({
  meta, children, pages, pathname,
}) => {
  const author = authors.find((a) => a.id === meta.author);

  return (
    <MDXProvider components={components}>
      <DefaultLayout stickyFooter>
        <article>
          <Header
            author={author}
            image={meta.image}
            title={meta.title}
            lastUpdatedAt={meta.updatedAt}
          />
          <Body>{children}</Body>
          <About author={author} />
          <RecommendedPosts pages={pages} pathname={pathname} />
        </article>
      </DefaultLayout>
    </MDXProvider>
  );
};

export default BlogLayout;
