import useApi from "./useApi";
import FormError from "../models/FormError";

const useSiteApi = () => {
    const api = useApi({resourceName: 'site'});

    const sendContact = ({phoneNumber, email, message}) => {
        const json = {
            phoneNumber,
            email, message
        };

        return api.post({url: '/contact', json}).then(() => {
            return {ok: true};
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

    const sendRemoveRequest = ({firstName, lastName, clue, message}) => {
        const json = {
            firstName, lastName, clue, message
        };

        return api.post({url: '/remove-request', json}).then(() => {
            return {ok: true};
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

    const newPreRegistration = ({email}) => {
        const json = {
            email
        };

        return api.post({url: '/pre-registration', json}).then(() => {
            return {ok: true};
        });
    }

    const counterReductionLeft = () => {
        return api.get({url: '/reduction-counter'}).then(({count}) => {
            return count;
        });
    }

    return {
        sendContact,
        sendRemoveRequest,
        newPreRegistration,
        counterReductionLeft
    };
};

export default useSiteApi;