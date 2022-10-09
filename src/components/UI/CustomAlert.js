import React from 'react';

import styles from './CustomAlert.module.css';

export default function CustomAlert({ color, text }) {
  return (
    <div className={`alert alert-${color} ${styles.alert}`} role="alert">
      {text}
    </div>
  );
}
