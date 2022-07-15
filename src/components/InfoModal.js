import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export function InfoModal(props) {
  const { modalState, toggle, modalType, headerText, primaryText, secondaryText, icon } = props;

  return (
    <div>
      <Modal isOpen={modalState} toggle={() => { toggle(false, modalType); }}>
        <ModalHeader toggle={() => { toggle(false, modalType); }}>
          {headerText}
        </ModalHeader>
        <ModalBody className='d-flex justify-content-center'>
          <span className='text-center'>{primaryText}</span>
        </ModalBody>
        <ModalFooter className='d-flex justify-content-center'>
          <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' className="btn btn-success" role='button' target="_blank">
            {icon} {secondaryText}
          </a>
        </ModalFooter>
      </Modal>
    </div>
  );
}
