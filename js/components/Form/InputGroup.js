import React from "react";
import {InputGroup as BootstrapInputGroup} from "react-bootstrap";
import InputGroupPrependIcon from "./InputGroupPrependIcon";

class InputGroup extends React.Component {
    render() {
        const {children, icon} = this.props;

        return (
            <BootstrapInputGroup {...this.props}>
                {icon ? <InputGroupPrependIcon icon={icon}/>: null}
                {children}
            </BootstrapInputGroup>
        )
    }
}

export default InputGroup;