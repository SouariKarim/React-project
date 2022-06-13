

class FreelanceService
{
    constructor({headline, location, disponibility, services}) {
        this._headline = headline
        this._location = location
        this._disponibility = disponibility
        this._services = services
    }

    get headline() {
        return this._headline
    }

    get location() {
        return this._location
    }

    get disponibility() {
        return this._disponibility
    }

    get services() {
        return this._services
    }
}

export default FreelanceService;


