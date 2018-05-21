import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './css/styles.module.css';
import 'prismjs/themes/prism.css';

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
    <Footer />
  </div>
);

IndexLayout.propTypes = {
  children: PropTypes.any,
  data: PropTypes.object,
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
