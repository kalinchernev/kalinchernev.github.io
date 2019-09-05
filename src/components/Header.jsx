import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const Header = ({ siteTitle }) => (
  <div className="header">
    <div className="partial-layout">
      <h1 className="header-heading">
        <Link to="/" className="logo">
          {siteTitle}
        </Link>
      </h1>
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
