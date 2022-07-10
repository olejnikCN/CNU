import React from 'react';
import { Container, Button } from 'reactstrap';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const { headingText, buttons, modalType } = props;

  return (
    <Container>
      <h1 className="headingWithButtons">{headingText}</h1>
      {
        buttons.map(({onClickFunc, className, role, text, btnColor, icon, isDisabled}) => {
          return (
            <Button key={_.uniqueId()} className={className} role={role} color={btnColor} onClick={ () => { onClickFunc(false, modalType);}} disabled={isDisabled}>
              {icon} {text}
            </Button>
          );
        })
      }
    </Container>
  );
}
