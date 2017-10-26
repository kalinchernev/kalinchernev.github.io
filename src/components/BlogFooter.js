import React from 'react';
import styles from './styles.module.css';

const BlogFooter = () => (
  <footer className={styles.center}>
    <ul className={styles.list}>
      <li>
        <a href="https://github.com/kalinchernev">Github</a>
      </li>
      <li>
        <a href="https://twitter.com/kalinchernev">Twitter</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/kalinchernev/">LinkedIn</a>
      </li>
    </ul>
  </footer>
);

export default BlogFooter;
