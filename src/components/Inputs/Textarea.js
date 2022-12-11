import { React } from 'react';
import { FaInfoCircle } from 'react-icons/fa';

import styles from './Textarea.module.css';

export default function Textarea({
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
    <div className={`form-group ${styles.textarea}`} data-color-mode="light">
      <div className={styles.label}>
        <label htmlFor="formGroupTextarea">{labelName}</label>
        <a className={styles.label_link} onClick={onClickhandler}>
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
