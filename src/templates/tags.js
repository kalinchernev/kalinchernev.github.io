import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import slugify from '../utils/slugify';
import tagsSorter from '../utils/tagsSorter';
import styles from './css/styles.module.css';

const Post = ({ node }) => (
  <li>
    <Link to={`/` + node.frontmatter.slug}>{node.frontmatter.title}</Link>
  </li>
);

const TagList = ({ list }) => {
  const sorted = tagsSorter(list);
  return (
    <ul className={styles[`list`] + ` ` + styles['list-wrap']}>
      {sorted.map((tag, key) => {
        return (
          <li key={key}>
            <Link to={`/tags/` + slugify(tag[0])}>
              {tag[0] + ` (${tag[1]})`}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const TagsPageIndex = ({ pathContext }) => {
  const { posts, post, tag } = pathContext;

  if (tag) {
    // Single page for a tag.
    return (
      <div>
        <Helmet htmlAttributes={{ lang: `en` }}>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
          />
          <title>{tag} | Kalin Chernev</title>
        </Helmet>
        <h1>{tag}</h1>
        <ul className={styles['list-reset']}>
          {post.map((tagItem, key) => <Post key={key} node={tagItem} />)}
        </ul>
        <Link to="/tags">All tags</Link>
      </div>
    );
  }
  // Overview page for tags.
  return (
    <div>
      <Helmet htmlAttributes={{ lang: `en` }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
        />
        <title>Blog tags | Kalin Chernev</title>
      </Helmet>
      <h1>Tags</h1>
      <TagList list={posts || []} />
    </div>
  );
};

Post.propTypes = {
  node: PropTypes.object,
};

TagList.propTypes = {
  list: PropTypes.array,
};

TagsPageIndex.propTypes = {
  pathContext: PropTypes.object,
};

export default TagsPageIndex;
