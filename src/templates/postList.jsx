import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import getRandomKey from '../utils/getRandomKey';

import ListItemToPostTeaser from '../components/ListItemToPostTeaser';

const BlogPagedIndex = ({ pathContext }) => {
  const { group, index, first, last } = pathContext;
  return (
    <div>
      <Helmet htmlAttributes={{ lang: `en` }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
        />
        <title>Kalin Chernev | Blog</title>
      </Helmet>
      <ul className="listing">
        {group.map(node => (
          <ListItemToPostTeaser key={getRandomKey()} node={node} />
        ))}
      </ul>

      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          paddingTop: `1rem`,
        }}
      >
        {!first && (
          <Link to={`/history/${index > 2 ? index - 1 : ''}`}>Newer posts</Link>
        )}
        {!last && <Link to={`/history/${index + 1}`}>Older posts</Link>}
      </div>
    </div>
  );
};

BlogPagedIndex.propTypes = {
  pathContext: PropTypes.shape({
    group: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    first: PropTypes.bool.isRequired,
    last: PropTypes.bool.isRequired,
  }).isRequired,
};

export default BlogPagedIndex;
