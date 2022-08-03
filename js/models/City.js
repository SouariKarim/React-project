// a class witch hass the city props and methods

class City {
  constructor(cityData) {
    const { name, id, zip_codes, country_name, country_iso2 } = cityData;

    this._name = name;
    this._id = id;
    this._countryIso2 = country_iso2;
    this._countryName = country_name;

    if (zip_codes) {
      this._zipcodes = zip_codes;
    } else {
      this._zipcodes = [];
    }
  }

  get name() {
    return this._name;
  }

  get zipCode() {
    if (this._name === 'paris') {
      return 75000;
    } else if (this._name === 'marseille') {
      return 13000;
    }

    return this._zipcodes && this._zipcodes.length > 0
      ? this._zipcodes[0]
      : this._zipcodes;
  }

  get zipCodes() {
    return this._zipcodes;
  }

  get id() {
    return this._id;
  }

  get countryIso2() {
    if (this._countryIso2) {
      return this._countryIso2;
    }

    return null;
  }

  get countryName() {
    if (this._countryName) {
      return this._countryName;
    }

    return null;
  }
}

export default City;
