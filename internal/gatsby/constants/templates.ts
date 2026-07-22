import path from "path";

const templates = Object.freeze({
  indexTemplate: path.resolve("./src/templates/index-template.tsx"),
  notFoundTemplate: path.resolve("./src/templates/not-found-template.tsx"),
  categoryTemplate: path.resolve("./src/templates/category-template.tsx"),
  categoriesTemplate: path.resolve("./src/templates/categories-template.tsx"),
  tagTemplate: path.resolve("./src/templates/tag-template.tsx"),
  tagsTemplate: path.resolve("./src/templates/tags-template.tsx"),
  pageTemplate: path.resolve("./src/templates/page-template.tsx"),
  postTemplate: path.resolve("./src/templates/post-template.tsx"),
});

export default templates;
