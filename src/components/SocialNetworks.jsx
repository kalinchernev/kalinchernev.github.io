import React from 'react';
import styles from './css/styles.module.css';

export default () => (
  <ul className={styles['social-media']}>
    <li>
      <a
        title="Link to a LinkedIn profile"
        href="https://www.linkedin.com/in/kalinchernev/"
      >
        LinkedIn
      </a>
    </li>
    <li>
      <a
        title="Link to a Github profile"
        href="https://github.com/kalinchernev"
      >
        Github
      </a>
    </li>
    <li>
      <a
        title="Link to a Twitter profile"
        href="https://twitter.com/kalinchernev"
      >
        Twitter
      </a>
    </li>
  </ul>
);
