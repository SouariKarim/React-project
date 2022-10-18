import useAxios from './useAxios'; // axios interceptors are configured here by adding the token to the request as a header
import { useState } from 'react';
import useAuthManager from './useAuthManager'; // returns the methods of the authentication manager

const useApi = ({ resourceName }) => {
  const [baseUrl] = useState(process.env.REACT_APP_GODZILLA_API_URL);
  const { getBearerToken } = useAuthManager(); // get the token from the storage
  const axios = useAxios(); // axios after the interceptor configuration, addoing the token to the request header if exists

  // return the data of the api url like the protocol , the host , hostname , pathname ... based in the given resource name and construct an url 
  // with this resource name to make a call to the backend
  const getApiUrl = () => {
    let url = baseUrl;

    if (resourceName !== undefined) {
      url += '/' + resourceName;
    }

    return new URL(url);
  };

  // construct the url with the new added values url and the token
  const formatUrl = (url, withBearerToken = false) => {
    // if there is a token in the storage
    if (withBearerToken && getBearerToken() !== null) {
      return new URL(getApiUrl() + url + '?bearer=' + getBearerToken()); // construct an url with the given resource name and the given bareer
    }
    // if there is no token in the storage
    return new URL(getApiUrl() + url); // construct an backend url based on the given resource name in the case if there is no token and the given chunk of the url

    // example :
    // the resourcename is cities
    // formatUrl('id') will invoke getApiUrl witch gets the base url from env variables and add the "/" and the resource name , after that the formatUrl('id) will concatenated the returned url with the given argument
    // formatUrl('id) will return an url with [the url in the env , / , the resource name , and the given id]
  };

  const buildDefaultHeaders = () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  };

  // make a request using axios based on the given arguments
  const request = ({
    url,
    method,
    json,
    queryParams,
    withBearerToken,
    responseType,
    cancelToken,
  }) => {
    url = formatUrl(url); // get the formatted url based on the given resource name passed as an argument to this costum hook , this is the url witch we wil make a request to the backend
    const headers = buildDefaultHeaders(); // get the default headers

    // make a standard axios methods wich we will be ready for use for the the get post ....
    return axios
      .request({
        method: method,
        responseType,
        headers,
        url: url.href,
        params: queryParams,
        data: json,
        withBearerToken,
        cancelToken,
      })
      .then((response) => (response ? response.data : response))
      .then((json) => (json === undefined ? null : json));
  };

  // this is a post request
  const post = ({ url, json, cancelToken = null, withBearerToken = true }) => {
    return request({ url, cancelToken, method: 'POST', json, withBearerToken });
  };

  // this is a get request
  const get = ({
    url,
    queryParams,
    cancelToken = null,
    withBearerToken = true,
  }) => {
    return request({
      url,
      method: 'GET',
      queryParams,
      withBearerToken,
      cancelToken,
    });
  };

  // this is a put request
  const put = ({ url, json, cancelToken = null, withBearerToken = true }) => {
    return request({ url, cancelToken, method: 'PUT', json, withBearerToken });
  };

  // this is a patch request
  const patch = ({ url, json, cancelToken = null, withBearerToken = true }) => {
    return request({
      url,
      cancelToken,
      method: 'PATCH',
      json,
      withBearerToken,
    });
  };

  // this is a delete request
  const del = ({
    url,
    cancelToken = null,
    queryParams,
    withBearerToken = true,
  }) => {
    return request({
      url,
      cancelToken,
      method: 'DELETE',
      queryParams,
      withBearerToken,
    });
  };

  const getPdf = ({ url, cancelToken = null, withBearerToken = true }) => {
    return request({
      url,
      method: 'GET',
      cancelToken,
      withBearerToken,
      responseType: 'blob',
    }).then((data) => {
      return new Blob([data], { type: 'application/pdf' });
    });
  };

  const getJpeg = ({ url, cancelToken = null, withBearerToken = true }) => {
    return request({
      url,
      method: 'GET',
      cancelToken,
      withBearerToken,
      responseType: 'blob',
    }).then((data) => {
      return new Blob([data], { type: 'image/jpeg' });
    });
  };

  return {
    getPdf,
    getJpeg,
    get,
    post,
    patch,
    put,
    del,
    buildDefaultHeaders,
    formatUrl,
  };
};

export default useApi;
