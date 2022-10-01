import React from 'react';

export default function CustomAlert({ color, text }) {
  return (
    <div
      className={`alert alert-${color} d-flex justify-content-center`}
      role="alert"
    >
      {text}
    </div>
  );
}
