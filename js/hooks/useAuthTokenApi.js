import AuthToken from '../models/AuthToken'; // class containing 3 methods get the token and the refreshtoken and the userId
import useAuthManager from './useAuthManager'; // return the methods of the authentication manager
import useUsersApi from './useUsersApi';
import useApi from './useApi';

const useAuthTokensApi = () => {
  const authManager = useAuthManager();
  const usersApi = useUsersApi();
  const api = useApi({ resourceName: 'auth-token' });

  const getAuthToken = ({ email, password }) => {
    const json = {
      username: email,
      password,
    };

    return api.post({ url: '', json }).then((json) => {
      if (!json.code) {
        return new AuthToken(json);
      }

      return json;
    });
  };

  const login = ({ email, password }) => {
    return getAuthToken({
      email,
      password,
    }).then((result) => {
      if (result instanceof AuthToken) {
        authManager.logFromAuthToken({ authToken: result });
        return usersApi.getUser(result.getUserId());
      }
      authManager.logout();
      return result;
    });
  };

  return {
    getAuthToken,
    login,
  };
};

export default useAuthTokensApi;
