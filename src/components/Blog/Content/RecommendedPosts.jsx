import React from 'react';
import Section from '../../Section';
import styles from './index.module.scss';
import Posts from '../Posts';
import Typography from '../../Typography';
import blogPostingOverrides from '../../../content/blog-post-rating-overrides/blog-post-rating-overrides.json';

const selectRandomBlogPost = (posts, selectedPosts = []) => {
  if (posts.length === 0) {
    return [posts, selectedPosts];
  }

  const max = posts.reduce((a, b) => a + b.rating, 0);
  const selected = Math.round(Math.random() * max);

  let total = 1;
  let selectedPost = null;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (total + post.rating > selected) {
      selectedPost = post;
      break;
    }
    total = total + post.rating;
  }

  selectedPosts.push(selectedPost);

  const remainingPosts = posts.filter((post) => post.meta.id !== selectedPost.meta.id);

  return [remainingPosts, selectedPosts];
};

const getRecommendedPosts = (
  allPages,
  pathname,
  overridenRating = [...blogPostingOverrides],
  totalRecommendedPosts = 3,
) => {
  const rating = 5;

  const blogKeys = Object.keys(allPages).filter(
    (key) => key.includes('blog') && key !== '/blog/' && key !== pathname,
  );

  let blogs = blogKeys.map((key) => {
    const overridenPost = overridenRating.find((post) => post.id === allPages[key].meta.id);
    if (overridenPost) {
      return { ...allPages[key], rating: overridenPost.rating };
    }
    return { ...allPages[key], rating };
  });

  let selectedPosts = [];

  for (let i = 0; i < totalRecommendedPosts; i++) {
    [blogs, selectedPosts] = selectRandomBlogPost(blogs, selectedPosts);
  }

  return selectedPosts;
};

const RecommendedPosts = ({ pages, pathname }) => {
  const recommendedPosts = getRecommendedPosts(pages, pathname);

  return (
    <Section blog as="nav" className={styles.recommended}>
      <Typography
        element="h2"
        fontSize={50}
        fontWeight={700}
        color="gray_2"
        className={styles.title}
      >
        Recommended Posts
      </Typography>
      <Posts posts={recommendedPosts} />
    </Section>
  );
};

export default RecommendedPosts;
