import React, {useState} from "react";

export const ErrorCodeContext = React.createContext({});
ErrorCodeContext.displayName = 'ErrorCodeContext';

export const ErrorCodeConsumer = ErrorCodeContext.Consumer;

export const ErrorCodeProvider = ({children}) => {
    const [errorCode, setErrorCode] = useState(null);


    return (
        <ErrorCodeContext.Provider value={{errorCode, setErrorCode}}>
            {children}
        </ErrorCodeContext.Provider>
    )
}