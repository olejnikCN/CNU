import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import { AddRecipeInput } from '../components/AddRecipeInput';

export function AddRecipePage() {
  return (
    <Container>

      <Container>
        <h1 className='heading1'>Přidat recept</h1>
        <Link to="" className="btn btn-success primaryButton m-2" role="button">
          Uložit
        </Link>
        <Link to="/" className="btn btn-primary primaryButton m-2" role="button">
          Zrušit
        </Link>
      </Container>
      <hr/>

      <AddRecipeInput name="Název receptu" type="text" placeholder="Zadejte název receptu..."></AddRecipeInput>

      <AddRecipeInput name="Čas přípravy" type="number" placeholder="Zadejte přibližnou délku přípravy..."></AddRecipeInput>

    </Container>
  );
}
