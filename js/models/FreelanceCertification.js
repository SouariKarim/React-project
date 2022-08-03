// return freelance certification details
class FreelanceEducation {
  constructor({ name, logo, deliver_at, deliver_by, expire }) {
    this._name = name ? name : null;
    this._logo = logo ? logo : null;
    this._deliver_at = deliver_at;
    this._deliver_by = deliver_by;
    this._expire = expire;
  }

  get deliverAt() {
    return this._deliver_at;
  }

  get deliverBy() {
    return this._deliver_by;
  }

  get expire() {
    return this._expire;
  }

  get logo() {
    return this._logo;
  }

  get name() {
    return this._name;
  }
}

export default FreelanceEducation;
