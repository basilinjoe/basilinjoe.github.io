import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Cli.module.scss';
import { footerTerminal } from './footer-terminal';
import { useHistory } from 'react-router-dom';

function Cli() {
  const history = useHistory();
  useEffect(() => {
    footerTerminal(commandBinding);
  });
  function commandBinding(command) {
    switch (command) {
      case 'about': history.push("/about");
        break;
      case 'resume': history.push("/resume");
        break;
      case 'contact': history.push("/contact");
        break;
      default: console.log('Nothing ...')
    }
  }
  return (
    <div className={styles.Cli} id="terminal"></div>
  );
}

Cli.propTypes = {};

Cli.defaultProps = {};

export default Cli;
