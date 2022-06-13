import React, {useState} from "react";


export const UserContext = React.createContext({loggedUser: {}});
UserContext.displayName = 'UserContext';

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({children}) => {

    const [loggedUser, setLoggedUser] = useState(null);


    const setUser = (loggedUser) => {
        setLoggedUser(loggedUser);
    };


    const isLogged = () => {
        return loggedUser !== null && loggedUser !== undefined;
    };


    return (
        <UserContext.Provider value={{loggedUser, isLogged, setUser}}>
            {children}
        </UserContext.Provider>
    );
}