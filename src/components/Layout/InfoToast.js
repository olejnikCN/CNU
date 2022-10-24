import React from 'react';
import { Toast, ToastBody } from 'reactstrap';

import styles from './InfoToast.module.css';

export default function InfoToast({ text, color, textColor, icon, isHidden }) {
  let hidden = isHidden ? styles.hidden : '';

  return (
    <div className={styles.div}>
      <Toast className={`bg-${color} text-${textColor} ${hidden}`}>
        <ToastBody className={styles.body}>
          <h5 className={styles.heading}>{icon}</h5>
          <div className={styles.text}>
            <h5 className={styles.heading}>{text}</h5>
          </div>
        </ToastBody>
      </Toast>
    </div>
  );
}
