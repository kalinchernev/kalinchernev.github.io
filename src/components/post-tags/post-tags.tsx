import React, { type FC } from "react";

import { Button } from "@/components/button";

import * as styles from "./post-tags.module.scss";

interface PostTagsProps {
  tags: string[];
  tagSlugs: string[];
}

const PostTags: FC<PostTagsProps> = ({ tags, tagSlugs }) => (
  <div className={styles.postTags}>
    {tagSlugs.map((slug, i) => (
      <Button title={tags[i]} key={slug} to={slug} />
    ))}
  </div>
);

export { PostTags };
