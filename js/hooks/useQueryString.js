import { useState, useCallback } from "react";
import qs from "query-string";

const defaultOptions = {
    arrayFormat: 'bracket',
    parseNumbers: true
};

const setQueryStringWithoutPageReload = qsValue => {
    const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        qsValue;
    window.history.pushState({ path: newurl }, "", newurl);
};

export const getQueryStringValue = (
    key,
    queryString = window.location.search
) => {


    const values = qs.parse(queryString, defaultOptions);

    return values[key];
};

export const setQueryStringValue = (
    key,
    value,
    queryString = window.location.search
) => {

    const values = qs.parse(queryString, defaultOptions);
    const newQsValue = qs.stringify({
        ...values,
        [key]: value
    }, defaultOptions);

    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

const useQueryString = (key, initialValue) => {
    const queryStringValue = getQueryStringValue(key);

    const [value, setValue] = useState(queryStringValue !== undefined ? queryStringValue:  initialValue);
    const onSetValue = useCallback(
        newValue => {
            setValue(newValue);
            setQueryStringValue(key, newValue);
        },
        [key]
    );

    const refreshValue = useCallback(() => {
        setValue(getQueryStringValue(key));
    }, [key])

    return [value, onSetValue, refreshValue];
}

export default useQueryString;