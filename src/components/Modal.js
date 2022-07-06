import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function ConfirmModal(props) {
  const { modalState, toggle, confirm, headerText, bodyText, btnYesText, btnNoText } = props;

  return (
    <div>
      <Modal isOpen={modalState} toggle={() => { toggle(); }}>
        <ModalHeader toggle={() => { toggle(); }}>
          {headerText}
        </ModalHeader>
        <ModalBody>
          {bodyText}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => { confirm(); }}>{btnYesText}</Button>
          <Button color='secondary' onClick={() => { toggle(); }}>{btnNoText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
