import { Input } from 'reactstrap';

import '../styles/InputWithLabel.css';

export function InputWithLabel(props) {
  const { name, type, placeholder, sideText, sideTextIsPrepended, value, setValue, isDisabled } = props;

  return (
    <div className="form-group inputWithLabel">
      { name && <label>{name}</label> }
      <div className='input-group'>
        { sideText && sideTextIsPrepended && <span className='input-group-text'>{sideText}</span> }
        <Input type={`${type}`} placeholder={`${placeholder}`} defaultValue={value} onInput={event => { setValue(event.target.value); }}
                maxLength={50} min={1} max={100000} disabled={isDisabled}>
        </Input>
        { sideText && !sideTextIsPrepended && <span className='input-group-text'>{sideText}</span> }
      </div>
    </div>
  );
}
