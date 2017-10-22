import React from 'react';

const Post = ({ data }) => {
  const p = data.markdownRemark;
  return (
    <div>
      <h1>{p.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: p.html,
        }}
      />
    </div>
  );
};

export const query = graphql`
  query PostPage($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
        image
      }
      html
    }
  }
`;

export default Post;
