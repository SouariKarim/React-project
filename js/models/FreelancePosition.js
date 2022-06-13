import FreelanceRole from "./FreelanceRole";

class FreelancePosition
{
    constructor({company_name, date1, date2, roles, logo}) {
        this._company_name = company_name ? company_name: null;
        this._date1 = date1 ? date1: null;
        this._date2 = date2 ? date2: null;
        this._roles = roles ? roles: [];
        this._logo = logo ? logo: null;

        if (roles) {
            this._roles = roles.map(role => {
                return new FreelanceRole(role);
            })
        }
    }

    get logo() {
        return this._logo;
    }

    get company_name() {
        return this._company_name;
    }

    get date1() {
        return this._date1;
    }

    get date2() {
        return this._date2;
    }

    get roles() {
        return this._roles;
    }
}

export default FreelancePosition;