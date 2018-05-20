import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styles from '../components/css/styles.module.css';

export default () => (
  <div>
    <Helmet htmlAttributes={{ lang: `en` }}>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
      />
      <meta
        name="google-site-verification"
        content="M3xN17b8dlWWV8ecUcM0iE7INS1WSbBYbDADkVpFElM"
      />
      <title>Kalin Chernev Personal Website</title>
    </Helmet>
  </div>
);
