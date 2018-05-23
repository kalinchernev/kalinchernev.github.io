import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
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

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default Tag;
