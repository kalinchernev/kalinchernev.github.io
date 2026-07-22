import React, { type FC } from "react";

import { graphql } from "gatsby";

import { type Node } from "@/types/node";
import { Meta } from "@/components/meta";
import { Post } from "@/components/post";
import { Layout } from "@/components/layout";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

interface PostTemplateProps {
  data: {
    markdownRemark: Node;
  };
}

const PostTemplate: FC<PostTemplateProps> = ({
  data: { markdownRemark },
}) => (
  <Layout>
    <Post post={markdownRemark} />
  </Layout>
);

export const query = graphql`
  query PostTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        tags
        title
        description
        socialImage {
          publicURL
        }
      }
    }
  }
`;

export const Head: FC<PostTemplateProps> = ({ data }) => {
  const { title, description, url } = useSiteMetadata();

  const {
    frontmatter: {
      title: postTitle,
      description: postDescription = description || "",
      socialImage,
    },
  } = data.markdownRemark;

  const image = socialImage?.publicURL && url.concat(socialImage?.publicURL);

  return (
    <Meta
      title={`${postTitle} - ${title}`}
      description={postDescription}
      image={image}
    />
  );
};

export default PostTemplate;
