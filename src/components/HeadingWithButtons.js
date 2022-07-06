import React from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const {headingText, buttons } = props;

  return (
    <Container>
      <h1 className="headingWithButtons">{headingText}</h1>
      {
        buttons.map((button) => {
          return (
            <Link key={_.uniqueId()} to={button[0]} className={button[1]} role={button[2]}>
              {button[3]}
            </Link>
          );
        })
      }
    </Container>
  );
}
