import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const { headingText, buttons } = props;

  return (
    <Container>
      <Row>
        <Col lg={9} className='d-flex align-items-center'>
          <h1 className="headingWithButtons" style={{'color': '#8C3940'}}>{headingText}</h1>
        </Col>
        <Col lg={3} className='d-flex align-items-center justify-content-end'>
          {
            buttons.map(({onClickFunc, className, role, text, btnColor, icon, isDisabled, modalType}) => {
              return (
                <Button key={_.uniqueId()} className={className} role={role} color={btnColor} onClick={ () => { onClickFunc(false, modalType);}} disabled={isDisabled}>
                  {icon} {text}
                </Button>
              );
            })
          }
        </Col>
      </Row>
    </Container>
  );
}
