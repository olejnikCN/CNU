import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        <ModalBody className="d-flex justify-content-center">
          <span className="text-center">{primaryText}</span>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
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
