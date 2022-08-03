import useApi from './useApi'; // return premade axios request methods
import Metric from '../models/Metric'; // return the statestics of this freelace site

const useMetricsApi = () => {
  const api = useApi({ resourceName: 'metrics' }); // provide a resource name to construct the request methods

  const getFreelancesMetric = ({ cancelToken = null } = {}) => {
    return api.get({ url: '/freelances', cancelToken }).then((json) => {
      if (json === null) {
        return null;
      }

      return new Metric(json); // get the metrics and construct an object using the metric model/class
    });
  };

  const getCompaniesMetric = ({ cancelToken = null } = {}) => {
    return api.get({ url: '/companies', cancelToken }).then((json) => {
      if (json === null) {
        return null;
      }

      return new Metric(json); // get company metric and construct an object using the metric class
    });
  };

  const getAllMetrics = ({ cancelToken = null } = {}) => {
    return api.get({ url: '/', cancelToken }).then((json) => {
      if (json === null) {
        return null;
      }

      return new Metric(json); // get all metrics freelance and company and construct an object using the metric class
    });
  };

  return {
    getFreelancesMetric,
    getCompaniesMetric,
    getAllMetrics,
  };
};

export default useMetricsApi;
