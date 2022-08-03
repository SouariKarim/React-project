import moment from 'moment';

// saved offer data
class SavedResearch {
  constructor({
    id,
    pinned,
    creation_date,
    city,
    radius,
    include_location_mobility,
    disponibility_day,
    min_experience,
    max_experience,
    include_unknown_experience,
    min_price,
    max_price,
    include_unknown_price,
    english_level,
    include_unknown_english_level,
    phone_filter,
    email_filter,
    not_read_filter,
    include_foreign,
    include_remote,
    query,
  }) {
    this._id = id;
    this._pinned = pinned;
    this._creationDate = creation_date;
    this._city = city;
    this._radius = radius;
    this._include_location_mobility = include_location_mobility;
    this._disponibility_day = disponibility_day;
    this._min_experience = min_experience;
    this._max_experience = max_experience;
    this._include_unknown_experience = include_unknown_experience;
    this._min_price = min_price;
    this._max_price = max_price;
    this._include_unknown_price = include_unknown_price;
    this._english_level = english_level;
    this._include_unknown_english_level = include_unknown_english_level;
    this._phone_filter = phone_filter;
    this._email_filter = email_filter;
    this._not_read_filter = not_read_filter;
    this._include_remote = include_remote;
    this._include_foreign = include_foreign;
    this._query = query;
  }

  get id() {
    return this._id;
  }

  get isPinned() {
    return this._pinned;
  }

  set setPinned(bool) {
    this._pinned = bool;
  }

  get creationDate() {
    return moment(this._creationDate);
  }

  get city() {
    return this._city;
  }

  get cityName() {
    if (this._city) {
      return this._city.name.charAt(0).toUpperCase() + this._city.name.slice(1);
    }
    return '-';
  }

  get countryIso2() {
    if (this._city && this._city.country_iso2) {
      return this._city.country_iso2;
    }
    return null;
  }

  get radius() {
    return this._radius;
  }

  get includeLocationMobility() {
    return this._include_location_mobility;
  }

  get disponibilityDay() {
    return this._disponibility_day;
  }

  get minExperience() {
    return this._min_experience;
  }

  get maxExperience() {
    return this._max_experience;
  }

  get includeUnknownExperience() {
    return this._include_unknown_experience;
  }

  get minPrice() {
    return this._min_price;
  }

  get maxPrice() {
    return this._max_price;
  }

  get includeUnknownPrice() {
    return this._include_unknown_price;
  }

  get englishLevel() {
    return this._english_level;
  }

  get includeUnknownEnglishLevel() {
    return this._include_unknown_english_level;
  }

  get phoneFilter() {
    return this._phone_filter;
  }

  get emailFilter() {
    return this._email_filter;
  }

  get notReadFilter() {
    return this._not_read_filter;
  }

  get includeRemote() {
    return this._include_remote;
  }

  get includeForeign() {
    return this._include_foreign;
  }

  get query() {
    return this._query;
  }
}

export default SavedResearch;
