import useUsersApi from './useUsersApi'; // user request methods
import useFreelancesApi from './useFreelancesApi'; // freelance request methods
import useAuthTokensApi from './useAuthTokensApi'; // auth methods
import useCompaniesApi from './useCompaniesApi'; // companies methods
import useCitiesApi from './useCitiesApi'; // cities methods

const useGodzilla = () => {
  // initiate the request methods to different apis
  const usersApi = useUsersApi();
  const freelancesApi = useFreelancesApi();
  const authTokensApi = useAuthTokensApi();
  const companiesApi = useCompaniesApi();
  const citiesApi = useCitiesApi();

  // return these methods
  return {
    usersApi,
    freelancesApi,
    authTokensApi,
    companiesApi,
    citiesApi,
  };
};

export default useGodzilla;
