import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import PostMeta from '../components/PostMeta';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <Helmet htmlAttributes={{ lang: `en` }}>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
        />
        <title>{post.frontmatter.title} | Kalin Chernev</title>
      </Helmet>
      <PostMeta post={post} />
      <h1>{post.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: post.html,
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
        date
        tags
      }
      timeToRead
      html
    }
  }
`;

Post.propTypes = {
  data: PropTypes.object,
};

export default Post;
