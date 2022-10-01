import React, { useEffect } from 'react';
import { Input } from 'reactstrap';

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
    <div className="form-group" style={{ padding: '5px' }}>
      <div className="d-flex justify-content-between">
        {name && <label className="mb-1">{name}</label>}
        {isRequired && <label className="text-danger">...povinné pole</label>}
      </div>
      <div className="input-group">
        {sideText && isSideTextPrepended && (
          <span className="input-group-text">{sideText}</span>
        )}
        <Input
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
