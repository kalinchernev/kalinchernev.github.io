import React from 'react';
import Link from 'gatsby-link';
import dateFormat from 'dateformat';
import slugify from '../utils/slugify';
import styles from './css/styles.module.css';

const Tag = ({ tag }) => (
  <li className={styles[`post-tag`]}>
    <Link
      title={`Click here to see all posts about ${tag.toLowerCase()}`}
      to={`/tags/${slugify(tag)}`}
    >
      #{tag}
    </Link>
  </li>
);

const PostMeta = ({ post }) => (
  <div>
    <section className={styles[`post-meta`]}>
      <time className={styles[`post-time`]} dateTime={post.frontmatter.date}>
        {dateFormat(post.frontmatter.date, `fullDate`)}
      </time>
      <ul className={styles[`post-tags`]}>
        {post.frontmatter.tags.map((tag, key) => <Tag key={key} tag={tag} />)}
      </ul>
    </section>
    <div className={styles[`post-timeToRead`]}>
      Approximately {post.timeToRead} minutes to read ...
    </div>
  </div>
);

export default PostMeta;
