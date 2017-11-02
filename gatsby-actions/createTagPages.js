const path = require(`path`);
const slugify = require(`../src/utils/slugify`);

module.exports = (createPage, nodes) => {
  const template = path.resolve(`src/templates/tags.js`);
  const posts = {};

  nodes.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!posts[tag]) {
          posts[tag] = [];
        }
        posts[tag].push(node);
      });
    }
  });

  createPage({
    path: `/tags`,
    component: template,
    context: {
      posts,
    },
  });

  Object.keys(posts).forEach(tagName => {
    const post = posts[tagName];
    createPage({
      path: `/tags/` + slugify(tagName),
      component: template,
      context: {
        posts,
        post,
        tag: tagName,
      },
    });
  });
};
