import { icons } from "@/constants/icons";

type SiteMetadataAuthor = {
  title: string;
  photo: string;
  description: string;
  contacts: {
    name: keyof typeof icons;
    contact: string;
  }[];
};

type SiteMetadataMenu = {
  title: string;
  url: string;
}[];

interface SiteMetadata {
  site: {
    siteMetadata: {
      author: SiteMetadataAuthor;
      menu: SiteMetadataMenu;
      description: string;
      copyright: string;
      title: string;
      url: string;
      disqusShortname: string;
    };
  };
}

export type { SiteMetadata };
