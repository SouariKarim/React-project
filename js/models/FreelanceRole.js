class FreelanceRole
{
    constructor({date1, date2, title, location, description}) {
        this._date1 = date1 ? date1: null;
        this._date2 = date2 ? date2: null;
        this._title = title ? title : null;
        this._location = location ? location : null;
        this._description = description ? description : null;
    }

    get date1() {
        return this._date1;
    }

    get date2() {
        return this._date2;
    }

    get title() {
        return this._title;
    }

    get location() {
        return this._location;
    }

    get description() {
        return this._description;
    }
}

export default FreelanceRole;