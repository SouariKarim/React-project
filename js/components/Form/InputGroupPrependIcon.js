// this is the prepend icon the will be added to the input field

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup } from 'react-bootstrap';
import './InputGroupPrependIcon.scss';

export default function InputGroupPrependIcon(props) {
  const { groupId, icon } = props;

  return (
    <InputGroup.Text className={'custom-input-group'} id={groupId}>
      <FontAwesomeIcon icon={icon} />
    </InputGroup.Text>
  );
}
