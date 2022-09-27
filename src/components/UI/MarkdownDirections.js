import React from 'react';
import MDEditor from '@uiw/react-md-editor';

import CustomAlert from './CustomAlert';

export default function MarkdownDirections(props) {
  const { title, directions } = props;

  return (
    <div>
      <h4 className="d-flex justify-content-start mb-3 bold">{title}</h4>

      {directions && <MDEditor.Markdown source={directions} id="markdown" />}

      {!directions && (
        <h5>
          <CustomAlert color="primary" text="Postup je prázdný..." />
        </h5>
      )}
    </div>
  );
}
