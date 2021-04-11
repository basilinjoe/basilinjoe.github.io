import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.scss';
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className={styles.Navbar} id="Navbar">
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/resume">Resume</Link>
        </li>
      </ul>
    </nav>
  </div>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
