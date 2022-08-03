import useApi from './useApi'; // return request methods based on axios
import FormError from '../models/FormError'; // construct an error form

const useSiteApi = () => {
  const api = useApi({ resourceName: 'site' }); // the resourcename to construct the url witch will be used to make requests

  const sendContact = ({ phoneNumber, email, message }) => {
    const json = {
      phoneNumber,
      email,
      message,
    };

    return api
      .post({ url: '/contact', json })
      .then(() => {
        return { ok: true }; // send the json data to the contacts url
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

  const sendRemoveRequest = ({ firstName, lastName, clue, message }) => {
    const json = {
      firstName,
      lastName,
      clue,
      message,
    };

    return api
      .post({ url: '/remove-request', json })
      .then(() => {
        return { ok: true }; // send the json data to the remove request url
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

  const newPreRegistration = ({ email }) => {
    const json = {
      email,
    };

    return api.post({ url: '/pre-registration', json }).then(() => {
      return { ok: true };
    });
  };

  const counterReductionLeft = () => {
    return api.get({ url: '/reduction-counter' }).then(({ count }) => {
      return count;
    });
  };

  return {
    sendContact,
    sendRemoveRequest,
    newPreRegistration,
    counterReductionLeft,
  };
};

export default useSiteApi;
