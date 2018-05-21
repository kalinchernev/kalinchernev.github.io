import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styles from './css/styles.module.css';

const Post = ({ node }) => {
  const { excerpt } = node.node;
  const { title, slug } = node.node.frontmatter;

  return (
    <li>
      <Link to={`/${slug}`}>
        <h3>{title}</h3>
        <p>{excerpt}</p>
      </Link>
    </li>
  );
};

const BlogPagedIndex = ({ pathContext }) => {
  const { group, index, first, last } = pathContext;
  return (
    <div>
      <Helmet htmlAttributes={{ lang: `en` }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
        />
        <title>Kalin Chernev | Blog</title>
      </Helmet>
      <ul className={styles.listing}>
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
          <Link to={`/history/${index > 2 ? index - 1 : ''}`}>Newer posts</Link>
        )}
        {!last && <Link to={`/history/${index + 1}`}>Older posts</Link>}
      </div>
    </div>
  );
};

Post.propTypes = {
  node: PropTypes.object,
};

BlogPagedIndex.propTypes = {
  pathContext: PropTypes.object,
};

export default BlogPagedIndex;
