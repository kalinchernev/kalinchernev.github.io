import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styles from './css/styles.module.css';

const Home = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
        />
        <meta
          name="google-site-verification"
          content="M3xN17b8dlWWV8ecUcM0iE7INS1WSbBYbDADkVpFElM"
        />
        <title>Kalin Chernev Personal Website</title>
      </Helmet>
      <ul className={styles.listing}>
        {posts.map(({ node }) => {
          const post = node.frontmatter;
          return (
            <li>
              <Link to={post.slug}>
                <h3>{post.title}</h3>
                <p>{node.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to="/history/2">Older posts</Link>
    </div>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        excerpt: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Home;

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
