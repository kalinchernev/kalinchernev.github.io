import React, { type FC } from "react";

import { DiscussionEmbed } from "disqus-react";

import { useSiteMetadata } from "@/hooks/use-site-metadata";

interface PostCommentsProps {
  postTitle: string;
  postSlug: string;
}

const PostComments: FC<PostCommentsProps> = ({ postTitle, postSlug }) => {
  const { url, disqusShortname } = useSiteMetadata();

  if (!disqusShortname) {
    return null;
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={{
        url: url + postSlug,
        identifier: postTitle,
        title: postTitle,
      }}
    />
  );
};

export { PostComments };
