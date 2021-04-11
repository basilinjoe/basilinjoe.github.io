import React from 'react';
import PropTypes from 'prop-types';
import styles from './Resume.module.scss';

const Resume = () => (
  <div className={styles.Resume} data-testid="Resume">
    Resume Component
  </div>
);

Resume.propTypes = {};

Resume.defaultProps = {};

export default Resume;
