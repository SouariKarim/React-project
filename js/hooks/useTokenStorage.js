import useStorage from './useStorage';

const useTokenStorage = () => {
  //eslint-disable-next-line
  // get the data either from the localstorage or from cookie

  const [userId, setUserId, clearUserId] = useStorage('userId');
  const [token, setToken, clearToken, hasToken] = useStorage('authToken');
  const [refreshToken, setRefreshToken, clearRefreshToken] =
    useStorage('refreshToken');

  // clear the data from the localstorage or from cookie
  const reset = () => {
    clearUserId();
    clearToken();
    clearRefreshToken();
  };
  // return methods for the userId and token
  return {
    setUserId,
    setToken,
    setRefreshToken,
    reset,
    hasToken,
    userId,
    token,
    refreshToken,
  };
};

export default useTokenStorage;
