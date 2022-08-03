// render if the freelancer is bookmarked ...

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import classes from './bookmark.module.scss';
import React from 'react';

export default function BookmarkIndicator({ freelance }) {
  if (freelance && freelance.is_bookmarked) {
    return (
      <div className={classes.bookmark}>
        <FontAwesomeIcon icon={faHeart} />
      </div>
    );
  }
}
