import React, { Fragment } from 'react';
import { FaClock, FaUtensilSpoon } from 'react-icons/fa';

import { TimeFormatter } from '../../functions/TimeFormatter';

import './RecipeBadges.css';

export default function RecipeBadges(props) {
  const { sideDish, preparationTime } = props;

  return (
    <Fragment>
      <hr id="hideHr" />
      <div className="d-flex flex-column mt-4 mt-lg-0">
        <h5 className="w-100">
          <span className="badge bg-success w-100 d-flex justify-content-center">
            <FaUtensilSpoon className="me-2" />
            {sideDish ? sideDish : '---'}
          </span>
        </h5>
        <h5 className="w-100">
          <span className="badge bg-success w-100 d-flex justify-content-center">
            <FaClock className="me-2" />
            {preparationTime ? TimeFormatter(preparationTime) : '---'}
          </span>
        </h5>
      </div>
    </Fragment>
  );
}
