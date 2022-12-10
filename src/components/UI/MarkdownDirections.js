import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import CustomAlert from './CustomAlert';

import styles from './MarkdownDirections.module.css';

export default function MarkdownDirections({ title, directions }) {
  return (
    <div>
      <h3 className={styles.heading}>{title}</h3>

      {directions && <MDEditor.Markdown source={directions} id="markdown" />}

      {!directions && (
        <h5>
          <CustomAlert color="primary" text="Postup je prázdný..." />
        </h5>
      )}
    </div>
  );
}
