import React, { useContext } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { FaTimes, FaQuestionCircle, FaCheck } from 'react-icons/fa';

import styles from './InfoToast.module.css';
import { ToastContext } from '../../context/toast-context';

export default function InfoToast({
  text,
  headerText,
  headerColor,
  icon,
  isHidden,
}) {
  const toastCtx = useContext(ToastContext);

  let hidden = isHidden ? styles.hidden : '';

  let headerTextColor = '';
  let headerClose = '';
  if (headerColor === 'success') {
    headerTextColor = 'text-white';
    headerClose = styles.headerCloseS;
  } else if (headerColor === 'warning') {
    headerTextColor = 'text-dark';
    headerClose = styles.headerCloseW;
  } else if (headerColor === 'danger') {
    headerTextColor = 'text-white';
    headerClose = styles.headerCloseD;
  } else {
    headerTextColor = 'text-dark';
    headerClose = styles.headerCloseI;
    headerColor = 'light';
    headerText = 'Informace';
    icon = <FaQuestionCircle className="mb-1 me-2" />;
  }

  const toastHandler = () => {
    toastCtx.toastPropsHandler(
      toastCtx.text,
      toastCtx.headerText,
      toastCtx.headerColor,
      toastCtx.icon,
      true,
    );
  };

  return (
    <div className={styles.positionDiv}>
      <Toast className={`${styles.toast} ${hidden}`}>
        <ToastHeader
          className={`bg-${headerColor} ${headerTextColor}`}
          tagClassName="w-100"
        >
          <div className={`${styles.headerFormat} `}>
            <h5 className={styles.headerLeft}>
              {icon} {headerText}
            </h5>
            <h5 className={styles.headerRight}>
              <a className={headerClose} onClick={toastHandler}>
                <FaTimes className="mb-1 ms-2" />
              </a>
            </h5>
          </div>
        </ToastHeader>
        <ToastBody className={`${styles.toastBody}`}>
          <div className={styles.bodyFormat}>
            <h5 className={styles.heading}>{text}</h5>
          </div>
        </ToastBody>
      </Toast>
    </div>
  );
}
