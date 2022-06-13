import React from 'react';
import classes from "./check.module.scss";
import {Form} from "react-bootstrap";
import classNames from "classnames";


export default function Checkbox(props) {

    return (
        <span className={classNames(classes.checkBox, props.className)}>
            <Form.Check
                type={'checkbox'}
                {...props}
            />
        </span>
    )
}