import { React } from "react";

import '../styles/Textarea.css';

export function Textarea(props) {
const { labelName, rows} = props;

  return (
    <div className="form-group textareaWithLabel">
      <label htmlFor="formGroupTextarea">{labelName}</label>
      <textarea className="form-control" rows={rows}></textarea>
    </div>
  );
}
