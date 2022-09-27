import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import './HeadingWithButtons.css';

export function HeadingWithButtonsSmall(props) {
  const {
    headingText,
    btnClass,
    rowClass,
    onClick,
    icon,
    isGroup,
    isDisabled,
    modalType,
  } = props;

  return (
    <Row className={rowClass}>
      <Col xs={9} className="addColumn pe-0">
        <h4 className="m-0 w-100 bold">{headingText}</h4>
      </Col>

      <Col xs={3}>
        <Button
          className={btnClass}
          onClick={() => {
            onClick(isGroup, modalType);
          }}
          disabled={isDisabled}
        >
          {icon}
        </Button>
      </Col>
    </Row>
  );
}
