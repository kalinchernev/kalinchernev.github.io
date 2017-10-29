import React from 'react';
import BlogHeader from '../components/BlogHeader';
import BlogFooter from '../components/BlogFooter';
import PostMeta from '../components/PostMeta';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <BlogHeader />
      <PostMeta post={post} />
      <h1>{post.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post.html,
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
        date
        image
        tags
      }
      html
    }
  }
`;

export default Post;
