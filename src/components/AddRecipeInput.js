import { Container, Input } from 'reactstrap';

import '../styles/AddRecipeInput.css';

export function AddRecipeInput(props) {
  const { name, type, placeholder } = props;

  return (
    <Container className="addRecipeInput">
      <label className='inputLabel'>{name}</label>
      <Input type={`${type}`} placeholder={`${placeholder}`}></Input>
    </Container>
  );
}
