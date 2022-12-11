import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import TextInputWithLabel from '../Inputs/TextInputWithLabel';
import NumberInputWithLabel from '../Inputs/NumberInputWithLabel';
import SelectSearch from '../Dropdowns/SelectSearch';
import Textarea from '../Inputs/Textarea';
import PrepStepsAccordion from '../UI/PrepStepsAccordion';

import styles from './RecipeDetails.module.css';

export default function RecipeDetails({
  recipeName,
  setRecipeName,
  preparationTime,
  setPreparationTime,
  servingsNumber,
  setServingsNumber,
  sideDish,
  setSideDish,
  sideDishesArray,
  sideDishesIsLoading,
  sideDishesHasError,
  preparationSteps,
  setPreparationSteps,
  toggleModalHandler,
}) {
  const [prepHours, setPrepHours] = useState(0);
  const [prepMinutes, setPrepMinutes] = useState(0);
  const [prepTime, setPrepTime] = useState(0);

  useEffect(() => {
    setPrepTime(preparationTime);
  }, []);

  useEffect(() => {
    const time = Number(prepHours) * 60 + Number(prepMinutes);
    setPreparationTime(Number(time));
  }, [prepHours, prepMinutes]);

  useEffect(() => {
    let isMounted = true;
    setPrepHours(Math.floor(prepTime / 60));
    setPrepMinutes(prepTime % 60);
    return () => (isMounted = false);
  }, [prepTime]);

  return (
    <Fragment>
      <h4 className={styles.heading}>Podrobnosti</h4>

      <TextInputWithLabel
        name="Název receptu"
        placeholder=""
        value={recipeName}
        setValue={setRecipeName}
        maxValueLength={80}
        isRequired={true}
      />

      <Row>
        <Col sm={4} className={styles.prepTime_left}>
          <NumberInputWithLabel
            name="Čas přípravy"
            placeholder=""
            sideText="hod."
            isSideTextPrepended={false}
            value={prepHours}
            setValue={setPrepHours}
          />
        </Col>

        <Col sm={4} className={styles.prepTime_right}>
          <NumberInputWithLabel
            name=""
            placeholder=""
            sideText="min."
            isSideTextPrepended={false}
            value={prepMinutes}
            setValue={setPrepMinutes}
          />
        </Col>

        <Col sm={4}>
          <NumberInputWithLabel
            name="Počet porcí"
            placeholder=""
            value={servingsNumber}
            setValue={setServingsNumber}
          />
        </Col>
      </Row>

      <SelectSearch
        labelText="Příloha(y)"
        itemName={sideDish}
        setItemName={setSideDish}
        items={sideDishesArray}
        isLoading={sideDishesIsLoading}
        hasError={sideDishesHasError}
        placeholderText=""
        maxValueLength={80}
      />

      <Textarea
        labelName="Postup"
        rows="15"
        value={preparationSteps}
        setValue={setPreparationSteps}
        onClick={toggleModalHandler}
        modalType="textareaInfo"
      />

      <hr />

      <PrepStepsAccordion preparationSteps={preparationSteps} />
    </Fragment>
  );
}
