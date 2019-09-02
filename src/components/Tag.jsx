import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import slugify from '../utils/slugify';

const Tag = ({ tag }) => (
  <li className="post-tag">
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
