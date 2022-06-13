import useStorage from "./useStorage";

const useTokenStorage = () => {
    //eslint-disable-next-line
    const [userId, setUserId, clearUserId ] = useStorage('userId');
    const [token, setToken, clearToken, hasToken] = useStorage('authToken');
    const [refreshToken, setRefreshToken, clearRefreshToken] = useStorage('refreshToken');


    const reset = () => {
        clearUserId();
        clearToken();
        clearRefreshToken();
    }

    return {
        setUserId,
        setToken,
        setRefreshToken,
        reset,
        hasToken,
        userId,
        token,
        refreshToken
    };
};

export default useTokenStorage;