import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Resume.module.scss';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

function Resume() {
  const [numPages, setNumPages] = useState(null);
  const options = {};
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className={styles.Resume}>
      <Document
        file="Resume.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        renderMode="svg"
      >
        {
          Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                width={800}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ),
          )
        }
      </Document>
    </div>
  );
}

Resume.propTypes = {};

Resume.defaultProps = {};

export default Resume;
