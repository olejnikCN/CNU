import React from 'react';
import { Container, Button } from 'reactstrap';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const { headingText, buttons, onClickParam } = props;

  return (
    <Container>
      <h1 className="headingWithButtons">{headingText}</h1>
      {
        buttons.map(({onClickFunc, className, role, text, btnColor}) => {
          return (
            <Button key={_.uniqueId()} className={className} role={role} color={btnColor} onClick={ () => { onClickFunc(false, onClickParam);}}>
              {text}
            </Button>
            // <Link key={_.uniqueId()} to={to} className={className} role={role} onClick={ () => {onClick();}}>
            //   {text}
            // </Link>
          );
        })
      }
    </Container>
  );
}
