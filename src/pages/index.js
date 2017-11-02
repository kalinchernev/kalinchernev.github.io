import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import styles from '../components/css/styles.module.css';

const Index = () => (
  <div>
    <Helmet htmlAttributes={{ lang: `en` }}>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0 shrink-to-fit=no"
      />
      <title>Kalin Chernev | Business Card</title>
    </Helmet>
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
        JavaScript tinkerer for cloud, `serverless`, apps and APIs<br />
        Experienced with PHP, Drupal and CMS <br />
        Embracing the <a href="https://jamstack.org/">JAM stack</a>
        <br />
      </p>
    </div>
  </div>
);

export default Index;
