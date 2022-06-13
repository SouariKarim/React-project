import React from "react";
import {Form as BootstrapForm} from "react-bootstrap";
import {Field} from 'formik';


function Input(props) {
    const {children, as} = props;

    return (
        <Field as={as || BootstrapForm.Control} {...props}>
            {children}
        </Field>
    );
}

function TextAreaInput(props) {
    const {className} = props;

    return <Input as={"textarea"}  {...props} className={'form-control ' + className}/>;
}

function SelectInput(props) {
    const {className, children} = props;

    return (
        <Field component={"select"} {...props} className={'form-control ' + (className ? className: '')}>
            {children}
        </Field>
    );
}


export {Input, TextAreaInput, SelectInput};