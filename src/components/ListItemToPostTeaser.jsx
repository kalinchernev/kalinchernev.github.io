import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

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

export default Post;

Post.propTypes = {
  node: PropTypes.shape({}).isRequired,
};
