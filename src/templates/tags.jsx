import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import styles from './css/styles.module.css';

import getRandomKey from '../utils/getRandomKey';
import tagsSorter from '../utils/tagsSorter';
import slugify from '../utils/slugify';

import ListItemToPost from '../components/ListItemToPost';

const TagList = ({ list }) => {
  const sorted = tagsSorter(list);
  console.log(sorted);
  return (
    <ul className={`${styles.list} ${styles['list-wrap']}`}>
      {sorted.map(tag => (
        <li key={getRandomKey()}>
          <Link to={`/tags/${slugify(tag[0])}`}>{`${tag[0]} (${tag[1]})`}</Link>
        </li>
      ))}
    </ul>
  );
};

const TagsPageIndexTemplate = ({ pathContext }) => {
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
          {post.map((tagItem, key) => (
            <ListItemToPost key={getRandomKey(key)} tagItem={tagItem} />
          ))}
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

TagList.propTypes = {
  list: PropTypes.shape({}).isRequired,
};

TagsPageIndexTemplate.propTypes = {
  pathContext: PropTypes.shape({
    posts: PropTypes.array,
    post: PropTypes.array,
    tag: PropTypes.string,
  }).isRequired,
};

export default TagsPageIndexTemplate;
