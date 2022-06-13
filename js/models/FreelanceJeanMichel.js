class FreelanceJeanMichel {
    constructor({emails, first_name, last_name, phone_number, experience, tjm, available, linked_in_url, birthdate}) {
        this._first_name = first_name;
        this._last_name = last_name;
        this._emails = emails;
        this._phoneNumber = phone_number;
        this._tjm = tjm;
        this._experience = experience;
        this._available = available;
        this._phone_number = phone_number;
        this._linked_in_url = linked_in_url;
        this._birthdate = birthdate;
    }

    get email() {
        return this._emails ? this._emails[0]: '';
    }

    get first_name() {
        return this._first_name;
    }

    get last_name() {
        return this._last_name;
    }

    get phone_number() {
        return this._phone_number;
    }

    get experience() {
        return this._experience ? this._experience.normalize(): '';
    }

    get tjm() {
        return this._tjm;
    }

    get available() {
        return this._available;
    }

    get linked_in_url() {
        return this._linked_in_url;
    }

    get birthdate() {
        return this._birthdate;
    }
}

export default FreelanceJeanMichel;