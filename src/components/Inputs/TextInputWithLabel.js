import React, { useEffect } from 'react';
import { Input } from 'reactstrap';

import styles from './TextInputWithLabel.module.css';

export function TextInputWithLabel({
  name,
  placeholder,
  sideText,
  isSideTextPrepended,
  value,
  setValue,
  isDisabled,
  maxValueLength,
  isRequired,
}) {
  useEffect(() => {
    if (!value) value = 0;
  }, []);

  const parseValue = value => {
    if (value) {
      if (value.length > maxValueLength)
        setValue(value.substring(0, maxValueLength - 1));
      else setValue(value);
    } else {
      setValue('');
    }
  };

  const parseValueHandler = event => parseValue(event.target.value);

  return (
    <div className={`form-group ${styles.form_group}`}>
      <div className={styles.label}>
        {name && <label className={styles.label_name}>{name}</label>}
        {isRequired && !value && (
          <label className={styles.label_required}>...povinné pole</label>
        )}
      </div>
      <div className="input-group">
        {sideText && isSideTextPrepended && (
          <span className="input-group-text">{sideText}</span>
        )}
        <Input
          className={
            !value && name === 'Název receptu' ? styles.input_required : ''
          }
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={parseValueHandler}
          onInput={parseValueHandler}
          min={1}
          max={1000}
          disabled={isDisabled}
        />
        {sideText && !isSideTextPrepended && (
          <span className="input-group-text">{sideText}</span>
        )}
      </div>
    </div>
  );
}
