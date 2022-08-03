import { useState, useCallback } from 'react';
import qs from 'query-string'; // parse and stringify query string

const defaultOptions = {
  arrayFormat: 'bracket',
  parseNumbers: true,
};

const setQueryStringWithoutPageReload = (qsValue) => {
  // construct a complete url from the current url and the given query string values
  const newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    qsValue;
  window.history.pushState({ path: newurl }, '', newurl); // add the new url to the browser history config
};

export const getQueryStringValue = (
  key,
  queryString = window.location.search
) => {
  const values = qs.parse(queryString, defaultOptions); // parse and stringify query string (make it a string)

  return values[key]; // get the query string value based on the given key
};

export const setQueryStringValue = (
  key,
  value,
  queryString = window.location.search
) => {
  const values = qs.parse(queryString, defaultOptions); // make a string from the query string
  // set a new value to the current query string in the place of the old one
  const newQsValue = qs.stringify(
    {
      ...values,
      [key]: value,
    },
    defaultOptions
  );
  // set the history in the browser history with the new url
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

const useQueryString = (key, initialValue) => {
  // get the query string value based on the given key
  const queryStringValue = getQueryStringValue(key);

  const [value, setValue] = useState(
    queryStringValue !== undefined ? queryStringValue : initialValue
  );
  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      // set a new query string in the history config in the browser
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  // get the current query string value based on the given key
  const refreshValue = useCallback(() => {
    setValue(getQueryStringValue(key));
  }, [key]);

  return [value, onSetValue, refreshValue];
};

export default useQueryString;
