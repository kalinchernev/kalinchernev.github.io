import React from 'react';
import Link from 'gatsby-link';
import styles from '../components/css/styles.module.css';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

const Post = ({ node }) => (
  <li>
    <Link to={node.node.frontmatter.slug}>{node.node.frontmatter.title}</Link>
  </li>
);

const BlogPagedIndex = ({ pathContext }) => {
  const { group, index, first, last } = pathContext;
  return (
    <div>
      <BlogHeader />
      <ul className={styles['list-reset']}>
        {group.map((node, key) => <Post key={key} node={node} />)}
      </ul>

      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          paddingTop: `1rem`,
        }}
      >
        {!first && (
          <Link
            className={styles[`arrow`]}
            to={`/blog/${index > 2 ? index - 1 : ''}`}
          >
            <i
              style={{ position: `relative`, top: `2px`, right: `8px` }}
              className="fa fa-chevron-left"
              aria-hidden="true"
            />{' '}
            Newer posts
          </Link>
        )}
        {!last && (
          <Link className={styles[`arrow`]} to={`/blog/${index + 1}`}>
            Older posts{' '}
            <i
              style={{ position: `relative`, top: `2px`, left: `8px` }}
              className="fa fa-chevron-right"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
      <BlogFooter />
    </div>
  );
};

export default BlogPagedIndex;
