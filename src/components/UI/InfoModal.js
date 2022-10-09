import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import styles from './InfoModal.module.css';

export function InfoModal({
  modalState,
  toggle,
  modalType,
  headerText,
  primaryText,
  secondaryText,
  icon,
}) {
  const toggleHandler = () => toggle(false, modalType);

  return (
    <div>
      <Modal isOpen={modalState} toggle={toggleHandler}>
        <ModalHeader toggle={toggleHandler}>{headerText}</ModalHeader>
        <ModalBody className={styles.modal}>
          <span className={styles.modalBody_text}>{primaryText}</span>
        </ModalBody>
        <ModalFooter className={styles.modal}>
          <a
            href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
            className="btn btn-primary"
            role="button"
            target="_blank"
          >
            {icon} {secondaryText}
          </a>
        </ModalFooter>
      </Modal>
    </div>
  );
}
