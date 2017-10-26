import React from 'react';
import Link from 'gatsby-link';

const BlogHeader = () => (
  <header style={{ marginBottom: `1.5rem` }}>
    <Link to="/blog" style={{ textShadow: `none`, backgroundImage: `none` }}>
      <h3 style={{ display: `inline` }}>Blog root</h3>
    </Link>
  </header>
);

export default BlogHeader;
