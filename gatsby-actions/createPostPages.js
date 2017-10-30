const path = require(`path`);

module.exports = (createPage, nodes) => {
  const template = path.resolve(`src/templates/post.js`);

  nodes.map(({ node }) => {
    if (node.frontmatter.slug) {
      createPage({
        path: node.frontmatter.slug,
        component: template,
        context: {
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};
