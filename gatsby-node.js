const createPostPages = require(`./gatsby-actions/createPostPages`);
const createPaginatedPostsPages = require(`./gatsby-actions/createPaginatedPostsPages`);
const createTagPages = require(`./gatsby-actions/createTagPages`);

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            frontmatter {
              title
              slug
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;
    createPostPages(createPage, posts);
    createPaginatedPostsPages(createPage, posts);
    createTagPages(createPage, posts);
  });
};
