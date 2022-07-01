import { Container } from 'reactstrap';

import { InputWithLabel } from '../components/InputWithlabel';
import { Textarea } from '../components/Textarea';
import { HeadingWithButtons } from '../components/HeadingWithButtons';

export function AddRecipePage() {
  const buttons = [
    [ "/", "btn btn-success primaryButton m-2", "button", "Uložit" ],
    [ "/", "btn btn-warning primaryButton m-2", "button", "Zrušit" ]
  ];

  return (
    <Container>

      <HeadingWithButtons headingText="Přidat recept" buttons={buttons}></HeadingWithButtons>

      <hr/>

      <InputWithLabel name="Název receptu" type="text" placeholder="Zadejte název receptu..."></InputWithLabel>

      <InputWithLabel name="Čas přípravy" type="number" placeholder="Zadejte přibližnou délku přípravy..." sideText="min."></InputWithLabel>

      <InputWithLabel name="Počet porcí" type="number" placeholder="Zadejte počet porcí..."></InputWithLabel>

      <Textarea labelName="Postup" rows="5"></Textarea>

    </Container>
  );
}
