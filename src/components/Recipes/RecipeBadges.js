import React, { Fragment } from 'react';
import { FaClock, FaUtensilSpoon } from 'react-icons/fa';

import { TimeFormatter } from '../../functions/TimeFormatter';

import styles from './RecipeBadges.module.css';

export default function RecipeBadges({ sideDish, preparationTime }) {
  return (
    <Fragment>
      <hr className={styles.hideHr} />
      <div className={styles.badges}>
        <h5>
          <span className={`badge ${styles.badge_content}`}>
            <FaUtensilSpoon className={styles.badge_icon} />
            {sideDish ? sideDish : '---'}
          </span>
        </h5>
        <h5 className={styles.badge_heading}>
          <span className={`badge ${styles.badge_content}`}>
            <FaClock className={styles.badge_icon} />
            {preparationTime ? TimeFormatter(preparationTime) : '---'}
          </span>
        </h5>
      </div>
    </Fragment>
  );
}
