import { Input, Button, InputGroup } from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

export default function SearchInput({ onClearButton, onChange, value }) {
  const onClearButtonHandler = () => onClearButton();
  const onChangeSearchInputHandler = event => onChange(event.target.value);

  return (
    <InputGroup className="mb-3">
      <Input
        bsSize="lg"
        placeholder="Vyhledat recept..."
        onChange={onChangeSearchInputHandler}
        value={value}
      />
      <Button color="light" onClick={onClearButtonHandler}>
        <FaTimes className="mb-1" />
      </Button>
    </InputGroup>
  );
}
