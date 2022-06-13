import React, {useEffect, useReducer, useState} from "react";
import {Range, getTrackBackground, Direction} from 'react-range';
import classNames from "classnames/bind";

import classes from "./range.module.scss";
const bindClasses = classNames.bind(classes);


const reducerValues = (state, value, minValue, maxValue, doubleTrack) => {
    if (value) {
        let min = value.min;
        if (Number.isInteger(min) === false) {
            min = minValue;
        }

        if (doubleTrack) {
            let max = value.max;
            if (Number.isInteger(max) === false) {
                max = maxValue;
            }

            return [min, max]
        } else
            return [min];
    }

    return [minValue, maxValue]
}


export default function RangeInput({
    hasChanged = false,
    disabled = false,
    doubleTrack = true,
    minValue,
    maxValue = null,
    value = {min: minValue, max: maxValue},
    setMin, setMax, formatLabel = null,
    step = 1,
    className
}) {

    const [values, setValues] = useReducer((state, value) => {
        return reducerValues(state, value, minValue, maxValue, doubleTrack)
    }, reducerValues(null, value, minValue, maxValue, doubleTrack));
    const [changing, setChanging] = useState(false);


    useEffect(() => {
        if (changing === false) {
            setValues(value);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])


    const handleChange = (values) => {
        setValues({min: values[0], max: values[1]})
        setChanging(true);
    }


    const handleFinalChange = (values) => {
        setMin(values[0]);
        if (doubleTrack) {
            setMax(values[1])
        }
        setChanging(false);
    }


    return (
        <div className={classNames("range-input", classes.container, className)}>
            <Range
                disabled={disabled}
                values={values}
                step={step}
                min={minValue}
                max={maxValue}
                onChange={handleChange}
                onFinalChange={handleFinalChange}
                renderTrack={({props, children, isDragged}) => (
                    <div
                        className={bindClasses('trackWrapper', {isDragged: isDragged})}
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={props.style}
                    >
                        <div
                            className={classes.track}
                            ref={props.ref}
                            style={{
                                background: getTrackBackground(doubleTrack ? {
                                    values,
                                    colors: ['#E5E5E5', hasChanged ? '#F9A634' : '#2c343f', '#E5E5E5'],
                                    min: minValue,
                                    max: maxValue,
                                    direction: Direction.Right
                                } : {
                                    values,
                                    colors: ['#E5E5E5', hasChanged ? '#F9A634' : '#2c343f'],
                                    min: maxValue,
                                    max: minValue,
                                    direction: Direction.Left
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({index, props, isDragged}) => (
                    <div
                        {...props}
                        className={bindClasses("thumb", {isDragged, hasChanged})}
                        role={"none"}
                        style={props.style}
                    >
                        {formatLabel === null && values[index].toFixed(0)}
                        {formatLabel !== null && formatLabel(values[index], minValue, maxValue)}
                    </div>
                )}
            />
        </div>
    );
};