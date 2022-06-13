import Freelance from "../models/Freelance";
import useApi from "./useApi";
import CloudKeywords from "../models/CloudKeywords";


const useFreelancesApi = () => {
    const api = useApi({resourceName: "freelances"});

    const getFreelance = ({freelanceId, query = null}) => {
        return api.get({url: "/" + freelanceId, queryParams: {query}}).then((json) => {
            return new Freelance(json);
        });
    };

    const getCloudKeywords = (freelanceId, query, cancelToken = null) => {
        return api.get({cancelToken, url: "/" + freelanceId + "/keywords", queryParams: {query}}).then((json) => {
            return new CloudKeywords(json);
        });
    }

    const getFreelances = ({
                               query,
                               minExperience,
                               maxExperience,
                               includeUnknownExperience,
                               minPrice,
                               maxPrice,
                               includeUnknownPrice,
                               includeForeign,
                               includeLocationMobility,
                               includeUnknownEnglishLevel,
                               cityId,
                               englishLevel,
                               page = 1,
                               showcase = null,
                               locationRadius = null,
                               cancelToken = null,
                               phoneFilter = 0,
                               emailFilter = 0,
                               notReadFilter = 0,
                               onlyBookmark = 0,
                               disponibilityDay = 60,
                               includeRemote = 1,
                               filterBy,
                                notation,
                           }) => {

        if (cityId === "null") {
            cityId = null;
        }

        return api
            .get({
                url: "",
                queryParams: {
                    query,
                    page,
                    min_price: minPrice,
                    max_price: maxPrice,
                    include_unknown_price: includeUnknownPrice,
                    min_experience: minExperience,
                    max_experience: maxExperience,
                    include_unknown_experience: includeUnknownExperience,
                    include_location_mobility: includeLocationMobility,
                    include_foreign: includeForeign,
                    include_unknown_english_level: includeUnknownEnglishLevel,
                    city: cityId,
                    english_level: englishLevel,
                    showcase: showcase ? 1 : 0,
                    location_radius: locationRadius,
                    phone_filter: phoneFilter,
                    email_filter: emailFilter,
                    not_read_filter: notReadFilter,
                    only_bookmark: (onlyBookmark === 1 || onlyBookmark === true) ? 1 : 0,
                    disponibility_day: disponibilityDay,
                    include_remote: includeRemote,
                    filter_by: filterBy,
                    note: notation
                },
                cancelToken
            })
            .then((json) => {
                return {
                    nb_pages: json.nb_pages,
                    current_page: json.current_page,
                    nb_items: json.nb_items,
                    research_already_saved: json.research_already_saved,
                    extra: json.extra ?? [],
                    freelances: json.items ? json.items.map((json) => {
                        return new Freelance(json);
                    }) : [],
                };
            });
    };

    const getResume = ({freelance}) => {
        return api
            .getPdf({url: getResumeUrl({freelance, absolute: false})})
            .then((pdf) => {
                return URL.createObjectURL(pdf);
            }).catch(() => {
                return null;
            });
    };

    const getResumeUrl = ({freelance, absolute = true}) => {
        const resumeParts = [];
        if (freelance.first_name) {
            resumeParts.push(freelance.first_name);
        }
        if (freelance.last_name) {
            resumeParts.push(freelance.last_name)
        }
        resumeParts.push('jean-Michel-io');
        resumeParts.push(freelance.id);

        const relativePath = "/" + freelance.id + "/resume/" + resumeParts.join('-') + ".pdf";

        if (absolute) {
            return api.formatUrl(relativePath, true).href;
        }

        return relativePath;
    }

    const getProfileImage = (freelanceId) => {
        return api
            .getJpeg({url: getProfileImageUrl(freelanceId, false)})
            .then((pdf) => {
                return URL.createObjectURL(pdf);
            }).catch(() => {
                return null;
            });
    };

    const getProfileImageUrl = (freelanceId, absolute = true) => {
        if (absolute) {
            return api.formatUrl("/" + freelanceId + "/image.jpeg", true).href;
        }

        return "/" + freelanceId + "/image.jpeg";
    };

    const addToBookmark = (freelanceId) => {
        return api.post({url: "/" + freelanceId + "/bookmark"}).then(response => {
            return response.ok;
        });
    }

    const removeFromBookmark = (freelanceId) => {
        return api.del({url: "/" + freelanceId + "/bookmark"}).then(response => {
            return response.ok;
        });
    }

    const moderateFreeelance = (freelanceId, moderationPayload) => {
        return api.post({url: "/" + freelanceId + "/moderate", json: moderationPayload})
    }

    const refreshFreelance = (freelanceId) => {
        return api.post({url: "/" + freelanceId + "/refresh"})
    }

    const reportFreelance = (freelanceId, reportPayload) => {
        return api.post({url: "/" + freelanceId + "/report", json: reportPayload})
    }

    const editFreelanceNotation = (freelanceId, note) => {
        return api.post({url: "/" + freelanceId + "/notation", json: {note: note}})
    }

    return {
        getFreelance,
        getFreelances,
        getProfileImage,
        getResume,
        getCloudKeywords,
        addToBookmark,
        removeFromBookmark,
        getResumeUrl,
        getProfileImageUrl,
        moderateFreeelance,
        refreshFreelance,
        reportFreelance,
        editFreelanceNotation
    };
};

export default useFreelancesApi;
