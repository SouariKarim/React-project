// user data

import React, { useState } from 'react';

// the context initializetion
export const UserContext = React.createContext({ loggedUser: {} });
UserContext.displayName = 'UserContext';
// the context consumer
export const UserConsumer = UserContext.Consumer;
// the context provider
export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const setUser = (loggedUser) => {
    setLoggedUser(loggedUser);
  };

  const isLogged = () => {
    return loggedUser !== null && loggedUser !== undefined; // return a boolean
  };

  return (
    <UserContext.Provider value={{ loggedUser, isLogged, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
