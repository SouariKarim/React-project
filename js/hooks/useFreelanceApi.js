import Freelance from '../models/Freelance'; // a class witch extends the User class containing a bunch of data obout the freelancer
import useApi from './useApi'; // request methods using axios
import CloudKeywords from '../models/CloudKeywords'; // return keywords and hits

const useFreelancesApi = () => {
  const api = useApi({ resourceName: 'freelances' }); // give the resource name to construct the url and append it to axios methodss

  // get freelance details
  const getFreelance = ({ freelanceId, query = null }) => {
    return api
      .get({ url: '/' + freelanceId, queryParams: { query } })
      .then((json) => {
        return new Freelance(json); // construct a new freelance class usign the returned object from the backend
      });
  };

  // get cloud keyword
  const getCloudKeywords = (freelanceId, query, cancelToken = null) => {
    return api
      .get({
        cancelToken,
        url: '/' + freelanceId + '/keywords',
        queryParams: { query },
      })
      .then((json) => {
        return new CloudKeywords(json);
      });
  };

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
    if (cityId === 'null') {
      cityId = null;
    }

    return api
      .get({
        // this given arguments are the one necessairy for building a backend url and make a get request to it
        url: '',
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
          only_bookmark: onlyBookmark === 1 || onlyBookmark === true ? 1 : 0,
          disponibility_day: disponibilityDay,
          include_remote: includeRemote,
          filter_by: filterBy,
          note: notation,
        },
        cancelToken,
      })
      .then((json) => {
        return {
          nb_pages: json.nb_pages,
          current_page: json.current_page,
          nb_items: json.nb_items,
          research_already_saved: json.research_already_saved,
          extra: json.extra ?? [],
          freelances: json.items // if this condition is true
            ? json.items.map((json) => {
                // json has all the found available freelancers
                return new Freelance(json); // construct a new freelancer from the class for each found freelancer
              })
            : [],
        };
      });
  };

  const getResume = ({ freelance }) => {
    return api
      .getPdf({ url: getResumeUrl({ freelance, absolute: false }) }) // make a get request tp the resume url
      .then((pdf) => {
        return URL.createObjectURL(pdf);
      })
      .catch(() => {
        return null;
      });
  };

  // get freelancer resume backend url
  const getResumeUrl = ({ freelance, absolute = true }) => {
    // construct the url to witch we will make the get request to get the freelacer resume
    const resumeParts = [];
    if (freelance.first_name) {
      resumeParts.push(freelance.first_name);
    }
    if (freelance.last_name) {
      resumeParts.push(freelance.last_name);
    }
    resumeParts.push('jean-Michel-io');
    resumeParts.push(freelance.id);

    const relativePath =
      '/' + freelance.id + '/resume/' + resumeParts.join('-') + '.pdf'; // the url containing the freelancer resume based on the freelancer id and firstname and lastname

    if (absolute) {
      return api.formatUrl(relativePath, true).href; // add the baseurl to given url
    }

    return relativePath; // return the url
  };

  const getProfileImage = (freelanceId) => {
    return api
      .getJpeg({ url: getProfileImageUrl(freelanceId, false) }) // returns a new blob
      .then((pdf) => {
        return URL.createObjectURL(pdf); // create a url from the retuned blob pointing to the profile image
      })
      .catch(() => {
        return null;
      });
  };

  // construct the profile image url
  const getProfileImageUrl = (freelanceId, absolute = true) => {
    if (absolute) {
      return api.formatUrl('/' + freelanceId + '/image.jpeg', true).href;
    }

    return '/' + freelanceId + '/image.jpeg';
  };

  // add a freelacer profile to the bookmark
  const addToBookmark = (freelanceId) => {
    return api
      .post({ url: '/' + freelanceId + '/bookmark' })
      .then((response) => {
        return response.ok;
      });
  };

  // remove freelacer profile from the bookmark
  const removeFromBookmark = (freelanceId) => {
    return api
      .del({ url: '/' + freelanceId + '/bookmark' })
      .then((response) => {
        return response.ok;
      });
  };

  const moderateFreeelance = (freelanceId, moderationPayload) => {
    return api.post({
      url: '/' + freelanceId + '/moderate',
      json: moderationPayload,
    });
  };

  const refreshFreelance = (freelanceId) => {
    return api.post({ url: '/' + freelanceId + '/refresh' });
  };

  // report a freelacer profile
  const reportFreelance = (freelanceId, reportPayload) => {
    return api.post({
      url: '/' + freelanceId + '/report',
      json: reportPayload,
    });
  };

  // edit the freelacer notation
  const editFreelanceNotation = (freelanceId, note) => {
    return api.post({
      url: '/' + freelanceId + '/notation',
      json: { note: note },
    });
  };

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
    editFreelanceNotation,
  };
};

export default useFreelancesApi;
