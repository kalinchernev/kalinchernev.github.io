const path = require('path');

const createPostPages = (createPage, nodes) => {
  nodes.map(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: path.resolve(`./src/templates/post.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};

const createPaginationPages = (createPage, edges) => {
  const paginationTemplate = path.resolve(`src/templates/postList.js`);
  const paginateSize = 10;

  // Split posts into arrays of length equal to number posts on each page/paginateSize
  const groupedPages = edges
    .map((edge, index) => {
      return index % paginateSize === 0
        ? edges.slice(index, index + paginateSize)
        : null;
    })
    .filter(item => item);

  // Create new indexed route for each array
  groupedPages.forEach((group, index, groups) => {
    const pageIndex = index === 0 ? `` : index + 1;
    const paginationRoute = `/blog/${pageIndex}`;
    // Avoid showing 'Previous' link on first page - passed to context
    const first = index === 0 ? true : false;
    // Avoid showing 'Next' link if this is the last page - passed to context
    const last = index === groups.length - 1 ? true : false;

    return createPage({
      path: paginationRoute,
      component: paginationTemplate,
      context: {
        group,
        first,
        last,
        index: index + 1,
      },
    });
  });
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  graphql(`
    {
      allMarkdownRemark {
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
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges;
    createPostPages(createPage, posts);
    createPaginationPages(createPage, posts);
  });
};
