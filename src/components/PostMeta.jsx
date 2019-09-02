import React from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import getRandomKey from '../utils/getRandomKey';

import Tag from './Tag';

const PostMeta = ({ post }) => {
  const { timeToRead } = post;
  const { date, tags } = post.frontmatter;

  return (
    <>
      <section className="post-meta">
        <time className="post-time" dateTime={date}>
          {dateFormat(date, `fullDate`)}
        </time>
        <ul className="post-tags">
          {tags.map(tag => (
            <Tag key={getRandomKey()} tag={tag} />
          ))}
        </ul>
      </section>
      <div className="post-timeToRead">
        Approximately {timeToRead} minutes to read ...
      </div>
    </>
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
