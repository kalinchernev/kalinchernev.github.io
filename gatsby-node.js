const createPostPages = require(`./gatsby-actions/createPostPages`);
const createPaginatedPostsPages = require(`./gatsby-actions/createPaginatedPostsPages`);
const createTagPages = require(`./gatsby-actions/createTagPages`);

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const results = await graphql(`
    query getAllContent {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt(pruneLength: 400)
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `);

  const posts = results.data.allMarkdownRemark.edges;

  createPostPages(createPage, posts);
  createPaginatedPostsPages(createPage, posts);
  createTagPages(createPage, posts);
};
