import React from 'react';

const Post = ({ data }) => {
  const p = data.markdownRemark.frontmatter;
  return (
    <div>
      <h1>{p.title}</h1>
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
    }
  }
`;

export default Post;
