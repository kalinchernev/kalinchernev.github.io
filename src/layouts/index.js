import React from 'react';
import PropTypes from 'prop-types';
import '../../static/fonts/fa/css/font-awesome.css';
import 'prismjs/themes/prism.css';

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
