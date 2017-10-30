import React from 'react';
import Link from 'gatsby-link';
import slugify from '../utils/slugify';
import styles from '../components/css/styles.module.css';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

const Post = ({ node }) => (
  <li>
    <Link to={node.frontmatter.slug}>{node.frontmatter.title}</Link>
  </li>
);

const TagList = ({ list }) => {
  return (
    <ul className={styles[`list`] + ` ` + styles['list-wrap']}>
      {list.map((tag, key) => {
        return (
          <li key={key}>
            <Link to={`/tags/` + slugify(tag)}>{tag}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const TagsPageIndex = ({ pathContext }) => {
  const { posts, post, tag } = pathContext;
  console.log(posts);

  if (tag) {
    // Single page for a tag.
    return (
      <div>
        <BlogHeader />
        <h1>{tag}</h1>
        <ul className={styles['list-reset']}>
          {post.map((tagItem, key) => <Post key={key} node={tagItem} />)}
        </ul>
        <Link to="/tags">All tags</Link>
        <BlogFooter />
      </div>
    );
  }
  // Overview page for tags.
  return (
    <div>
      <BlogHeader />
      <h1>Tags</h1>
      <TagList list={Object.keys(posts) || []} />
      <BlogFooter />
    </div>
  );
};

export default TagsPageIndex;
