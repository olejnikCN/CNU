import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const { headingText, buttons } = props;

  return (
    <Container>
      <Row>
        <Col lg={8} md={12} className='d-flex align-items-center'>
          <h1 className="headingWithButtons bold w-100 text-center text-lg-start">{headingText}</h1>
        </Col>
        <Col lg={4} md={12} className='d-flex align-items-center justify-content-center justify-content-lg-end'>
          {
            buttons.map(({onClickFunc, className, role, text, icon, isDisabled, modalType}) => {
              return (
                <button key={_.uniqueId()} className={className} role={role} onClick={ () => { onClickFunc(false, modalType);}} disabled={isDisabled}>
                  {icon} {text}
                </button>
              );
            })
          }
        </Col>
      </Row>
    </Container>
  );
}
