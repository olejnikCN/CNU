import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function ConfirmModal(props) {
  const {
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
  } = props;

  return (
    <div>
      <Modal
        isOpen={modalState}
        toggle={() => {
          toggle(false, modalType);
        }}
      >
        <ModalHeader
          toggle={() => {
            toggle(false, modalType);
          }}
        >
          {headerText}
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center flex-column">
          <span className="text-center">{bodyText}</span>
          <span className="text-center">{secondBodyText}</span>
        </ModalBody>
        <ModalFooter>
          <Button
            color={btnYesColor}
            onClick={() => {
              confirm(confirmParam);
            }}
          >
            {btnYesText}
          </Button>
          <Button
            color={btnNoColor}
            onClick={() => {
              toggle(false, modalType);
            }}
          >
            {btnNoText}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
