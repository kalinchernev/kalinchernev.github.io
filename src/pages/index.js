import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Index = ({ data }) => {
  console.log(data);
  return <div>list</div>;
};

Index.propTypes = {
  data: PropTypes.object,
};

export default Index;

/*eslint no-undef: "off"*/
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;
