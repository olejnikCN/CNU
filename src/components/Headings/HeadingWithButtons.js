import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';

import styles from './HeadingWithButtons.module.css';

export default function HeadingWithButtons({
  headingText,
  buttons,
  recipesNumber,
}) {
  return (
    <Container>
      <Row>
        <Col xl={7} lg={6} md={12} className={styles.textColumn}>
          <h1 className={styles.textColumn_heading}>{headingText}</h1>
          {(recipesNumber || recipesNumber === 0) && (
            <h5 className={styles.textColumn_recipesNumber}>
              {recipesNumber ? recipesNumber : 0}
            </h5>
          )}
        </Col>
        <Col xl={5} lg={6} md={12} className={styles.buttonsColumn}>
          {buttons.map(
            ({ onClickFunc, className, text, icon, isDisabled, modalType }) => {
              const onClickHandler = () => onClickFunc(false, modalType);
              return (
                <button
                  key={_.uniqueId()}
                  className={className}
                  role="button"
                  onClick={onClickHandler}
                  disabled={isDisabled}
                >
                  {icon} {text}
                </button>
              );
            },
          )}
        </Col>
      </Row>
    </Container>
  );
}
