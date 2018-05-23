import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import styles from './css/styles.module.css';

import Tag from './Tag';

const PostMeta = ({ post }) => {
  const { date, tags, timeToRead } = post.frontmatter;

  return (
    <div>
      <section className={styles[`post-meta`]}>
        <time className={styles[`post-time`]} dateTime={date}>
          {dateFormat(date, `fullDate`)}
        </time>
        <ul className={styles[`post-tags`]}>
          {tags.map((tag, key) => {
            // Just a random number with max of the array key
            const id = Math.floor(Math.random() * Math.floor(key));
            return <Tag key={id} tag={tag} />;
          })}
        </ul>
      </section>
      <div className={styles[`post-timeToRead`]}>
        Approximately {timeToRead} minutes to read ...
      </div>
    </div>
  );
};

PostMeta.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
      timeToRead: PropTypes.string,
      tags: PropTypes.array,
    }),
  }).isRequired,
};

export default PostMeta;
