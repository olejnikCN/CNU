import { Input } from 'reactstrap';

import '../styles/InputWithLabel.css';

export function InputWithLabel(props) {
  const { name, type, placeholder, sideText, setValue } = props;

  return (
    <div className="form-group inputWithLabel">
      <label className='inputLabel'>{name}</label>
      <div className='input-group'>
        <Input type={`${type}`} placeholder={`${placeholder}`} onInput={event => { setValue(event.target.value); }} maxLength={50} min={1} max={100000}></Input>
        { sideText && <span className='input-group-text'>{sideText}</span> }
      </div>
    </div>
  );
}
