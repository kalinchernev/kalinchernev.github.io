import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './css/styles.module.css';

import SocialNetworks from './SocialNetworks';

const Header = ({ siteTitle, slogan }) => (
  <div className={styles.header}>
    <div className={styles['header-layout']}>
      <div>
        <h1 className={styles['header-heading']}>
          <Link to="/" className={styles.logo}>
            {siteTitle}
          </Link>
        </h1>
        {slogan || ''}
      </div>
      <SocialNetworks />
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  slogan: PropTypes.string,
};

Header.defaultProps = {
  slogan: '',
};

export default Header;
