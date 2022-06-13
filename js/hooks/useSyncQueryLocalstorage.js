import {useEffect} from "react";
import useQueryString from "../hooks/useQueryString";
import useStorage from "../hooks/useStorage";

const useSyncQueryLocalstorage = (key, defaultValue = null, withQueryString = false) => {

    const [valueStorage, setValueStorage] = useStorage(key);
    const [valueQueryString, setValueQueryString] = useQueryString(key);

    useEffect(() => {
        if (valueQueryString !== null && valueQueryString !== undefined) {
            set(valueQueryString);
        } else if (valueStorage() !== null && valueStorage() !== undefined) {
            set(valueStorage());
        } else if (defaultValue !== null && defaultValue !== undefined) {
            set(defaultValue);
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const set = (value) => {
        setValueStorage(value);
        if (withQueryString) {
            setValueQueryString(value);
        }
    }

    const get = () => {

        if (valueQueryString !== undefined) {
            return valueQueryString;
        } else if (valueStorage() !== undefined && valueStorage() !== null) {
            return valueStorage();
        }

        return defaultValue;
    }

    const reset = () => {
        set(defaultValue);
    }

    const isDefaultValue = () => {
        // eslint-disable-next-line eqeqeq
        return get() == defaultValue;
    }

    return [get, set, reset, isDefaultValue];
}

export default useSyncQueryLocalstorage;