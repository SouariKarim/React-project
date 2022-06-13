import User from "./User";
import Language from "./Language";
import moment from "moment/moment";
import FreelancePosition from "./FreelancePosition";
import FreelanceEducation from "./FreelanceEducation";
import FreelanceCertification from "./FreelanceCertification";
import DisponibilityMarker from "./DisponibilityMarker";
import FreelanceSourcesPrices from "./FreelanceSourcesPrices";
import CloudKeywords from "./CloudKeywords";
import FreelanceService from "./FreelanceService";
import Location from "./Location";


class Freelance extends User {
    constructor({
                    id,
                    emails,
                    first_name,
                    last_name,
                    title,
                    price,
                    profile_image,
                    skills,
                    fonctions,
                    languages,
                    interco,
                    age,
                    location,
                    last_seen,
                    phones,
                    profile_updated_at,
                    summary,
                    summary_private,
                    social_networks,
                    social_networks_linked_in_url,
                    experience,
                    premium,
                    can_open_freelance,
                    showcase,
                    positions,
                    educations,
                    certifications,
                    mobilities,
                    is_bookmarked,
                    has_profile_image,
                    has_resume,
                    has_original_resume,
                    contacts_list,
                    tags,
                    disponibility_markers,
                    marker_type,
                    marker_date,
                    sources_prices,
                    price_min,
                    price_max,
                    keywords_cloud,
                    is_new,
                    is_foreign,
                    service,
                    blackbox_freelance_id,
                    is_remote,
                    is_from_jean_paul,
                    refreshing,
                    do_not_solicit,
                    note,
                    nb_comments
                }) {
        super({id, first_name, last_name});

        this._title = title;
        this._profile_image = profile_image ? profile_image.url : null;
        this._interco = interco;
        this._summary = summary;
        this._experience = experience;
        this._can_open_freelance = can_open_freelance;
        this._showcase = showcase;
        this._is_bookmarked = is_bookmarked === true;
        this._has_profile_image = false;
        this._contacts_list = [];
        this._tags = [];
        this._disponibility_markers = [];
        this._marker_type = marker_type;
        this._marker_date = null;
        this._sources_prices = [];
        this._cloud_keywords = null;
        this._is_new = is_new
        this._is_foreign = is_foreign
        this._session_seen = null;
        this._blackbox_freelance_id = blackbox_freelance_id
        this._is_remote = is_remote
        this._has_resume = has_resume
        this._has_original_resume = has_original_resume
        this._is_from_jean_paul = is_from_jean_paul
        this._refreshing = refreshing
        this._do_not_solicit = do_not_solicit
        this._note = note ?? null;
        this._nb_comments = nb_comments ?? 0;

        if (keywords_cloud) {
            this._cloud_keywords = new CloudKeywords(keywords_cloud);
        }

        if (sources_prices) {
            this._sources_prices = sources_prices.map(s => new FreelanceSourcesPrices({
                source: s.source,
                tjm: s.tjm,
                date: s.date
            }));
        }

        if (marker_date) {
            this._marker_date = moment(new Date(marker_date));
        }

        if (disponibility_markers) {
            this._disponibility_markers = disponibility_markers.map(dm => new DisponibilityMarker({
                code: dm.code,
                disponibility: dm.disponibility,
                date: dm.date
            }));
        }

        if (tags) {
            this._tags = tags;
        }

        if (contacts_list) {
            this._contacts_list = contacts_list;
        }

        if (has_profile_image === true) {
            this._has_profile_image = true;
        }

        this._mobilities = [];
        if (mobilities) {
            this._mobilities = mobilities.map(mobility => new Location(mobility));
        }

        if (premium === undefined) {
            this._premium = true;
        } else {
            this._premium = premium;
        }
        this._social_networks = {};
        if (social_networks) {
            this._social_networks = social_networks;
        }
        if (social_networks_linked_in_url) {
            this._social_networks['linkedin'] = social_networks_linked_in_url;
        }

        this._phones = [];
        if (phones) {
            this._phones = phones;
        }

        this._emails = [];
        if (emails) {
            this._emails = emails;
        }

        this._last_seen = null;
        if (last_seen) {
            this._last_seen = moment(new Date(last_seen));
        }

        this._age = null;
        if (age) {
            this._age = age;
        }

        this._price = null;
        if (price) {
            this._price = price;
        }

        this._price_min = null;
        if (price_min) {
            this._price_min = price_min;
        }

        this._price_max = null;
        if (price_max) {
            this._price_max = price_max;
        }

        this._location = null;
        if (location) {
            this._location = new Location(location);
        }

        this._skills = [];
        if (skills) {
            this._skills = skills
        }

        this._fonctions = [];
        if (fonctions) {
            this._fonctions = fonctions;
        }

        if (languages) {
            this._languages = languages.map((language) => new Language(language));
        } else {
            this._languages = [];
        }

        this._profile_updated_at = null;
        if (profile_updated_at) {
            this._profile_updated_at = moment(new Date(profile_updated_at));
        }

        this._positions = [];
        if (positions) {
            for (const position of positions) {
                const fPos = new FreelancePosition(position);
                this._positions.push(fPos);
            }
        }

        this._educations = [];
        if (educations) {
            this._educations = educations.map(education => new FreelanceEducation(education));
        }

        this._certifications = [];
        if (certifications) {
            this._certifications = certifications.map(certification => new FreelanceCertification(certification));
        }

        this._service = null
        if (service) {
            this._service = new FreelanceService(service)
        }

        this._summary_private = []
        if(summary_private){
            this._summary_private = summary_private
        }
    }

