import React, { useEffect } from 'react';
import { Input } from 'reactstrap';

import styles from './NumberInputWithLabel.module.css';

export default function NumberInputWithLabel({
  name,
  placeholder,
  sideText,
  isSideTextPrepended,
  value,
  setValue,
  isDisabled,
  maxValueLength,
}) {
  useEffect(() => {
    if (!value) value = 0;
  }, []);

  const parseValue = event => {
    if (event.target.value) {
      if (event.target.value > maxValueLength) setValue(maxValueLength);
      else if (event.target.value < 0) setValue(0);
      else setValue(event.target.value);
    } else setValue(0);
  };

  let formGroupStyle = styles.formGroup;
  if (name === '') formGroupStyle = styles.formGroup_noName;

  return (
    <div className={`form-group ${formGroupStyle}`}>
      {name && <label className={styles.label}>{name}</label>}
      <div className="input-group">
        {sideText && isSideTextPrepended && (
          <span className="input-group-text">{sideText}</span>
        )}
        <Input
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={parseValue}
          onInput={parseValue}
          min={0}
          max={100000}
          disabled={isDisabled}
        />
        {sideText && !isSideTextPrepended && (
          <span className="input-group-text">{sideText}</span>
        )}
      </div>
    </div>
  );
}
