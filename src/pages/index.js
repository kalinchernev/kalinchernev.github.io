import React from 'react';
import Link from 'gatsby-link';
import styles from '../components/css/styles.module.css';

const Index = () => (
  <div className={styles.highlight}>
    <h1>Hi, I'm Kalin Chernev</h1>
    <div className={styles.handle}>@Brussels, Belgium</div>
    <div>
      <a href="https://github.com/kalinchernev">Web Developer</a>
    </div>
    <div>
      <Link to="/blog">Blogger</Link>
    </div>
    <p className={styles.intro}>
      Design systems and style guides for modular and re-usable CSS<br />
      JavaScript tinkerer building cloud and `serverless` apps and APIs<br />
      Experienced with PHP, Drupal and CMS <br />
      Implementing accessibility best practices<br />
      Embracing the <a href="https://jamstack.org/">JAM stack</a>
      <br />
    </p>
  </div>
);

export default Index;
