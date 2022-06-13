import useApi from "./useApi";
import Metric from "../models/Metric";


const useMetricsApi = () => {

    const api = useApi({resourceName: "metrics"});

    const getFreelancesMetric = ({cancelToken = null} = {}) => {
        return api.get({url: "/freelances", cancelToken}).then((json) => {
            if (json === null) {
                return null;
            }

            return new Metric(json);
        });
    }


    const getCompaniesMetric = ({cancelToken = null} = {}) => {
        return api.get({url: "/companies", cancelToken}).then((json) => {
            if (json === null) {
                return null;
            }

            return new Metric(json);
        });
    }


    const getAllMetrics = ({cancelToken = null} = {}) => {
        return api.get({url: "/", cancelToken}).then((json) => {
            if (json === null) {
                return null;
            }

            return new Metric(json);
        });
    }


    return {
        getFreelancesMetric,
        getCompaniesMetric,
        getAllMetrics
    };
};

export default useMetricsApi;
