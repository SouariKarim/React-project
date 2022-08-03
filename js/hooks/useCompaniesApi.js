import useApi from './useApi'; // request axios methods
import User from '../models/User'; // user constructor
import FormError from '../models/FormError'; // return the field and the error message
import Company from '../models/Company'; // company constructor

const useCompaniesApi = () => {
  const api = useApi({ resourceName: 'companies' }); // request methods from the given resource name

  const getCompany = ({ companyId }) => {
    return api.get({ url: '/' + companyId }).then((company) => {
      // get a company based on the given id
      return new Company(company); // construct a company class from the returned company object
    });
  };

  const getUsers = (companyId) => {
    // get company user based on the company id
    return api.get({ url: '/' + companyId + '/users' }).then((users) => {
      return users.map((user) => {
        // get all users
        return new User(user); // construct each user
      });
    });
  };

  // remove a user from a company
  const removeUser = (companyId, userId) => {
    return api
      .del({ url: '/' + companyId + '/users/' + userId })
      .then((users) => {
        return users.map((user) => {
          return new User(user); // return the deleted user
        });
      });
  };

  const addUser = ({
    companyId,
    email,
    firstName,
    lastName,
    phoneNumber,
    jobTitle,
    password,
  }) => {
    const json = {
      email,
      firstName,
      lastName,
      phoneNumber,
      jobTitle,
      plainPassword: password,
    };

    return api
      .post({ url: '/' + companyId + '/users', json })
      .then((json) => {
        return new User(json); // return the added user
      })
      .catch((error) => {
        const json = error.response.data;
        const errors = [];
        const apiFields = Object.keys(json.errors);
        for (const apiField of apiFields) {
          errors.push(
            new FormError({ field: apiField, messages: json.errors[apiField] })
          ); // construct an error object based on the given field and message
        }

        throw errors;
      });
  };

  return {
    getUsers,
    removeUser,
    addUser,
    getCompany,
  };
};

export default useCompaniesApi;
