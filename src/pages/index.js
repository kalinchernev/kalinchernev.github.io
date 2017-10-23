import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Post = ({ node }) => (
  <li>
    <Link to={node.node.frontmatter.slug}>{node.node.frontmatter.title}</Link>
  </li>
);

const Index = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  return <ul>{edges.map((node, key) => <Post key={key} node={node} />)}</ul>;
};

Index.propTypes = {
  data: PropTypes.object,
};

export default Index;

/*eslint no-undef: "off"*/
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;
