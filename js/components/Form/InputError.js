import React from "react";
import {Form as BootstrapForm} from "react-bootstrap";

class InputError extends React.Component {
    render() {
        const {type, children} = this.props;

        return (
            <BootstrapForm.Control.Feedback type={type ? type: 'invalid'}>
                {children}
            </BootstrapForm.Control.Feedback>
        )
    }
}

export default InputError;