import {useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "../routes";


export default function useRoutes() {

    const navigate = useNavigate();
    const location = useLocation();

    // get the title from the routes arr
    const getRouteTitle = () => {
        for (const route of ROUTES) {
            if (route.path === location.pathname) {
                return route.title;
            }
        }
    }

// get the url from the routes arr
    const getUrl = ({key, pathParams = {}, queryParams = {}}) => {
        let query = Object.entries(queryParams).map(([key, val]) => `${key}=${val}`).join("&");
        if (query) {
            query = "?" + query;
        }

        let path = key;

        for (const route of ROUTES) {
            if (route.key === key) {
                path = route.path;
                break;
            }
        }

        Object.entries(pathParams).map(([key, val]) => {
            path = path.replace(":" + key, val);
            return null
        });

        path += query;

        return path;
    }


    const redirect = ({key, pathParams, queryParams, reloadPage = false}) => {
        if (!key) {
            console.error("key cannot be blank");
            return;
        }

        const url = getUrl({key, queryParams, pathParams});
        navigate(url);

        /*
        if (reloadPage) {
            history.go(0);
        }
        */
    }


    return {
        redirect,
        getUrl,
        getRouteTitle
    };
};
