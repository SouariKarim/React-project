import useApi from './useApi'; // returns the request axios methods
import City from '../models/City'; // a class witch returns a city props and mthods

const useCitiesApi = () => {
  // provide a resourcename to construct an  url ready for use with axios methods
  const api = useApi({ resourceName: 'cities' }); // api contains the acios methods ready with the constructed url from the resourcename

  // get a city info
  const getCity = ({ id }) => {
    return api
      .get({
        url: '/' + id, // the url from the resourcename is already there and append it the given id so the new url is cities/id , the used url here is the resourcename + this given url
      })
      .then((json) => {
        // the json here is an object returned from the request containing the city props
        return new City(json); // construct a new city object from the returned json object from the request
      });
  };

  const getCities = ({ query, cancelToken = null }) => {
    return api
      .get({
        url: '', // the constructed url is the resourcename + this given url : see the formatUrl method in useApi hook
        queryParams: {
          // add the query to the url
          query,
        },
        cancelToken, // add the cancelToken to the url
      })
      .then((json) => {
        return json.items.map((item) => {
          // get all the cities
          return new City(item); // construct a city object from the city class
        });
      });
  };

  return {
    getCities,
    getCity,
  };
};

export default useCitiesApi;
