import useApi from "./useApi";
import useAuthManager from "./useAuthManager";
import SavedResearch from "../models/SavedResearch";


export default function useSavedResearchApi() {

    const api = useApi({resourceName: "users"});
    const {user} = useAuthManager();

    const getAllSavedResearch = () => {
        return api.get({
            url: `/${user.id}/research`
        }).then((json) => {
            return json.map((item) => {
                return new SavedResearch(item);
            })
        })
    }

    const createSavedResearch = (formProps) => {

        const parseBool = (rawBool) => {
            if (rawBool === null) {
                return 0;
            }

            if (rawBool === "1" || rawBool === 1 || rawBool === true) {
                return 1;
            }

            if (rawBool === "0" || rawBool === 0 || rawBool === false) {
                return 0;
            }

            return rawBool === "true" || rawBool === true;
        }

        const payload = {
            'city': formProps.searchCity.city() !== "null" ? formProps.searchCity.city() : null,
            'radius': formProps.searchCity.locationRadius(),
            'includeLocationMobility': parseBool(formProps.searchCity.includeLocationMobility()),
            'disponibilityDay': formProps.searchDisponibility.disponibilityDay(),
            'minExperience': formProps.searchExperience.minExperience(),
            'maxExperience': formProps.searchExperience.maxExperience(),
            'includeUnknownExperience': parseBool(formProps.searchExperience.includeUnknownExperience()),
            'minPrice': formProps.searchPrice.minPrice(),
            'maxPrice': formProps.searchPrice.maxPrice(),
            'includeUnknownPrice': parseBool(formProps.searchPrice.includeUnknownPrice()),
            'englishLevel': formProps.searchEnglish.englishLevel(),
            'includeUnknownEnglishLevel': parseBool(formProps.searchEnglish.includeUnknownEnglishLevel()),
            'phoneFilter': parseBool(formProps.searchPertinence.phoneFilter()),
            'emailFilter': parseBool(formProps.searchPertinence.emailFilter()),
            'notReadFilter': parseBool(formProps.searchPertinence.notReadFilter()),
            'includeRemote': parseBool(formProps.searchPertinence.includeRemote()),
            'includeForeign': parseBool(formProps.searchPertinence.includeForeign()),
            'query': formProps.typingQuery
        }

        return api.post({
            url: `/${user.id}/research`,
            json: payload
        }).then((json) => {
            return json.map((item) => {
                return new SavedResearch(item);
            })
        })
    }

    const updateSavedResearch = ({savedResearchId, pinned}) => {
        return api.patch({
            url: `/${user.id}/research/${savedResearchId}`,
            json: {
                'pinned': pinned
            }
        }).then((json) => {
            return json.map((item) => {
                return new SavedResearch(item);
            })
        })
    }

    const cleanSavedResearch = () => {
        return api.post({
            url: `/${user.id}/research/clean`
        }).then((json) => {
            return json.map((item) => {
                return new SavedResearch(item);
            })
        })
    }

    const deleteSavedResearch = ({savedResearchId}) => {
        return api.del({
            url: `/${user.id}/research/${savedResearchId}`
        }).then((json) => {
            return json.map((item) => {
                return new SavedResearch(item);
            })
        })
    }

    return {
        getAllSavedResearch,
        createSavedResearch,
        updateSavedResearch,
        cleanSavedResearch,
        deleteSavedResearch
    }
}