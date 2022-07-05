import { Input } from 'reactstrap';

import '../styles/InputWithLabel.css';

export function InputWithLabel(props) {
  const { name, type, placeholder, sideText, value, setValue } = props;

  return (
    <div className="form-group inputWithLabel">
      <label className='inputLabel'>{name}</label>
      <div className='input-group'>
        <Input type={`${type}`} placeholder={`${placeholder}`} onBlur={event => { setValue(event.target.value); }}></Input>
        { sideText && <span className='input-group-text'>{sideText}</span> }
      </div>
    </div>
  );
}
