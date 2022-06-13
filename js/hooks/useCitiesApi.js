import useApi from "./useApi";
import City from "../models/City";

const useCitiesApi = () => {
    const api = useApi({resourceName: "cities"});

    const getCity = ({id}) => {
        return api
            .get({
                url: "/" + id
            })
            .then((json) => {
                return new City(json);
            });
    }

    const getCities = ({query, cancelToken = null}) => {
        return api
            .get({
                url: "",
                queryParams: {
                    query
                },
                cancelToken
            })
            .then((json) => {
                return json.items.map((item) => {
                    return new City(item);
                })
            });
    };

    return {
        getCities,
        getCity
    };
};

export default useCitiesApi;
