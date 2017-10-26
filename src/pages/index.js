import React from 'react';
import Link from 'gatsby-link';

const Index = () => (
  <div>
    <p>
      Hello, my name is <span>Kalin Chernev</span>.
    </p>
    <p>
      I am (mostly) a{' '}
      <a href="https://github.com/kalinchernev">web developer</a> who{' '}
      <Link to="/blog">blogs</Link> occassionally.
    </p>
  </div>
);

export default Index;
