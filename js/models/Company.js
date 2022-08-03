import User from './User';

class Company {
  constructor({ id, name, users, nb_freelance_notations }) {
    this._id = id;
    this._name = name;
    this._nb_freelance_notations = nb_freelance_notations;

    this._users = [];
    if (users) {
      // the user is an object wich can initiate the User class
      this._users = users.map((user) => new User(user));
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get users() {
    return this._users;
  }

  get nb_freelance_notations() {
    return this._nb_freelance_notations;
  }

  set nb_freelance_notations(nb_freelance_notations) {
    this._nb_freelance_notations = nb_freelance_notations;
  }
}

export default Company;
