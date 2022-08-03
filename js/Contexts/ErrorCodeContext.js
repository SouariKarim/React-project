// this context contains the error code

import React, { useState } from 'react';

// create the context
export const ErrorCodeContext = React.createContext({});
ErrorCodeContext.displayName = 'ErrorCodeContext';
// create the consumer
export const ErrorCodeConsumer = ErrorCodeContext.Consumer;
// create the provider
export const ErrorCodeProvider = ({ children }) => {
  const [errorCode, setErrorCode] = useState(null);

  return (
    <ErrorCodeContext.Provider value={{ errorCode, setErrorCode }}>
      {children}
    </ErrorCodeContext.Provider>
  );
};
