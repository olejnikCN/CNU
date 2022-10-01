import React from 'react';
import { Input } from 'reactstrap';

export default function ServingsInput({
  title,
  servingCount,
  isServingsInputDisabled,
  onSetServings,
}) {
  const parseValue = value => {
    value < 1000 ? onSetServings(value) : onSetServings(1000);
  };

  const onBlurHandler = event => {
    if (event.target.value > 1000) event.target.value = 1000;
  };

  const onInputHandler = event => parseValue(event.target.value);

  return (
    <div className="input-group inputWithLabel">
      <span className="input-group-text">{title}</span>

      {servingCount && (
        <Input
          type="number"
          placeholder="..."
          defaultValue={servingCount}
          onInput={onInputHandler}
          onBlur={onBlurHandler}
          maxLength={50}
          min={1}
          max={1000}
          disabled={isServingsInputDisabled}
        />
      )}

      {!servingCount && (
        <Input type="text" placeholder="..." value="---" disabled />
      )}
    </div>
  );
}
