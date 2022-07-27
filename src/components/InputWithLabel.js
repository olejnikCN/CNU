import { Input } from 'reactstrap';
import { React } from "react";

export function InputWithLabel(props) {
  let { name, type, placeholder, sideText, sideTextIsPrepended, value, setValue, isDisabled, maxValueLength, isRequired } = props;

  if(value === undefined && type === "number")
    value = 0;

  const parseValue = value => {
    if(value) {
      if(type === "number")
        value > maxValueLength ? setValue(maxValueLength) : value <= 0 ? setValue(0) : setValue(value);
      else
        value.length > maxValueLength ? setValue(value.substring(0, maxValueLength - 1)) : setValue(value);
    }
    else {
      if(type === "number")
        setValue(0);
      else
        setValue("");
    }
  };

  return (
    <div className="form-group" style={{'padding': '5px'}}>
      <div className='d-flex justify-content-between'>
        { name && <label className='mb-1'>{name}</label> }
        { isRequired && <label className='text-danger'>*povinné pole</label> }
      </div>
      <div className='input-group'>
        { sideText && sideTextIsPrepended && <span className='input-group-text'>{sideText}</span> }
        <Input type={type} placeholder={placeholder} value={value}
                onChange={event => { type === "number" ? parseValue(+event.target.value) : parseValue(event.target.value) }}
                onInput={event => { type === "number" ? parseValue(+event.target.value) : parseValue(event.target.value) }}
                min={1} max={100000} disabled={isDisabled}>
        </Input>
        { sideText && !sideTextIsPrepended && <span className='input-group-text'>{sideText}</span> }
      </div>
    </div>
  );
}
