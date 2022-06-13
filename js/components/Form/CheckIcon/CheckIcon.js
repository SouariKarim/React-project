import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Checkbox from "../Checkbox/Checkbox";
import React from "react";
import classes from "./checkicon.module.scss"
import classNames from "classnames/bind";


const buildClasses = classNames.bind(classes)


export default function CheckIcon({id, icon, label, checked, onChange, className}) {

    return (
        <Checkbox
            id={id}
            checked={checked}
            className={classNames("check-icon-input", classes.checkInput, className)}
            onChange={(event) => onChange(event.target.checked)}
            label={
                <span className={classes.checkIcon}>
                    <FontAwesomeIcon
                        className={buildClasses(classes.icon, {checked})}
                        icon={icon}
                    />
                    &nbsp;
                    {label}
                </span>
            }
        />
    )
}