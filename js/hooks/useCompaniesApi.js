import useApi from "./useApi";
import User from "../models/User";
import FormError from "../models/FormError";
import Company from "../models/Company";

const useCompaniesApi = () => {
    const api = useApi({resourceName: 'companies'});

    const getCompany = ({companyId}) => {
        return api.get({url: '/' + companyId}).then(company => {
            return new Company(company);
        });
    }

    const getUsers = (companyId) => {
        return api.get({url: '/' + companyId + '/users'}).then(users => {
            return users.map(user => {
                return new User(user);
            })
        });
    }

    const removeUser = (companyId, userId) => {
        return api.del({url: '/' + companyId + '/users/' + userId}).then(users => {
            return users.map(user => {
                return new User(user);
            })
        });
    }

    const addUser = ({companyId, email, firstName, lastName, phoneNumber, jobTitle, password}) => {
        const json = {
            email,
            firstName,
            lastName,
            phoneNumber,
            jobTitle,
            plainPassword: password
        };

        return api.post({url: '/'+companyId+'/users', json}).then(json => {
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

    return {
        getUsers,
        removeUser,
        addUser,
        getCompany
    };
};

export default useCompaniesApi;