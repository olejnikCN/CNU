import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        <ModalBody className="d-flex justify-content-center flex-column">
          <span className="text-center">{bodyText}</span>
          <span className="text-center">{secondBodyText}</span>
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
