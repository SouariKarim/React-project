import React, {useCallback, useReducer, useRef, useEffect} from "react";

export const LoadingContext = React.createContext({});
LoadingContext.displayName = 'LoadingContext';

export const LoadingConsumer = LoadingContext.Consumer;

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

export const LoadingProvider = ({children}) => {
    const [loading, dispatchLoading] = useReducer(loadingReducer, 0, () => 0);
    const isMounted = useRef();

    const setLoading = useCallback((isLoading) => {
        if (isMounted.current === false) {
            return false;
        }
        if (isLoading) {
            dispatchLoading({type: 'increment'});
        } else {
            dispatchLoading({type: 'decrement'});
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatchLoading]);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isLoading = useCallback(() => {
        return loading > 0;
    }, [loading]);

    return (
        <LoadingContext.Provider value={{setLoading, isLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}