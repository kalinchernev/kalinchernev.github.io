const path = require(`path`);

module.exports = (createPage, nodes) => {
  const template = path.resolve(`src/templates/postList.js`);
  const paginateSize = 10;

  // Split posts into arrays of length equal to number posts on each page/paginateSize
  const groupedPages = nodes
    .map((node, index) => {
      return index % paginateSize === 0
        ? nodes.slice(index, index + paginateSize)
        : null;
    })
    .filter(item => item);

  // Create new indexed route for each array
  groupedPages.forEach((group, index, groups) => {
    const pageIndex = index === 0 ? `` : index + 1;
    const paginationRoute = `/blog/${pageIndex}`;
    // Avoid showing `Previous` link on first page - passed to context
    const first = index === 0 ? true : false;
    // Avoid showing `Next` link if this is the last page - passed to context
    const last = index === groups.length - 1 ? true : false;

    return createPage({
      path: paginationRoute,
      component: template,
      context: {
        group,
        first,
        last,
        index: index + 1,
      },
    });
  });
};
