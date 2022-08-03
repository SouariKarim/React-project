// take the child components and render them in a bootstrap form with formik

import React from 'react';
// name the two Forms to a diffrent names so there is no confusion
import { Form as BootstrapForm } from 'react-bootstrap';
import { Form as FormFormik } from 'formik';

class Form extends React.Component {
  render() {
    const { children } = this.props;

    return <FormFormik as={BootstrapForm}>{children}</FormFormik>;
  }
}

export default Form;
