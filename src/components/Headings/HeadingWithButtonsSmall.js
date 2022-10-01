import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import styles from './HeadingWithButtonsSmall.module.css';

export function HeadingWithButtonsSmall({
  headingText,
  btnClass,
  rowClass,
  onClick,
  icon,
  isGroup,
  isDisabled,
  modalType,
}) {
  const onClickHandler = () => onClick(isGroup, modalType);

  return (
    <Row className={rowClass}>
      <Col xs={9} className={styles.textColumn}>
        <h4 className={styles.textColumn_heading}>{headingText}</h4>
      </Col>

      <Col xs={3}>
        <Button
          className={btnClass}
          onClick={onClickHandler}
          disabled={isDisabled}
        >
          {icon}
        </Button>
      </Col>
    </Row>
  );
}
