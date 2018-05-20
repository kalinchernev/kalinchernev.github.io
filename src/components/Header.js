import React from 'react';
import Link from 'gatsby-link';
import styles from './css/styles.module.css';

import SocialNetworks from './SocialNetworks';

const Header = ({ siteTitle }) => (
  <div className={styles.header}>
    <div className={styles['header-layout']}>
      <h1 className={styles['header-heading']}>
        <Link to="/" className={styles.logo}>
          {siteTitle}
        </Link>
      </h1>
      <SocialNetworks />
    </div>
  </div>
);

export default Header;
