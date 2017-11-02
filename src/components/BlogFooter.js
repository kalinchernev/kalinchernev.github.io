import React from 'react';
import styles from './css/styles.module.css';

const BlogFooter = () => (
  <footer style={{ fontSize: `1.5rem` }}>
    <ul className={styles.list}>
      <li>
        <a
          title="Link to a LinkedIn profile"
          href="https://www.linkedin.com/in/kalinchernev/"
        >
          <i className="fa fa-linkedin" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          title="Link to a Github profile"
          href="https://github.com/kalinchernev"
        >
          <i className="fa fa-github-alt" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          title="Link to a Twitter profile"
          href="https://twitter.com/kalinchernev"
        >
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </footer>
);

export default BlogFooter;
