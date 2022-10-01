import { React } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import './Textarea.css';

export function Textarea({
  labelName,
  rows,
  value,
  setValue,
  onClick,
  modalType,
}) {
  const setValueHandler = event => setValue(event.target.value);

  const onClickhandler = () => onClick(false, modalType);

  return (
    <div className="form-group textareaWithLabel" data-color-mode="light">
      <div className="d-flex justify-content-between">
        <label htmlFor="formGroupTextarea">{labelName}</label>
        <a className="me-1 mb-1 link-dark" onClick={onClickhandler}>
          <FaInfoCircle />
        </a>
      </div>
      <textarea
        className="form-control"
        rows={rows}
        defaultValue={value}
        onInput={setValueHandler}
      ></textarea>
    </div>
  );
}
