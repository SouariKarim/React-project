import React from "react";
import {Form as BootstrapForm} from "react-bootstrap";
import {Form as FormFormik} from 'formik';

class Form extends React.Component {
    render() {
        const {children} = this.props;

        return (
            <FormFormik as={BootstrapForm}>
                {children}
            </FormFormik>
        )
    }
}

export default Form;