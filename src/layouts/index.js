import React from 'react';
import PropTypes from 'prop-types';
require('prismjs/themes/prism-solarizedlight.css');

const IndexLayout = ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `1.25rem 1rem` }}>
    {children()}
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
};

export default IndexLayout;

/*eslint no-undef: "off"*/
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
