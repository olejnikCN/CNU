import { React } from "react";
import { FaInfoCircle } from 'react-icons/fa';

import '../styles/Textarea.css';

export function Textarea(props) {
const { labelName, rows, value, setValue, onClick, modalType } = props;

  return (
    <div className="form-group textareaWithLabel" data-color-mode="light">
      <div className="d-flex justify-content-between">
        <label htmlFor="formGroupTextarea">{labelName}</label>
        <a className="me-1 mb-1 link-dark" onClick={ () => onClick(false, modalType) }><FaInfoCircle/></a>
      </div>
      <textarea className="form-control" rows={rows} defaultValue={value} onInput={event => { setValue(event.target.value); }}></textarea>
    </div>
  );
}
