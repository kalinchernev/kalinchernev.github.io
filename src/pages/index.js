import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

export default ({ data }) => {
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
      <ul styles={{ listStyle: 'none' }}>
        {posts.map(({ node }) => {
          const post = node.frontmatter;
          return (
            <li>
              <Link to={post.slug}>
                <h2>{post.title}</h2>
                <p>{node.excerpt}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

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
