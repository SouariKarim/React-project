class Location {
    constructor(cityData) {
        const {city, country, country_iso2, zip_codes, state} = cityData

        this._name = city;
        this._countryIso2 = country_iso2;
        this._countryName = country;
        this._stateName = state;

        if (zip_codes) {
            this._zipcodes = zip_codes;
        } else {
            this._zipcodes = [];
        }
    }

    get name() {
        return this._name;
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

    get zipCode() {
        if (this._name === "paris") {
            return 75000;
        } else if (this._name === "marseille") {
            return 13000;
        }

        return (this._zipcodes && this._zipcodes.length > 0) ? this._zipcodes[0] : this._zipcodes;
    }

    get zipCodes() {
        return this._zipcodes;
    }

    get stateName() {
        return this._stateName;
    }

    get mostAccurateLocationName() {
        if (this._name) {
            return this._name;
        }
        if (this._stateName) {
            return this._stateName;
        }
        if (this._countryName) {
            return this._countryName;
        }

        return null;
    }
}

export default Location;