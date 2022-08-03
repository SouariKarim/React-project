import React, { useCallback, useReducer, useRef, useEffect } from 'react';

// create the contect
export const LoadingContext = React.createContext({});
LoadingContext.displayName = 'LoadingContext';
// create the consumer
export const LoadingConsumer = LoadingContext.Consumer;
// creating the reducer increment or decrement the loading
function loadingReducer(loading, action) {
  switch (action.type) {
    case 'increment': {
      return loading + 1;
    }
    case 'decrement': {
      return loading - 1;
    }
    default:
      return 0;
  }
}

// the context provider
export const LoadingProvider = ({ children }) => {
  const [loading, dispatchLoading] = useReducer(loadingReducer, 0, () => 0); // initial value of loading is 0
  const isMounted = useRef(); // this is a small stated using the useRef

  const setLoading = useCallback(
    (isLoading) => {
      if (isMounted.current === false) {
        return false;
      }
      if (isLoading) {
        dispatchLoading({ type: 'increment' });
      } else {
        dispatchLoading({ type: 'decrement' });
      }
      //eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatchLoading]
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = useCallback(() => {
    return loading > 0; // return a boolean
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
