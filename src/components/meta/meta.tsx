import React, { type FC } from "react";

interface MetaProps {
  description: string;
  image?: string;
  title: string;
}

const Meta: FC<MetaProps> = ({ description, title, image }) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="og:title" content={title} />
    <meta name="og:type" content="website" />
    <meta name="og:description" content={description} />

    {image ? (
      <>
        <meta name="image" content={image} />
        <meta name="og:image" content={image} />
        <meta name="twitter:image" content={image} />
      </>
    ) : null}
  </>
);

export { Meta };
