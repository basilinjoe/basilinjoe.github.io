import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.scss';

const Contact = () => (
  <div className={styles.Contact} data-testid="Contact">
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf846BQ2FhL4p5jUQvfuU72rUwHCibet6UZKYmtFy7fgcsxUQ/viewform?embedded=true" width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
  </div>
);

Contact.propTypes = {};

Contact.defaultProps = {};

export default Contact;
