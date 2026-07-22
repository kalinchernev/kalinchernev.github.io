import { CreatePagesArgs } from "gatsby";

interface MetadataQueryResult {
  site: {
    siteMetadata: {
      feedLimit?: number;
    };
  };
}

const metadataQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<MetadataQueryResult>(`
    query SiteMetaData {
      site {
        siteMetadata {
          feedLimit
        }
      }
    }
  `);

  return result?.data?.site.siteMetadata ?? {};
};

export default metadataQuery;
