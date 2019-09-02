import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

import SocialNetworks from './SocialNetworks';

const Header = ({ siteTitle }) => (
  <div className="header">
    <div className="header-layout">
      <h1 className="header-heading">
        <Link to="/" className="logo">
          {siteTitle}
        </Link>
      </h1>
      <SocialNetworks />
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
