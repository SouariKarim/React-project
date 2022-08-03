import User from '../models/User'; // class containing user info and methods
import FormError from '../models/FormError'; // class containg the field and the error with the methods
import useApi from './useApi'; // methods to deal with api urls
import FreelanceJeanMichel from '../models/FreelanceJeanMichel'; // class containg freelancer info and methods
import useAuthManager from './useAuthManager'; // hook containig the auth methods

const useUsersApi = () => {
  const api = useApi({ resourceName: 'users' }); // returns the method based on axios as a promise
  const { logout } = useAuthManager();

  const updateUser = ({
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    jobTitle,
    plainPassword = null,
  }) => {
    const json = {
      email,
      firstName,
      lastName,
      phoneNumber,
      jobTitle,
    };

    if (plainPassword !== null) {
      json.plainPassword = plainPassword;
    }

    // update the user using the api custom hook methods
    return api
      .patch({ url: '/' + id, json })
      .then((json) => {
        if (json === null) {
          return null;
        }
        return new User(json); // construuct a new user based on the given json info and get the access to the user class methods
      })
      .catch((error) => {
        const json = error.response.data;
        const errors = [];
        const apiFields = Object.keys(json.errors);
        for (const apiField of apiFields) {
          errors.push(
            new FormError({ field: apiField, messages: json.errors[apiField] })
          );
        }

        throw errors;
      });
  };

  // generate a new password
  const generateNewPassword = ({ email }) => {
    const json = {
      email,
    };
    // make a post request to the below url to generate a new password
    return api
      .post({ url: '/password/recovery', json })
      .then((json) => {
        return true;
      })
      .catch((error) => {
        const json = error.response.data;
        const errors = [];
        const apiFields = Object.keys(json.errors);
        for (const apiField of apiFields) {
          errors.push(
            new FormError({ field: apiField, messages: json.errors[apiField] })
          );
        }

        throw errors;
      });
  };

  // make the registration request
  const registration = ({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    jobTitle,
    companyName,
    companyType,
  }) => {
    const json = {
      email,
      plainPassword: password,
      firstName,
      lastName,
      phoneNumber,
      jobTitle,
      company: {
        name: companyName,
        type: companyType,
      },
    };

    // make a post request to the below url in the backend to make the registration request
    return api
      .post({ url: '', json, withBearerToken: false })
      .then((json) => {
        return new User(json);
      })
      .catch((error) => {
        const json = error.response.data;
        const errors = [];
        const apiFields = Object.keys(json.errors);
        for (const apiField of apiFields) {
          errors.push(
            new FormError({ field: apiField, messages: json.errors[apiField] })
          );
        }

        throw errors;
      });
  };

  // make a get request to get a user profile with the given id in the argument and return a User class instance
  const getUser = (userId) => {
    return api.get({ url: '/' + userId }).then((json) => {
      if (json === undefined) {
        return null;
      }

      return new User(json);
    });
  };

  // get the freelancer profile based on the id to the below url and return an instance of freelancer class
  const getFreelanceJeanMichel = (userId) => {
    return api.get({ url: '/' + userId + '/freelance' }).then((json) => {
      if (json === undefined) {
        return null;
      }

      return new FreelanceJeanMichel(json);
    });
  };

  // update a freelancer profile and return a freelance clas instance
  const putFreelanceJeanMichel = (userId, payload) => {
    return api
      .patch({ url: '/' + userId + '/freelance', json: payload })
      .then((json) => {
        if (json === undefined) {
          return null;
        }

        return new FreelanceJeanMichel(json);
      })
      .catch((error) => {
        const json = error.response.data;
        const errors = [];
        const apiFields = Object.keys(json.errors);
        for (const apiField of apiFields) {
          errors.push(
            new FormError({ field: apiField, messages: json.errors[apiField] })
          );
        }

        throw errors;
      });
  };

  // remove a user from a db and logout
  const removeUser = ({ userId }) => {
    return api.del({ url: '/' + userId }).finally(() => {
      logout(); // a method from the useAuthManger hook
    });
  };

  return {
    getUser,
    registration,
    updateUser,
    removeUser,
    generateNewPassword,
    getFreelanceJeanMichel,
    putFreelanceJeanMichel,
  };
};

export default useUsersApi;
