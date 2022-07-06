import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import '../styles/HeadingWithButtons.css';

export function HeadingWithButtonsSmall(props) {
  const { headingText, btnClass, rowClass, onClick, icon } = props;

  return (
    <Row className={rowClass}>
      <Col lg={9} className="addColumn">
        <h5 className='m-0'>{headingText}</h5>
      </Col>

      <Col lg={3}>
        <Button className={btnClass} onClick={() => { onClick(); }}>{icon}</Button>
      </Col>
    </Row>
  );
}