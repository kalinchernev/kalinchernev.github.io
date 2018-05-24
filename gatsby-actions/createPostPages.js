const path = require('path');

module.exports = (createPage, nodes) => {
  const template = path.resolve('src/templates/post.jsx');

  nodes.filter(({ node }) => node.frontmatter.slug).map(({ node }) =>
    createPage({
      path: node.frontmatter.slug,
      component: template,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  );
};
