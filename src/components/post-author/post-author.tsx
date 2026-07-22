import React, { useMemo, type FC } from "react";

import { getContactHref } from "@/utils/get-contact-href";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

import * as styles from "./post-author.module.scss";

const PostAuthor: FC = () => {
  const { author } = useSiteMetadata();
  const x = useMemo(
    () => author.contacts.find(({ name }) => name === "x"),
    [author],
  );

  return (
    <div className={styles.postAuthor}>
      <p className={styles.description}>
        {author.description}
        {x ? (
          <a
            className={styles.x}
            href={getContactHref(x.name, x.contact)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <strong>{author.title}</strong> on X
          </a>
        ) : null}
      </p>
    </div>
  );
};

export { PostAuthor };
