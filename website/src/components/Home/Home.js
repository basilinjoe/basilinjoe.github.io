import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';
import Skills from '../Skills/Skills';

const Home = () => (
  <div className={styles.Home}>
    <div className={styles.imageBanner}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_2_1_" x="0px" y="0px" width="146.98px" height="97.838px" viewBox="0 0 146.98 97.838" enableBackground="new 0 0 146.98 97.838" xmlSpace="preserve">
        <g>
          <defs>
            <rect id="SVGID_1_" x="15.572" y="23.601" width="114.021" height="54.691" />
          </defs>
          <clipPath id="SVGID_2_">
            <use xlinkHref="#SVGID_1_" overflow="visible" />
          </clipPath>
          <path clipPath="url(#SVGID_2_)" fill="none" stroke="#20221D" strokeWidth="1.8" d="M19.712,24.501c0,0-3.24,0-3.24,3.24v46.41   c0,0,0,3.24,3.24,3.24h105.741c0,0,3.24,0,3.24-3.24v-46.41c0,0,0-3.24-3.24-3.24H19.712z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M43.614,63.057c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h57.662   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H43.614z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M106.031,63.057c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h14.85   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H106.031z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M24.146,63.057c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h14.85   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H24.146z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M54.132,52.677c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H54.132z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M43.752,52.677c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H43.752z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M24.146,52.677c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h14.85   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H24.146z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M64.512,52.677c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H64.512z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M74.892,52.677c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H74.892z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M85.271,52.677c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H85.271z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M95.651,52.677c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H95.651z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M106.031,52.677c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h14.989   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H106.031z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M49.519,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H49.519z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M39.139,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H39.139z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M24.146,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h10.237   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H24.146z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M59.898,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H59.898z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M70.278,42.297c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H70.278z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M80.658,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H80.658z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M91.038,42.297c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H91.038z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M101.418,42.297c0,0-0.648,0-0.648,0.647v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.647-0.647-0.647H101.418z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M111.798,42.297c0,0-0.647,0-0.647,0.647v5.624c0,0,0,0.648,0.647,0.648h9.222   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.647-0.648-0.647H111.798z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M74.635,31.916c0,0-0.647,0-0.647,0.648v5.624c0,0,0,0.648,0.647,0.648h5.625   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.648-0.647-0.648H74.635z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M64.537,31.916c0,0-0.647,0-0.647,0.648v5.624c0,0,0,0.648,0.647,0.648h5.625   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.648-0.647-0.648H64.537z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M54.439,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.648-0.647-0.648H54.439z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M44.342,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.648-0.647-0.648H44.342z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M34.244,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.648-0.648-0.648H34.244z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M24.146,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.648-0.648-0.648H24.146z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M84.733,31.916c0,0-0.647,0-0.647,0.648v5.624c0,0,0,0.648,0.647,0.648h5.624   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.648-0.648-0.648H84.733z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M94.832,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.623   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.648-0.648-0.648H94.832z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M104.93,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.623   c0,0,0.648,0,0.648-0.648v-5.624c0,0,0-0.648-0.648-0.648H104.93z" />
          <path clipPath="url(#SVGID_2_)" fill="#20221D" d="M115.027,31.916c0,0-0.648,0-0.648,0.648v5.624c0,0,0,0.648,0.648,0.648h5.624   c0,0,0.647,0,0.647-0.648v-5.624c0,0,0-0.648-0.647-0.648H115.027z" />
        </g>
      </svg>
    </div>
    <div className={styles.container}>
      <div className={styles.social}><a className={styles.pulse} href="https://www.linkedin.com/in/basilinjoe/" target="_blank" rel="noopener noreferrer"><img src="linkedin.svg" /></a>
      </div>
      <div className={styles.social}><a href="https://github.com/basilinjoe" target="_blank" rel="noopener noreferrer"><img src="github.svg" /></a></div>
      <div className={styles.social}><a href="https://www.instagram.com/basilinjoe/" target="_blank" rel="noopener noreferrer"><img src="instagram.svg" /></a></div>
      <div className={styles.profile}><img src="avatar.png" /></div>
      <div className={styles.social}><a href="https://medium.com/@basilin" target="_blank" rel="noopener noreferrer"><img src="medium.svg" /></a></div>
      <div className={styles.social}><a href="https://stackoverflow.com/users/3521176/basilin-joe" target="_blank" rel="noopener noreferrer"><img src="stack-overflow.svg" /></a></div>
      <div className={styles.social}><a href="https://twitter.com/BasilinJoe" target="_blank" rel="noopener noreferrer"><img src="twitter.svg" /></a></div>
    </div>
    <div className={styles.quote}>
      <figure>
        <blockquote>Quality is not an act, it is a habit.</blockquote>
        <figcaption>&mdash; Aristotle</figcaption>
      </figure>
    </div>
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
