import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from 'reactstrap';
import MDEditor from '@uiw/react-md-editor';

import CustomAlert from '../UI/CustomAlert';

import './PrepStepsAccordion.css';

export default function PrepStepsAccordion({ preparationSteps }) {
  const [accordionOpen, setAccordionOpen] = useState('');

  const toggleAccordion = id => {
    accordionOpen === id ? setAccordionOpen() : setAccordionOpen(id);
  };

  return (
    <Accordion flush open={accordionOpen} toggle={toggleAccordion}>
      <AccordionHeader targetId="1">
        <h4 className="accordion-heading">Náhled formátování postupu</h4>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        {preparationSteps && (
          <div data-color-mode="light">
            <MDEditor.Markdown source={preparationSteps} />
          </div>
        )}

        {!preparationSteps && (
          <CustomAlert color="primary" text="Postup je prázdný..." />
        )}
      </AccordionBody>
    </Accordion>
  );
}
