import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Post = ({ tagItem }) => (
  <li>
    <Link to={`/${tagItem.frontmatter.slug}`}>{tagItem.frontmatter.title}</Link>
  </li>
);

export default Post;

Post.propTypes = {
  tagItem: PropTypes.shape({
    frontmatter: PropTypes.shape({
      tagItem: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
