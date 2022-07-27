import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtons(props) {
  const { headingText, buttons, recipesNumber } = props;

  return (
    <Container>
      <Row>
        <Col xl={7} lg={6} md={12} className='d-flex align-items-center justify-content-center justify-content-lg-start'>
          <h1 className="headingWithButtons bold text-center text-lg-start">
            {headingText}
          </h1>
          { recipesNumber && <h5 className='mt-1 mt-lg-2 ms-2 mb-0'>{recipesNumber}</h5> }
        </Col>
        <Col xl={5} lg={6} md={12} className='d-flex align-items-center justify-content-center justify-content-lg-end'>
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
