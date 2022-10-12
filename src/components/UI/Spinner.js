import React from 'react';
import { Spinner } from 'reactstrap';

import styles from './Spinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  );
}
