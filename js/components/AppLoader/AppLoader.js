import React, {useCallback, useEffect, useContext, useState} from 'react';
import {LoadingContext} from "../../contexts/LoadingContext";
import useGodzilla from "../../hooks/useGodzilla";
import useAuthManager from "../../hooks/useAuthManager";


export default function AppLoader({children}) {

    const {setLoading} = useContext(LoadingContext);
    const {usersApi} = useGodzilla();
    const {getUserId, hasBearerToken, setUser, isLogged} = useAuthManager();
    const [loadingUser, setLoadingUser] = useState(true);


    const setLoadings = useCallback((loading) => {
        if (loading === false) {
            setTimeout(() => {setLoading(false)}, 1000);
        } else {
            setLoading(true);
        }
        setLoadingUser(loading);
    }, [setLoading, setLoadingUser]);


    const fetchLoggedUser = useCallback(() => {
        setLoadings(true);
        if (hasBearerToken()) {
            usersApi.getUser(getUserId()).then(user => {
                setUser(user);
            }).finally(() => {
                setLoadings(false);
            });
        } else {
            setLoadings(false);
        }
    }, [setLoadings, setUser, usersApi, getUserId, hasBearerToken]);


    useEffect(() => {
        if (!isLogged()) {
            fetchLoggedUser();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            {loadingUser === false && children}
        </>
    );
};