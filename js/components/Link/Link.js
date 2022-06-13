import {ROUTES} from "../../routes";
// import {generatePath} from "react-router";
import {generatePath} from "react-router-dom";
import {Link as RouterLink, NavLink as RouterNavLink} from "react-router-dom";
import classNames from "classnames";


const encodeQueryData = (data) => {
    const ret = []

    for (const d in data) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
    }

    return ret.join('&')
}


const convertKeyToRoute = (key, toParams, queryParams) => {
    const path = ''
    const params = (queryParams)? encodeQueryData(queryParams) : null

    if (key === undefined) {
        return path;
    }

    for(const route of ROUTES){
        if (route.key === key) {
            if (toParams) {
                return generatePath(route.path, toParams) + (params ? "?" + params : '');
            } else {
                return route.path + path + (params ? "?" + params: '');
            }
        }
    }

    return key + (params ? "?" + params: '')
}


export default function Link({to, toParams, queryParams, activeClassName, className = '', style, onClick, children}) {

    const rawUrlTo = convertKeyToRoute(to, toParams, queryParams)

    if(activeClassName){
        return(
            <RouterNavLink
                onClick={onClick}
                className={(navData) => classNames(className, {[activeClassName]: navData.isActive})}
                to={rawUrlTo}
                style={style}
            >
                {children}
            </RouterNavLink>
        )
    }

    else{
        return(
            <RouterLink
                onClick={onClick}
                className={className}
                to={rawUrlTo}
                style={style}
            >
                {children}
            </RouterLink>
        )
    }
}