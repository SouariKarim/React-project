import classes from "./textarea.module.scss";
import classNames from "classnames";
import {useKey} from "rooks";
import {createRef, useState} from "react";


export default function SmartTextArea({ value, onChange, onEnter, placeholder, className }) {

    const ref = createRef();
    const [canEnter, setCanEnter] = useState(true);
    const [canLineBreak, setCanLineBreak] = useState(false);


    useKey(["ControlLeft"], () => {
        setCanEnter(false);
        setCanLineBreak(true);
    }, {
        target: ref,
        eventTypes: ["keypress", "keydown"]
    });


    useKey(["ControlLeft"], () => {
        setCanEnter(true);
        setCanLineBreak(false);
    }, {
        target: ref,
        eventTypes: ["keyup"]
    });


    useKey(["Enter"], () => {
        if (canEnter) {
            onEnter();
        }
        if (canLineBreak) {
            onChange(value + "\n");
        }
    }, {
        target: ref,
    });


    return (
        <textarea
            ref={ref}
            className={classNames(className, classes.textarea)}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            placeholder={placeholder}
        />
    )
}