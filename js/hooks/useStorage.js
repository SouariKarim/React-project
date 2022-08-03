import { useState, useEffect } from 'react';
// handling cookies
import Cookies from 'js-cookie';

// class containing methods for handling localStorage
class StorageLocalStorage {
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
    return key in localStorage;
  }
}

// class containg methods for handling cookies
class StorageCookie {
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
  // check if there is data in local storage use the localstorage class methods otherwise use the cookiesclass methods
  const [storage] = useState(
    localStorage !== null ? new StorageLocalStorage() : new StorageCookie()
  );

  useEffect(() => {
    if (defaultValue !== null) {
      // if there is a default value save it in the browser
      storage.setItem(key, defaultValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return the methods provided by the hooks to save item either in localStorage or in the cookies
  const set = (value) => {
    storage.setItem(key, value);
  };

  const clear = () => {
    storage.removeItem(key);
  };

  const get = () => {
    return storage.getItem(key);
  };

  const has = () => {
    return storage.hasItem(key);
  };

  return [get, set, clear, has];
};

export default useStorage;
