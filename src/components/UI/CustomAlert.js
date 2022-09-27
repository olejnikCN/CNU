import React from 'react';

import { Alert } from 'reactstrap';

export default function CustomAlert(props) {
  const { color, text } = props;

  return (
    <div
      className={`alert alert-${color} d-flex justify-content-center`}
      role="alert"
    >
      {text}
    </div>
  );
}
