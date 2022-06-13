import User from "../models/User";
import FormError from "../models/FormError";
import useApi from "./useApi";
import FreelanceJeanMichel from "../models/FreelanceJeanMichel";
import useAuthManager from "./useAuthManager";

const useUsersApi = () => {
    const api = useApi({resourceName: 'users'});
    const {logout} = useAuthManager();

    const updateUser = ({id, email, firstName, lastName, phoneNumber, jobTitle, plainPassword = null}) => {
        const json = {
            email,
            firstName,
            lastName,
            phoneNumber,
            jobTitle
        };

        if (plainPassword !== null) {
            json.plainPassword = plainPassword;
        }

        return api.patch({url: '/'+id, json}).then(json => {
            if (json === null) {
                return null;
            }
            return new User(json);
        }).catch(error => {
            const json = error.response.data;
            const errors = [];
            const apiFields = Object.keys(json.errors);
            for (const apiField of apiFields) {
                errors.push(new FormError({field: apiField, messages: json.errors[apiField]}));
            }

            throw errors;
        });
    }

    const generateNewPassword = ({email}) => {
        const json = {
            email,
        };

        return api.post({url: '/password/recovery', json}).then(json => {
            return true;
        }).catch(error => {
            const json = error.response.data;
            const errors = [];
            const apiFields = Object.keys(json.errors);
            for (const apiField of apiFields) {
                errors.push(new FormError({field: apiField, messages: json.errors[apiField]}));
            }

            throw errors;
        });
    }

    const registration = ({email, password, firstName, lastName, phoneNumber, jobTitle, companyName, companyType}) => {
        const json = {
            email,
            plainPassword: password,
            firstName,
            lastName,
            phoneNumber,
            jobTitle,
            company: {
                name: companyName,
                type: companyType
            }
        };

        return api.post({url: '', json, withBearerToken: false}).then(json => {
            return new User(json);
        }).catch(error => {
            const json = error.response.data;
            const errors = [];
            const apiFields = Object.keys(json.errors);
            for (const apiField of apiFields) {
                errors.push(new FormError({field: apiField, messages: json.errors[apiField]}));
            }

            throw errors;
        });
    }

    const getUser = (userId) => {
        return api.get({url: '/' + userId}).then(json => {
            if (json === undefined) {
                return null;
            }

            return new User(json);
        });
    }

    const getFreelanceJeanMichel = (userId) => {
        return api.get({url: '/' + userId + "/freelance"}).then(json => {
            if (json === undefined) {
                return null;
            }

            return new FreelanceJeanMichel(json);
        });
    }

    const putFreelanceJeanMichel = (userId, payload) => {
        return api.patch({url: '/' + userId + "/freelance", json: payload}).then(json => {
            if (json === undefined) {
                return null;
            }

            return new FreelanceJeanMichel(json);
        }).catch(error => {
            const json = error.response.data;
            const errors = [];
            const apiFields = Object.keys(json.errors);
            for (const apiField of apiFields) {
                errors.push(new FormError({field: apiField, messages: json.errors[apiField]}));
            }

            throw errors;
        });
    }

    const removeUser = ({userId}) => {
        return api.del({url: '/' + userId}).finally(() => {
            logout();
        });
    }

    return {
        getUser,
        registration,
        updateUser,
        removeUser,
        generateNewPassword,
        getFreelanceJeanMichel,
        putFreelanceJeanMichel
    };
};

export default useUsersApi;