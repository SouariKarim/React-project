import {useCallback, useEffect, useRef, useState} from 'react';
import useAuthManager from "./useAuthManager";
import AuthToken from "../models/AuthToken";
import axios from "axios";
import useRoutes from "./useRoutes";

const useAxios = () => {
    const {redirect} = useRoutes();
    const [refreshTokenUrl] = useState(process.env.REACT_APP_GODZILLA_API_URL + '/auth-token/refresh');
    const authManagerRef = useRef({});
    authManagerRef.current = useAuthManager();

    const addTokenToRequest = useCallback(() => {
        const authManager = authManagerRef.current;

        axios.interceptors.request.use(
            config => {
                const token = authManager.getBearerToken();
                if (config.withBearerToken && token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }

                return config;
            },
            error => {
                Promise.reject(error)
            });
    }, [authManagerRef]);

    const refreshTokenThenRetry = useCallback(() => {
        const authManager = authManagerRef.current;

        axios.interceptors.response.use((response) => {
            return response
        }, function (error) {
            const originalRequest = error.config;


            if (error.response === undefined || (error.response.status === 401 && originalRequest.url === refreshTokenUrl)) {
                /**if (!window.location.href.includes('/login')) {
            window.location.href = '/login';
        }*/
                return Promise.reject(error);
            }
            if (error.response && error.response.data && error.response.data.code === "FREELANCE_REDIRECT_EXCEPTION") {
                redirect({
                    key: 'FREELANCE_PROFILE',
                    reloadPage: true,
                    pathParams: {id: error.response.data.freelanceId}
                });
                return Promise.resolve(error);
            }

            if (error.response.status === 401 && !originalRequest._retry && !originalRequest.url.toString().includes('/auth-token')) {

                originalRequest._retry = true;
                const refreshToken = authManager.getRefreshToken();
                return axios.post(refreshTokenUrl,
                    {
                        "refresh_token": refreshToken
                    })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            const authToken = new AuthToken(res.data);
                            authManager.logFromAuthToken({authToken});

                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authManager.getBearerToken();
                            return axios(originalRequest);
                        }
                    }).catch(err => {
                        authManager.logout();
                    })
            }
            return Promise.reject(error);
        })
    }, [authManagerRef, refreshTokenUrl, redirect]);

    const intercept = useCallback(() => {
        addTokenToRequest();
        refreshTokenThenRetry();
    }, [addTokenToRequest, refreshTokenThenRetry]);

    useEffect(() => {
        intercept();
    }, [intercept]);

    return axios;
};

export default useAxios;