    get id() {
        return this._id
    }

    get hasResume() {
        return this._has_resume
    }

    get hasOriginalResume() {
        return this._has_original_resume
    }

    get keywords_cloud() {
        return this._cloud_keywords;
    }

    get marker_type() {
        return this._marker_type;
    }

    get marker_date() {
        return this._marker_date;
    }

    get disponibility_markers() {
        return this._disponibility_markers;
    }

    get disponibility_markers_sort() {
        return this._disponibility_markers.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    get tags() {
        return this._tags;
    }

    get contacts_list() {
        return this._contacts_list;
    }

    get has_profile_image() {
        return this._has_profile_image;
    }

    set is_bookmarked(value) {
        this._is_bookmarked = value;
    }

    get is_bookmarked() {
        return this._is_bookmarked;
    }

    get mobilities() {
        return this._mobilities;
    }

    get certifications() {
        return this._certifications;
    }

    get educations() {
        return this._educations;
    }

    get positions() {
        return this._positions;
    }

    get title() {
        if (this._title && this._title.length > 0) {
            return this._title;
        }

        if (this.skills && this.skills.length > 0) {
            return "Consultant " + this.skills[0];
        }
        if (this._fonctions && this._fonctions.length > 0) {
            return this._fonctions[0];
        }

        return null;
    }

    get price() {
        return this._price;
    }

    get profile_image() {
        return this._profile_image;
    }

    get full_name() {
        return super.full_name;
    }

    get skills() {
        return this._skills;
    }

    get languages() {
        return this._languages;
    }

    get interco() {
        return this._interco;
    }

    get age() {
        return this._age;
    }

    get location() {
        return this._location;
    }

    get last_seen() {
        if (this._last_seen) {
            return this._last_seen.format("DD/MM/YY");
        }

        return null;
    }

    get session_seen() {
        return this._session_seen
    }

    set_seen_during_session() {
        this._session_seen = moment().format("DD/MM/YY");
    }

    get functions() {
        return this._fonctions;
    }

    get functionsAndServices() {
        if(this.service){
            return [...this.functions, ...this.service.services];
        }
        return this.functions
    }

    get phones() {
        return this._phones;
    }

    get emails() {
        return this._emails;
    }

    date_to_days_ago(date) {
        if (date === null) {
            return null;
        }

        const now = moment();
        const diffDays = Math.round(now.diff(date, 'days', true));

        if (diffDays < 1) {
            const diffHours = Math.round(now.diff(date, 'hours', true));
            if (diffHours < 1) {
                const diffMinutes = Math.round(now.diff(date, 'minutes', true));

                return diffMinutes + "min";
            }

            return diffHours + "h";
        }

        if (diffDays <= 31) {
            if (diffDays <= 1) {
                return diffDays + "j";
            }
            return diffDays + "j";
        }

        const diffMonths = Math.round(now.diff(date, 'months', true));
        if (diffMonths <= 12) {
            if (diffMonths <= 1) {
                return diffMonths + " mois";
            }
            return diffMonths + " mois";
        }


        const diffYears = Math.round(now.diff(date, 'years', true));
        if (diffYears <= 1) {
            return diffYears + " an";
        }

        return diffYears + " ans";
    }

    get profileUpdatedAt() {
        return this._profile_updated_at;
    }

    get marker_disponibility_date() {
        return this.date_to_days_ago(this._marker_date);
    }

    get marker_disponibility_day() {
        if (this._marker_date) {
            const now = moment();
            return now.diff(this._marker_date, 'days');
        }
        return 0;
    }

    get summary() {
        return this._summary ? this.nl2br(this._summary) : null;
    }

    get privateSummary() {
        if(this._summary_private.length > 0){
            return this._summary_private.map((summary) => this.nl2br(summary))
        }
        return null
    }

    nl2br(str, replaceMode, isXhtml) {
        var breakTag = (isXhtml) ? '<br />' : '<br>';
        var replaceStr = (replaceMode) ? '$1' + breakTag : '$1' + breakTag + '$2';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
    }

    get social_networks() {
        return this._social_networks;
    }

    get experience() {
        return this._experience;
    }

    get formattedPhones() {
        if (this._phones === null) {
            return [];
        }

        const formattedPhones = [];
        for (const phone of this._phones) {
            let clearedPhone = phone.trim()
            const countryCode = clearedPhone.match(/\(\+\d+\)/g)

            if (countryCode && countryCode.length > 0) {
                const phoneWithoutIndicator = clearedPhone.replace(/\(\+\d+\)/g, '').replace(/[^\dA-Z]/g, '')
                if (phoneWithoutIndicator.length % 2 === 0) {
                    clearedPhone = countryCode + " " + phoneWithoutIndicator.replace(/(.{2})/g, '$1 ')
                }
                else {
                    clearedPhone = countryCode + " " + phoneWithoutIndicator
                }
            }
            else {
                clearedPhone = clearedPhone.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ')
            }

            formattedPhones.push(clearedPhone.trim());
        }

        return formattedPhones;
    }

    get premium() {
        return this._premium;
    }

    get can_open_freelance() {
        return this._can_open_freelance;
    }

    get showcase() {
        return this._showcase;
    }

    get sources_prices() {
        return this._sources_prices;
    }
    
    get price_min() {
        return this._price_min;
    }

    get price_max() {
        return this._price_max;
    }

    get is_new() {
        return this._is_new
    }

    get service() {
        return this._service;
    }

    get blackboxFreelanceId() {
        return this._blackbox_freelance_id
    }

    get isForeign() {
        return this._is_foreign
    }

    get isRemote() {
        return this._is_remote
    }

    get isFromJeanPaul() {
        return this._is_from_jean_paul;
    }

    get isRefreshing() {
        return this._refreshing
    }

    get doNotSolicit() {
        return this._do_not_solicit
    }

    get note() {
        if (this._note) {
            return this._note;
        }
        return 0;
    }

    get nbComments() {
        return this._nb_comments;
    }
}

export default Freelance;
