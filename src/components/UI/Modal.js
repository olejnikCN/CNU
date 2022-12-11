import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import styles from './Modal.module.css';

export default function ConfirmModal({
  modalState,
  toggle,
  confirm,
  confirmParam,
  modalType,
  headerText,
  bodyText,
  btnYesText,
  btnNoText,
  secondBodyText,
  btnYesColor,
  btnNoColor,
}) {
  const toggleHandler = () => toggle(false, modalType);

  const onClickHandler = () => confirm(confirmParam);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggleHandler}>
        <ModalHeader toggle={toggleHandler} className={styles.modalHeader}>
          {headerText}
        </ModalHeader>
        <ModalBody className={styles.modalBody}>
          {bodyText && <h5 className={styles.modalBody_text}>{bodyText}</h5>}
          {secondBodyText && (
            <h5 className={styles.modalBody_text}>{secondBodyText}</h5>
          )}
        </ModalBody>
        <ModalFooter className={styles.modalFooter}>
          <Button color={btnYesColor} onClick={onClickHandler}>
            {btnYesText}
          </Button>
          <Button color={btnNoColor} onClick={toggleHandler}>
            {btnNoText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
