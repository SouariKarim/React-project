import useTokenStorage from "./useTokenStorage";
import {UserContext} from "../contexts/UserContext";
import {useContext} from "react";
import ReactGA from "react-ga";


const useAuthManager = () => {
    const tokenStorage = useTokenStorage();
    const {setUser, isLogged, loggedUser} = useContext(UserContext);

    const logFromAuthToken = ({authToken}) => {
        tokenStorage.reset();

        tokenStorage.setRefreshToken(authToken.getRefreshToken());
        tokenStorage.setToken(authToken.getToken());
        tokenStorage.setUserId(authToken.getUserId());
    }

    const logout = () => {
        tokenStorage.reset();
        setUser(null);
    }

    const getBearerToken = () => {
        return tokenStorage.token();  // return the value of the token
    }

    const getRefreshToken = () => {
        return tokenStorage.refreshToken(); // return the value of the refreshtoken
    }

    const getUserId = () => {
        return tokenStorage.userId(); // return the value of the userId
    }

    const isUserLogged = () => {
        return isLogged(); // get isLogged from the context
    }

    const hasBearerToken = () => {
        return tokenStorage.hasToken(); // return if there is a token in the storage
    }

    const setUserLogged = (user) => {
        setUser(user);
            // set the google analytics with the user name and email
        if (user) {
            if (process.env.REACT_APP_ACTIVATE_GA === "1") {
                ReactGA.set({
                    name: user.full_name,
                    email: user.email
                });
            }
        }
    }

    const canOpenFreelance = ({freelance}) => {
        return freelance && freelance.can_open_freelance;
    }

    const getUserAccountType = () => {
        if (isUserLogged() === false) { // see the method above
            return null;
        }

        return loggedUser.account_type; // loggedUser form the context
    }

    const isLoggedWithEsnAccount = () => {
        return isUserLogged() && loggedUser.account_type === 'esn';
        // see the methods above , loggedUser from the context
    }

    const isEsn = () => {
        return isUserLogged() && loggedUser.account_type === 'esn';
    }

    const isLoggedWithPremiumEsnAccount = () => {
        if (isCollaborator()) {
            return true;
        }

        return isEsn() && (loggedUser.subscription_code === "SMART" || loggedUser.subscription_code === "TOUT_PUISSANT");
    }

    const isLoggedWithFreelanceAccount = () => {
        return isUserLogged() && loggedUser.account_type === 'freelance';
    }

    const isAdmin = () => {
        return isUserLogged() && loggedUser.is_admin;
    }

    const isMatcher = () => {
        return isUserLogged() && loggedUser.is_matcher;
    }

    const isCollaborator = () => {
        return isMatcher() || isAdmin();
    }

    const canSeeDisponibilityMarkers = () => {
        if (isUserLogged() && loggedUser.can_see_disponibility_markers === true) {
            return true;
        }

        return false;
    }

    const isInTrialPeriod = () => {
        return loggedUser.trial
    }

    return {
        // the methods related to the auth and change the auth context 
        canSeeDisponibilityMarkers,
        logFromAuthToken,
        logout,
        getBearerToken,
        getRefreshToken,
        getUserId,
        hasBearerToken,
        isLogged: isUserLogged,
        user: loggedUser,
        setUser: setUserLogged,
        canOpenFreelance,
        getUserAccountType,
        isLoggedWithEsnAccount,
        isLoggedWithPremiumEsnAccount,
        isLoggedWithFreelanceAccount,
        isAdmin,
        isMatcher,
        isCollaborator,
        isInTrialPeriod
    };
};

export default useAuthManager;