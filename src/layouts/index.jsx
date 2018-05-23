import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism.css';

import styles from './css/styles.module.css';

import Header from '../components/Header';

const IndexLayout = ({ children, data }) => (
  <div>
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
    <div className={styles.main}>{children()}</div>
  </div>
);

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

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        slogan
      }
    }
  }
`;
