import React from 'react';
import PropTypes from 'prop-types';

const IndexAbout = ({ data }) => (
  <div>
    <h1>{data.allMarkdownRemark.edges[0].node.frontmatter.title}</h1>
    <div
      dangerouslySetInnerHTML={{
        __html: data.allMarkdownRemark.edges[0].node.html,
      }}
    />
  </div>
);

IndexAbout.propTypes = {
  data: PropTypes.object,
};

export default IndexAbout;

/*eslint no-undef: "off"*/
export const query = graphql`
  query AboutPageQuery {
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
