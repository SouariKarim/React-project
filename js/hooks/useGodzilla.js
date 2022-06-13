import useUsersApi from "./useUsersApi";
import useFreelancesApi from "./useFreelancesApi";
import useAuthTokensApi from "./useAuthTokensApi";
import useCompaniesApi from "./useCompaniesApi";
import useCitiesApi from "./useCitiesApi";

const useGodzilla = () => {
    const usersApi = useUsersApi();
    const freelancesApi = useFreelancesApi();
    const authTokensApi = useAuthTokensApi();
    const companiesApi = useCompaniesApi();
    const citiesApi = useCitiesApi();

    return {
        usersApi,
        freelancesApi,
        authTokensApi,
        companiesApi,
        citiesApi
    };
};

export default useGodzilla;