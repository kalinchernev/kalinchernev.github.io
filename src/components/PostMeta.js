import React from 'react';
import Link from 'gatsby-link';
import slugify from '../utils/slugify';
import styles from './css/styles.module.css';

const Tag = ({ tag }) => (
  <li className={styles[`post-tag`]}>
    <Link to={`/tags/${slugify(tag)}`}>#{tag}</Link>
  </li>
);

const PostMeta = ({ post }) => (
  <section className={styles[`post-meta`]}>
    <time className={styles[`post-time`]} dateTime={post.frontmatter.date}>
      {new Date(post.frontmatter.date).toLocaleString(`en-GB`)}
    </time>
    <ul className={styles[`post-tags`]}>
      {post.frontmatter.tags.map((tag, key) => <Tag key={key} tag={tag} />)}
    </ul>
  </section>
);

export default PostMeta;
