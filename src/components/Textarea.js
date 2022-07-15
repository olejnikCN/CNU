import { React } from "react";
import { FaInfoCircle } from 'react-icons/fa';

import '../styles/Textarea.css';

export function Textarea(props) {
const { labelName, rows, setValue, onClick, modalType } = props;

  return (
    <div className="form-group textareaWithLabel" data-color-mode="light">
      <div className="d-flex justify-content-between">
        <label htmlFor="formGroupTextarea">{labelName}</label>
        <a className="me-1 link-secondary" onClick={ () => onClick(false, modalType) }><FaInfoCircle/></a>
      </div>
      <textarea className="form-control" rows={rows} onBlur={event => { setValue(event.target.value); }}></textarea>
    </div>
  );
}
