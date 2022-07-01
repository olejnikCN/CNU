import { Input } from 'reactstrap';

import '../styles/InputWithLabel.css';

export function InputWithLabel(props) {
  const { name, type, placeholder, unitsText } = props;

  return (
    <div className="form-group inputWithLabel">
      <label className='inputLabel'>{name}</label>
      <div className='input-group'>
        <Input type={`${type}`} placeholder={`${placeholder}`}></Input>
        { unitsText && <span className='input-group-text'>{unitsText}</span> }
      </div>
    </div>
  );
}
