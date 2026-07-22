import React, { type FC } from "react";

import { graphql, StaticQuery } from "gatsby";
import { type FileSystemNode } from "gatsby-source-filesystem";
import { GatsbyImage, type GatsbyImageProps, type IGatsbyImageData } from "gatsby-plugin-image";

interface ImageProps extends Omit<GatsbyImageProps, "image"> {
  path: string;
}

interface Data {
  images: {
    edges: Array<{
      node: FileSystemNode & {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    }>;
  };
}

const Image: FC<ImageProps> = ({ path, ...rest }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
          filter: { ext: { regex: "/png|jpg|jpeg|webp|tif|tiff/" } }
        ) {
          edges {
            node {
              absolutePath
              childImageSharp {
                gatsbyImageData(formats: [AUTO, WEBP, AVIF])
              }
            }
          }
        }
      }
    `}
    render={(data: Data) => {
      const { images: { edges = [] } = {} } = data;
      const image = edges.find(({ node }) => node.absolutePath.includes(path));

      if (!image) {
        return null;
      }

      const {
        node: { childImageSharp },
      } = image;

      return <GatsbyImage {...rest} image={childImageSharp.gatsbyImageData} />;
    }}
  />
);

export { Image };
