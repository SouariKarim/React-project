// render different inputs

import React from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Field } from 'formik';

// return a form input
function Input(props) {
  const { children, as } = props;

  // render an input field based on the passed as prop , if there is no as props render the input as a bootstrap input
  return (
    <Field as={as || BootstrapForm.Control} {...props}>
      {children}
    </Field>
  );
}

// render a text area input
function TextAreaInput(props) {
  const { className } = props;

  return (
    <Input as={'textarea'} {...props} className={'form-control ' + className} />
  );
}

// render a select input
function SelectInput(props) {
  const { className, children } = props;

  return (
    <Field
      component={'select'}
      {...props}
      className={'form-control ' + (className ? className : '')}
    >
      {children}
    </Field>
  );
}

export { Input, TextAreaInput, SelectInput };
