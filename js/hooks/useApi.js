import useAxios from "./useAxios";
import {useState} from "react";
import useAuthManager from "./useAuthManager";

const useApi = ({resourceName}) => {
    const [baseUrl] = useState(process.env.REACT_APP_GODZILLA_API_URL);
    const {getBearerToken} = useAuthManager();
    const axios = useAxios();


    const getApiUrl = () => {
        let url = baseUrl;

        if (resourceName !== undefined) {
            url += '/' + resourceName;
        }

        return new URL(url);
    }

    const formatUrl = (url, withBearerToken = false) => {
        if (withBearerToken && getBearerToken() !== null) {
            return new URL(getApiUrl() + url +  "?bearer=" + getBearerToken());
        }

        return  new URL(getApiUrl() + url);
    }

    const buildDefaultHeaders = () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    const request = ({url, method, json, queryParams, withBearerToken, responseType, cancelToken}) => {
        url = formatUrl(url);
        const headers = buildDefaultHeaders();

        return axios.request({
            method: method,
            responseType,
            headers,
            url: url.href,
            params: queryParams,
            data: json,
            withBearerToken,
            cancelToken
        }).then(response => response ? response.data: response).then(json => json === undefined ? null: json);
    }

    const post = ({url, json, cancelToken = null, withBearerToken = true}) => {
        return request({url, cancelToken, method: 'POST', json, withBearerToken});
    }

    const get = ({url, queryParams, cancelToken = null, withBearerToken = true}) => {
        return request({url, method: 'GET', queryParams, withBearerToken, cancelToken});
    }

    const put = ({url, json, cancelToken = null, withBearerToken = true}) => {
        return request({url, cancelToken, method: 'PUT', json, withBearerToken});
    }

    const patch = ({url, json, cancelToken = null, withBearerToken = true}) => {
        return request({url, cancelToken, method: 'PATCH', json, withBearerToken});
    }

    const del = ({url, cancelToken = null, queryParams, withBearerToken = true}) => {
        return request({url, cancelToken, method: 'DELETE', queryParams, withBearerToken});
    }

    const getPdf = ({url, cancelToken = null, withBearerToken = true}) => {
        return request({url, method: 'GET', cancelToken, withBearerToken, responseType: 'blob'}).then(data => {
            return new Blob([data], {type: 'application/pdf'});
        });
    }

    const getJpeg = ({url, cancelToken = null, withBearerToken = true}) => {
        return request({url, method: 'GET', cancelToken, withBearerToken, responseType: 'blob'}).then(data => {
            return new Blob([data], {type: 'image/jpeg'});
        });
    }

    return {
        getPdf,
        getJpeg,
        get,
        post,
        patch,
        put,
        del,
        buildDefaultHeaders,
        formatUrl
    };
};

export default useApi;