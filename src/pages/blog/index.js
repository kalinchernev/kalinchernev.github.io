import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from '../../components/css/styles.module.css';
import BlogHeader from '../../components/BlogHeader';
import BlogFooter from '../../components/BlogFooter';

const Post = ({ node }) => (
  <li>
    <Link to={node.node.frontmatter.slug}>{node.node.frontmatter.title}</Link>
  </li>
);

const BlogIndex = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  return (
    <div>
      <BlogHeader />
      <ul className={styles['list-reset']}>
        {edges.map((node, key) => <Post key={key} node={node} />)}
      </ul>
      <BlogFooter />
    </div>
  );
};

BlogIndex.propTypes = {
  data: PropTypes.object,
};

export default BlogIndex;

/*eslint no-undef: "off"*/
export const query = graphql`
  query BlogIndexQuery {
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
