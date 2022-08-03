import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes'; // the routes array containing all the routes

export default function useRoutes() {
  const navigate = useNavigate(); // it is a function wich return an object containing the methods of the navigation witch can applied on the current location/route
  const location = useLocation(); // it is function wich return an object containing location params of the current route

  // get the title from the routes arr
  const getRouteTitle = () => {
    for (const route of ROUTES) {
      if (route.path === location.pathname) {
        return route.title;
      }
    }
  };

  // get the url from the routes arr
  const getUrl = ({ key, pathParams = {}, queryParams = {} }) => {
    // object.entries transform an object to an array each key value par in an array : it is a 2D array
    // construct the query using the query params object by transforming this object to an array an then to a string exple : "a=somestring&b=42"
    let query = Object.entries(queryParams)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    if (query) {
      query = '?' + query;
    }

    let path = key;
    // find the route path based on the given key (each route in the routes arr contain a key)
    for (const route of ROUTES) {
      if (route.key === key) {
        // get the path of the route
        path = route.path;
        break;
      }
    }

    // replace the params in the path with the values given by the pathParams object
    Object.entries(pathParams).map(([key, val]) => {
      path = path.replace(':' + key, val);
      return null;
    });

    // construct the url by the new path and the query
    path += query;

    return path; // the url containing the given path and query params
  };

  // redirect to a new url wich is constructed from the given params
  const redirect = ({ key, pathParams, queryParams, reloadPage = false }) => {
    if (!key) {
      console.error('key cannot be blank');
      return;
    }
    // construct the url by the new path and the query params
    const url = getUrl({ key, queryParams, pathParams });
    // navigate to that url and redirect
    navigate(url);

    /*
        if (reloadPage) {
            history.go(0);
        }
        */
  };

  return {
    redirect,
    getUrl,
    getRouteTitle,
  };
}
