import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import 'prismjs/themes/prism.css';
import '../assets/styles.css';

import Header from '../components/Header';

const IndexLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          slogan
        }
      }
    }
  `);

  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: '' },
          { name: 'keywords', content: '' },
        ]}
      />
      <Header
        siteTitle={data.site.siteMetadata.title}
        slogan={data.site.siteMetadata.slogan}
      />
      <div className="main">{children}</div>
    </>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        slogan: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default IndexLayout;
