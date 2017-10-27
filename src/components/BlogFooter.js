import React from 'react';
import styles from './css/styles.module.css';

const BlogFooter = () => (
  <footer className={styles.center}>
    <ul className={styles.list}>
      <li>
        <a href="https://www.linkedin.com/in/kalinchernev/">
          <i className="fa fa-linkedin" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href="https://github.com/kalinchernev">
          <i className="fa fa-github-alt" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/kalinchernev">
          <i className="fa fa-twitter" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </footer>
);

export default BlogFooter;
