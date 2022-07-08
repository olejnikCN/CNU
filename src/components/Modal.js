import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function ConfirmModal(props) {
  const { modalState, toggle, confirm, confirmParam, modalType, headerText, bodyText, btnYesText, btnNoText } = props;

  return (
    <div>
      <Modal isOpen={modalState} toggle={() => { toggle(false, modalType); }}>
        <ModalHeader toggle={() => { toggle(false, modalType); }}>
          {headerText}
        </ModalHeader>
        <ModalBody>
          {bodyText}
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={() => { confirm(confirmParam); }}>{btnYesText}</Button>
          <Button color='secondary' onClick={() => { toggle(false, modalType); }}>{btnNoText}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
