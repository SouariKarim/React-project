import {useState, useEffect} from "react";
import Cookies from 'js-cookie';

class StorageLocalStorage
{
    setItem(key, value) {
        return localStorage.setItem(key, value);
    }

    removeItem(key) {
        return localStorage.removeItem(key);
    }

    getItem(key) {
        return localStorage.getItem(key);
    }

    hasItem(key) {
        return (key in localStorage);
    }
}

class StorageCookie
{
    setItem(key, value) {
        Cookies.set(key, value);
    }

    removeItem(key) {
        return Cookies.remove(key);
    }

    getItem(key) {
        return Cookies.get(key);
    }

    hasItem(key) {
        return Cookies.get(key) !== undefined;
    }
}

const useStorage = (key, defaultValue = null) => {
    const [storage] = useState(localStorage !== null ? new StorageLocalStorage(): new StorageCookie());    

    useEffect(() => {
        if (defaultValue !== null) {
            storage.setItem(key, defaultValue);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const set = (value) => {
        storage.setItem(key, value);
    }

    const clear = () => {
        storage.removeItem(key);
    }

    const get = () => {
        return storage.getItem(key);
    }

    const has = () => {
        return storage.hasItem(key);
    }

    return [get, set, clear, has];
}

export default useStorage;