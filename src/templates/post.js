import React from 'react';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';

const Post = ({ data }) => {
  const p = data.markdownRemark;
  return (
    <div>
      <BlogHeader />
      <h1>{p.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: p.html,
        }}
      />
      <BlogFooter />
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
