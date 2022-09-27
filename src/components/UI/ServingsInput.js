import React from 'react';
import { Input } from 'reactstrap';

export default function ServingsInput(props) {
  const { title, servingCount, isServingsInputDisabled, onSetServings } = props;

  const parseValue = value => {
    value < 1000 ? onSetServings(value) : onSetServings(1000);
  };

  return (
    <div className="input-group inputWithLabel">
      <span className="input-group-text">{title}</span>

      {servingCount && (
        <Input
          type="number"
          placeholder="..."
          defaultValue={servingCount}
          onInput={event => parseValue(event.target.value)}
          onBlur={event =>
            event.target.value > 1000
              ? (event.target.value = 1000)
              : (event.target.value = event.target.value)
          }
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
