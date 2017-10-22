import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const IndexLayout = ({ children, data }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `1.25rem 1rem` }}>
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
        <h3 style={{ display: `inline` }}>{data.site.siteMetadata.title}</h3>
      </Link>
    </header>
    {children()}
  </div>
);

ListLink.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};

IndexLayout.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
};

export default IndexLayout;

/*eslint no-undef: "off"*/
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
