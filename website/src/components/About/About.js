import React from 'react';
import PropTypes from 'prop-types';
import styles from './About.module.scss';
import Skills from '../Skills/Skills';

const About = () => (
  <div className={styles.About} data-testid="About">
    <Skills />
  </div>
);

About.propTypes = {};

About.defaultProps = {};

export default About;
