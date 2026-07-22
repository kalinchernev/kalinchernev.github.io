import { GatsbyNode } from "gatsby";

export { createPages } from "./internal/gatsby/create-pages";
export { onCreateNode } from "./internal/gatsby/on-create-node";
export { onCreateWebpackConfig } from "./internal/gatsby/on-create-webpack-config";

const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}) => {
  const { createTypes } = actions;

  createTypes(`
    type SiteSiteMetadata {
      disqusShortname: String
    }
  `);
};

export { createSchemaCustomization };
