class FreelanceEducation
{
    constructor({title, degree, date1, date2, logo, description, activities}) {
        this._title = title ? title: null;
        this._degree = degree ? degree : null;
        this._date1 = date1 ? date1 : null;
        this._date2 = date2 ? date2 : null;
        this._logo = logo ? logo: null;
        this._description = description ? description : null
        this._activities = activities ? activities : null
    }

    get logo() {
        return this._logo;
    }

    get title() {
        return this._title;
    }

    get degree() {
        return this._degree;
    }

    get date1() {
        return this._date1;
    }

    get date2() {
        return this._date2;
    }

    get description() {
        return this._description
    }

    get activities() {
        return this._activities
    }
}

export default FreelanceEducation;