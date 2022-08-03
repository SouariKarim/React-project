import Company from './Company';
import moment from 'moment';

class User {
  constructor({
    account_type,
    id,
    email,
    first_name,
    last_name,
    company,
    phone_number,
    job_title,
    can_see_freelance_contact,
    is_admin,
    is_matcher,
    can_see_disponibility_markers,
    premium_until,
    trial,
    last_test_date,
    credits_consume,
    credits_available,
    subscription,
  }) {
    this._first_name = first_name;
    this._last_name = last_name;
    this._id = id;
    this._email = email;
    this._phone_number = phone_number;
    this._job_title = job_title;
    this._can_see_freelance_contact = can_see_freelance_contact;
    this._can_see_disponibility_markers = can_see_disponibility_markers;
    this._account_type = account_type;
    this._is_matcher = false;
    this._premium_until = premium_until;
    this._trial = trial;
    this._last_test_date = last_test_date;
    this._credits_consume = credits_consume;
    this._credits_available = credits_available;
    this._subscription = subscription;

    if (is_matcher === true) {
      this._is_matcher = true;
    }

    if (is_admin !== undefined && is_admin !== null) {
      this._is_admin = is_admin;
    } else {
      this._is_admin = false;
    }

    this._company = null;
    if (company) {
      // if a given company in the arguments to this class, here company is an object witch will be used by the Company class
      this._company = new Company(company); // set this props to the class with the values and the methods
    }
    this._account_type = account_type;
  }

  get subscription_code() {
    if (this._subscription) {
      return this._subscription.code;
    }

    return null;
  }

  // get the full name from the given arguments
  get full_name() {
    let fullname = '';

    if (this.first_name) {
      fullname += this.first_name;
    }
    if (this.last_name) {
      if (fullname != null && fullname.length > 0) {
        fullname += ' ';
      }
      fullname += this.last_name;
    }

    return fullname;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get first_name() {
    if (this._first_name === undefined) {
      return null;
    }
    return this._first_name;
  }

  set first_name(first_name) {
    this._first_name = first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get company() {
    return this._company;
  }

  get phone_number() {
    return this._phone_number;
  }

  get job_title() {
    return this._job_title;
  }

  get can_see_freelance_contact() {
    return this._can_see_freelance_contact;
  }

  get account_type() {
    return this._account_type;
  }

  get is_admin() {
    return this._is_admin;
  }

  get is_matcher() {
    return this._is_matcher;
  }

  get can_see_disponibility_markers() {
    return this._can_see_disponibility_markers;
  }

  get subscription_expiration_days() {
    if (this._premium_until) {
      return moment(this._premium_until).diff(moment(), 'days');
    } else {
      return 0;
    }
  }

  get subscription_expiration_timer() {
    if (this._premium_until) {
      const hours_left = moment(this._premium_until).diff(moment(), 'hours');

      if (hours_left < 0) {
        return 0;
      } else if (hours_left > 48) {
        return moment(this._premium_until).diff(moment(), 'days') + ' jours';
      } else {
        return hours_left + 'h';
      }
    } else {
      return 0;
    }
  }

  get trial() {
    return this._trial;
  }

  get lastTestDate() {
    if (this._last_test_date) {
      return moment(this._last_test_date);
    }
    return null;
  }

  get credits_consume() {
    return this._credits_consume;
  }

  get credits_available() {
    return this._credits_available;
  }

  get subscription() {
    return this._subscription;
  }
}

export default User;
