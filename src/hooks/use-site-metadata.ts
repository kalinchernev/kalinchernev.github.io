import { graphql, useStaticQuery } from "gatsby";

import { type SiteMetadata } from "@/types/site-metadata";

const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadata>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          author {
            title
            photo
            description
            contacts {
              name
              contact
            }
          }
          menu {
            title
            url
          }
          url
          title
          copyright
          description
          disqusShortname
        }
      }
    }
  `);

  return site?.siteMetadata || {};
};

export { useSiteMetadata };
