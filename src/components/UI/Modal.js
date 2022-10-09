import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import styles from './Modal.module.css';

export function ConfirmModal({
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
        <ModalHeader toggle={toggleHandler}>{headerText}</ModalHeader>
        <ModalBody className={styles.modalBody}>
          {bodyText && (
            <span className={styles.modalBody_text}>{bodyText}</span>
          )}
          {secondBodyText && (
            <span className={styles.modalBody_text}>{secondBodyText}</span>
          )}
        </ModalBody>
        <ModalFooter>
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
